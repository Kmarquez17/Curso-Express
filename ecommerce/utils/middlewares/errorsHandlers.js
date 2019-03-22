const Sentry = require("@sentry/node");
const boom = require('boom')
const { config } = require("../../config");
const isRequestAjaxDrApi = require('../isRequestAjaxDrApi')

Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

function withErrorStack(err, stack){
  if(config.dev){
    return {...err, stack} //Obeject.assign({},err,stack)
  }
}

function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function wrapErrors(err,req,res,next){
  if(!err.isBoom){
    next(boom.badImplementation(err))
  }
  next(err)
}

function clientErrorHandler(err, req, res, next) {

  const {
    output:{statusCode, payload}
  } = err
  // catch errors for AJAX request
  if (isRequestAjaxDrApi(req) || res.headersSent ) {
    res.status(statusCode).json(withErrorStack(payload,err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  // catch erros while streaming
  const {
    output:{statusCode, payload}
  } = err 
  
  res.status(err.status || statusCode);
  res.render("error", withErrorStack(payload,err.stack));
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
  wrapErrors
};
