import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

T9n.setLanguage("fr");

AccountsTemplates.configure({
    confirmPassword: true, 
    defaultState: "signIn",     
    enablePasswordChange: true,     
    sendVerificationEmail: true,           
    redirectTimeout: 2000,                 

    showForgotPasswordLink: true,  
    showPlaceholders: true,   
    showResendVerificationEmailLink: true, 

    negativeValidation: true,    
    positiveValidation: true,    
    positiveFeedback: true,             
    showValidating: true
});

$.cloudinary.config({
  cloud_name: "dmarchedotcom"
});

var ecranWidth = window.innerWidth >= 992;
