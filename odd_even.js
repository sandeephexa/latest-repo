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
        if (req.body.result.resolvedQuery == "Hi" || req.body.result.resolvedQuery == "Hello") {
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
        if (req.body.result.resolvedQuery == "Get my profile picture" || req.body.result.resolvedQuery == "Get my id") 
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
                                                            "title": "profile, "+bodys.first_name+" "+bodys.last_name,
                                                            "image_url": bodys.profile_pic,
                                                             "subtitle":bodys.timezone+", "+bodys.gender,
                                                             
                                                        },
                                                        {
                                                            "title": "Image 2 "+bodys.last_name,
                                                            "image_url": "data:image/jpeg;base64,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",
                                                             "subtitle":bodys.timezone,
                                                             
                                                        }
                                                        ]
                                                    }
                                            }
                                         }
                                     }
                                }
                    
                     ]
            });
        });
       
              
            
        }

    }
  

});


app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})


