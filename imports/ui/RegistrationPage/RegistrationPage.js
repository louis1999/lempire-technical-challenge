import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


// const IS_LOADING_STRING = "isLoading";
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

import './RegistrationPage.html';
import './RegistrationPage.css';

Template.registration.onCreated(function registrationContainerOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('error', null); 
  });

Template.registrationContainer.helpers({
    isUserLogged() {
        return isUserLogged();
      },
    getUser() {
        return getUser();
    }
  });

Template.registration.helpers({
    error(){
        return Template.instance().state.get("error")
    }
})


Template.registration.events({
    'submit .registration-form'(event, templateInstance){
        templateInstance.state.set('error', null); 

        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const password_confirmation = event.target.password_confirmation.value;

         // Check if password length is at least 4 characters
        if (password.length < 4) {
            templateInstance.state.set('error', "Password must be at least 4 characters long."); 
            return;
        }
    
        // Check if password and confirmation match
        if (password !== password_confirmation) {
            templateInstance.state.set('error', "Password and confirmation do not match."); 
            return;
        }

        // no need to check if username is already used, Meteor Accounts.createUser already checks
      
        Accounts.createUser({
            username: username,
            password: password
        }, function(error) {
        if (error) {
            templateInstance.state.set('error', error.reason); 
            // console.log("Sign-up error:", error.reason);
        } else {
            FlowRouter.go('/exports'); // Redirect to profile after successful sign-up
        }
        });
    }
})

