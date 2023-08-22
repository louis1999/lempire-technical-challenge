import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';



import './Login.html';
import './Login.css';





Template.login.events({

  'submit .login-form'(event) {
    event.preventDefault();

    const target = event.target;

    const username = target.username.value;
    const password = target.password.value;
    Meteor.loginWithPassword(username, password);
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        console.log("Login error:", error.reason);
      } else {
        FlowRouter.go('/exports'); 
      }
    });
  }

});