var serverError = function(error, res){
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
    res.json({ data });
    res.end();
}

var badRequest = function(res, message){
    res.status(400);
    res.json({
        message: message
    })
    res.end();
}

var created = function(res, message, data){
    res.status(201);
    res.json({
        message: message,
        data
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





module.exports = {
    serverError,
    ok,
    notFound,
    created,
    forBidden,
    badRequest,
}