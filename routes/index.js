var express = require('express');
var router = express.Router();
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var db = require("../lib/db");
var venueSearch = require("../lib/venue-search");

var twilio = require('twilio');
var accountSid = 'ACb4554f1dc59bd15ac60048d4de45f7ea';
var authToken = '5143027d7e616d634dc0a4a94ea98b27';
var client = new twilio(accountSid, authToken);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

function handleImageRequest(body, res) {
    const twiml = new MessagingResponse();
    if (body.Body === "/upload-pic") {
    } else if (body.Body === "/who") {
    } else if (body.Body === "/what") {
    }
}

function sendDefaultTemplate(twiml, res) {
    twiml.message("Hi\n\n/menu to access this menu" +
        "\n\n/say to say something to everyone" +
        "\n\n@<user> to DM a specific person" +
        "\n\n/find with whatever you fancy and find it nearby" +
        "\n\n/who with an image to identify a celebrity" +
        "\n\n/what with an image to describe a scene " +
        "\n\n/upload-pic To upload a profile pic" +
        "\n\n/device show/add/set to display, connect, or adjust IOT devices");
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(twiml.toString());
}

function handleTextRequest(body, res) {
    const twiml = new MessagingResponse();
    console.log(body.Body);

    if (body.Body.startsWith("/register")) {
        console.log("register");
        const uuid = body.Body.replace("/register ", "");
        db.insertTelephoneNumber(uuid, body.From);
        sendDefaultTemplate(twiml, res);
    } else if (body.Body == "/menu" || body.Body.toLowerCase() == "hi") {
        console.log("menu");
        sendDefaultTemplate(twiml, res);
    } else if (body.Body.startsWith("/find")) {
        var request = require("request");
        
        var options = { 
            method: 'GET',
            url: 'https://www.wayfair.com/3dapi/models',
            headers: 
        { 'Postman-Token': '087d1f72-18ec-4166-9bd9-226bc1d65f7d',
           'cache-control': 'no-cache' } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);

        for( var i = 0; i < Object.keys(body).length(); i++){
            console.log(body[i].product_name);
        }
      });

      sendDefaultTemplate(twiml, res);
    } else if (body.Body.startsWith("/say")) {
        console.log("say");
        db.getUserFromPhone(body.From, function (user) {
            const msg = body.Body.replace("/say ", "@" + user.uuid + "says:\n\n");
            db.getAllUsers(body.From, function (users) {
                for (var index = 0; index < users.length; index++) {
                    if (users[index].phone != "not set" && users[index].phone != body.From) {
                        client.messages.create({
                            body: msg,
                            to: users[index].phone,
                            from: '+14705398813'
                        }).then((message) => console.log(message.sid));
                    }
                }
            });
        });
    } else if (body.Body.startsWith("@")) {
        console.log("whisper");
        db.getUserFromPhone(body.From, function (sender) {
            db.getUserFromUUID(body.Body.split(" ")[0].slice(1), function (receiver) {
                const msg = "@" + sender.uuid + " says:\n\n" + body.Body.split(" ").slice(1).join(" ");
                client.messages.create({
                    body: msg,
                    to: receiver.phone,
                    from: '+14705398813'
                }).then((message) => console.log(message.sid));
            });
        });
    } else if (body.Body == "/username") {
        console.log("username");
        db.getUserFromPhone(body.From, function (sender) {
            twiml.message("Your Username is " + sender.uuid);
            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        });
    } else if (body.Body.match(/\/send \$[0-9.]* to @[A-Za-z0-9]{5}/) != null) { // Send money

    } else if (body.Body == "/mute" || body.Body == "/unmute") { // Mute or unmute conversations
        db.setUserMute(body.From, body.Body == "/mute", function (sender) {
            twiml.message("You have been " + (body.Body == "/mute" ? "muted" : "unmuted") + " from global chat");
            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        });
    } else if (body.Body.startsWith("/device")) { //IOT Proof of Concept Functionalities
        var option = body.Body.replace("/device ", "");
        console.log(option);
        if (option.startsWith("add")) {
            // console.log("entered if");
            var deviceName = option.replace("add ", "");
            console.log(deviceName);
            db.insertDevice(deviceName, function (sender) {
                twiml.message(sender);
                res.writeHead(200, {
                    'Content-Type': 'text/xml'
                });
                res.end(twiml.toString());
            });
        } else if (option.startsWith("set")) {
            var option1 = option.replace("set ", "");
            var deviceName = option1.substr(0, option1.indexOf(' '));
            var value = option1.substr(option1.indexOf(' ') + 1);
            console.log(deviceName);
            console.log(value);
            db.modifyDevice(deviceName, value, function (sender) {
                twiml.message(sender);
                res.writeHead(200, {
                    'Content-Type': 'text/xml'
                });
                res.end(twiml.toString());
            });
        } else if (option.startsWith("show")) {
            var result = "";
            db.getAllDevices(function (sender) {
                for (var i = 0; i < sender.length; i++) {
                    result += sender[i].device + " " + sender[i].value + "\n";
                }
                console.log(result);
                twiml.message(result);
                res.writeHead(200, {
                    'Content-Type': 'text/xml'
                });
                res.end(twiml.toString());
            });
        }
    } else {
        console.log("default");
        sendDefaultTemplate(twiml, res);
    }
}

router.post("/sms", (req, res) => {
    const body = req.body;
    console.log(body);
    console.log("\n\n");

    if (body.MediaContentType0 === "image/jpeg") {
        handleImageRequest(body, res);
    } else {
        handleTextRequest(body, res);
    }
});

module.exports = router;