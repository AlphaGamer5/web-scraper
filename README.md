# Web-scraper for Times Of India
### To Use This Web Scraper
1. Clone this repository using `git clone https://github.com/AlphaGamer5/web-scraper.git`.
2. Now run `npm install` in your terminal to install the necessary dependencies.
3. This website is made to scrape [Times Of India](https://timesofindia.indiatimes.com/) website, although you can very easily use it for any other website. To scrape the TOI website enter the ***MongoDB connect URI*** and run `nodemon app.js`.

### Some Important Files
* `[https://github.com/AlphaGamer5/web-scraper/blob/master/selectors/selectors.js](selectors.js)`: This contains all the css selectors used in the scraping. 
> 1. `link` attribute contains the class to select all the anchor tags in the respective pages.
> 2. `imgUrl` contains selector to select the *href* attribute of the image present in the page.
> 3. `content` for selecting the content of an article.
> 4. `title` for selecting the title of the article.

Make the necessary changes to the code for scraping other websites.

### Issues Faced while working
1. Started the scraping with Puppeteer but soon found out that it wasn't able to scrape ToI so I had to use `request-promise` package instead.
2. Faced an issue connecting mongoDB using `mongoose`. After hours of debugging, found out that the problem was due to the campus wifi, as it doesn't allow connection with mongoDB atlas.
