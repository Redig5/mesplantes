import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

$.cloudinary.config({
  cloud_name: "dmarchedotcom"
});

var mC = { mUs : "franck05.derniermarche.com", mP : "derniermarche.fr" }
Session.set('fC', mC);

Template.carousel.rendered = function() {
    const comeoutCarousel = setTimeout(function() { 
        $('#carousel').slick({
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        lazyLoad: 'ondemand',
        slidesToShow: 1,
	    slidesToScroll: 1,
	    autoplay: true,
	    autoplaySpeed: 3700,
	    cssEase : 'ease-in-out',
	    mobileFirst : true
	    });
	}, 3800);
	Session.set('cmtCarousel', comeoutCarousel);	
}

var ecranWidth = window.innerWidth >= 992;

Template.tmplteOffresSites.rendered = function() {
    if (ecranWidth) { 
    	var offreDMESalee = document.getElementById('idCarouselDMESalee'); 
	    if (offreDMESalee !== null) {
	    	var nOffreDMESalee = offreDMESalee.children.length;
	    	var numoffreDMESalee = 320 * nOffreDMESalee;
		    offreDMESalee.style.width = numoffreDMESalee + 'px';
		    offreDMESalee.setAttribute('tabindex', '0');
		    if (nOffreDMESalee > 2) { 
		    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMESucree = document.getElementById('idCarouselDMESucree');
		if (offreDMESucree !== null) {
			var nOffreDMESucree = offreDMESucree.children.length;
	    	var numoffreDMESucree = 320 * nOffreDMESucree;
		    offreDMESucree.style.width = numoffreDMESucree + 'px';
		    offreDMESucree.setAttribute('tabindex', '0');
		    if (nOffreDMESucree > 2) { 
		    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMPFrais = document.getElementById('idCarouselDMPFrais');
		if (offreDMPFrais !== null) {
			var nOffreDMPFrais = offreDMPFrais.children.length;
	    	var numoffreDMPFrais = 320 * nOffreDMPFrais;
		    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
		    offreDMPFrais.setAttribute('tabindex', '0');
		    if (nOffreDMPFrais > 2) {
		    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
		if (offreDMFLegumes !== null) {
			var nOffreDMFLegumes = offreDMFLegumes.children.length;
	    	var numoffreDMFLegumes = 320 * nOffreDMFLegumes;
		    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
		    offreDMFLegumes.setAttribute('tabindex', '0');
		    if (nOffreDMFLegumes > 2) { 
		    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
		if (offreDMBPoissVol !== null) {
			var nOffreDMBPoissVol = offreDMBPoissVol.children.length;
	    	var numoffreDMBPoissVol = 320 * nOffreDMBPoissVolth;
		    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
		    offreDMBPoissVol.setAttribute('tabindex', '0');
		    if (nOffreDMBPoissVol > 2) { 
		    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
		if (offreDMBVinLiq !== null) {
			var nOffreDMBVinLiq = offreDMBVinLiq.children.length;
	    	var numoffreDMBVinLiq = 320 * nOffreDMBVinLiq;
		    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
		    offreDMBVinLiq.setAttribute('tabindex', '0');
		    if (nOffreDMBVinLiq > 2) { 
		    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
		if (offreDMBPatisserie !== null) {
			var nOffreDMBPatisserie = offreDMBPatisserie.children.length;
	    	var numoffreDMBPatisserie = 320 * nOffreDMBPatisserie;
		    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
		    offreDMBPatisserie.setAttribute('tabindex', '0');
		    if (nOffreDMBPatisserie > 2) { 
		    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMFFood = document.getElementById('idCarouselDMFFood');
		if (offreDMFFood !== null) {
			var nOffreDMFFood = offreDMFFood.children.length;
	    	var numoffreDMFFood = 320 * nOffreDMFFood;
		    offreDMFFood.style.width = numoffreDMFFood + 'px';
		    offreDMFFood.setAttribute('tabindex', '0');
		    if (nOffreDMFFood > 2) { 
		    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePESalee = document.getElementById('idCarouselPESalee');
		if (offrePESalee !== null) {
			var nOffrePESalee = offrePESalee.children.length;
	    	var numoffrePESalee = 320 * nOffrePESalee;
		    offrePESalee.style.width = numoffrePESalee + 'px';
		    offrePESalee.setAttribute('tabindex', '0');
		    if (nOffrePESalee > 2) { 
		    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePESucree = document.getElementById('idCarouselPESucree');	
		if (offrePESucree !== null) {
			var nOffrePESucree = offrePESucree.children.length;
	    	var numoffrePESucree = 320 * nOffrePESucree;
		    offrePESucree.style.width = numoffrePESucree + 'px';
		    offrePESucree.setAttribute('tabindex', '0');
		    if (nOffrePESucree > 2) { 
		    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePPFrais = document.getElementById('idCarouselPPFrais');
		if (offrePPFrais !== null) {
			var nOffrePPFrais = offrePPFrais.children.length;
	    	var numoffrePPFrais = 320 * nOffrePPFrais;
		    offrePPFrais.style.width = numoffrePPFrais + 'px';
		    offrePPFrais.setAttribute('tabindex', '0');
		    if (nOffrePPFrais > 2) { 
		    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePFLegumes = document.getElementById('idCarouselPFLegumes');
		if (offrePFLegumes !== null) {
			var nOffrePFLegumes = offrePFLegumes.children.length;
	    	var numoffrePFLegumes = 320 * nOffrePFLegumes;
		    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
		    offrePFLegumes.setAttribute('tabindex', '0');
		    if (nOffrePFLegumes > 2) { 
		    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');	
		if (offrePBPoissVol !== null) {
			var nOffrePBPoissVol = offrePBPoissVol.children.length;
	    	var numoffrePBPoissVol = 320 * nOffrePBPoissVol;
		    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
		    offrePBPoissVol.setAttribute('tabindex', '0');
		    if (nOffrePBPoissVol > 2) { 
		    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
		if (offrePBVinLiq !== null) {
			var nOffrePBVinLiq = offrePBVinLiq.children.length;
	    	var numoffrePBVinLiq = 320 * nOffrePBVinLiq;
		    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
		    offrePBVinLiq.setAttribute('tabindex', '0');
		    if (nOffrePBVinLiq > 2) { 
		    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
		if (offrePBPatisserie !== null) {
			var nOffrePBPatisserie = offrePBPatisserie.children.length;
	    	var numoffrePBPatisserie = 320 * nOffrePBPatisserie;
		    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
		    offrePBPatisserie.setAttribute('tabindex', '0');
		    if (nOffrePBPatisserie > 2) { 
		    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePFFood = document.getElementById('idCarouselPFFood');
		if (offrePFFood !== null) {
			var nOffrePFFood = offrePFFood.children.length;
	    	var numoffrePFFood = 320 * nOffrePFFood;
		    offrePFFood.style.width = numoffrePFFood + 'px';
		    offrePFFood.setAttribute('tabindex', '0');
		    if (nOffrePFFood > 2) { 
		    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBazar = document.getElementById('idCarouselPBazar');
		if (offrePBazar !== null) {
			var nOffrePBazar = offrePBazar.children.length;
	    	var numoffrePBazar = 320 * nOffrePBazar;
		    offrePBazar.style.width = numoffrePBazar + 'px';
		    offrePBazar.setAttribute('tabindex', '0');
		    if (nOffrePBazar > 2) { 
		    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
    } 	
}

Template.tmplteSitesDetail.rendered = function() {
    if (ecranWidth) {
	    var offreDMESalee = document.getElementById('idCarouselDMESalee'); 
	    if (offreDMESalee !== null) {
	    	var nOffreDMESalee = offreDMESalee.children.length;
	    	var numoffreDMESalee = 320 * nOffreDMESalee;
		    offreDMESalee.style.width = numoffreDMESalee + 'px';
		    offreDMESalee.setAttribute('tabindex', '0');
		    if (nOffreDMESalee > 2) { 
		    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMESucree = document.getElementById('idCarouselDMESucree');
		if (offreDMESucree !== null) {
			var nOffreDMESucree = offreDMESucree.children.length;
	    	var numoffreDMESucree = 320 * nOffreDMESucree;
		    offreDMESucree.style.width = numoffreDMESucree + 'px';
		    offreDMESucree.setAttribute('tabindex', '0');
		    if (nOffreDMESucree > 2) { 
		    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMPFrais = document.getElementById('idCarouselDMPFrais');
		if (offreDMPFrais !== null) {
			var nOffreDMPFrais = offreDMPFrais.children.length;
	    	var numoffreDMPFrais = 320 * nOffreDMPFrais;
		    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
		    offreDMPFrais.setAttribute('tabindex', '0');
		    if (nOffreDMPFrais > 2) {
		    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
		if (offreDMFLegumes !== null) {
			var nOffreDMFLegumes = offreDMFLegumes.children.length;
	    	var numoffreDMFLegumes = 320 * nOffreDMFLegumes;
		    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
		    offreDMFLegumes.setAttribute('tabindex', '0');
		    if (nOffreDMFLegumes > 2) { 
		    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
		if (offreDMBPoissVol !== null) {
			var nOffreDMBPoissVol = offreDMBPoissVol.children.length;
	    	var numoffreDMBPoissVol = 320 * nOffreDMBPoissVolth;
		    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
		    offreDMBPoissVol.setAttribute('tabindex', '0');
		    if (nOffreDMBPoissVol > 2) { 
		    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
		if (offreDMBVinLiq !== null) {
			var nOffreDMBVinLiq = offreDMBVinLiq.children.length;
	    	var numoffreDMBVinLiq = 320 * nOffreDMBVinLiq;
		    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
		    offreDMBVinLiq.setAttribute('tabindex', '0');
		    if (nOffreDMBVinLiq > 2) { 
		    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
		if (offreDMBPatisserie !== null) {
			var nOffreDMBPatisserie = offreDMBPatisserie.children.length;
	    	var numoffreDMBPatisserie = 320 * nOffreDMBPatisserie;
		    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
		    offreDMBPatisserie.setAttribute('tabindex', '0');
		    if (nOffreDMBPatisserie > 2) { 
		    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offreDMFFood = document.getElementById('idCarouselDMFFood');
		if (offreDMFFood !== null) {
			var nOffreDMFFood = offreDMFFood.children.length;
	    	var numoffreDMFFood = 320 * nOffreDMFFood;
		    offreDMFFood.style.width = numoffreDMFFood + 'px';
		    offreDMFFood.setAttribute('tabindex', '0');
		    if (nOffreDMFFood > 2) { 
		    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePESalee = document.getElementById('idCarouselPESalee');
		if (offrePESalee !== null) {
			var nOffrePESalee = offrePESalee.children.length;
	    	var numoffrePESalee = 320 * nOffrePESalee;
		    offrePESalee.style.width = numoffrePESalee + 'px';
		    offrePESalee.setAttribute('tabindex', '0');
		    if (nOffrePESalee > 2) { 
		    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePESucree = document.getElementById('idCarouselPESucree');	
		if (offrePESucree !== null) {
			var nOffrePESucree = offrePESucree.children.length;
	    	var numoffrePESucree = 320 * nOffrePESucree;
		    offrePESucree.style.width = numoffrePESucree + 'px';
		    offrePESucree.setAttribute('tabindex', '0');
		    if (nOffrePESucree > 2) { 
		    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePPFrais = document.getElementById('idCarouselPPFrais');
		if (offrePPFrais !== null) {
			var nOffrePPFrais = offrePPFrais.children.length;
	    	var numoffrePPFrais = 320 * nOffrePPFrais;
		    offrePPFrais.style.width = numoffrePPFrais + 'px';
		    offrePPFrais.setAttribute('tabindex', '0');
		    if (nOffrePPFrais > 2) { 
		    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePFLegumes = document.getElementById('idCarouselPFLegumes');
		if (offrePFLegumes !== null) {
			var nOffrePFLegumes = offrePFLegumes.children.length;
	    	var numoffrePFLegumes = 320 * nOffrePFLegumes;
		    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
		    offrePFLegumes.setAttribute('tabindex', '0');
		    if (nOffrePFLegumes > 2) { 
		    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');	
		if (offrePBPoissVol !== null) {
			var nOffrePBPoissVol = offrePBPoissVol.children.length;
	    	var numoffrePBPoissVol = 320 * nOffrePBPoissVol;
		    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
		    offrePBPoissVol.setAttribute('tabindex', '0');
		    if (nOffrePBPoissVol > 2) { 
		    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
		if (offrePBVinLiq !== null) {
			var nOffrePBVinLiq = offrePBVinLiq.children.length;
	    	var numoffrePBVinLiq = 320 * nOffrePBVinLiq;
		    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
		    offrePBVinLiq.setAttribute('tabindex', '0');
		    if (nOffrePBVinLiq > 2) { 
		    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
		if (offrePBPatisserie !== null) {
			var nOffrePBPatisserie = offrePBPatisserie.children.length;
	    	var numoffrePBPatisserie = 320 * nOffrePBPatisserie;
		    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
		    offrePBPatisserie.setAttribute('tabindex', '0');
		    if (nOffrePBPatisserie > 2) { 
		    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePFFood = document.getElementById('idCarouselPFFood');
		if (offrePFFood !== null) {
			var nOffrePFFood = offrePFFood.children.length;
	    	var numoffrePFFood = 320 * nOffrePFFood;
		    offrePFFood.style.width = numoffrePFFood + 'px';
		    offrePFFood.setAttribute('tabindex', '0');
		    if (nOffrePFFood > 2) { 
		    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
		var offrePBazar = document.getElementById('idCarouselPBazar');
		if (offrePBazar !== null) {
			var nOffrePBazar = offrePBazar.children.length;
	    	var numoffrePBazar = 320 * nOffrePBazar;
		    offrePBazar.style.width = numoffrePBazar + 'px';
		    offrePBazar.setAttribute('tabindex', '0');
		    if (nOffrePBazar > 2) { 
		    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	}
}

Template.tmpltePageAccueil.rendered = function() { 
    var myPaciIntroAccueil = document.getElementById('idPacifIntroAccueil');
    var myQlqOfItro = document.getElementById('idQlqOffresIntro');
    var myQlqOffres = document.getElementById('idQlqOffres');

    const comeoutPaciIntroAccueil = setInterval(function() { 
        myPaciIntroAccueil.style.animation = 'none';
        }, 20800);
    Session.set('cmtPaciIntroAccueil', comeoutPaciIntroAccueil);

    const comeoutPaciIntroAccueil2 = setInterval(function() { 
        myPaciIntroAccueil.style.animationName = 'comeoutbis';
        myPaciIntroAccueil.style.animationDuration = '17500ms';
        myPaciIntroAccueil.style.animationDelay = '3300ms';
        myPaciIntroAccueil.style.animationFillMode = 'both';
        myPaciIntroAccueil.style.animationTimingFunction = 'ease-out';
        }, 20820);
    Session.set('cmtPaciIntroAccueil2', comeoutPaciIntroAccueil2);

    const comeoutIntroOffres = setInterval(function() { 
        myQlqOfItro.style.animation = 'none';
        }, 20800);
    Session.set('cmtIntroOffres', comeoutIntroOffres);

    const comeoutIntroOffres2 = setInterval(function() { 
        myQlqOfItro.style.animationName = 'introDesPromos';
        myQlqOfItro.style.animationDuration = '300ms';
        myQlqOfItro.style.animationDelay = '3300ms';
        myQlqOfItro.style.animationFillMode = 'both';
        myQlqOfItro.style.animationTimingFunction = 'cubic-bezier(1,.01,1,.24)';
        }, 20820);
    Session.set('cmtIntroOffres2', comeoutIntroOffres2);

    const comeoutOffres = setInterval(function() { 
    	myQlqOffres.style.animation = 'none';
        }, 20800);
    Session.set('cmtOffres', comeoutOffres);

    const comeoutOffres2 = setInterval(function() { 
        myQlqOffres.style.animationName = 'affichePromo';
        myQlqOffres.style.animationDuration = '16820ms';
        myQlqOffres.style.animationDelay = '3750ms';
        myQlqOffres.style.animationFillMode = 'both';
        }, 20820);
    Session.set('cmtOffres2', comeoutOffres2);
}




