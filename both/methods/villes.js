import SimpleSchema from 'simpl-schema';

Meteor.methods({
	ajoutVille : function(v, aV){
		const villeSiteSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  ville : { type : String, max : 30 }, 
		  espaces : Array,
		  'espaces.$' : { type : String, max : 30 }, 
		  quartiers : Array,
		  'quartiers.$' : { type : String, max : 30 }
		}, {check}).newContext();	

		const aVilleSiteSchema = new SimpleSchema({
		  nSEspace : { type : String, max : 30, optional : true },
		  aSQuartier : { type : String, max : 30, optional : true },
		  aSVille : { type : String, max : 30, optional : true },
		  numAE : { type : Number, optional : true },
		  numAQ : { type : Number, optional : true }
		}, {check}).newContext();

		villeSiteSchema.validate(v);
		aVilleSiteSchema.validate(aV); 
	  	if (villeSiteSchema.isValid()) {
	  		Villes.insert(v);
	  		if (aV.aSVille) {		  		
		  		const aVille = Villes.findOne({ville: aV.aSVille});
		  		if ((aV.numAQ <= 1) && (v.ville != aV.aSVille)) { 
		  			Villes.update({_id : aVille._id}, { $pull : { espaces : aV.nSEspace }}); 
		  		}
		  		if (aV.numAE <= 1) { 
		  			Villes.update({_id : aVille._id}, { $pull : { quartiers : aV.aSQuartier }}); 
		  		}
		  		if (aVille.quartiers.length == 1) { Villes.remove({_id : aVille._id}); }
	  		}
		    return 'sent';
	  	}
	  	else { return villeSiteSchema.validationErrors(); }
	},

	majVille : function(v, nV){	
		const majSiteSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  ville : { type : String, max : 30, optional : true }, 
		  espaces : { type : Array, max : 30, optional : true },
		  'espaces.$' : { type : String, max : 30, optional : true }, 
		  quartiers : { type : Array, max : 30, optional : true },
		  'quartiers.$' : { type : String, max : 30, optional : true }
		}, {check}).newContext();

		const nVilleSiteSchema = new SimpleSchema({
		  nSQuartier : { type : String, max : 30 }, 
		  nSEspace : { type : String, max : 30 },
		  aSQuartier : { type : String, max : 30, optional : true },
		  aSVille : { type : String, max : 30, optional : true },
		  numAE : { type : Number, optional : true },
		  numAQ : { type : Number, optional : true },
		  numEQV : { type : Number, optional : true }
		}, {check}).newContext();

		majSiteSchema.validate(v);
		nVilleSiteSchema.validate(nV); 

	  	if (majSiteSchema.isValid() && nVilleSiteSchema.isValid()) {	
	  		if (nV.aSVille) {
	  			if (v.quartiers.includes(nV.nSQuartier)) {
		  			if (v.espaces.includes(nV.nSEspace) && (nV.numEQV == 1)) { return 'erreur'; }
		  			if (!v.espaces.includes(nV.nSEspace)) { Villes.update({_id : v._id}, { $push : { espaces: nV.nSEspace }}); }
		  		}
		  		else {
		  			if (v.espaces.includes(nV.nSEspace)) { Villes.update({_id : v._id}, { $push : { quartiers : nV.nSQuartier }}); }
		  			else {
		  				Villes.update({_id : v._id}, { $push : { quartiers : nV.nSQuartier }});
		  				Villes.update({_id : v._id}, { $push : { espaces: nV.nSEspace }});
		  			}
		  		}
		  		
		  		const aVille = Villes.findOne({ville: nV.aSVille});
		  		if ((nV.numAQ <= 1) && (v.ville != nV.aSVille)) { 
		  			Villes.update({_id : aVille._id}, { $pull : { espaces : nV.nSEspace }}); 
		  		}
		  		if (nV.numAE <= 1) { 
		  			Villes.update({_id : aVille._id}, { $pull : { quartiers : nV.aSQuartier }}); 
		  		}
		  		if (aVille.quartiers.length == 1) { Villes.remove({_id : aVille._id}); }
	  		} 
	  		else { 		
		  		if (v.quartiers == null || !v.quartiers.includes(nV.nSQuartier)) {
					Villes.update({_id : v._id}, { $push : { quartiers : nV.nSQuartier }});
				}
				if (v.espaces == null || !v.espaces.includes(nV.nSEspace)) {
					Villes.update({_id : v._id}, { $push : { espaces: nV.nSEspace }});
				}
			}
		    return 'sent';
	  	}
	  	else { return majSiteSchema.validationErrors(); }
	},

	suppEspVille : function(eV){	
		const suppEspVilleSchema = new SimpleSchema({
		  espVE : Array,
		  espVQ : Array,
		  'espVE.$' : Object,
		  'espVE.$.vil' : { type : String, max : 30 },
		  'espVE.$.esp' : { type : String, max : 30 }, 
		  'espVQ.$' : Object,
		  'espVQ.$.vil' : { type : String, max : 30 },
		  'espVQ.$.qtier' : { type : String, max : 30 },
		  'espVQ.$.numEspVQ' : Number
		}, {check}).newContext();

		suppEspVilleSchema.validate(eV);

	  	if (suppEspVilleSchema.isValid()) {
	  		eV.espVE.forEach(function(transaction){ 
				Villes.update({ ville : transaction.vil }, { $pull: { espaces : transaction.esp }});
			});
			eV.espVQ.forEach(function(transaction){ 
				if (transaction.numEspVQ == 1) { Villes.update({ ville : transaction.vil }, { $pull: { quartiers : transaction.qtier }}); }
			});
			const villes = Villes.find({ $or: [ {espaces:{ $eq: [] }}, {quartiers:{ $eq : [] }}]}).fetch();
			if (villes.length > 0) { 
				villes.forEach(function(transaction){
					Villes.remove({_id: transaction._id});
				});
			}
		    return 'OK';
	  	}
	  	else { return suppEspVilleSchema.validationErrors(); }
	},

	suppVilleSite : function(v){
		const suppVilleSiteSchema = new SimpleSchema({
		  id : { type : String, max : 25 },
		  ville : { type : String, max : 30 }, 
		  nomQuartier : { type : String, max : 30 },
		  nomEspace : { type : String, max : 30 },
		  numQuartiers : Number,
		  numEsp : Number
		}, {check}).newContext();	

		suppVilleSiteSchema.validate(v);
	  	if (suppVilleSiteSchema.isValid()) {
	  		if (v.numEsp == 1) {
				Villes.update({ _id : v.id }, { $pull: { espaces : v.nomEspace }});
			}
	  		if (v.numQuartiers == 1) {
				Villes.update({ _id : v.id }, { $pull: { quartiers : v.nomQuartier }});
			}
			if (Villes.findOne({ville : v.ville}).quartiers.length == 0) {
				Villes.remove({ _id : v.id });
			}
		    return 'OK';
	  	}
	  	else { return suppVilleSiteSchema.validationErrors(); }
	},

	modifNomEspVille : function(eV){
		const modifNomEspVilleSchema = new SimpleSchema({
		  aEsp : { type : String, max : 30 }, 
		  nEsp : { type : String, max : 30 }
		}, {check}).newContext();	

		modifNomEspVilleSchema.validate(eV);

		if (modifNomEspVilleSchema.isValid()) {
		    var v = Villes.find({espaces: eV.aEsp}).fetch();
		    if (v.length > 0) {
		        v.forEach(function(transaction){ 
	      		    Villes.update({_id : transaction._id}, { $pull : { espaces : eV.aEsp }}); 
	      		    Villes.update({_id : transaction._id}, { $push : { espaces: eV.nEsp }});
		        });
			}
	        return 'OK';
	    }
	    else { return modifNomEspVilleSchema.validationErrors(); }
	}

});