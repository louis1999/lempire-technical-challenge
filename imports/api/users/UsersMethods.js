


import { check } from 'meteor/check';


// Accounts/users collection is managed by meteorjs

Meteor.methods({
    'users.insert'(user){
        // TODO check if username is unique


        if(user.password.length>=4){
            if(user.password==user.password_confirmation){
                //SECURITY: Accounts.createUser function automatically takes care of hashing the password 
                Accounts.createUser({
                    username: user.username,
                    password: user.password,
                });
                return true;
                
            }else{
                throw new Meteor.Error('Password confirmation not equal to password.');
            }
        }else{
            throw new Meteor.Error('Password has to be at least four letters.');
        }

    },

    'users.authenticate'(user){

    }
  
})