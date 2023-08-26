import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ExportsCollection } from "../../db/exports/ExportsCollection.js"




// INFORMATION FOR LOUIS : Tracker.autorun run a function now and rerun it later whenever its dependencies change, which is perfect for us to know when our data is ready to be displayed to the user

const IS_LOADING_STRING = "isLoading";
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
const getExportsFilter = () => {
  const user = getUser();
  const userFilter = user ? { userId: user._id } : {};
  return { userFilter };
}


// START exportsContainer
Template.exportsContainer.onCreated(function exportsContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('exports');
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  }),
  this.state.set('activeButton', 'exportFiles'); // Default active button
  this.state.set('exportFilesActive', true); // Default active button
  
});

Template.exportsContainer.helpers({

  exports() {
    const { userFilter } = getExportsFilter();
    if (!isUserLogged()) {
        return [];
      }
    return ExportsCollection.find( userFilter, {
        sort: { createdAt: -1 },
    }).fetch(); // sort the exports from the newest to the oldest
  },
  exportsCount() {
    return ExportsCollection.find().count();
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  },
  isActive(button) {
    const instance = Template.instance();
    return instance.state.get('activeButton') === button ? 'selected' : 'not-selected';
  },
  exportFilesIsActive(){
    const instance = Template.instance();
    return instance.state.get('exportFilesActive') ;
  }


  }),
  

  Template.exportsContainer.events({
    'click .user'() {
        Meteor.logout();
      },
    'click .export-buttons button'(event, instance) {
      const button = event.target.value;
      if(button=='exportFiles'){
        instance.state.set('exportFilesActive', true);
      }else{
        instance.state.set('exportFilesActive', false);
      }
    },
})

// END exportsContainer


// START form

Template.form.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('error', null); 
});


Template.form.helpers({
  error(){
      return Template.instance().state.get("error")
  }
})

Template.form.events({


"submit .export-form"(event, templateInstance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;

    templateInstance.state.set('error', null); 
    templateInstance.state.set('error_files_exist', []); 
    // Insert a task into the collection

    Meteor.call('exports.insert', title, (error) => {// INFORMATION FOR LOUIS: no need to pass the user in parameter, we have access to in in the backend with "this"
        if (error) {
            const errorMessage = error.message.replace('[', '').replace(']', ''); 
            templateInstance.state.set('error', errorMessage);           
        } else {
            target.title.value = '';
        }
    });
    

}
})

// END form

// START form_for_files
Template.form_for_files.helpers({
  selectedFileNames() {
    const instance = Template.instance();
    return instance.state.get("selectedFileNames") || null;
  },
  error(){
      return Template.instance().state.get("error")
  },
  error_files_exist(){
    return Template.instance().state.get("error_files_exist")
  }
})

Template.form_for_files.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('error', null); 
  this.state.set('error_files_exist', []); 
  this.state.set("selectedFileNames", null);
  // this.state.set('activeButton', 'exportFiles'); // Default active button

});

Template.form_for_files.events({

  // change #file refers to the change of the (html input) element with id=file
  "change #file"(event, instance) {
    const selectedFiles = event.target.files;
    const selectedFileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedFileNames.push(selectedFiles[i].name);
    }
    instance.state.set("selectedFileNames", selectedFileNames);
  },

  "click .export-files-submit-button"(event, instance){
    instance.state.set('error_files_exist', []);  
    instance.state.set('error', null); 
    let fileNames = instance.state.get("selectedFileNames")
    Meteor.call('exports.insert_list', fileNames, (error, result) => {// INFORMATION FOR LOUIS: no need to pass the user in parameter, we have access to in in the backend with "this"
    if (error) {
        const errorMessage = error.message.replace('[', '').replace(']', ''); 
        instance.state.set('error', errorMessage);           
    } else {
      if(result.length>0){
        instance.state.set('error_files_exist', result);           
      }
      instance.state.set("selectedFileNames", null);
    }
  });
  }

})



// END form_for_files




