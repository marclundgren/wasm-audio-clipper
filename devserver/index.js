const fs = require("fs");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const express = require("express");
const path = require("path");
const cors = require("cors");

const ffmpeg = createFFmpeg({ log: true });
const app = express();
const port = 3000;

const coop = () =>
  function (req, res, next) {
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
  };
const coep = () =>
  function (req, res, next) {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  };

// middleware;
app.use(cors());
app.use(coop());
app.use(coep());

app.use("/", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
