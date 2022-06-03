Router.configure({
	layoutTemplate : 'tmpltePrincipal',
	notFoundTemplate: 'tmplteNotExists',
    noRoutesTemplate: 'tmplteNotExists'
});

Router.map(function(){
	this.route('tmpltePageAccueil', { path : '/',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
			Session.set('villePromoChoisie', '');
			Session.set('quartierPromoChoisie', '');
			Session.set('espacePromoChoisie', '');
            this.next();
        }
	});

	this.route('tmpltePageOffres', { path : '/offres',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
			Session.set('villePromoChoisie', '');
			Session.set('quartierPromoChoisie', '');
			Session.set('espacePromoChoisie', '');
			var comeoutCarousel = Session.get('cmtCarousel');
			var comeoutPaciIntroAccueil = Session.get('cmtPaciIntroAccueil');
			var comeoutPaciIntroAccueil2 = Session.get('cmtPaciIntroAccueil2');
			var comeoutIntroOffres = Session.get('cmtIntroOffres');
			var comeoutIntroOffres2 = Session.get('cmtIntroOffres2');
			var comeoutOffres = Session.get('cmtOffres');
			var comeoutOffres2 = Session.get('cmtOffres2');
			if (comeoutCarousel != '') {
				clearInterval(comeoutCarousel);
			}
			if (comeoutPaciIntroAccueil != '') {
				clearInterval(comeoutPaciIntroAccueil);
			}
			if (comeoutPaciIntroAccueil2 != '') {
				clearInterval(comeoutPaciIntroAccueil2);
			}
			if (comeoutIntroOffres != '') {
				clearInterval(comeoutIntroOffres);
			}
			if (comeoutIntroOffres2 != '') {
				clearInterval(comeoutIntroOffres2);
			}
			if (comeoutOffres != '') {
				clearInterval(comeoutOffres);
			}
			if (comeoutOffres2 != '') {
				clearInterval(comeoutOffres2);
			}
            this.next();
        }
	});

	this.route('/offres/:_id', function () {
		const handle = Meteor.subscribe('leSiteSub', this.params._id);
		const leSiteDesOffres = Sites.findOne({_id : this.params._id});
    	if (leSiteDesOffres !== undefined) {
    		Session.set('siteOffres', this.params._id);
    		if (handle.ready()) {
		    	this.render('tmpltePageOffresSites', {
				    data: function () { return leSiteDesOffres; }
				});
			}
    	}
	});

	this.route('tmpltePageAPropos', { path : '/apropos',
		onBeforeAction:function(pause){
            $('body, html').animate({
				scrollTop : 0
			}, 0);
			Session.set('villePromoChoisie', '');
			Session.set('quartierPromoChoisie', '');
			Session.set('espacePromoChoisie', '');
            this.next();
        }
	});

	this.route('tmpltePageContact', { path : '/contact',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
			Session.set('villePromoChoisie', '');
			Session.set('quartierPromoChoisie', '');
			Session.set('espacePromoChoisie', '');
            this.next();
        }
	});

	this.route('tmpltePageEspaces', { path : '/authentification/espaces',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('tmpltePageSites', { path : '/authentification/sites',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('tmpltePageUsers', { path : '/authentification/utilisateurs',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('/authentification/sites/:_id', function () {
		const handle = Meteor.subscribe('leSite_DetailSub', this.params._id);
		const leSiteDesOffres = Sites.findOne({_id : this.params._id});
    	if (leSiteDesOffres !== undefined) {
    		Session.set('siteOffres', this.params._id);
    		if (handle.ready()) {
		    	this.render('tmpltePageSitesDetail', {
				    data: function () { return leSiteDesOffres; }
				});
			}
    	}
	});

	this.route('tmpltePageCreationEspace', { path : '/authentification/creationespace',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('tmpltePageCreationSite', { path : '/authentification/creationsite',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('tmpltePageMySpace', { path : '/myspace',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
			const handle = Meteor.subscribe('mySite');
		 	const handleTwo = Meteor.subscribe('mySiteTwo');
		 	if (handle.ready() || handleTwo.ready()) {
		     	this.render('tmpltePageMySpace');
		 	}
            this.next();
        }
	});

	// this.route('/myspace', function () {
	// 	const handle = Meteor.subscribe('mySite');
	// 	const handleTwo = Meteor.subscribe('mySiteTwo');
	// 	if (handle.ready() || handleTwo.ready()) {
	//     	this.render('tmpltePageMySpace');
	// 	}
	// });
});