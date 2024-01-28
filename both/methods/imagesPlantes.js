import SimpleSchema from 'simpl-schema';

Meteor.methods({
	majImagePlante : function(imgF){	
		const modifImagePlanteSchema = new SimpleSchema({
		  _id : { type : String, max : 25, optional : true },
		  idImg : { type : String, max : 25 },
		  rUrl : { type : String, max : 130 },
		  uploaded : { type : String, allowedValues: ['OUI', 'NON'], max : 3, optional : true }
		}, {check}).newContext();

		modifImagePlanteSchema.validate(imgF);
	  	if (modifImagePlanteSchema.isValid()) {
	  		ImagesPlantes.update({_id : imgF.idImg}, 
			{ $set : { urlImage : imgF.rUrl, uploaded : 'OUI' }});
			return 'OK';
	  	}
	  	else { return modifImagePlanteSchema.validationErrors(); } 
	},

	suppImagePlante : function(img){	
		const suppImagePlanteSchema = new SimpleSchema({
		  id : { type : String, max : 25 }
		}, {check}).newContext();

		suppImagePlanteSchema.validate(img);
	  	if (suppImagePlanteSchema.isValid()) {
	  		ImagesPlantes.remove({_id : img.id});
			return 'OK';
	  	}
	  	else { return suppImagePlanteSchema.validationErrors(); } 
	}
});