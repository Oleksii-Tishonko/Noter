const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');


const app = express();

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
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/carts', cartRouter);

app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
