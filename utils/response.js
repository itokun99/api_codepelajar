var serverError = function(error, res){
    res.status(500);
    res.json({
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
        error: error ? error : 'Something wrong on app' 
    });
    res.end();
}


var notFound = function(res){
    res.status(404);
    res.json({
        status: false,
        message: "Not Found!"
    })
    res.end();
}

var ok = function(data, res){
    res.status(200);
    res.json({ 
        status: true,
        data: data !== null ? data : null
    });
    res.end();
}

var badRequest = function(message, res){
    res.status(400);
    res.json({
        status: false,
        message: message
    })
    res.end();
}

var created = function(message, data, res){
    res.status(201);
    res.json({
        status: true,
        message: message,
        data : data && data !== null ? data : null  
    })
    res.end();
}

var forBidden = function(res){
    res.status(403);
    res.json({
        status: false,
        message: "Forbidden!"
    })
    res.end();
}

var forBidden = function(res){
    res.status(405);
    res.json({
        status: false,
        message: "Method not Allowed!"
    })
    res.end();
}

var unauthorized = function(res){
    res.status(401);
    res.json({
        status: false,
        message: "Unauthorized!"
    })
    res.end();
}





module.exports = {
    serverError,
    ok,
    notFound,
    created,
    forBidden,
    badRequest,
    unauthorized
}