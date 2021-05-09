
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fetch = require("node-fetch");
const { response } = require("express");

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {

  res.render("home");
    
});

app.post("/result", function(req, res) {

    const pin = req.body.pin;

    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var date = "0" + d + "-0" + m + "-" + y;

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + pin + "&appid=c7d37383f37163c9f9f3e77ce2bccde7&units=metric";

   fetch(url).then( async (response) => {

        const weather = await response.json();

        res.render("result", {

            w : weather
        })

   }).catch( (err) => {

        console.log(err);
   })

});


app.listen(process.env.PORT || 3000, function() {

    console.log("Server up and running...");
})

