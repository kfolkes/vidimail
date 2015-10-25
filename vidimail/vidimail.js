Tasks = new Mongo.Collection("tasks");
myVideos = new Mongo.Collection("my_video");
receivedVid = new Mongo.Collection("received_vid");
receivedMsg  = new Mongo.Collection("received_msg");
receivedVoice = new Mongo.Collection("received_voice");


Router.route('/register');
Router.route('/vidimail',{
  template: 'vidimail'
});

Router.route('/' ,{
    template: 'home'
});


Router.route('/public/krystal.xml', {

where: 'server',
template: 'blank',
action: function() {

var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
xmlData += "<Response>";
xmlData += "<Say voice=\"woman\" language=\"en\">Hello!</Say>";
xmlData += "</Response>";
console.log(xmlData);
this.response.writeHead(200, {'Content-Type': 'application/xml'});
this.response.end(xmlData);

}

});



if(Meteor.isClient){


  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      // Show newest tasks at the top
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
      

    }
  });

  Template.body.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

}

if(Meteor.isServer) {

// Configure the Twilio client
  var ACCOUNT_SID = "AC05aea60b815f99cad88996a8b63d87ae";// SID tied to your Twilio account
  var AUTH_TOKEN = "5efadb1e45c24fc3e13302c0bfa60d4e";
  twilio = Twilio(ACCOUNT_SID, AUTH_TOKEN);
  


 /*

  twilio.sendSms({
    to:'+447402084758', // Any number Twilio can deliver to
    from: '+12057373887', // A number you bought from Twilio and can use for outbound communication
    body: 'krystal mother.' // body of the SMS message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (!err) { // "err" is an error received during the request, if any
      // "responseData" is a JavaScript object containing data received from Twilio.
      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
      // http://www.twilio.com/docs/api/rest/sending-sms#example-1
      console.log(responseData.from); // outputs "+14506667788"
      console.log(responseData.body); // outputs "word to your mother."
    } else {
      console.log("there was a twilio error: " + JSON.stringify(err, null, 2) );
    }
});



twilio.messages.create({
    body: "Jenny please?! I love you <3",
    to: "+447402084758",
    from: "+12057373887",
    mediaUrl: "http://women.eecs.ucf.edu/wp-content/uploads/1456778_10201789792539380_1306409560_n-300x300.jpg"
}, function(err, message) {
  if (!err) {
    console.log("no error girl")
  }
  else{

    process.stdout.write( JSON.stringify(err, null, 2) );
  }
    
});*/

//testing call function 

/*twilio.on('incomingCall', function(call) {
        //Use the Call object to generate TwiML
        call.say("This is a test. Goodbye!");
    });
*/
/*
 twilio.makeCall("+447402084758", "+12057373887", function(err, call) {
        if(err) throw err;
        call.on('connected', function(status) {
            //Called when the caller picks up
            call.say('Welcome to Twilio!');
            call.say('Please let us know if we can help during your development.', {
                voice:'woman',
                language:'en-gb'
            });
        });
        call.on('ended', function(status, duration) {
            //Called when the call ends
        });
    });
 */
 /*
 twilio.makeCall({
    to:'+447402084758', // Any number Twilio can call
    from: '+12057373887', // A number you bought from Twilio and can use for outbound communication
    url: 'http://30393d47.ngrok.io/krystal.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call
  }, function(err, responseData) {
    //executed when the call has been initiated.
    
      if (!err) {

    console.log("yayy");
    console.log(responseData.from);
  }
  else{
      
      process.stdout.write( JSON.stringify(err, null, 2) );
  } // outputs "+14506667788"
  });
   */
}


