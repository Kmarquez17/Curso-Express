const express =  require('express')

const path = require("path")
const productsRouter = require('./routes/views/products')
const productosApiRouter = require('./routes/api/products')
const bodyParser = require('body-parser')

//Inicializacion de aplicacion con express
const app = express()

//Middlewares
app.use(bodyParser.json());

//Manejo de los archi static
app.use("/static", express.static(path.join(__dirname,"public")))

//Vistas de pug
app.set("views", path.join(__dirname, 'git iviews'))
app.set("view engine","pug")

//Rutas
app.use('/products',productsRouter)
app.use("/api/product", productosApiRouter)

//Redireccionando a vista products
app.get('/', (req, res) => {
    res.redirect('/products')
})

//Server Inicialización
const server = app.listen(8000, () => {
    console.log(`Listening htto://localhost:${server.address().port}`)
})