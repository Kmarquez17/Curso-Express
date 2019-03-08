const express = require('express')
const router = express.Router()
const productsServices = require('../../services/products.js')
const productSevice = new productsServices()

router.get('/', async (req, res, next) => {
    const {tags} = req.query
    console.log(tags);
    

    try{
        const products = await productSevice.getProducts({tags})

        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    }catch(err){
        next(err)
    }

    
})

router.post('/', async (req, res, next) => {
    const { body: product} = req;

    try{
        const products = await productSevice.createProduct({product})
    
        res.status(201).json({
            data: products,
            message: 'product created'
        })
    }catch(err){
        next(err)
    }

    
})

router.get('/productId', async (req, res, next) => {
        const {productId} = req.params

    try{
        const createProduct = await productSevice.getProduct({productId})

        res.status(200).json({
            data: createProduct,
            message: 'product retrieve'
        })
    }catch(err){
        next(err)
    }
    
})


router.put('/productId', async (req, res, next) => {
    const {productId} = req.params
    const { body: product} = req;

    try{
        const updateProduct = await productSevice.updateProduct({productId,product})

        res.status(200).json({
            data: updateProduct,
            message: 'product update'
        })
    }catch(err){
        next(err)
    }
    
})

router.delete('/productId', async (req, res, next) => {
    const {productId} = req.params

    try{
        const product = await productSevice.deleteProduct({productId})
    
        res.status(200).json({
            data: product,
            message: 'product delete'
        })
    }catch(err){
        next(err)
    }
})

module.exports = router