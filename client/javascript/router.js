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
            this.next();
        }
	});

	this.route('tmpltePageAjoutPlante', { path : '/ajoutplante',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('tmpltePageMesPlantes', { path : '/mesplantes',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});

	this.route('tmpltePageMesArrosages', { path : '/arrosages',
		onBeforeAction:function(pause){
            $('body, html').animate({
					scrollTop : 0
			}, 0);
            this.next();
        }
	});
});