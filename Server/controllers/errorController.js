const AppError = require("./../utils/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err.message,
    });
}

const sendErrorProd = (err, res) => {

    // Operational, thrusted error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
    }
    // Programming or other unknown error: don't leak error details
    else{
        // 1) Log error
        console.error('ERROR', err);

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Internal err (not handled)',
        })
    }

    
}

const handleDuplicateFieldsDB = err => {
    const message = `Duplicate field value: ${JSON.stringify(err.keyValue)}, Please use another value`;
    return new AppError(message, 400)
}
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;

    return new AppError(message, 400);
}

module.exports = (err, req, res, next) => {
  //console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.ENVNODE_ENV === 'development') {
    console.log('development');
    sendErrorDev(err, res);
  } 
  else if (process.env.ENVNODE_ENV === 'production') {
    console.log('production');
    let error = JSON.parse(JSON.stringify(err));
    error = {...err};
    if(!error.message) error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.code === 11000) error = handleDuplicateFieldsDB(error);
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
}