import SimpleSchema from 'simpl-schema';

Meteor.methods({
	creationSite : function(st){
    const creationSiteSchema = new SimpleSchema({
      _id : { type : String, optional : true, max : 25 },
      siteEspace : { type : String, max : 30 }, 
      siteQuartier : { type : String, max : 30 }, 
      siteVille : { type : String, max : 30 },
      siteContact : { type : Number, min : 600000000, max : 699999999 },
      siteMail : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      siteOuvFeries : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermFeries : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvLundi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermLundi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvMardi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermMardi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvMercredi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermMercredi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvJeudi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermJeudi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvVendredi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermVendredi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvSamedi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermSamedi : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteOuvDimanche : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteFermDimanche : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      siteEmplacement : { type : String, max : 500 },
      siteNote : { type : Number, min : 0, max : 5 },
      siteVotants : Array,
      'siteVotants.$': { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      siteLesNotes : Array,
      'siteLesNotes.$': Object,
      'siteLesNotes.$.mailClient': { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'siteLesNotes.$.noteClient': { type : Number, min : 0, max : 0 },
      'siteLesNotes.$.dateNote': Date,
      siteDateCreation : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      siteBlocked : { type : String, allowedValues: ['OUI', 'NON'], max : 3 }
    }, {check}).newContext();
		creationSiteSchema.validate(st);
  	if (creationSiteSchema.isValid()) {
  		Sites.insert(st);
	    return 'sent';
  	}
  	else { return creationSiteSchema.validationErrors(); }
	},

	modifNomEspSite : function(eNM){
    const modifNomEspSiteSchema = new SimpleSchema({
      _id : { type : String, optional : true, max : 25 },
      espaceNomModified : { type : String, max : 30 },
      espaceDteModif : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      lesIdSites : Array,
      'lesIdSites.$' : Object,
      'lesIdSites.$._id' : { type : String, max : 25 },    
      'lesIdSites.$.siteEspace' : { type : String, max : 30 }, 
      'lesIdSites.$.siteQuartier' : { type : String, max : 30 }, 
      'lesIdSites.$.siteVille' : { type : String, max : 30 },
      'lesIdSites.$.siteContact' : { type : Number, min : 600000000, max : 699999999 },
      'lesIdSites.$.siteMail' : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'lesIdSites.$.siteOuvFeries' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermFeries' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvLundi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermLundi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvMardi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermMardi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvMercredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermMercredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvJeudi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermJeudi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvVendredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermVendredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvSamedi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermSamedi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvDimanche' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermDimanche' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteEmplacement' : { type : String, max : 500 },
      'lesIdSites.$.sitePromos' : { type : Array, optional : true },
      'lesIdSites.$.sitePromos.$' : { type : Object, optional : true },
      'lesIdSites.$.sitePromos.$._id' : { type : String, optional : true, max : 25 },
      'lesIdSites.$.sitePromos.$.idPromotion' : { type : String, optional : true, max : 102 }, 
      'lesIdSites.$.sitePromos.$.idSitePromo' : { type : String, optional : true, max : 25 }, 
      'lesIdSites.$.sitePromos.$.typeDePromo' : { type : String, optional : true, allowedValues: ['dernierMarche', 'promotion'] },
      'lesIdSites.$.sitePromos.$.rayonDePromo' : { type : String, optional : true, allowedValues: ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'] },
      'lesIdSites.$.sitePromos.$.produitNom' : { type : String, optional : true, max : 40 },
      'lesIdSites.$.sitePromos.$.produitQte' : { type : String, optional : true, max : 40 },
      'lesIdSites.$.sitePromos.$.idTofPromo' : { type : String, optional : true, max : 25 },
      'lesIdSites.$.sitePromos.$.produitTof' : { type : String, optional : true, max : 130 },
      'lesIdSites.$.sitePromos.$.produitPrix' : { type : Number, optional : true, min : 0, max : 1000000 },
      'lesIdSites.$.sitePromos.$.prixPromo' : { type : Number, optional : true, min : 0, max : 1000000 },
      'lesIdSites.$.sitePromos.$.produitExpiration' : Date,
      'lesIdSites.$.sitePromos.$.promoRemise' : { type : Number, optional : true, min : 1, max : 100 },
      'lesIdSites.$.sitePromos.$.promoExpiration' : Date,
      'lesIdSites.$.sitePromos.$.promoDateExp' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.sitePromos.$.promoDetail' : { type : String, optional : true, max : 60 },
      'lesIdSites.$.sitePromos.$.promoDateCreation' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.sitePromos.$.promoDateModification' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteNote' : { type : Number, min : 0, max : 5 },
      'lesIdSites.$.siteVotants' : Array,
      'lesIdSites.$.siteVotants.$': { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'lesIdSites.$.siteLesNotes' : Array,
      'lesIdSites.$.siteLesNotes.$': Object,
      'lesIdSites.$.siteLesNotes.$.mailClient': { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'lesIdSites.$.siteLesNotes.$.noteClient': { type : Number, min : 0, max : 5 },
      'lesIdSites.$.siteLesNotes.$.dateNote': Date,
      'lesIdSites.$.siteDateCreation' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteDateModification' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteBlocked' : { type : String, allowedValues: ['OUI', 'NON'], max : 3 },
      'lesIdSites.$.siteDateBlocked' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteDateDeBlocked' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
    }, {check}).newContext();
    modifNomEspSiteSchema.validate(eNM);
    if (modifNomEspSiteSchema.isValid()) {
      eNM.lesIdSites.forEach(function(transaction){ 
        Sites.update({_id : transaction._id}, 
        { $set : {
          siteEspace : eNM.espaceNomModified,
          siteDateModification : eNM.espaceDteModif  }
        });
      });
      return 'OK';
    }
    else { return modifNomEspSiteSchema.validationErrors(); }
	},

  modifSite : function(sM){
    const modifSiteSchema = new SimpleSchema({
      _id : { type : String, optional : true, max : 25 },
      id : { type : String, max : 25 },
      siteModif : Array,
      'siteModif.$' : Object,
      'siteModif.$.nom' : { type : String, optional : true, max : 20 },
      'siteModif.$.siteQuartier' : { type : String, optional : true, max : 30 }, 
      'siteModif.$.siteVille' : { type : String, optional : true, max : 30 },
      'siteModif.$.siteContact' : { type : Number, optional : true, min : 600000000, max : 699999999 },
      'siteModif.$.siteMail' : { type : String, optional : true, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'siteModif.$.siteOuvFeries' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermFeries' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvLundi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermLundi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvMardi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermMardi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvMercredi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermMercredi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvJeudi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermJeudi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvVendredi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermVendredi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvSamedi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermSamedi' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteOuvDimanche' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteFermDimanche' : { type : String, optional : true, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'siteModif.$.siteEmplacement' : { type : String, optional : true, max : 500 },
      'siteModif.$.siteDateBlocked' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'siteModif.$.siteDateDeBlocked' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      siteDteModif : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 } 
    }, {check}).newContext();

    modifSiteSchema.validate(sM);
    if (modifSiteSchema.isValid()) {
      sM.siteModif.forEach(function(transaction){ 
        if (transaction.nom == 'siteQuartier') {
          Sites.update({_id : sM.id}, { $set : { siteQuartier : transaction.siteQuartier } });
        }
        else if (transaction.nom == 'siteVille') { 
          Sites.update({_id : sM.id}, { $set : { siteVille : transaction.siteVille } });
        }
        else if (transaction.nom == 'siteContact') {
          Sites.update({_id : sM.id}, { $set : { siteContact : transaction.siteContact } });
        }
        else if (transaction.nom == 'siteMail') {
          Sites.update({_id : sM.id}, { $set : { siteMail : transaction.siteMail } });
        }
        else if (transaction.nom == 'siteOuvFeries') {
          Sites.update({_id : sM.id}, { $set : { siteOuvFeries : transaction.siteOuvFeries } });
        }
        else if (transaction.nom == 'siteFermFeries') {
          Sites.update({_id : sM.id}, { $set : { siteFermFeries : transaction.siteFermFeries } });
        }
        else if (transaction.nom == 'siteOuvLundi') {
          Sites.update({_id : sM.id}, { $set : { siteOuvLundi : transaction.siteOuvLundi } });
        }
        else if (transaction.nom == 'siteFermLundi') {
          Sites.update({_id : sM.id}, { $set : { siteFermLundi : transaction.siteFermLundi } });
        }
        else if (transaction.nom == 'siteOuvMardi') {
          Sites.update({_id : sM.id}, { $set : { siteOuvMardi : transaction.siteOuvMardi } });
        }
        else if (transaction.nom == 'siteFermMardi') {
          Sites.update({_id : sM.id}, { $set : { siteFermMardi : transaction.siteFermMardi } });
        }
        else if (transaction.nom == 'siteOuvMercredi') {
          Sites.update({_id : sM.id}, { $set : { siteOuvMercredi : transaction.siteOuvMercredi } });
        }
        else if (transaction.nom == 'siteFermMercredi') {
          Sites.update({_id : sM.id}, { $set : { siteFermMercredi : transaction.siteFermMercredi } });
        }
        else if (transaction.nom == 'siteOuvJeudi') {
          Sites.update({_id : sM.id}, { $set : { siteOuvJeudi : transaction.siteOuvJeudi } });
        }
        else if (transaction.nom == 'siteFermJeudi') {
          Sites.update({_id : sM.id}, { $set : { siteFermJeudi : transaction.siteFermJeudi } });
        }
        else if (transaction.nom == 'siteOuvVendredi') {
          Sites.update({_id : sM.id}, { $set : { siteOuvVendredi : transaction.siteOuvVendredi } });
        }
        else if (transaction.nom == 'siteFermVendredi') {
          Sites.update({_id : sM.id}, { $set : { siteFermVendredi : transaction.siteFermVendredi } });
        }
        else if (transaction.nom == 'siteOuvSamedi') {
          Sites.update({_id : sM.id}, { $set : { siteOuvSamedi : transaction.siteOuvSamedi } });
        }
        else if (transaction.nom == 'siteFermSamedi') {
          Sites.update({_id : sM.id}, { $set : { siteFermSamedi : transaction.siteFermSamedi } });
        }
        else if (transaction.nom == 'siteOuvDimanche') {
          Sites.update({_id : sM.id}, { $set : { siteOuvDimanche : transaction.siteOuvDimanche } });
        }
        else if (transaction.nom == 'siteFermDimanche') {
          Sites.update({_id : sM.id}, { $set : { siteFermDimanche : transaction.siteFermDimanche } });
        }
        else if (transaction.nom == 'siteEmplacement') {
          Sites.update({_id : sM.id}, { $set : { siteEmplacement : transaction.siteEmplacement } });
        }
      });
      Sites.update({_id : sM.id}, { $set : { siteDateModification : sM.siteDteModif } });
      return 'OK';
    }
    else { return modifSiteSchema.validationErrors(); }
  },

  suppSite : function(s){
    const suppSiteSchema = new SimpleSchema({
      lesIdSites : Array,
      'lesIdSites.$' : Object,
      'lesIdSites.$._id' : { type : String, max : 25 },    
      'lesIdSites.$.siteEspace' : { type : String, max : 30 }, 
      'lesIdSites.$.siteQuartier' : { type : String, max : 30 }, 
      'lesIdSites.$.siteVille' : { type : String, max : 30 },
      'lesIdSites.$.siteContact' : { type : Number, min : 600000000, max : 699999999 },
      'lesIdSites.$.siteMail' : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'lesIdSites.$.siteOuvFeries' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermFeries' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvLundi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermLundi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvMardi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermMardi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvMercredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermMercredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvJeudi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermJeudi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvVendredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermVendredi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvSamedi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermSamedi' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteOuvDimanche' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteFermDimanche' : { type : String, regEx : /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, max : 5 },
      'lesIdSites.$.siteEmplacement' : { type : String, max : 500 },
      'lesIdSites.$.sitePromos' : { type : Array, optional : true },
      'lesIdSites.$.sitePromos.$' : { type : Object, optional : true },
      'lesIdSites.$.sitePromos.$._id' : { type : String, optional : true, max : 25 },
      'lesIdSites.$.sitePromos.$.idPromotion' : { type : String, optional : true, max : 102 }, 
      'lesIdSites.$.sitePromos.$.idSitePromo' : { type : String, optional : true, max : 25 }, 
      'lesIdSites.$.sitePromos.$.typeDePromo' : { type : String, optional : true, allowedValues: ['dernierMarche', 'promotion'] },
      'lesIdSites.$.sitePromos.$.rayonDePromo' : { type : String, optional : true, allowedValues: ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'] },
      'lesIdSites.$.sitePromos.$.produitNom' : { type : String, optional : true, max : 40 },
      'lesIdSites.$.sitePromos.$.produitQte' : { type : String, optional : true, max : 40 },
      'lesIdSites.$.sitePromos.$.idTofPromo' : { type : String, optional : true, max : 25 },
      'lesIdSites.$.sitePromos.$.produitTof' : { type : String, optional : true, max : 130 },
      'lesIdSites.$.sitePromos.$.produitPrix' : { type : Number, optional : true, min : 0, max : 1000000 },
      'lesIdSites.$.sitePromos.$.prixPromo' : { type : Number, optional : true, min : 0, max : 1000000 },
      'lesIdSites.$.sitePromos.$.produitExpiration' : Date,
      'lesIdSites.$.sitePromos.$.promoRemise' : { type : Number, optional : true, min : 1, max : 100 },
      'lesIdSites.$.sitePromos.$.promoExpiration' : Date,
      'lesIdSites.$.sitePromos.$.promoDateExp' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.sitePromos.$.promoDetail' : { type : String, optional : true, max : 60 },
      'lesIdSites.$.sitePromos.$.promoDateCreation' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.sitePromos.$.promoDateModification' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteNote' : { type : Number, min : 0, max : 5 },
      'lesIdSites.$.siteVotants' : Array,
      'lesIdSites.$.siteVotants.$': { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'lesIdSites.$.siteLesNotes' : Array,
      'lesIdSites.$.siteLesNotes.$': Object,
      'lesIdSites.$.siteLesNotes.$.mailClient': { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
      'lesIdSites.$.siteLesNotes.$.noteClient': { type : Number, min : 0, max : 0 },
      'lesIdSites.$.siteLesNotes.$.dateNote': { type : Date, optional : true },
      'lesIdSites.$.siteDateCreation' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteDateModification' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteBlocked' : { type : String, allowedValues: ['OUI', 'NON'], max : 3 },
      'lesIdSites.$.siteDateBlocked' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'lesIdSites.$.siteDateDeBlocked' : { type : String, optional : true, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
    }, {check}).newContext();

    suppSiteSchema.validate(s);
    if (suppSiteSchema.isValid()) {
      s.lesIdSites.forEach(function(transaction){ 
        Sites.remove({_id : transaction._id});
      });
      return 'OK';
    }
    else { return suppSiteSchema.validationErrors(); }
  },

  suppLeSite : function(leS){
    const suppLeSiteSchema = new SimpleSchema({
      id : { type : String, max : 25 }
    }, {check}).newContext();
    suppLeSiteSchema.validate(leS);
    if (suppLeSiteSchema.isValid()) {
      Sites.remove({_id : leS.id});
      return 'OK';
    }
    else { return suppLeSiteSchema.validationErrors(); }
  },

  modifBlockSite : function(s){ 
    const modifBlockSiteSchema = new SimpleSchema({
      id : { type : String, max : 25 }, 
      siteB : { type : String, allowedValues: ['OUI', 'NON'], max : 3 },
      dte : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
    }, {check}).newContext();

    modifBlockSiteSchema.validate(s);
      if (modifBlockSiteSchema.isValid()) {
        if (s.siteB == 'OUI') {
          Sites.update({_id : s.id}, { $set : {siteBlocked : s.siteB, siteDateBlocked : s.dte}});
        }
        else {
          Sites.update({_id : s.id}, { $set : {siteBlocked : s.siteB, siteDateDeBlocked : s.dte}});
        }
        return 'OK';
      }
      else { return modifBlockSiteSchema.validationErrors(); } 
  },

  ajoutPromoSite : function(pS){ 
    const ajoutPromoSiteSchema = new SimpleSchema({
      id : { type : String, max : 25 },
      newPromo : Object,
      'newPromo._id' : { type : String, optional : true, max : 25 },
      'newPromo.idPromotion' : { type : String, max : 102 }, 
      'newPromo.idSitePromo' : { type : String, max : 25 }, 
      'newPromo.typeDePromo' : { type : String, allowedValues: ['dernierMarche', 'promotion'] },
      'newPromo.rayonDePromo' : { type : String, allowedValues: ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'] },
      'newPromo.produitNom' : { type : String, max : 40 },
      'newPromo.produitQte' : { type : String, max : 40 },
      'newPromo.idTofPromo' : { type : String, max : 25 },
      'newPromo.produitTof' : { type : String, max : 130 },
      'newPromo.produitPrix' : { type : Number, min : 0, max : 1000000 },
      'newPromo.prixPromo' : { type : Number, min : 0, max : 1000000 },
      'newPromo.produitExpiration' : Date,
      'newPromo.promoRemise' : { type : Number, min : 1, max : 100 },
      'newPromo.promoExpiration' : Date,
      'newPromo.promoDateExp' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'newPromo.promoDetail' : { type : String, max : 60 },
      'newPromo.promoDateCreation' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
    }, {check}).newContext();

    ajoutPromoSiteSchema.validate(pS);
      if (ajoutPromoSiteSchema.isValid()) {
        Sites.update({_id : pS.id}, { $push : { sitePromos : pS.newPromo }});
        return 'OK';
      }
      else { return ajoutPromoSiteSchema.validationErrors(); } 
  },

  modifPromoSite : function(pS){ 
    const modifPromoSiteSchema = new SimpleSchema({
      idSite : { type : String, max : 25 },
      idPromo : { type : String, max : 102 },
      laPromo : Object,
      'laPromo._id' : { type : String, optional : true, max : 25 },
      'laPromo.idPromotion' : { type : String, max : 102 }, 
      'laPromo.idSitePromo' : { type : String, max : 25 }, 
      'laPromo.typeDePromo' : { type : String, allowedValues: ['dernierMarche', 'promotion'] },
      'laPromo.rayonDePromo' : { type : String, allowedValues: ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'] },
      'laPromo.produitNom' : { type : String, max : 40 },
      'laPromo.produitQte' : { type : String, max : 40 },
      'laPromo.idTofPromo' : { type : String, max : 25 },
      'laPromo.produitTof' : { type : String, max : 130 },
      'laPromo.produitPrix' : { type : Number, min : 0, max : 1000000 },
      'laPromo.prixPromo' : { type : Number, min : 0, max : 1000000 },
      'laPromo.produitExpiration' : Date,
      'laPromo.promoRemise' : { type : Number, min : 1, max : 100 },
      'laPromo.promoExpiration' : Date,
      'laPromo.promoDateExp' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'laPromo.promoDetail' : { type : String, max : 60 },
      'laPromo.promoDateCreation' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 },
      'laPromo.promoDateModification' : { type : String, regEx : /^(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/, max : 10 }
    }, {check}).newContext();

    modifPromoSiteSchema.validate(pS);
      if (modifPromoSiteSchema.isValid()) {
        Sites.update({ _id: pS.idSite}, { $pull: { sitePromos : { idPromotion : pS.idPromo }}});
        Sites.update({_id : pS.idSite}, { $push : { sitePromos : pS.laPromo }});
        return 'OK';
      }
      else { return modifPromoSiteSchema.validationErrors(); } 
  },

  suppPromoSite : function(pS){ 
    const suppPromoSiteSchema = new SimpleSchema({
      idSite : { type : String, max : 25 },
      idPromoSite : { type : String, max : 102 }
    }, {check}).newContext();

    suppPromoSiteSchema.validate(pS);
      if (suppPromoSiteSchema.isValid()) {
        Sites.update({ _id : pS.idSite }, 
              { $pull: { sitePromos : { idPromotion : pS.idPromoSite }}});
        return 'OK';
      }
      else { return suppPromoSiteSchema.validationErrors(); } 
  },

  noteSite : function(n){ 
    const noteSiteSchema = new SimpleSchema({
      id : { type : String, max : 25 },
      mail : { type : String, regEx : /^[\w._-]+@([\w._-]+\.)+[\w._-]+$/, max : 60 },
    }, {check}).newContext();

    noteSiteSchema.validate(n);
      if (noteSiteSchema.isValid()) {
        var si = Sites.findOne({_id: n.id});
        if (si.siteVotants.includes(n.mail)) { return 'OK'; }
        else { return 'KO'; }
      }
      else { return noteSiteSchema.validationErrors(); } 
  }
});