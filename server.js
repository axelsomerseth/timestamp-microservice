// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

// An empty date parameter
app.get("/api/", function(req, res) {
    const result = {
        unix: new Date().getTime(), // Unix timestamp current time
        utc: new Date().toGMTString(), // string of the current time
    };
    res.json(result);
});

// Handle dates
app.get("/api/:date", function(req, res) {
    console.debug("Date input: " + req.params.date);

    // input date string is invalid
    const inputDate = new Date(req.params.date);
    if (inputDate.toString() === "Invalid Date") {
        if (Number.isInteger(parseInt(req.params.date))) {
            const result = {
                unix: parseInt(req.params.date), // Unix timestamp current time
                utc: new Date(parseInt(req.params.date)).toGMTString(), // string of the current time
            };
            res.json(result);
            return;
        }
        console.error("Invalid input date");
        const err = {
            error: "Invalid Date"
        };
        res.json(err);
        return;
    }

    // handle dates successfully
    const result = {
        unix: inputDate.getTime(), // Unix timestamp
        utc: inputDate.toGMTString(), // string of the input date
    };
    res.json(result);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});