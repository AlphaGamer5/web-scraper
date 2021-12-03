const axios = require("axios");
const path = require("path");
const fs = require('fs');

const download = async (url) => {
    const pt = path.join(__dirname, 'images', fileName);
    console.log(pt);
    const res = await axios({
        method: "GET",
        url: url,
        responseType: "stream"
    });

    res.data.pipe(fs.createWriteStream(pt));

    return new Promise((resolve, reject) => {
        res.data.on("end", () => {
            resolve();
        });
        res.data.on("error", (err) => {
            reject(err);
        });
    })
}

module.exports.download = download;