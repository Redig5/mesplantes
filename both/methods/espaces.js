import SimpleSchema from 'simpl-schema';

Meteor.methods({
	creationEspace : function(esp){	
		const creationEspaceSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  espaceNom : { type : String, max : 30 }, 
		  espaceVille : { type : String, max : 30 }, 
		  espaceContact : { type : Number, min : 600000000, max : 699999999 },  
		  espaceMail : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 }, 
		  espaceDateCreation : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  espaceBlocked : { type : String, allowedValues: ['OUI', 'NON'], max : 3 },
		  espaceDateBlocked : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10, optional : true },
		  espaceDateDeblocked : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10, optional : true } 
		}, {check}).newContext();

		creationEspaceSchema.validate(esp);
	  	if (creationEspaceSchema.isValid()) {
	  		Espaces.insert(esp);
		    return 'sent';
	  	}
	  	else { return creationEspaceSchema.validationErrors(); } 
	},

	modifEspace : function(esp){
		const modifEspaceSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  id : { type : String, max : 25 },
		  espM : Object,
		  'espM.espNomM' : { type : String, max : 30 }, 
		  'espM.espVilleM' : { type : String, max : 30 }, 
		  'espM.espContactM' : { type : Number, min : 600000000, max : 699999999 },  
		  'espM.espMailM' : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 }, 
		  espDate : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
		}, {check}).newContext();	

		modifEspaceSchema.validate(esp);
	  	if (modifEspaceSchema.isValid()) {
	  		Espaces.update({_id : esp.id}, 
				{ $set : {
					espaceNom : esp.espM.espNomM,
					espaceVille : esp.espM.espVilleM,
					espaceContact : esp.espM.espContactM, 
					espaceMail : esp.espM.espMailM,
					espaceDateModification : esp.espDate 
				}
			});
		    return 'OK';
	  	}
	  	else { return modifEspaceSchema.validationErrors(); } 
	},

	suppEspace : function(espId){
		const suppEspaceSchema = new SimpleSchema({
		  id : { type : String, max : 25 }
		}, {check}).newContext();	

		suppEspaceSchema.validate(espId);
	  	if (suppEspaceSchema.isValid()) {
	  		Espaces.remove({_id : espId.id});
		    return 'OK';
	  	}
	  	else { return suppEspaceSchema.validationErrors(); } 
	},

	modifBlockEspace : function(esp){	
		const modifBlockEspaceSchema = new SimpleSchema({
		  id : { type : String, max : 25 }, 
		  espB : { type : String, allowedValues: ['OUI', 'NON'], max : 3 },
		  dte : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
		}, {check}).newContext();

		modifBlockEspaceSchema.validate(esp);
	  	if (modifBlockEspaceSchema.isValid()) {
	  		if (esp.espB == 'OUI') {
	  			Espaces.update({_id : esp.id}, { $set : {espaceBlocked : esp.espB, espaceDateBlocked : esp.dte}});
		    }
		    else {
		    	Espaces.update({_id : esp.id}, { $set : {espaceBlocked : esp.espB, espaceDateDeBlocked : esp.dte}});
		    }
		    return 'OK';
	  	}
	  	else { return modifBlockEspaceSchema.validationErrors(); } 
	},

	suppUsersSitesEspace : function(s){
	    const suppUsersSitesEspaceSchema = new SimpleSchema({
	      	lesIdSites : Array,
	        'lesIdSites.$' : { type : String, max : 25 }
	    }, {check}).newContext();

	    suppUsersSitesEspaceSchema.validate(s);
	    if (suppUsersSitesEspaceSchema.isValid()) {
	    	var leSite;
	      	s.lesIdSites.forEach(function(transaction){ 
	        	leSite = Sites.findOne({_id : transaction});
	        	if (leSite.siteUser !== undefined) { Meteor.users.remove({_id : leSite.siteUser}); }
	        	if (leSite.siteUserTwo !== undefined) { Meteor.users.remove({_id : leSite.siteUserTwo}); }
	        });
	        return 'OK';
	    }
	    else { return suppUsersSitesEspaceSchema.validationErrors(); }
	}
});