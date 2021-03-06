var express = require('express');
var router = express.Router();

/* GET users listing. */
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "hackathon";


router.get('/', function (req, res, next) {
    console.log(JSON.stringify(req.query))
    if (req.query.op === "getall") {
        var table = "hackathon"
        var scan_params = {
            TableName: table
        };

        docClient.scan(scan_params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log(data.Items);
            }
        });
    }
});

module.exports = router;