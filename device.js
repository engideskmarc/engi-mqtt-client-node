const mqtt = require('mqtt')

var mqtt_host = 'mqtt://13.95.169.194';
var mqtt_port = '1883';
var device_key = '783e968139fe4f059fcfa5d76a67a3e1%yXC\'$MPbtENj5ePkvL6Lor+oSV4Y7tD86PS0YBhAfrFIgq7Ko5iqswbvRHfYHg+KSJ9aS60gdPZiVwiZEX3YreE9urOhQ==';

var credentials = { username: device_key.substring(0, 32), password: device_key.substring(32, 128)};

const client = mqtt.connect(mqtt_host + ':' + mqtt_port, credentials);

client.on('connect', () => {  

  // Subscribe to own messages for demo only
  client.subscribe(device_key.substring(0, 32) + '/#');

  // Subscribe to cloud-to-device messages
  client.subscribe('c2d/' + device_key.substring(0, 32));
});

client.on('message', (topic, message) => {  

  if (topic.startsWith('c2d'))
  {
    console.log('Received message from cloud');
    console.log(message.toString());
  }
  else
  {
    console.log('received own message %s %s', topic, message);
  }
});

client.on('error', (e) => {
  console.log(e)
});

// Send data 1Hz
setInterval(() => {
  
    var payload = {
      Timestamp: new Date().toISOString(),
      Payload: { Value: 8.0 }
    };

    client.publish(device_key.substring(0, 32) + '/data', JSON.stringify(payload));

}, 1000);


function handleAppExit (options, err) {
  if (err) {
    console.log(err.stack)
  }

  if (options.cleanup) {
    // client.publish(user_key + '/disconnected', 'true')
  }

  if (options.exit) {
    process.exit()
  }
}

process.on('exit', handleAppExit.bind(null, {
  cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {
  exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {
  exit: true
}))