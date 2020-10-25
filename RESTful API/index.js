/* 
Primary file for the API
*/

//Dependencies
const http = require('http');
const url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;
let config = require('./config');

// The server should respond to all requests with a string
const server = http.createServer(function (req, res) {
  //Get the URL and parse it
   let parsedUrl = url.parse(req.url, true);
    
  //Get the path from the URL
   let path = parsedUrl.pathname;
   let trimmedPath = path.replace(/^\/+|\/+$/g, '');
  
  //Get the query sting as an object
  let queryStringObject = parsedUrl.query;
  
  // Get the HTTP method
  let method = req.method.toLowerCase();

  // Get the hearders as an Object
  let headers = req.headers;

  //========================================================================================
  // Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
//===========================================================================================

  req.on('end', function () {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){

      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 400;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof(payload) === 'object'? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log("Returning this response: ",statusCode,payloadString);

    });

});
});// End of Create Server

//=================================================================================================

// Start the server, and have it listen on port 3000
server.listen(config.port, function () {
  console.log("The server is listening on Port "+config.port+" in "+config.envName+" mode");
});

//==================================================================================================

//Define Handlers
let handlers = {};

//Sample Handler 
handlers.sample = function (data, callback) {
  //Callback a http status code, and a payload object
  callback(200, { 'name': 'sample handler' });
};

handlers.home = function (data, callback) {
  callback(401);
};

//Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
}

//==================================================================================================

//Define request router
let router = {
  'sample': handlers.sample,
  'home' : handlers.home,
};

//===================================================================================================