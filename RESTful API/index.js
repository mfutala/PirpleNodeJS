/* 
Primary file for the API
*/

//Dependencies
const http = require('http');
const url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;

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

  // Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', data => {
    buffer += decoder.write(data);
  });

  req.on('end', function () {
    buffer += decoder.end();

    //choose the handler this should go to

    //Send the response
    res.end('Hello World\n');

    //Log the request path
    console.log("request received with this payload: ", buffer);
  });
});// End of Create Server

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log("The server is listening on Port 3000 now");
});

//Define Handlers
let handlers = {};

//Sample Handler 
handlers.sample = function (data, callback) {
  //Callback a http status code, and a payload object
  callback(406, { 'name': 'sample handler' });
};

//Not found handler
handlers.notFount = function (data, callback) {
  callback(404);
}

//Define request router
let router = {
  'sample': handlers.sample,
};