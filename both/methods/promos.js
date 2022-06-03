import SimpleSchema from 'simpl-schema';

Meteor.methods({
	creationPromo : function(prm){
		const creationPromoSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  idPromotion : { type : String, max : 102 }, 
		  idSitePromo : { type : String, max : 25 }, 
		  typeDePromo : { type : String, allowedValues: ['dernierMarche', 'promotion'] },
		  rayonDePromo : { type : String, allowedValues: ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'] },
		  produitNom : { type : String, max : 40 },
		  // produitQte : { type : String, max : 40 },
		  idTofPromo : { type : String, max : 25 },
		  produitTof : { type : String, max : 130 },
		  produitPrix : { type : Number, min : 0, max : 1000000 },
		  prixPromo : { type : Number, min : 0, max : 1000000 },
		  // produitExpiration : Date,
		  // produitExp : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  promoRemise : { type : Number, min : 1, max : 100 },
		  promoExpiration : Date,
		  promoExpirationTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  promoDateExp : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  promoDetail : { type : String, max : 60 },
		  promoDateCreation : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
		}, {check}).newContext();	
		creationPromoSchema.validate(prm);
	  	if (creationPromoSchema.isValid()) {
	  		Promotions.insert(prm);
		    return 'sent';
	  	}
	  	else { return creationPromoSchema.validationErrors(); }
	},
	modifPromo : function(prm){
		const modifPromoSchema = new SimpleSchema({
		  _id : { type : String, optional : true, max : 25 },
		  idPromotion : { type : String, max : 102 }, 
		  idSitePromo : { type : String, max : 25 }, 
		  typeDePromo : { type : String, allowedValues: ['dernierMarche', 'promotion'] },
		  rayonDePromo : { type : String, allowedValues: ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'] },
		  produitNom : { type : String, max : 40 },
		  // produitQte : { type : String, max : 40 },
		  idTofPromo : { type : String, max : 25 },
		  produitTof : { type : String, max : 130 },
		  produitPrix : { type : Number, min : 0, max : 1000000 },
		  prixPromo : { type : Number, min : 0, max : 1000000 },
		  // produitExpiration : Date,
		  // produitExp : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  promoRemise : { type : Number, min : 1, max : 100 },
		  promoExpiration : Date,
		  promoExpirationTime : { type : Number, min : 0, max : 1000000000000000000000000000000000000000 },
		  promoDateExp : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  promoDetail : { type : String, max : 60 },
		  promoDateCreation : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
		  promoDateModification : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
		}, {check}).newContext();

		modifPromoSchema.validate(prm);
	  	if (modifPromoSchema.isValid()) {
	  		const iDP = Promotions.findOne({_id : prm._id});
	  		if ( iDP.rayonDePromo != prm.rayonDePromo) {	
				Promotions.update({_id : prm._id}, { $set : { rayonDePromo : prm.rayonDePromo } });
			}
			if (iDP.produitNom != prm.produitNom) {
				Promotions.update({_id : prm._id}, { $set : { produitNom : prm.produitNom } });
			}
			// if (iDP.produitQte != prm.produitQte) {
			// 	Promotions.update({_id : prm._id}, { $set : { produitQte : prm.produitQte } });
			// }
			if (iDP.produitPrix != prm.produitPrix) {
				Promotions.update({_id : prm._id}, { $set : { produitPrix : prm.produitPrix } });
			}
			// if (iDP.produitExpiration != prm.produitExpiration) {
			// 	Promotions.update({_id : prm._id}, 
			// 		{ $set : { 
			// 			produitExpiration : prm.produitExpiration,
			// 			produitExp : prm.produitExp } });
			// }
			if (iDP.promoRemise != prm.promoRemise) {
				Promotions.update({_id : prm._id}, 
					{ $set : { 
						promoRemise : prm.promoRemise,
						prixPromo : prm.prixPromo } });
			}
			if (iDP.promoExpiration != prm.promoExpiration) {
				Promotions.update({_id : prm._id}, 
					{ $set : { promoExpiration : prm.promoExpiration,
							   promoExpirationTime : prm.promoExpirationTime,
							   promoDateExp : prm.promoDateExp
					         } });
			}
			if (iDP.promoDetail != prm.promoDetail) {
				Promotions.update({_id : prm._id}, { $set : { promoDetail : prm.promoDetail } });
			}
			Promotions.update({_id : prm._id}, { $set : { promoDateModification : prm.promoDateModification } });
		    return 'OK';
	  	}
	  	else { return modifPromoSchema.validationErrors(); }
	},
	modifTofDePromo : function(prm){	
		const modifTofDePromoSchema = new SimpleSchema({
		  id : { type : String, max : 25 },
		  idTof : { type : String, max : 25 },
		  produitTof : { type : String, max : 130 }
		}, {check}).newContext();

		modifTofDePromoSchema.validate(prm);
	  	if (modifTofDePromoSchema.isValid()) {
	  		Promotions.update({_id : prm.id}, { $set : { idTofPromo : prm.idTof, produitTof : prm.produitTof } });
			return 'OK';
	  	}
	  	else { return modifTofDePromoSchema.validationErrors(); } 
	},
	suppPromo : function(prm){	
		const suppPromoSchema = new SimpleSchema({
		  id : { type : String, max : 25 }
		}, {check}).newContext();

		suppPromoSchema.validate(prm);
	  	if (suppPromoSchema.isValid()) {
	  		Promotions.remove({_id : prm.id});
			return 'OK';
	  	}
	  	else { return suppPromoSchema.validationErrors(); } 
	},
	suppLesPromosDuSite : function(prm){	
		const suppLesPromosDuSiteSchema = new SimpleSchema({
		  idSite : { type : String, max : 25 }
		}, {check}).newContext();

		suppLesPromosDuSiteSchema.validate(prm);
	  	if (suppLesPromosDuSiteSchema.isValid()) {
	  		const promos = Promotions.find({idSitePromo : prm.idSite}).fetch();
	  		if ((promos !== undefined) && (promos.length > 0)) {
		  		promos.forEach(function(transaction){ 
					Promotions.remove({_id : transaction._id});
			    });
		  	}
			return 'OK';
	  	}
	  	else { return suppLesPromosDuSiteSchema.validationErrors(); } 
	},
	suppLesPromosDesSites : function(ids){	
		const suppLesPromosDesSitesSchema = new SimpleSchema({
		  lesIdSites : Array,
	      'lesIdSites.$' : { type : String, max : 25 }
		}, {check}).newContext();

		suppLesPromosDesSitesSchema.validate(ids);
	  	if (suppLesPromosDesSitesSchema.isValid()) {
	  		var promos;
		  	ids.lesIdSites.forEach(function(i){	
		  		promos = Promotions.find({idSitePromo : i}).fetch();
		  		if ((promos !== undefined) && (promos.length > 0)) {
			  		promos.forEach(function(transaction){ 
						Promotions.remove({_id : transaction._id});
				    });
			  	}
			});
			return 'OK';
	  	}
	  	else { return suppLesPromosDesSitesSchema.validationErrors(); } 
	}

});