function acoustic-locator(name, deps) {
    console.log("This is where plugin code for acoustic-locator loads in the node process.");

  //This is how you would register a listner to traffic from the browser

/*
  deps.io.sockets.on('connection', function (socket) {
    socket.on('some_message_from_browser', function () {
      //sending on to the rov via the serial connection
      deps.rov.send('msg(0)');
      console.log('msg(0) sent');
    });
  });
*/
  //This is how you would register a listner to traffic from the ardunio
  //or other parts of the node modules and forward it to the browser
  /*
  deps.globalEventLoop.on('acousticlocation-input', function (data) {
    deps.io.sockets.emit('acousticlocation', data);
  });

  */

  // Setup Hardware.js listener to new serial port, should make that a configurable endpoint.
  //   may need to check and see if the beaglebone is already exposing the serial device.
  //  /dev/ttyO5 is assumed avaiable on P8 header of the beaglebone.
  var serialDevice = '/dev/ttyO5';
  var baudrate = '115200';
  var serialConnected = false;

  var serialPort = require('serialport');
  var alSerialPort =  new serialPort.SerialPort(serialDevice, {
    baudrate: baudrate,
    parser: serialPort.parsers.readline('\r\n')
  });

  alSerialPort.on("open", function () {
    serialConnected = true;
    logger.log('Serial port open');
  });

  alSerialPort.on('close', function (data) {
    logger.log('!Serial port closed');
    serialConnected = false;
  });

  // Here is where you write the protocol handing
  alSerialPort.on('data', function (datastring) {
    //we are just going to pass all messages as are downstream as acousticlocation message
    var jsondata; //we need to convert the json string to a json object

    deps.io.sockets.emit('acousticlocation', data);

  };

};

module.exports = acoustic-locator;
