# engi-mqtt-client-node

This package provides a node.js demo MQTT client.

## Usage

> SSL encryption will be added shortly and is mandatory for production use!

### Auth

Given a running instance of the *engidesk MQTT broker and proxy service*, data can be sent to the service as follows:

Devices are identified by their engidesk signed key:

Given the engidesk provided device key 

`2f9c02d1d12649a18848d24b32709638ep%Nn&0uhK1VADjy0WP/2OpFr7OXfFvBRQgoi31S3mUa2L7VGuZaICXRpbe9mesKkMrwUFTmNeteuGgTEabcZ2imQDSM8w==`

The MQTT **username** is the first *32* characters:

`2f9c02d1d12649a18848d24b32709638`

The MQTT **password** is the rest (characters 33 to 128):

`hK1VADjy0WP/2OpFr7OXfFvBRQgoi31S3mUa2L7VGuZaICXRpbe9mesKkMrwUFTmNeteuGgTEabcZ2imQDSM8w==`

### Sending data from device to cloud

The route to post data is constructed as follows:

`[MQTT username]/data`

The MQTT payload is encoded as JSON and should be constructed as follows:

``` json
{    
    "Timestamp": "Timestamp ISO string",
    "Payload": "Value to send"
}
```

The payload value must be an object, not a simple value:

OK:

``` json
{    
    "Timestamp": "...",
    "Payload": { "Value" : 8.0 }
}
```

OK:

``` json
{    
    "Timestamp": "...",
    "Payload": { "Value" : true }
}
```

OK:

``` json
{    
    "Timestamp": "...",
    "Payload": { "MyProp" : { "Something" : "SomeValue" } }
}
```

**NOT** OK:

``` json
{    
    "Timestamp": "...",
    "Payload": 8.0
}
```

### Receiving messages from the cloud

The device needs to subscribe to the following route:

`c2d/[MQTT username]`

The messages sent from cloud to device have the same format as messages sent from device to cloud:

``` json
{    
    "Timestamp": "Timestamp ISO string",
    "Payload": "Value to send"
}
```

## Run the sample

Clone the repo, and `npm install`

```
git clone ...
cd engi-mqtt-client-node
npm install
```

Run the MQTT device demo

```
node device
```