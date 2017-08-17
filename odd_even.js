var express = require('express');
var app = express();
var bodyParser=require('body-parser');
const FACEBOOK_ACCESS_TOKEN = 'EAAFCRDYGklkBAHWOAzEnmuIPdbAEVIn6OPMoe26BH0j62TZBj1ZBMxEc2Y8xF9GFj9D6ifUn2McihyNUjYYUvbhpDexZAzRlBenVHZB8Fz26PgZCZARxOzZCay4Wxp31G6CXipPZALyZBVBWCpR0v9SenyAi6Ak9ZAQXHZAgfZBK4QeDJIdtZAhfNGFlZB6ZAycr8pHvYsZD';
const fburl='https://graph.facebook.com/v2.6/';
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) 
{
  var number = req.body.result.parameters['number']; // number is a required param
  var sender_id=req.body.originalRequest.data.sender.id;
  var rec_id=req.body.originalRequest.data.recipient.id;
  var message ='';
  
  if (req.body.result.action == "input.welcome") 
  {
        if (req.body.result.resolvedQuery  == "hi") 
        {
         request(
             {
            uri: fburl+sender_id+"?access_token="+FACEBOOK_ACCESS_TOKEN,
            methos: 'GET'
             },
             (err, response, body) => 
             {
                let bodys=JSON.parse(body);
                return res.json(
                {
                    speech:"Welcome, "+bodys.first_name+" "+bodys.last_name,
                    displayText: "Welcome, "+bodys.first_name+" "+bodys.last_name,
                    source: 'agent'
                });
             });
        }
  }
  
  if (req.body.result.action == "getresult") 
  {
    if(number % 2 == 0)
    {
         message = "Given number is Even";
    }
    else{ 
             message = "Given number is Odd";
        }
    return res.json({
                speech: message,
                displayText:message,
                source: 'agent'
            });
  }
      //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ 'speech': message, 'displayText': message }));
  
    });
         app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
}) 
