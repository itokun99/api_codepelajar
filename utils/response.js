var serverError = function({error, res}){
    res.status(500);
    res.json({
        message: "Internal Server Error!",
        error: error 
    });
    res.end();
}


var notFound = function(res){
    res.status(404);
    res.json({
        message: "Not Found!"
    })
    res.end();
}

var ok = function(data, res){
    res.status(200);
    res.json({ ...data });
    res.end();
}

var badRequest = function(message, res){
    res.status(400);
    res.json({
        message: message
    })
    res.end();
}

var created = function(message, data, res){
    res.status(201);
    res.json({
        message: message,
        ...data !== null ? data : null  
    })
    res.end();
}

var forBidden = function(res){
    res.status(403);
    res.json({
        message: "Forbidden!"
    })
    res.end();
}

var forBidden = function(res){
    res.status(405);
    res.json({
        message: "Method not Allowed!"
    })
    res.end();
}

var unauthorized = function(res){
    res.status(401);
    res.json({
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