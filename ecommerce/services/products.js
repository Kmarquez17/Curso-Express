const productsMocks = require('../utils/products.js')

class ProductsServices {
    constructor(){

    }

    getProducts({tags}){
        return Promise.resolve(productsMocks[0])
    }

    createProduct({product}){
        return Promise.resolve(productsMocks[0])
    }

    getProduct({productId}){
        return Promise.resolve(productsMocks[0])
    }

    updateProduct({productId,product}){
        return Promise.resolve(productsMocks[0])
    }

    updateProduct({productId}){
        return Promise.resolve(productsMocks[0])
    }

    deleteProduct({productId}){
        return Promise.resolve(productsMocks[0])
    }
}

module.exports = ProductsServices