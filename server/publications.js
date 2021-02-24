import SimpleSchema from 'simpl-schema';

Meteor.publish('meilleuresPromosSub', function(){
    return Promotions.find({ promoRemise: { $gte: 35 }}, { fields: 
		{
		   	prixPromo: true,
		   	produitNom: true,
		   	produitPrix: true,
		   	produitTof: true,
		   	promoRemise: true } 
		});
});

Meteor.publish('lesVillesSub', function(){
    return Villes.find({}, { fields: { espaces: false } });
});		

Meteor.publish('lesEspacesSub', function(vil, qrtier){
	new SimpleSchema({
	    vil: { type : String, max : 30 },
	    qrtier: { type : String, max : 30 }
	}).validate({ vil, qrtier });
	
	return Sites.find({siteVille : vil, siteQuartier : qrtier, siteBlocked : 'NON'}, {fields : 
		{ 
			siteBlocked : false, 
			siteContact : false,
			siteDateCreation : false,
			siteLesNotes : false,
			siteMail : false,
			siteVotants : false }
	});
});

Meteor.publish('leSiteSub', function(id){
	new SimpleSchema({
	    id: { type : String, max : 25 }
	}).validate({ id });
	
	return Sites.find({_id : id}, {fields : 
		{ 
			siteBlocked : false, 
			siteContact : false,
			siteDateCreation : false,
			siteLesNotes : false,
			siteMail : false,
			siteVotants : false }
		});
});

Meteor.publish('lesSitesSub', function(){
	return Sites.find({}, {fields : 
		{ 
			siteBlocked : false, 
			siteContact : false,
			siteDateCreation : false,
			siteLesNotes : false,
			siteMail : false,
			siteVotants : false }
		});
});

Meteor.publish('tousLesEspacesSub', function(){ return Espaces.find(); });

Meteor.publish('tousLesSitesSub', function(){ return Sites.find(); });

Meteor.publish('toutesLesPromosSub', function(){ return Promotions.find(); });

Meteor.publish('toutesLesVillesesSub', function(){ return Villes.find(); });

Meteor.publish('lesImagesSub', function(){ return ImagesPromo.find().cursor; });
