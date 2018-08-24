#!/usr/bin/env node

const express = require("express");
const crypto = require("crypto");

const app = express();

app.use("/etag/", (req, res) => {
  console.warn("----");
  Object.keys(req.headers).forEach(key => console.warn(key + ": " + req.headers[key]));

  const etag = crypto.createHash("sha1").update(req.path).digest("hex");
  res.set({ETag: etag});
  res.send({path: req.path});
});

app.listen(3000);
