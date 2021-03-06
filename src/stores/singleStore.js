var Reflux = require('reflux');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://readerkulinich.firebaseio.com/");

var Store = Reflux.createStore({

  getArticle: function(id){
      myFirebaseRef.child('articles').child(id).once("value", function(snapshot) { 
        this.trigger(snapshot.val());
     }.bind(this),function (errorObject) {
          console.log("The read failed: " + errorObject.code);
      });
  }
});

module.exports = Store;