const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const woocommerce = require("./woocommerce");
const app = express();

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json({
    data: products,
  });
});

mongoose
  .connect(
      ""
  )
  .then(() => {
    console.log("Veri Tabanı Bağlandı.");
    const server = app.listen(3000, () => {
      console.log(`Server listening ${server.address().port} port`);
      woocommerce.start();
    });
  });
