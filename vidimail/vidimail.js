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



if(Meteor.isClient){


  // This code only runs on the client
  Template.vidimail.body.helpers({
    tasks: function () {
      // Show newest tasks at the top
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.vidimail.body.events({
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

  Template.vidimail.body.events({
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
  

   
}


