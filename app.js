/**
 * Hosts the latest kibana3 and elasticsearch behind Google OAuth2 Authentication
 * with nodejs and express.
 * License: MIT
 * Copyright: Funplus Game Inc.
 * Author: Fang Li.
 * Project: https://github.com/fangli/kibana-authentication-proxy
 */

var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var request = require('request');

var config = require('./config');
var app = express();

console.log('Server starting...');

app.use(express.cookieParser());
app.use(express.session({ secret: config.cookie_secret }));

// Authentication
require('./lib/basic-auth').configureBasic(express, app, config);
require('./lib/google-oauth').configureOAuth(express, app, config);
require('./lib/cas-auth.js').configureCas(express, app, config);

// Setup ES proxy
require('./lib/es-proxy').configureESProxy(app, config.es_host, config.es_port,
          config.es_username, config.es_password);

// Reverse Proxy to Kibana 4 BETA
app.use('/', function(req, res) {
  var options =  {
    url: "http://" + config.kibana_4_host + ":" + config.kibana_4_port + req.url
  };
  req.pipe(request(options)).pipe(res);
});

run();

function run() {
  if (config.enable_ssl_port === true) {
    var options = {
      key: fs.readFileSync(config.ssl_key_file),
      cert: fs.readFileSync(config.ssl_cert_file),
    };
    https.createServer(options, app).listen(config.listen_port_ssl);
    console.log('Server listening on ' + config.listen_port_ssl + '(SSL)');
  }
  http.createServer(app).listen(config.listen_port);
  console.log('Server listening on ' + config.listen_port);
}

