/* 
create and export configuration variables

*/

//container for all the environments

let environments = {};

//staging default environment
environments.staging = {
    'port': 3000,
    'envName': 'staging',
}

// Production environment
environments.production = {
    'port': 5000,
    'envName': 'production',
}

//determine which environment to export
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() :  "";

// check that the current environment is one of the set up environments

let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

//Export the module
 module.exports = environmentToExport;