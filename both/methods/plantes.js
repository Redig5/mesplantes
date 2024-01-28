import SimpleSchema from 'simpl-schema';

Meteor.methods({
	creationPlante : function(plt){
		const creationPlanteSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  nomPlante : { type : String, max : 30 },
		  especePlante : { type : String, max : 30 },
		  frequenceArrosagePlante : { type : Number, min : 1, max : 365 },
		  qteEauArrosage : { type : Number, min : 1, max : 500 },
		  idTofPlante : { type : String, max : 25 },
		  urlTofPlante : { type : String, max : 130 },
		  dateAchatPlante : Date,
		  dateAchatPlanteTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  dateAchat : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  dateCreationPlante : Date,
		  dateCreationPlanteTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  dateCreation : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  dateDernierArrosagePlante : Date,
		  dateDernierArrosageTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  dateDernierArrosage : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  planteOwner : { type : String, optional : true, max : 25 }
		}, {check}).newContext();	
		creationPlanteSchema.validate(plt);
	  	if (creationPlanteSchema.isValid()) {
	  		Plantes.insert(plt);
		    return 'sent';
	  	}
	  	else { return creationPlanteSchema.validationErrors(); }
	},

	modifPlante : function(plt){
		const modifPlanteSchema = new SimpleSchema({
		  idPlante : { type : String, max : 25 },
		  nomPlante : { type : String, max : 30 },
		  especePlante : { type : String, max : 30 },
		  dateArrosagePlante : Date,
		  dateArrosageTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  dateArrosage : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  planteOwner : { type : String, optional : true, max : 25 }
		}, {check}).newContext();	

		modifPlanteSchema.validate(plt);
	  	if (modifPlanteSchema.isValid()) {
	  		Plantes.update({_id : plt.idPlante}, 
				{ $set : {
					dateDernierArrosagePlante : plt.dateArrosagePlante,
					dateDernierArrosageTime : plt.dateArrosageTime,
					dateDernierArrosage : plt.dateArrosage
				}
			});
		    return 'OK';
	  	}
	  	else { return modifPlanteSchema.validationErrors(); } 
	},
});