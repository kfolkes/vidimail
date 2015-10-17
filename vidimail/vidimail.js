Tasks = new Mongo.Collection("tasks");


if (Meteor.isClient) {

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

  Template.task.events({
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

}


