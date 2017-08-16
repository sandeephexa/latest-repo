var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) 
{
  var number = req.body.result.parameters['number']; // city is a required param
  var message ='';
  if(number % 2 == 0)
    {
         message = "given number is even";
    }
    else{
             message = "given number is odd";
        }
 return res.json({
                speech: message,
                displayText:message,
                source: 'agent'
            });
      //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ 'speech': message, 'displayText': message }));
  
}
         app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})


