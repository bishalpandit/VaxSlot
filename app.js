
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

    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=700064&date=08-05-2021";

    https.get(url, resp => {

    let data = "";

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {

      let vaccine = JSON.parse(data);
      
        res.render("result", {

            vaccine : vaccine
        })

    })

 })

});


app.listen(process.env.PORT || 3000, function() {

    console.log("Server up and running...");
})

