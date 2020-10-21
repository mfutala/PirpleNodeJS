/* 
Primary file for the API
*/

//Dependencies
const http = require('http');
const url = require('url');

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

  //Send the response
   res.end('Hello World\n'); 

  //Log the request path
  console.log("Request is received on path: " + trimmedPath + " with this method: " + method + 
   " and with these query string paramaters ", queryStringObject);
  
});// End of Create Server

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log("The server is listening on Port 3000");
});

