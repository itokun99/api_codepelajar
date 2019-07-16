exports.response = function(statusCode, messageText, responseData, res){
    res.status(statusCode);
    res.json({
        status : statusCode,
        message : messageText,
        ...responseData !== null ? {data : responseData} : {}
    })
    res.end();
}