const express = require("express");
const router = express.Router();
const productsServices = require('../../services/products.js')
const productSevice = new productsServices()

router.get("/", async (req, res, next) => {
  const {tags} = req.query
  try{
    const products = await productSevice.getProducts(tags)
    res.render("products", { products });
  }catch(err){
    next(err)
  }
});


module.exports = router;