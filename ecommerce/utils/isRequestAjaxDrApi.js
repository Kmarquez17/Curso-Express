function isRequestAjaxDrApi(req){
    return !req.accepts("html") || req.xhr;
}

module.exports = isRequestAjaxDrApi