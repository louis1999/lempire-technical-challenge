import { Template } from 'meteor/templating';



const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();




Template.navbarLayout.helpers({

    isUserLogged() {
        return isUserLogged();
      },
    getUser() {
        return getUser();
    },
  });

Template.navbarLayout.events({
    'click .user'() {
        Meteor.logout();
      },
})