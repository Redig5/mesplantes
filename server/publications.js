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
Meteor.publish('toutesLesPromosSub', function(){ 
	if (this.userId) { return Promotions.find(); } 
    else { this.ready(); }
});
		Meteor.publish('toutesLesPromos_SiteDetailSub', function(id){ 
			if (this.userId && (id !== undefined)) { 
				new SimpleSchema({
				    id: { type : String, max : 25 }
				}).validate({ id });
				return Promotions.find({idSitePromo: id}); } 
		    else { this.ready(); }
		});

Meteor.publish('lesVillesSub', function(){
    return Villes.find({}, { fields: { espaces: false } });
});		

Meteor.publish('mySite', function(){ 
	if (this.userId) { return Sites.find({siteUser : this.userId}, {fields: 
		{siteVotants: false, siteDateSuppPromo: false, siteInizio : false}}); }
    else { this.ready(); }
});

Meteor.publish('mySiteTwo', function(){ 
	if (this.userId) { return Sites.find({siteUserTwo : this.userId}, {fields: 
		{siteVotants: false, siteDateSuppPromo: false, siteInizio:false}}); }
    else { this.ready(); }
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
			siteMailTwo : false,
			siteVotants : false,
			siteDateDeBlocked : false,
			siteEmplacement : false,
			siteUser : false,
			siteUserTwo : false,
			siteNote : false,
			sitePromos : false,
			siteDateSuppPromo: false,
			siteInizio : false,
			siteDateBlocked : false }
	});
});
Meteor.publish('tousLesEspacesSub', function(){ 
	if (this.userId) {
		const nbreSites = Sites.find({siteUser : this.userId}).count();
		if (nbreSites == 0) { return Espaces.find(); } 
		else { this.ready(); }
	} 
    else { this.ready(); }
});
		Meteor.publish('tousLesEspaces_EspacesDispSub', function(){ 
			if (this.userId) {
				const nbreSites = Sites.find({siteUser : this.userId}).count();
				if (nbreSites == 0) { return Espaces.find({}, {fields: 
										{
											espaceBlocked: false,
											espaceContact: false,
											espaceDateBlocked: false,
											espaceDateDeBlocked: false,
											espaceMail: false }
										}); 
									} 
				else { this.ready(); }
			} 
		    else { this.ready(); }
		});

Meteor.publish('leSiteSub', function(id){
	if (id !== undefined) {
		new SimpleSchema({
		    id: { type : String, max : 25 }
		}).validate({ id });
		return Sites.find({_id : id}, {fields : 
			{ 
				siteBlocked : false, 
				siteContact : false,
				siteDateCreation : false,
				siteUser : false,
				siteUserTwo : false,
				siteLesNotes : false,
				siteMail : false,
				siteMailTwo : false,
				siteVotants : false,
				siteDateSuppPromo: false,
				siteDateDeBlocked : false,
				siteInizio : false,
				siteDateBlocked : false }
			});
	}
	else { this.ready(); }
});
		Meteor.publish('leSite_DetailSub', function(id){
			if (id !== undefined) {
				new SimpleSchema({
				    id: { type : String, max : 25 }
				}).validate({ id });
				if (this.userId) {
					const usr = Meteor.users.findOne({_id: this.userId});
					if ((usr.profile == 'user') || (usr.profile == 'userApp')) { 
						return Sites.find({_id : id}, {fields : { siteVotants: false }}); 
					}
					else { this.ready(); }
				} 
			    else {
			    	return Sites.find({_id : id}, {fields : 
					{ 
						siteBlocked : false, 
						siteContact : false,
						siteDateCreation : false,
						siteUser : false,
						siteUserTwo : false,
						siteLesNotes : false,
						siteMail : false,
						siteMailTwo : false,
						siteVotants : false,
						siteDateSuppPromo: false,
						siteInizio : false,
						siteDateDeBlocked : false,
						siteDateBlocked : false }
					});
			    }
			}
			else { this.ready(); }
		});

Meteor.publish('lesSitesSub', function(){
	if (this.userId) {
		return Sites.find({}, {fields : 
		{ 
			siteBlocked : false, 
			siteContact : false,
			siteDateCreation : false,
			siteUser : false,
			siteUserTwo : false,
			siteLesNotes : false,
			siteMail : false,
			siteMailTwo : false,
			siteInizio : false,
			siteVotants : false }
		});
	}
	else { this.ready(); }
});
Meteor.publish('tousLesSitesSub', function(){ 
	if (this.userId) {
		const nbreSites = Sites.find({siteUser : this.userId}).count();
		if (nbreSites == 0) { return Sites.find({}, {fields: 
			{siteVotants: false, siteDateSuppPromo: false, siteInizio: false}}); } 
		else { this.ready(); }
	}
    else { this.ready(); }
});
		Meteor.publish('tousLesSites_EspacesDispSub', function(){ 
			if (this.userId) {
				const usr = Meteor.users.findOne({_id: this.userId});
				if ((usr.profile == 'user') || (usr.profile == 'userApp')) { return Sites.find({}, {fields : 
					{ siteEspace : true, siteQuartier : true }}); }
				else { this.ready(); }
			} 
		    else { this.ready(); }
		});

Meteor.publish('toutesLesVillesSub', function(){ 
	if (this.userId) { return Villes.find(); } 
    else { this.ready(); }
});
		Meteor.publish('toutesLesVilles_EspacesDispSub', function(){ 
			if (this.userId) {
				const usr = Meteor.users.findOne({_id: this.userId});
				if (usr.profile == 'userApp') { return Villes.find({}, {fields : { espaces : true }}); }
				else { this.ready(); }
			} 
		    else { this.ready(); }
		});

Meteor.publish('lesImagesSub', function(){ return ImagesPromo.find().cursor; });

Meteor.publish('userData', function () {
  	if (this.userId) { return Meteor.users.find({}, {fields : { emails : true, profile : true }}); } 
    else { this.ready(); }
});

Meteor.publish('utilisateurData', function () {
  	if (this.userId) { return Meteor.users.find({profile : { $nin: ['client'] }}, {fields : { emails : true, profile : true }}); } 
    else { this.ready(); }
});