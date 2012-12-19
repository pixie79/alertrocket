#!/usr/bin/env node
"use strict";
var https = require('https'),
  Getopt  = require('node-getopt'),
  tag,
  alert,
  code,
  auth,
  key,
  secret,
  message;

var getopt = new Getopt([
  ['d', 'debug'],
  ['h', 'help'],
  ['g', 'general'],
  ['e', 'emergency'],
  ['a', 'auth='],
  ['k', 'key='],
  ['s', 'secret='],
  ['u', 'url='],
  ['c', 'code=']
]).bindHelp();

var opt = getopt.parse(process.argv.slice(2)),
  message = opt.argv[0],
  key     = opt.options.key,
  secret  = opt.options.secret,
  url     = opt.options.url,
  code    = opt.options.code,
  auth    = key + ":" + secret;

if (opt.options.emergency){
  tag = ["sysadmin", "support"],
  alert = " Emergency: ";
} else {
  if (opt.options.general){
    tag = ["support"],
    alert = " Urgent Support: ";
  } else {
    tag = ["sysadmin"],
    alert = " Systems: ";
  }
}

var body = JSON.stringify({
  alert: code + alert + message,
  url: url,
  tags: tag
});

console.info(auth);

var request = https.request({
  'hostname': 'launch.alertrocket.com',
  'auth': auth,
  'port': '443',
  'path': '/api/push',
  'method': 'POST',
  'Content-Length': body.length,
  'Content-Type': 'application/json'
 }, 
  function (response) {
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

request.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

request.write(body);
request.end();
