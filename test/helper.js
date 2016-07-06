'use strict'

const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')

function startServer () {
  const server = http.createServer(handle)

  server.listen(0)

  function handle (req, res) {
    res.end('hello world')
  }

  server.unref()

  return server
}

// this server won't reply to requests
function startTimeoutServer () {
  const server = http.createServer(() => {})

  server.listen(0)
  server.unref()

  return server
}

// this server won't reply to requests
function startHttpsServer () {
  const options = {
    key: fs.readFileSync(path.join(__dirname, '/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/cert.pem')),
    passphrase: 'test'
  }

  const server = https.createServer(options, handle)

  server.listen(0)

  function handle (req, res) {
    res.end('hello world')
  }

  server.unref()

  return server
}

for (var i = 1; i <= 5; i++) closure(i)

function closure (i) {
  module.exports[`start${i}xxServer`] = function () {
    const server = http.createServer(handle)

    server.listen(0)

    function handle (req, res) {
      res.writeHead(Number(`${i}00`))
      res.end()
    }

    server.unref()

    return server
  }
}

module.exports.startServer = startServer
module.exports.startTimeoutServer = startTimeoutServer
module.exports.startHttpsServer = startHttpsServer
