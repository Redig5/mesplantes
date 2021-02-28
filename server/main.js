import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import { Email } from 'meteor/email';
import { Session } from 'meteor/session';
import { Check } from 'meteor/check';
import { FilesCollection } from 'meteor/ostrio:files';
import './publications.js';

Meteor.startup(function () {
  /*
  smtp = {
    username: 'postmaster@sandbox88acd4484e09457291a0914fab46d6bc.mailgun.org',
    password: 'c456ddb6249fb84ed7edd3f3e268b28a-4879ff27-dcb82954',
    server:   'smtp.mailgun.org',
    port: 587
  }
  */
  
  smtp = {
    username: 'derniermarche.com@gmail.com',
    password: 'dm.com2020',
    server:   'smtp.gmail.com',
    port: 465
  }
  
  /*
  smtp = {
    username: '3c912d99f95d8edd646030e884e1d2f7',
    password: 'e564905c1c850e00bdca338b0ca0e9fe',
    server:   'in-v3.mailjet.com',
    port: 587
  }
  */
  process.env.MAIL_URL = 'smtps://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Cloudinary.config({
  cloud_name: 'dmarchedotcom',
  api_key: '989953378497139',
  api_secret: 'UR2-lI-QEVqyNqEYrsQvZEycfz8'
});
