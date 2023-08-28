
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';


// INFORMATION FOR LOUIS : Tracker.autorun run a function now and rerun it later whenever its dependencies change, which is perfect for us to know when our data is ready to be displayed to the user

// const IS_LOADING_STRING = "isLoading";
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();



Template.loginContainer.onCreated(function loginContainerOnCreated() {
    this.state = new ReactiveDict();
    // const handler = Meteor.subscribe('exports');
    // Tracker.autorun(() => {
    //     this.state.set(IS_LOADING_STRING, !handler.ready());
    // });
});




Template.loginContainer.helpers({
    isUserLogged() {
        return isUserLogged();
      },
    getUser() {
        return getUser();
    }
  });



// Template.loginContainer.events({
//     'click .user'() {
//         Meteor.logout();
//       },
    
      
// })

