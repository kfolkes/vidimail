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


Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

if (Meteor.isClient) {

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});

Template.myForm.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  }
});



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

  Template.vidimail.events({
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
/*
// Configure the Twilio client
  var ACCOUNT_SID = "AC05aea60b815f99cad88996a8b63d87ae";// SID tied to your Twilio account
  var AUTH_TOKEN = "5efadb1e45c24fc3e13302c0bfa60d4e";
  twilio = Twilio(ACCOUNT_SID, AUTH_TOKEN);
  


  var twilio_res =new Twilio.TwimlResponse();

 twilio_res.say('Welcome to Twilio!')
    .pause({ length:3 })
    .say('Please let us know if we can help during your development.', {
        voice:'woman',
        language:'en-gb'
    })
    .play('http://www.example.com/some_sound.mp3')
    .gather({
        action:'http://www.example.com/callFinished.php',
        finishOnKey:'*'
    }, function() {
        this.say('Press 1 for customer service')
            .say('Press 2 for British customer service', { language:'en-gb' })
            
    });*/
   
//console.log(twilio_res.toString());

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
/*
  twilio.makeCall({
    to:'+447402084758', // Any number Twilio can call
    from: '+12057373887', // A number you bought from Twilio and can use for outbound communication
    url: 'https://demo.twilio.com/welcome/sms/reply/' // A URL that produces an XML document (TwiML) which contains instructions for the call
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


