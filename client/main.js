import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout'


// IMPORTANT : IMPORT THE TEMPLATES HERE OTHERWISE THE ROUTES WON'T WORK
import '../imports/ui/HomePage/HomePage.html'
import '../imports/ui/HomePage/HomePage.css'
import '../imports/ui/HomePage/HomePage.js'
import '../imports/ui/ExportsPage/ExportsPage.html'
import '../imports/ui/ExportsPage/ExportsPage.js'
import '../imports/ui/ExportsPage/ExportsPage.css'
import '../imports/ui/ExportsPage/Export/Export.html'
import '../imports/ui/ExportsPage/Export/Export.js'
import '../imports/ui/ExportsPage/Export/Export.css'
import '../imports/ui/LoginPage/LoginPage.html'
import '../imports/ui/RegistrationPage/RegistrationPage.html'
import '../imports/ui/RegistrationPage/RegistrationPage.css'
import '../imports/ui/RegistrationPage/RegistrationPage.js'
import '../imports/ui/LoginPage/LoginPage.css'
import '../imports/ui/LoginPage/LoginPage.js'
import '../imports/ui/LoginPage/Login/Login.html'
import '../imports/ui/LoginPage/Login/Login.css'
import '../imports/ui/LoginPage/Login/Login.js'
import '../imports/ui/Layout/MainLayout.html'
// import '../imports/ui/Layout/MainLayout.js'
import '../imports/ui/Layout/Navbar/Navbar.html'
import '../imports/ui/Layout/Navbar/Navbar.css'
import '../imports/ui/Layout/Navbar/Navbar.js'
// if we want to display App.html
// import '../imports/ui/App.js';



FlowRouter.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('mainLayout', {
      navbar: 'navbarLayout', 
      mainContent: 'mainContainer' 
    });
  }
});

FlowRouter.route('/exports', {
  name: 'exports',
  action() {
    BlazeLayout.render('mainLayout', {
      navbar: 'navbarLayout',
      mainContent: 'exportsContainer'
    });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('mainLayout', {
      navbar: 'navbarLayout',
      mainContent: 'loginContainer'
    });
  }
});

FlowRouter.route('/registration', {
  name: 'registration',
  action() {
    BlazeLayout.render('mainLayout', {
      navbar: 'navbarLayout',
      mainContent: 'registrationContainer'
    });
  }
});




// FlowRouter.route('/', {
//     name: 'index',
//     action() {
//       BlazeLayout.render('mainContainer', {});
//     }
// });

// FlowRouter.route('/exports', {
//     name: 'exports',
//     action() {
//       BlazeLayout.render('exportsContainer', {});
//     }
// });

// FlowRouter.route('/login', {
//     name: 'login',
//     action() {
//       BlazeLayout.render('loginContainer', {});
//     }
// });







FlowRouter.route('*', {
    action() {
        console.log("not found")
      // Show 404 error page using Blaze
     // TODO
    }
  });