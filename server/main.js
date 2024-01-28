import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import { Email } from 'meteor/email';
import { Session } from 'meteor/session';
import { Check } from 'meteor/check';
import { FilesCollection } from 'meteor/ostrio:files';
import './publications.js';

import SimpleSchema from 'simpl-schema';

/**/
Cloudinary.config({
  cloud_name: 'dmarchedotcom',
  api_key: '989953378497139',
  api_secret: 'UR2-lI-QEVqyNqEYrsQvZEycfz8'
});