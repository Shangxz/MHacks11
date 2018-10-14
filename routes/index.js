var express = require('express');
var router = express.Router();
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var db = require("../lib/db");

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
    twiml.message("Hey, Welcome to Pilot"+
        "\n\n/menu to access this menu" +
        "\n\n/say to say something to everyone" +
        "\n\n@<user> to DM a specific person" +
        "\n\n/find something special <3" +
        "\n\n/mute Mute all chat messages" +
        "\n\n/unmute Unmute all chat messages");
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
        var fs = require('fs');
        var obj;
        var search_string = body.Body.replace("/find ", "");
        var result = "";
        fs.readFile(require('path').resolve(__dirname, '../routes/response.json'), 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            var counter = 0;
            db.getUserFromPhone(body.From, function (user) {
                for(var i = 0; i < obj.length; i++) {
                    var obj1 = obj[i];
                    if (obj1.product_name.toLowerCase().indexOf(search_string.toLowerCase()) >= 0){
                        result += obj1.sku + "\n" + obj1.product_page_url + "\n";
                    }
                    console.log(obj1.product_name);
                    console.log(result);
                }
                if (counter == 5){
                    client.messages.create({
                        body: result,
                        to: user.phone,
                        from: '+14705398813'
                    }).then((message) => console.log(message.sid));
                    result = "";
                }
                counter++;
            });
        });
    } else if (body.Body.startsWith("/say")) {
        console.log("say");
        db.getUserFromPhone(body.From, function (user) {
            const msg = body.Body.replace("/say ", "@" + user.uuid + "says:\n\n");
            db.getAllUsers(body.From, function (users) {
                for (var index = 0; index < users.length; index++) {
                    if (users[index].phone != "not set" && users[index].phone != body.From) {
                        console.log("Sending to: ", users[index].phone);
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
    } else if (body.Body == "/mute" || body.Body == "/unmute") { // Mute or unmute conversations
        db.setUserMute(body.From, body.Body == "/mute", function (sender) {
            twiml.message("You have been " + (body.Body == "/mute" ? "muted" : "unmuted") + " from global chat");
            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        });
    }else {
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