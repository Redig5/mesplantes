import SimpleSchema from 'simpl-schema';

Meteor.methods({
	arrosage : function(arr){
		const arrosageSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  idPlante : { type : String, max : 25 },
		  nomPlante : { type : String, max : 30 },
		  especePlante : { type : String, max : 30 },
		  dateArrosagePlante : Date,
		  dateArrosageTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  dateArrosage : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  planteOwner : { type : String, optional : true, max : 25 }
		}, {check}).newContext();	
		arrosageSchema.validate(arr);
	  	if (arrosageSchema.isValid()) {
	  		Arrosages.insert(arr);
		    return 'OK';
	  	}
	  	else { return arrosageSchema.validationErrors(); }
	},
});