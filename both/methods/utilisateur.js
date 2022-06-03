import SimpleSchema from 'simpl-schema';
//    import { Roles } from 'meteor/alanning:roles';
import { Check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
  creationUser : function(usr){ 
    const creationUserSchema = new SimpleSchema({
      m : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 }, 
      p : { type : String, max : 30 },
      typeUser : { type : String, allowedValues: ['c','u'], max : 2 }
    }, {check}).newContext();

    creationUserSchema.validate(usr);
    if (creationUserSchema.isValid()) {
        var id = Accounts.createUser({
          email: usr.m,
          password: usr.p,
          profile: usr.typeUser == 'c' ? 'client' : 'user'   
        });
      return id;
    }
    else { return creationUserSchema.validationErrors(); } 
  },

  supprimerUser : function(usr){ 
    const supprimerUserSchema = new SimpleSchema({
      id : { type : String, max : 18 },
      profileUser : { type : String, max: 10 }
    }, {check}).newContext();

    supprimerUserSchema.validate(usr);
    if (supprimerUserSchema.isValid() && (usr.profileUser != 'userApp')) {
      Meteor.users.remove({_id : usr.id});
      return 'OK';
    }
    else { return supprimerUserSchema.validationErrors(); } 
  },

  bloquerUser : function(usr){ 
    const bloquerUserSchema = new SimpleSchema({
      idUser : { type : String, max : 18 },
      profileUser : { type : String, allowedValues: ['client','user','userApp'] }
    }, {check}).newContext();

    bloquerUserSchema.validate(usr);
    if (bloquerUserSchema.isValid()) {
      if (usr.profileUser == 'client') { Meteor.users.update({_id : usr.idUser}, { $set : {profile : 'cBlock'}}); }
      else if (usr.profileUser == 'user') { Meteor.users.update({_id : usr.idUser}, { $set : {profile : 'uBlock'}}); }
      else if ((usr.profileUser == 'userApp') && (Meteor.users.find({profile:'userApp'}).count() >= 2)) { Meteor.users.update({_id : usr.idUser}, { $set : {profile : 'uaBlock'}}); }
      return 'OK';
    }
    else { return bloquerUserSchema.validationErrors(); } 
  },

  debloquerUser : function(usr){ 
    const debloquerUserSchema = new SimpleSchema({
      idUser : { type : String, max : 18 },
      profileUser : { type : String, allowedValues: ['cBlock','uBlock','uaBlock'] }
    }, {check}).newContext();

    debloquerUserSchema.validate(usr);
    if (debloquerUserSchema.isValid()) {
      if (usr.profileUser == 'cBlock') { Meteor.users.update({_id : usr.idUser}, { $set : {profile : 'client'}}); }
      else if (usr.profileUser == 'uBlock') { Meteor.users.update({_id : usr.idUser}, { $set : {profile : 'user'}}); }
      else if (usr.profileUser == 'uaBlock') { Meteor.users.update({_id : usr.idUser}, { $set : {profile : 'userApp'}}); }
      return 'OK';
    }
    else { return debloquerUserSchema.validationErrors(); } 
  },

  // forgotPass : function(usr){ 
  //   const forgotPassSchema = new SimpleSchema({
  //     fPM : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 }
  //   }, {check}).newContext();

  //   forgotPassSchema.validate(usr);
  //   if (forgotPassSchema.isValid()) {
  //     Accounts.forgotPassword(usr.fPM);
  //     Accounts.sendResetPasswordEmail(Meteor.userId, usr.fPM);
  //     return 'OK';
  //   }
  //   else { return forgotPassSchema.validationErrors(); } 
  // },
});