var express = require('express');
var app = express();
var bodyParser=require('body-parser');



const FACEBOOK_ACCESS_TOKEN = 'EAAFCRDYGklkBAHWOAzEnmuIPdbAEVIn6OPMoe26BH0j62TZBj1ZBMxEc2Y8xF9GFj9D6ifUn2McihyNUjYYUvbhpDexZAzRlBenVHZB8Fz26PgZCZARxOzZCay4Wxp31G6CXipPZALyZBVBWCpR0v9SenyAi6Ak9ZAQXHZAgfZBK4QeDJIdtZAhfNGFlZB6ZAycr8pHvYsZD';
const fburl='https://graph.facebook.com/v2.6/';
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) {

var sender_id=req.body.originalRequest.data.sender.id;
var rec_id=req.body.originalRequest.data.recipient.id;
var number = req.body.result.parameters['number'];
var message = '';

    if (req.body.result.action == "input.welcome") 
    {
        if (req.body.result.resolvedQuery == "Hi") {
         request({
            uri: fburl+sender_id+"?access_token="+FACEBOOK_ACCESS_TOKEN,
            methos: 'GET'
        }, (err, response, body) => {
            let bodys=JSON.parse(body);
          return res.json({
                speech:"Hi, "+bodys.first_name+" "+bodys.last_name,
                displayText: "Hi, "+bodys.first_name+" "+bodys.last_name,
                source: 'agent'
            });
        });
       
              
            
        }

    }
    if (req.body.result.action == "input.unknown") 
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
  if (req.body.result.action == "result.result-custom") 
    {
        if (req.body.result.resolvedQuery == "get my profile picture") 
        {
         request(
             {
                uri: fburl+sender_id+"?access_token="+FACEBOOK_ACCESS_TOKEN,
                methos: 'GET'
             }, (err, response, body) => 
             {
                let bodys=JSON.parse(body);
                return res.json({
                speech:"Profile, "+bodys.profile_pic,
                displayText: "Profile, "+bodys.profile_pic,
                source: 'agent',
                 messages: [
                                {
                                     "type": 4,
                                     "platform": "facebook",
                                     "payload": 
                                     {
                                        "facebook":
                                         {
                                            "attachment": 
                                            {
                                                    "type":"template",
                                                    "payload":
                                                    {
                                                        "template_type": "generic",
                                                        "elements": 
                                                        [{
                                                            "title": "Welcome, "+bodys.first_name+" "+bodys.last_name,
                                                            "image_url": bodys.profile_pic,
                                                             "subtitle":bodys.timezone+", "+bodys.gender,
                                                             "buttons": 
                                                             [
                                                                {
                                                                 "type": "postback",
                                                                 "title": "listings",
                                                                  "payload": "listings"
                                                                },
                                                                {
                                                                     "type": "postback",
                                                                    "title": "stats",
                                                                    "payload": "stats"
                                                                 }
                                                             ]
                                                        }]
                                                    }
                                            }
                                         }
                                     }
                                }
                    ,{
                        "title": "Welcome, "+bodys.first_name+" "+bodys.last_name,
                        "image_url": bodys.profile_pic,
                        "subtitle":bodys.timezone+", "+bodys.gender,
                         "buttons": [
                        {
                            "type": "postback",
                            "title": "listings",
                            "payload": "listings"
                        },
                        {
                            "type": "postback",
                            "title": "stats",
                            "payload": "stats"
                        }
                        ]
                    }
                     ]
            });
        });
       
              
            
        }

    }
  

});

app.get("/getdata/",function(req, res){
   fs.readFile("./data.json",'utf-8',function(err,data){
      res.json(data);
   });
   
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})


