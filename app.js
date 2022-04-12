const express = require("express");

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res, next) => {
  res.status(200).sendFile(`${__dirname}/index.html`);
});

module.exports = app;
