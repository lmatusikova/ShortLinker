const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlShortenSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

let UrlShorten = mongoose.model("UrlShorten", urlShortenSchema);
module.exports = {
    UrlShorten:UrlShorten
}
