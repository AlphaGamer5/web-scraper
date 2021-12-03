const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: String,
    link: String,
    imgLink: String,
    content: String
});

const News = mongoose.model("Home", newsSchema);
const Sport = mongoose.model("Sport", newsSchema);
const Business = mongoose.model("Business", newsSchema);

module.exports = [News, Sport, Business]