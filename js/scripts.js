$(function() {
  var socket = io.connect();
  var lastCmd = 'Stop'; //default

  //sending command to server
  function sendToServer(frame_obj) {
    socket.emit('emit_from_client', frame_obj);
    console.log(frame_obj);
  }

  //length data from server
  socket.on('emit_from_serverX', function(data) {
    //console.log("length : " + data);
    $('#distance').val(data);
  });
  socket.on('emit_from_serverY', function(data) {
    //console.log("length : " + data);
    $('#distance1').val(data);
  });

  const frame_objHelice = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '8', // Can either be a string or byte array.
  };

  const frame_objOffHelice = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '7', // Can either be a string or byte array.
  };

  const frame_objAcendeBranco = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '1', // Can either be a string or byte array.
  };

  const frame_objApagarBranco = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '0', // Can either be a string or byte array.
  };

  const frame_objAcendeVer = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '3', // Can either be a string or byte array.
  };

  const frame_objApagarVer = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '2', // Can either be a string or byte array.
  };

  const frame_objUptrem = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '5', // Can either be a string or byte array.
  };

  const frame_objDowntrem = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '6', // Can either be a string or byte array.
  };

  const frame_objBuzzer = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '4', // Can either be a string or byte array.
  };

  const frame_objFrente = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: '9', // Can either be a string or byte array.
  };

  const frame_objTraz = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: 'x', // Can either be a string or byte array.
  };

  const frame_objDireito = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: 'y', // Can either be a string or byte array.
  };

  const frame_objEsquerdo = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // Optional, nextFrameId() is called per default
    destination64: '0013a20040d6a87d',
    destination16: 'fffe', // Optional, "fffe" is default
    broadcastRadius: 0x00, // Optional, 0x00 is default
    options: 0x00, // Optional, 0x00 is default
    data: 'z', // Can either be a string or byte array.
  };

  $('#on').click(function() {
    sendToServer(frame_objAcendeBranco);
  });
  $('#off').click(function() {
    sendToServer(frame_objApagarBranco);
  });
  $('#OnHelice').click(function() {
    sendToServer(frame_objHelice);
  });
  $('#OffHelice').click(function() {
    sendToServer(frame_objOffHelice);
  });
  $('#LedRedOn').click(function() {
    sendToServer(frame_objAcendeVer);
  });
  $('#LedRedOff').click(function() {
    sendToServer(frame_objApagarVer);
  });
  $('#upTrem').click(function() {
    sendToServer(frame_objUptrem);
  });
  $('#DownTrem').click(function() {
    sendToServer(frame_objDowntrem);
  });
  $('#PraTras').click(function() {
    sendToServer(frame_objTraz);
  });
  $('#PraFrente').click(function() {
    sendToServer(frame_objFrente);
  });
  $('#buzzer').click(function() {
    sendToServer(frame_objBuzzer);
  });
  $('#ladoEsquerdo').click(function() {
    sendToServer(frame_objEsquerdo);
  });
  $('#ladoDireito').click(function() {
    sendToServer(frame_objDireito);
  });
});

function clickButton(go) {
  //var val = document.getElementById("slideValue").value;
  //console.log(go + ": power:" + val);
}
