
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {

  res.render("home");
    
});

app.post("/result", function(req, res) {

    const pin = req.body.pin;

    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=08-05-2021";

    https.get(url, function(resp) {


        resp.on("data", function(data) {

            const vaccineInfo = JSON.parse(data);

            const Centers = vaccineInfo.centers;

            res.render("result", {

                    centers : Centers
            });
                         
        });
    });

});


app.listen(process.env.PORT || 3000, function() {

    console.log("Server up and running...");
})