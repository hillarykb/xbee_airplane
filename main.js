var util = require('util');
var SerialPort = require('serialport');
var xbee_api = require('xbee-api');
var Readline = SerialPort.parsers.Readline;
var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var io = require('socket.io').listen(app);
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1,
});

var serialPort = new SerialPort('COM12', {
  baudRate: 9600,
  parser: xbeeAPI.parseRaw(1000),
});
var serialPortArd = new SerialPort('COM11', {
  baudRate: 9600,
  parser: xbeeAPI.parseRaw(1000),
});

var parser = new Readline('\n');
serialPortArd.pipe(parser);
parser.on('data', function(data) {
  console.log('data received: ' + JSON.stringify(data));

  let t = JSON.stringify(data)
    .replace(/([A-Z{":,}a-z])/g, '')
    .split('\\');
  console.log(t[6], t[8]);

  let x = t[6];
  let y = t[8];

  io.sockets.emit('emit_from_serverX', x);
  io.sockets.emit('emit_from_serverY', y);
});

serialPort.on('open', function() {
  console.log('Communication is on!');
  var frame_obj = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '0', // Can either be a string or byte array.
  };
  console.log(frame_obj);
  serialPort.write(xbeeAPI.buildFrame(frame_obj));
});

app.listen(3000);
function handler(req, res) {
  var filePath = req.url;

  if (filePath == '/') {
    filePath = '/index.html';
  } else {
    filePath = req.url;
  }
  //console.log(filePath);
  var extname = path.extname(filePath);
  //console.log("filePath: " + filePath);
  //console.log("ext: " + extname);

  //contentType切り分け
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }
  // console.log(contentType);

  //console.log(__dirname + filePath);
  fs.readFile(__dirname + filePath, function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.setHeader('Content-Type', contentType);
    res.writeHead(200);
    res.write(data);
    res.end();
  });
}

io.sockets.on('connection', function(socket) {
  //button pushed
  socket.on('emit_from_client', function(data) {
    //check the data
    console.log(data);

    serialPort.write(xbeeAPI.buildFrame(data));
  });
});

// All frames parsed by the XBee will be emitted here
//I think this is the problem
xbeeAPI.on('frame_object', function(frame) {
  console.log('>>', frame);
});
