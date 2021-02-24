import SimpleSchema from 'simpl-schema';

Meteor.methods({
	majImagePromo : function(imgF){	
		const modifImagePromoSchema = new SimpleSchema({
		  _id : { type : String, max : 25, optional : true },
		  idImg : { type : String, max : 25 },
		  rUrl : { type : String, max : 130 },
		  uploaded : { type : String, allowedValues: ['OUI', 'NON'], max : 3, optional : true }
		}, {check}).newContext();

		modifImagePromoSchema.validate(imgF);
	  	if (modifImagePromoSchema.isValid()) {
	  		ImagesPromo.update({_id : imgF.idImg}, 
			{ $set : { urlImage : imgF.rUrl, uploaded : 'OUI' }});
			return 'OK';
	  	}
	  	else { return modifImagePromoSchema.validationErrors(); } 
	},

	suppImagePromo : function(img){	
		const suppImagePromoSchema = new SimpleSchema({
		  id : { type : String, max : 25 }
		}, {check}).newContext();

		suppImagePromoSchema.validate(img);
	  	if (suppImagePromoSchema.isValid()) {
	  		ImagesPromo.remove({_id : img.id});
			return 'OK';
	  	}
	  	else { return suppImagePromoSchema.validationErrors(); } 
	}
});