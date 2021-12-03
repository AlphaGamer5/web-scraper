const express = require("express");
const rp = require('request-promise');
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const models = require("./models/newsModel");
const dotenv = require("dotenv")
const cors = require("cors");
const selectors = require("./selectors/selectors.js");

const app = express();

//Middleware
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({
    extended: true
}));

const mongoURI = "mongodb+srv://<USERNAME>:<PASSWORD>@news-store.xxtqo.mongodb.net/<DATABASE NAME>?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (result) => {
        console.log("Connected to DB...");
        await saveToDb();
    })
    .catch(err => console.log(err));

const listOfLinks = async (page) => {
    try {
        const html = await rp(page.url);
        const $ = cheerio.load(html);
        let newsLinks = [];
        $(page.link).each((i, e) => {
            newsLinks.push($(e).attr("href"));
        });

        return newsLinks;
    } catch (error) {
        console.log(error.message);
    }
};

const getDetails = async (newsLinks, page) => {
    try {
        // Iterate for each url and scrape the content, image and the page link;
        const promises = newsLinks.map((link) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const html = await rp(link);
                    const $$ = cheerio.load(html);

                    const title = $$(page.title).eq(0).text();
                    const imgLink = $$(page.imgLink).attr("src");
                    const content = $$(page.content).text();

                    resolve({ title, link, imgLink, content });
                } catch (error) {
                    reject(error);
                }
            })
        })

        const details = await Promise.all(promises);
        const filteredDetails = details.filter(detail => detail.imgLink && detail.title && detail.content);
        console.log(`${filteredDetails.length} News Articles found in ${page.name} section`);

        return filteredDetails;
    } catch (error) {
        console.log(error);
    }

}

const saveToDb = async () => {

    for (let page of selectors) {
        const newsLinks = await listOfLinks(page);
        const validLinks = newsLinks.map(link => {
            if (link.startsWith("https://")) {
                return link;
            }
            else {
                return page.baseUrl + link;
            }
        });
        const details = await getDetails(validLinks, page);

        details.forEach(async (newsDetail) => {
            try {
                const newNews = new models[page.id]({
                    title: newsDetail.title,
                    link: newsDetail.link,
                    imgLink: newsDetail.imgLink,
                    content: newsDetail.content
                })
                await newNews.save();
            } catch (error) {
                console.log(error);
            }
        })
    }
}
