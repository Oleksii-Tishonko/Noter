const express = require('express');
const cors = require('cors');

const app = express();

const productRouter = require('./routes/productRoutes');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.use('/api/v1/test', (req, res) => {
    res.json({
        status:200,
        data: "hi from a server!",
    })
});

app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next)=>{
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;

    next(err);
});

module.exports = app;
