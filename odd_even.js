var express = require('express');

const http = require('http');
console.log("working fine");
exports.oddEvenWebhook = (req, res) => {
  // Get the number from the request
  var number = req.body.result.parameters['number']; // city is a required param
  var message ='';
  if(number % 2 == 0)
    {
         message = "given number is even";
    }
    else{
             message = "given number is odd";
        }

      res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': message, 'displayText': message }));
  
}


