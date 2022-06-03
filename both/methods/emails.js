import { Email } from 'meteor/email';
import SimpleSchema from 'simpl-schema';

const mailSchema = new SimpleSchema({
  mC : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
  oC : { type : String, max : 80 }, 
  msgC : { type : String, max : 1500 }
}, {check}).newContext();

Meteor.methods({
    envoiEmail(mail) {
	 	mailSchema.validate(mail);
	  	if (mailSchema.isValid()) {
	  		this.unblock();
		    Email.send({ 
		     	from : mail.mC,
		     	to : '<derniermarche@softi-media.com>',
		     	subject : mail.oC,  
		        text : mail.msgC       
		    });
		    return 'sent';
	  	}
	  	else { return mailSchema.validationErrors(); } 
    } 
});
