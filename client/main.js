import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

T9n.setLanguage("fr");

AccountsTemplates.configure({
    confirmPassword: true, 
    defaultState: "signIn",     
    enablePasswordChange: true,     
    sendVerificationEmail: true,           
    redirectTimeout: 2000,                 

    showForgotPasswordLink: true,  
    showPlaceholders: true,   
    showResendVerificationEmailLink: true, 

    negativeValidation: true,    
    positiveValidation: true,    
    positiveFeedback: true,             
    showValidating: true
});

$.cloudinary.config({
  cloud_name: "dmarchedotcom"
});

var mC = { mUs : "franck05.derniermarche.com", mP : "derniermarche.fr" }
Session.set('fC', mC);

Template.carousel.rendered = function() {
    const comeoutCarousel = Meteor.setTimeout(function() { 
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
  		let DMESalee = Session.get('dernierMarcheOffEpiSalee');
		let offreDMESalee = document.getElementById('idCarouselDMESalee'); 
	    if (offreDMESalee !== null) {
	    	let nbreDMESalee = DMESalee.length;
	    	let numoffreDMESalee = 320 * nbreDMESalee;
		    offreDMESalee.style.width = numoffreDMESalee + 'px';
		    offreDMESalee.setAttribute('tabindex', '0');
		    if (nbreDMESalee > 2) { 
		    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    	
	    let DMESucree = Session.get('dernierMarcheOffEpiSucree');
		let offreDMESucree = document.getElementById('idCarouselDMESucree');
		if (offreDMESucree !== null) {
			let nbreDMESucree = DMESucree.length;
	    	let numoffreDMESucree = 320 * nbreDMESucree;
		    offreDMESucree.style.width = numoffreDMESucree + 'px';
		    offreDMESucree.setAttribute('tabindex', '0');
		    if (nbreDMESucree > 2) { 
		    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMPFrais = Session.get('dernierMarcheOffProdFrais');
		let offreDMPFrais = document.getElementById('idCarouselDMPFrais');
		if (offreDMPFrais !== null) {
			let nbreDMPFrais = DMPFrais.length;
	    	let numoffreDMPFrais = 320 * nbreDMPFrais;
		    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
		    offreDMPFrais.setAttribute('tabindex', '0');
		    if (nbreDMPFrais > 2) {
		    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMFLegumes = Session.get('dernierMarcheOffFruitsLegumes');
		let offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
		if (offreDMFLegumes !== null) {
			let nbreDMFLegumes = DMFLegumes.length;
	    	let numoffreDMFLegumes = 320 * nbreDMFLegumes;
		    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
		    offreDMFLegumes.setAttribute('tabindex', '0');
		    if (nbreDMFLegumes > 2) { 
		    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMBPoissVol = Session.get('dernierMarcheOffBouchPoissVol');
		let offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
		if (offreDMBPoissVol !== null) {
			let nbreDMBPoissVol = DMBPoissVol.length;
	    	let numoffreDMBPoissVol = 320 * nbreDMBPoissVol;
		    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
		    offreDMBPoissVol.setAttribute('tabindex', '0');
		    if (nbreDMBPoissVol > 2) { 
		    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let DMBVinLiq = Session.get('dernierMarcheOffBoissVinLiq');
		let offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
		if (offreDMBVinLiq !== null) {
			let nbreDMBVinLiq = DMBVinLiq.length;
	    	let numoffreDMBVinLiq = 320 * nbreDMBVinLiq;
		    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
		    offreDMBVinLiq.setAttribute('tabindex', '0');
		    if (nbreDMBVinLiq > 2) { 
		    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMBPatisserie = Session.get('dernierMarcheOffBoulPatisserie');
		let offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
		if (offreDMBPatisserie !== null) {
			let nbreDMBPatisserie = DMBPatisserie.length;
	    	let numoffreDMBPatisserie = 320 * nbreDMBPatisserie;
		    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
		    offreDMBPatisserie.setAttribute('tabindex', '0');
		    if (nbreDMBPatisserie > 2) { 
		    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let DMFFood = Session.get('dernierMarcheOffFastFood');
		let offreDMFFood = document.getElementById('idCarouselDMFFood');
		if (offreDMFFood !== null) {
			let nbreDMFFood = DMFFood.length;
	    	let numoffreDMFFood = 320 * nbreDMFFood;
		    offreDMFFood.style.width = numoffreDMFFood + 'px';
		    offreDMFFood.setAttribute('tabindex', '0');
		    if (nbreDMFFood > 2) { 
		    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

		let PESalee = Session.get('promotionOffEpiSalee');
		let offrePESalee = document.getElementById('idCarouselPESalee');
		if (offrePESalee !== null) {
			let nbrePESalee = PESalee.length;
	    	let numoffrePESalee = 320 * nbrePESalee;
		    offrePESalee.style.width = numoffrePESalee + 'px';
		    offrePESalee.setAttribute('tabindex', '0');
		    if (nbrePESalee > 2) { 
		    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PESucree = Session.get('promotionOffEpiSucree');
		let offrePESucree = document.getElementById('idCarouselPESucree');
		if (offrePESucree !== null) {
			let nbrePESucree = PESucree.length;
	    	let numoffrePESucree = 320 * nbrePESucree;
		    offrePESucree.style.width = numoffrePESucree + 'px';
		    offrePESucree.setAttribute('tabindex', '0');
		    if (nbrePESucree > 2) { 
		    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PPFrais = Session.get('promotionOffProdFrais');
		let offrePPFrais = document.getElementById('idCarouselPPFrais');
		if (offrePPFrais !== null) {
			let nbrePPFrais = PPFrais.length;
	    	let numoffrePPFrais = 320 * nbrePPFrais;
		    offrePPFrais.style.width = numoffrePPFrais + 'px';
		    offrePPFrais.setAttribute('tabindex', '0');
		    if (nbrePPFrais > 2) { 
		    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PFLegumes = Session.get('promotionOffFruitsLegumes');
		let offrePFLegumes = document.getElementById('idCarouselPFLegumes');
		if (offrePFLegumes !== null) {
			let nbrePFLegumes = PFLegumes.length;
	    	let numoffrePFLegumes = 320 * nbrePFLegumes;
		    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
		    offrePFLegumes.setAttribute('tabindex', '0');
		    if (nbrePFLegumes > 2) { 
		    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBPoissVol = Session.get('promotionOffBouchPoissVol');
		let offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');
		if (offrePBPoissVol !== null) {
			let nbrePBPoissVol = PBPoissVol.length;
	    	let numoffrePBPoissVol = 320 * nbrePBPoissVol;
		    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
		    offrePBPoissVol.setAttribute('tabindex', '0');
		    if (nbrePBPoissVol > 2) { 
		    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBVinLiq = Session.get('promotionOffBoissVinLiq');
		let offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
		if (offrePBVinLiq !== null) {
			let nbrePBVinLiq = PBVinLiq.length;
	    	let numoffrePBVinLiq = 320 * nbrePBVinLiq;
		    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
		    offrePBVinLiq.setAttribute('tabindex', '0');
		    if (nbrePBVinLiq > 2) { 
		    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBPatisserie = Session.get('promotionOffBoulPatisserie');
		let offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
		if (offrePBPatisserie !== null) {
			let nbrePBPatisserie = PBPatisserie.length;
	    	let numoffrePBPatisserie = 320 * nbrePBPatisserie;
		    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
		    offrePBPatisserie.setAttribute('tabindex', '0');
		    if (nbrePBPatisserie > 2) { 
		    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PFFood = Session.get('promotionOffFastFood');
		let offrePFFood = document.getElementById('idCarouselPFFood');
		if (offrePFFood !== null) {
			let nbrePFFood = PFFood.length;
	    	let numoffrePFFood = 320 * nbrePFFood;
		    offrePFFood.style.width = numoffrePFFood + 'px';
		    offrePFFood.setAttribute('tabindex', '0');
		    if (nbrePFFood > 2) { 
		    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBazar = Session.get('promotionOffBazar');
		let offrePBazar = document.getElementById('idCarouselPBazar');
		if (offrePBazar !== null) {
			let nbrePBazar = PBazar.length;
	    	let numoffrePBazar = 320 * nbrePBazar;
		    offrePBazar.style.width = numoffrePBazar + 'px';
		    offrePBazar.setAttribute('tabindex', '0');
		    if (nbrePBazar > 2) { 
		    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
    } 	
}

Template.tmplteSitesDetail.rendered = function() {
    if (ecranWidth) {
	    let DMESalee = Session.get('dernierMarcheOffEpiSalee');
		let offreDMESalee = document.getElementById('idCarouselDMESalee'); 
	    if (offreDMESalee !== null) {
	    	let nbreDMESalee = DMESalee.length;
	    	let numoffreDMESalee = 320 * nbreDMESalee;
		    offreDMESalee.style.width = numoffreDMESalee + 'px';
		    offreDMESalee.setAttribute('tabindex', '0');
		    if (nbreDMESalee > 2) { 
		    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    	
	    let DMESucree = Session.get('dernierMarcheOffEpiSucree');
		let offreDMESucree = document.getElementById('idCarouselDMESucree');
		if (offreDMESucree !== null) {
			let nbreDMESucree = DMESucree.length;
	    	let numoffreDMESucree = 320 * nbreDMESucree;
		    offreDMESucree.style.width = numoffreDMESucree + 'px';
		    offreDMESucree.setAttribute('tabindex', '0');
		    if (nbreDMESucree > 2) { 
		    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMPFrais = Session.get('dernierMarcheOffProdFrais');
		let offreDMPFrais = document.getElementById('idCarouselDMPFrais');
		if (offreDMPFrais !== null) {
			let nbreDMPFrais = DMPFrais.length;
	    	let numoffreDMPFrais = 320 * nbreDMPFrais;
		    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
		    offreDMPFrais.setAttribute('tabindex', '0');
		    if (nbreDMPFrais > 2) {
		    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMFLegumes = Session.get('dernierMarcheOffFruitsLegumes');
		let offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
		if (offreDMFLegumes !== null) {
			let nbreDMFLegumes = DMFLegumes.length;
	    	let numoffreDMFLegumes = 320 * nbreDMFLegumes;
		    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
		    offreDMFLegumes.setAttribute('tabindex', '0');
		    if (nbreDMFLegumes > 2) { 
		    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMBPoissVol = Session.get('dernierMarcheOffBouchPoissVol');
		let offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
		if (offreDMBPoissVol !== null) {
			let nbreDMBPoissVol = DMBPoissVol.length;
	    	let numoffreDMBPoissVol = 320 * nbreDMBPoissVol;
		    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
		    offreDMBPoissVol.setAttribute('tabindex', '0');
		    if (nbreDMBPoissVol > 2) { 
		    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let DMBVinLiq = Session.get('dernierMarcheOffBoissVinLiq');
		let offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
		if (offreDMBVinLiq !== null) {
			let nbreDMBVinLiq = DMBVinLiq.length;
	    	let numoffreDMBVinLiq = 320 * nbreDMBVinLiq;
		    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
		    offreDMBVinLiq.setAttribute('tabindex', '0');
		    if (nbreDMBVinLiq > 2) { 
		    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMBPatisserie = Session.get('dernierMarcheOffBoulPatisserie');
		let offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
		if (offreDMBPatisserie !== null) {
			let nbreDMBPatisserie = DMBPatisserie.length;
	    	let numoffreDMBPatisserie = 320 * nbreDMBPatisserie;
		    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
		    offreDMBPatisserie.setAttribute('tabindex', '0');
		    if (nbreDMBPatisserie > 2) { 
		    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let DMFFood = Session.get('dernierMarcheOffFastFood');
		let offreDMFFood = document.getElementById('idCarouselDMFFood');
		if (offreDMFFood !== null) {
			let nbreDMFFood = DMFFood.length;
	    	let numoffreDMFFood = 320 * nbreDMFFood;
		    offreDMFFood.style.width = numoffreDMFFood + 'px';
		    offreDMFFood.setAttribute('tabindex', '0');
		    if (nbreDMFFood > 2) { 
		    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

		let PESalee = Session.get('promotionOffEpiSalee');
		let offrePESalee = document.getElementById('idCarouselPESalee');
		if (offrePESalee !== null) {
			let nbrePESalee = PESalee.length;
	    	let numoffrePESalee = 320 * nbrePESalee;
		    offrePESalee.style.width = numoffrePESalee + 'px';
		    offrePESalee.setAttribute('tabindex', '0');
		    if (nbrePESalee > 2) { 
		    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PESucree = Session.get('promotionOffEpiSucree');
		let offrePESucree = document.getElementById('idCarouselPESucree');
		if (offrePESucree !== null) {
			let nbrePESucree = PESucree.length;
	    	let numoffrePESucree = 320 * nbrePESucree;
		    offrePESucree.style.width = numoffrePESucree + 'px';
		    offrePESucree.setAttribute('tabindex', '0');
		    if (nbrePESucree > 2) { 
		    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PPFrais = Session.get('promotionOffProdFrais');
		let offrePPFrais = document.getElementById('idCarouselPPFrais');
		if (offrePPFrais !== null) {
			let nbrePPFrais = PPFrais.length;
	    	let numoffrePPFrais = 320 * nbrePPFrais;
		    offrePPFrais.style.width = numoffrePPFrais + 'px';
		    offrePPFrais.setAttribute('tabindex', '0');
		    if (nbrePPFrais > 2) { 
		    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PFLegumes = Session.get('promotionOffFruitsLegumes');
		let offrePFLegumes = document.getElementById('idCarouselPFLegumes');
		if (offrePFLegumes !== null) {
			let nbrePFLegumes = PFLegumes.length;
	    	let numoffrePFLegumes = 320 * nbrePFLegumes;
		    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
		    offrePFLegumes.setAttribute('tabindex', '0');
		    if (nbrePFLegumes > 2) { 
		    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBPoissVol = Session.get('promotionOffBouchPoissVol');
		let offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');
		if (offrePBPoissVol !== null) {
			let nbrePBPoissVol = PBPoissVol.length;
	    	let numoffrePBPoissVol = 320 * nbrePBPoissVol;
		    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
		    offrePBPoissVol.setAttribute('tabindex', '0');
		    if (nbrePBPoissVol > 2) { 
		    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBVinLiq = Session.get('promotionOffBoissVinLiq');
		let offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
		if (offrePBVinLiq !== null) {
			let nbrePBVinLiq = PBVinLiq.length;
	    	let numoffrePBVinLiq = 320 * nbrePBVinLiq;
		    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
		    offrePBVinLiq.setAttribute('tabindex', '0');
		    if (nbrePBVinLiq > 2) { 
		    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBPatisserie = Session.get('promotionOffBoulPatisserie');
		let offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
		if (offrePBPatisserie !== null) {
			let nbrePBPatisserie = PBPatisserie.length;
	    	let numoffrePBPatisserie = 320 * nbrePBPatisserie;
		    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
		    offrePBPatisserie.setAttribute('tabindex', '0');
		    if (nbrePBPatisserie > 2) { 
		    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PFFood = Session.get('promotionOffFastFood');
		let offrePFFood = document.getElementById('idCarouselPFFood');
		if (offrePFFood !== null) {
			let nbrePFFood = PFFood.length;
	    	let numoffrePFFood = 320 * nbrePFFood;
		    offrePFFood.style.width = numoffrePFFood + 'px';
		    offrePFFood.setAttribute('tabindex', '0');
		    if (nbrePFFood > 2) { 
		    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBazar = Session.get('promotionOffBazar');
		let offrePBazar = document.getElementById('idCarouselPBazar');
		if (offrePBazar !== null) {
			let nbrePBazar = PBazar.length;
	    	let numoffrePBazar = 320 * nbrePBazar;
		    offrePBazar.style.width = numoffrePBazar + 'px';
		    offrePBazar.setAttribute('tabindex', '0');
		    if (nbrePBazar > 2) { 
		    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	}
}

Template.tmplteMySpace.rendered = function() {
    if (ecranWidth) {
	    let DMESalee = Session.get('dernierMarcheOffEpiSalee');
		let offreDMESalee = document.getElementById('idCarouselDMESalee'); 
	    if (offreDMESalee !== null) {
	    	let nbreDMESalee = DMESalee.length;
	    	let numoffreDMESalee = 320 * nbreDMESalee;
		    offreDMESalee.style.width = numoffreDMESalee + 'px';
		    offreDMESalee.setAttribute('tabindex', '0');
		    if (nbreDMESalee > 2) { 
		    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    	
	    let DMESucree = Session.get('dernierMarcheOffEpiSucree');
		let offreDMESucree = document.getElementById('idCarouselDMESucree');
		if (offreDMESucree !== null) {
			let nbreDMESucree = DMESucree.length;
	    	let numoffreDMESucree = 320 * nbreDMESucree;
		    offreDMESucree.style.width = numoffreDMESucree + 'px';
		    offreDMESucree.setAttribute('tabindex', '0');
		    if (nbreDMESucree > 2) { 
		    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMPFrais = Session.get('dernierMarcheOffProdFrais');
		let offreDMPFrais = document.getElementById('idCarouselDMPFrais');
		if (offreDMPFrais !== null) {
			let nbreDMPFrais = DMPFrais.length;
	    	let numoffreDMPFrais = 320 * nbreDMPFrais;
		    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
		    offreDMPFrais.setAttribute('tabindex', '0');
		    if (nbreDMPFrais > 2) {
		    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMFLegumes = Session.get('dernierMarcheOffFruitsLegumes');
		let offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
		if (offreDMFLegumes !== null) {
			let nbreDMFLegumes = DMFLegumes.length;
	    	let numoffreDMFLegumes = 320 * nbreDMFLegumes;
		    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
		    offreDMFLegumes.setAttribute('tabindex', '0');
		    if (nbreDMFLegumes > 2) { 
		    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMBPoissVol = Session.get('dernierMarcheOffBouchPoissVol');
		let offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
		if (offreDMBPoissVol !== null) {
			let nbreDMBPoissVol = DMBPoissVol.length;
	    	let numoffreDMBPoissVol = 320 * nbreDMBPoissVol;
		    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
		    offreDMBPoissVol.setAttribute('tabindex', '0');
		    if (nbreDMBPoissVol > 2) { 
		    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let DMBVinLiq = Session.get('dernierMarcheOffBoissVinLiq');
		let offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
		if (offreDMBVinLiq !== null) {
			let nbreDMBVinLiq = DMBVinLiq.length;
	    	let numoffreDMBVinLiq = 320 * nbreDMBVinLiq;
		    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
		    offreDMBVinLiq.setAttribute('tabindex', '0');
		    if (nbreDMBVinLiq > 2) { 
		    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	    
	    let DMBPatisserie = Session.get('dernierMarcheOffBoulPatisserie');
		let offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
		if (offreDMBPatisserie !== null) {
			let nbreDMBPatisserie = DMBPatisserie.length;
	    	let numoffreDMBPatisserie = 320 * nbreDMBPatisserie;
		    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
		    offreDMBPatisserie.setAttribute('tabindex', '0');
		    if (nbreDMBPatisserie > 2) { 
		    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let DMFFood = Session.get('dernierMarcheOffFastFood');
		let offreDMFFood = document.getElementById('idCarouselDMFFood');
		if (offreDMFFood !== null) {
			let nbreDMFFood = DMFFood.length;
	    	let numoffreDMFFood = 320 * nbreDMFFood;
		    offreDMFFood.style.width = numoffreDMFFood + 'px';
		    offreDMFFood.setAttribute('tabindex', '0');
		    if (nbreDMFFood > 2) { 
		    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

		let PESalee = Session.get('promotionOffEpiSalee');
		let offrePESalee = document.getElementById('idCarouselPESalee');
		if (offrePESalee !== null) {
			let nbrePESalee = PESalee.length;
	    	let numoffrePESalee = 320 * nbrePESalee;
		    offrePESalee.style.width = numoffrePESalee + 'px';
		    offrePESalee.setAttribute('tabindex', '0');
		    if (nbrePESalee > 2) { 
		    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PESucree = Session.get('promotionOffEpiSucree');
		let offrePESucree = document.getElementById('idCarouselPESucree');
		if (offrePESucree !== null) {
			let nbrePESucree = PESucree.length;
	    	let numoffrePESucree = 320 * nbrePESucree;
		    offrePESucree.style.width = numoffrePESucree + 'px';
		    offrePESucree.setAttribute('tabindex', '0');
		    if (nbrePESucree > 2) { 
		    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PPFrais = Session.get('promotionOffProdFrais');
		let offrePPFrais = document.getElementById('idCarouselPPFrais');
		if (offrePPFrais !== null) {
			let nbrePPFrais = PPFrais.length;
	    	let numoffrePPFrais = 320 * nbrePPFrais;
		    offrePPFrais.style.width = numoffrePPFrais + 'px';
		    offrePPFrais.setAttribute('tabindex', '0');
		    if (nbrePPFrais > 2) { 
		    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PFLegumes = Session.get('promotionOffFruitsLegumes');
		let offrePFLegumes = document.getElementById('idCarouselPFLegumes');
		if (offrePFLegumes !== null) {
			let nbrePFLegumes = PFLegumes.length;
	    	let numoffrePFLegumes = 320 * nbrePFLegumes;
		    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
		    offrePFLegumes.setAttribute('tabindex', '0');
		    if (nbrePFLegumes > 2) { 
		    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBPoissVol = Session.get('promotionOffBouchPoissVol');
		let offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');
		if (offrePBPoissVol !== null) {
			let nbrePBPoissVol = PBPoissVol.length;
	    	let numoffrePBPoissVol = 320 * nbrePBPoissVol;
		    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
		    offrePBPoissVol.setAttribute('tabindex', '0');
		    if (nbrePBPoissVol > 2) { 
		    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBVinLiq = Session.get('promotionOffBoissVinLiq');
		let offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
		if (offrePBVinLiq !== null) {
			let nbrePBVinLiq = PBVinLiq.length;
	    	let numoffrePBVinLiq = 320 * nbrePBVinLiq;
		    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
		    offrePBVinLiq.setAttribute('tabindex', '0');
		    if (nbrePBVinLiq > 2) { 
		    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBPatisserie = Session.get('promotionOffBoulPatisserie');
		let offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
		if (offrePBPatisserie !== null) {
			let nbrePBPatisserie = PBPatisserie.length;
	    	let numoffrePBPatisserie = 320 * nbrePBPatisserie;
		    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
		    offrePBPatisserie.setAttribute('tabindex', '0');
		    if (nbrePBPatisserie > 2) { 
		    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PFFood = Session.get('promotionOffFastFood');
		let offrePFFood = document.getElementById('idCarouselPFFood');
		if (offrePFFood !== null) {
			let nbrePFFood = PFFood.length;
	    	let numoffrePFFood = 320 * nbrePFFood;
		    offrePFFood.style.width = numoffrePFFood + 'px';
		    offrePFFood.setAttribute('tabindex', '0');
		    if (nbrePFFood > 2) { 
		    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }

	    let PBazar = Session.get('promotionOffBazar');
		let offrePBazar = document.getElementById('idCarouselPBazar');
		if (offrePBazar !== null) {
			let nbrePBazar = PBazar.length;
	    	let numoffrePBazar = 320 * nbrePBazar;
		    offrePBazar.style.width = numoffrePBazar + 'px';
		    offrePBazar.setAttribute('tabindex', '0');
		    if (nbrePBazar > 2) { 
		    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
		    }
	    }
	}
}

Template.tmpltePageAccueil.rendered = function() { 
    var myPaciIntroAccueil = document.getElementById('idPacifIntroAccueil');
    var myQlqOfItro = document.getElementById('idQlqOffresIntro');
    var myQlqOffres = document.getElementById('idQlqOffres');

    const comeoutPaciIntroAccueil = Meteor.setInterval(function() { 
        myPaciIntroAccueil.style.animation = 'none';
        }, 20800);
    Session.set('cmtPaciIntroAccueil', comeoutPaciIntroAccueil);

    const comeoutPaciIntroAccueil2 = Meteor.setInterval(function() { 
        myPaciIntroAccueil.style.animationName = 'comeoutbis';
        myPaciIntroAccueil.style.animationDuration = '17500ms';
        myPaciIntroAccueil.style.animationDelay = '3300ms';
        myPaciIntroAccueil.style.animationFillMode = 'both';
        myPaciIntroAccueil.style.animationTimingFunction = 'ease-out';
        }, 20820);
    Session.set('cmtPaciIntroAccueil2', comeoutPaciIntroAccueil2);

    const comeoutIntroOffres = Meteor.setInterval(function() { 
        myQlqOfItro.style.animation = 'none';
        }, 20800);
    Session.set('cmtIntroOffres', comeoutIntroOffres);

    const comeoutIntroOffres2 = Meteor.setInterval(function() { 
        myQlqOfItro.style.animationName = 'introDesPromos';
        myQlqOfItro.style.animationDuration = '300ms';
        myQlqOfItro.style.animationDelay = '3300ms';
        myQlqOfItro.style.animationFillMode = 'both';
        myQlqOfItro.style.animationTimingFunction = 'cubic-bezier(1,.01,1,.24)';
        }, 20820);
    Session.set('cmtIntroOffres2', comeoutIntroOffres2);

    const comeoutOffres = Meteor.setInterval(function() { 
    	myQlqOffres.style.animation = 'none';
        }, 20800);
    Session.set('cmtOffres', comeoutOffres);

    const comeoutOffres2 = Meteor.setInterval(function() { 
        myQlqOffres.style.animationName = 'affichePromo';
        myQlqOffres.style.animationDuration = '16820ms';
        myQlqOffres.style.animationDelay = '3750ms';
        myQlqOffres.style.animationFillMode = 'both';
        }, 20820);
    Session.set('cmtOffres2', comeoutOffres2);
}




