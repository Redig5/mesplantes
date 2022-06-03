var lesTypesDePromo = ['dernierMarche', 'promotion'];
var lesRayonsDePromo = ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'];
var ecranWidth = window.innerWidth >= 992;

function laDate(tps) {
  var jour = tps.getDate();
  var mois = tps.getMonth() + 1;
  if (jour < 10) { jour = '0'+jour; }
  if (mois < 10) { mois = '0'+mois; } 
  const annee = tps.getFullYear();
  const d = jour+'/'+mois+'/'+annee;
  return d;
}

Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});
Template.uploadForm.events({
    'change #fileInput'(e, template) {
    	e.preventDefault();
	    if (e.currentTarget.files && e.currentTarget.files[0]) {
	    	const nPromos = ImagesPromo.find().count();
	    	if (nPromos > 0) {
	    		var existeTof = ImagesPromo.findOne({name : e.currentTarget.files[0].name});
	    		if (existeTof){
	    			Session.set('objImg', existeTof._id);
	    			alert('Image déjà présente');
	    			if (existeTof.uploaded == 'OUI') {
	    				$('#idTypePromo').removeClass('non');
	   					$('#idTypePromo').addClass('oui');
	    			}
	    			else {
	    				$('#inserTof').removeClass('non');
	   				    $('#inserTof').addClass('oui');
	    			}
	    		}
	    		else {
	    			const upload = ImagesPromo.insert({
	        			file: e.currentTarget.files[0],
	        			streams: 'dynamic',
	        			chunkSize: 'dynamic'
	     	 		}, true);
	        		if (upload) { 
	        			Session.set('objImg', upload.config.fileId);      
	          			alert('Image "' + upload.file.name + '" téléchargée');
	          			$('#inserTof').removeClass('non');
	   				    $('#inserTof').addClass('oui');
	        		}
	        		else { alert('Erreur survenue durant le téléchargement'); }
	        	}
	    	}
	    	else {
	      		const upload = ImagesPromo.insert({
	        		file: e.currentTarget.files[0],
	        		streams: 'dynamic',
	        		chunkSize: 'dynamic'
	     	 	}, true);
	      		if (upload) { 
        			Session.set('objImg', upload.config.fileId);      
          			alert('Image "' + upload.file.name + '" téléchargée');
          			$('#inserTof').removeClass('non');
   				    $('#inserTof').addClass('oui');
        		}
        		else { alert('Erreur survenue durant le téléchargement'); }
	        }
	    }
    },
    'click #inserTof': function(e, t){
        e.preventDefault();
		const img = Session.get('objImg');					
	    var fichiers = [];
	    var file = $('#fileInput')[0].files[0];
	    fichiers.push(file);
    	Cloudinary.upload(fichiers, 
	    	{
		    'folder': 'dMarche',
		  	'resource_type': 'image',
		  	'type': 'upload',
		  	'use_filename': true,
		  	'unique_filename': false,
		  	'width': 200,
		  	'height': 200,
		  	'crop': 'fit'
		  },
	  	function(err, res) {
	  		const image = { idImg : img, rUrl : res.url };
	  		Meteor.call('majImagePromo', image, function(err, result){
	  			if (err || (result != 'OK')){ $('#idTypePromo').addClass('error'); }
	  		});
	    }, true);
	    $('#inserTof').removeClass('oui');
   		$('#inserTof').addClass('non');
   		$('#idTypePromo').removeClass('non');
   		$('#idTypePromo').addClass('oui');
    }
});
Template.uploadForm.helpers({
    currentUpload() {
    	return Template.instance().currentUpload.get();
    }
});

Template.tmplteOffres.events({
	'change [name="selectVillePromo"]' : function(event, instance){ 
		event.preventDefault();
		let vPromo = $( event.target ).find( 'option:selected' ).val(); 
		if (vPromo == '--') {
			$('#idChoixQuartier').addClass('non');
			$('#idChoixSurface').addClass('non');
			$('#idValidationRecherche').addClass('non');
		}
		else {
			$('#idChoixQuartier').removeClass('non');
			$('#idChoixQuartier').addClass('oui');

			$('#idChoixSurface').addClass('non');
			$('#idValidationRecherche').addClass('non');

			Session.set('villePromoChoisie', vPromo);
		}
	},
	'change [name="selectQuartierPromo"]' : function(event, instance){
		event.preventDefault();
		let qPromo = $( event.target ).find( 'option:selected' ).val(); 
		if (qPromo == '--') {
			$('#idChoixSurface').addClass('non');
			$('#idValidationRecherche').addClass('non');
		}
		else {
			Session.set('quartierPromoChoisie', qPromo);
			$('#idChoixSurface').removeClass('non');
			$('#idChoixSurface').addClass('oui');
			if ($('#idSurface').val() != '--' && $('#idSurface').val() != '') {
				$('#idValidationRecherche').removeClass('non');
				$('#idValidationRecherche').addClass('oui');
			}
			else { $('#idValidationRecherche').addClass('non'); }
		}
		const hauteurDevice = window.innerHeight;
		if (hauteurDevice < 560) {
			$('html').animate({
				scrollTop : 70
			}, 300);
		}
	},
	'change [name="selectEspacePromo"]' : function(event, instance){
		event.preventDefault();
		let espPromo = $( event.target ).find( 'option:selected' ).val(); 
		if (espPromo == '--') { $('#idValidationRecherche').addClass('non'); }
		else {
			Session.set('espacePromoChoisie', espPromo);
			$('#idValidationRecherche').removeClass('non');
			$('#idValidationRecherche').addClass('oui');
		}
		const hauteurDevice = window.innerHeight;
		if (hauteurDevice < 560) {
			$('html').animate({
				scrollTop : 140
			}, 300);
		}
		else if (hauteurDevice >= 560 && hauteurDevice < 635) {
			$('html').animate({
				scrollTop : 160
			}, 300);
		}
		else if (hauteurDevice >= 635 && hauteurDevice < 665) {
			$('html').animate({
				scrollTop : 40
			}, 300);
		}
		else if (hauteurDevice >= 665 && hauteurDevice < 730) {
			$('html').animate({
				scrollTop : 100
			}, 300);
		}
	}
});
	Template.tmplteOffresSites.events({
		'click .stars' : function(event, instance){
			event.preventDefault();
			var n = event.target.parentNode.className.slice(5);
			Session.set('laNote', n);
			$(".comsNote").addClass('non');
			$(".mystar").addClass('non');

			$(".noteEmail").removeClass('non');
			$(".noteEmail").addClass('oui');
			$(".crayon").addClass('crayonVert');
			var cv = document.querySelector('.crayonVert');
			cv.setAttribute("title", "Valider");
		},
		'click #idEmailKo' : function(event, instance){
			event.preventDefault();
			$(".noteEmail").removeClass('oui');
			$(".noteEmail").addClass('non');
			$(".crayon").removeClass('crayonVert');

			$(".comsNote").removeClass('non');
			$(".mystar").removeClass('non');
			$(".comsNote").addClass('oui');
			$(".mystar").addClass('oui');
		},
		'click #idEmailKoBis' : function(event, instance){
			event.preventDefault();
			$("#idNoteEmailBis").removeClass('oui');
			$("#idNoteEmailBis").addClass('non');
			$("#idCrayonBis").removeClass('crayonVert');

			$("#idComsNoteBis").removeClass('non');
			$("#ratingBis").removeClass('non');
			$("#idComsNoteBis").addClass('oui');
			$("#ratingBis").addClass('oui');
		},
		'click .crayonVert' : function(event, instance){
			event.preventDefault();
			$('#idNoteEBis').removeClass('error');
			$('.noteE').removeClass('error');  

			var mail = $('.emailClient').val();
			var mailBis = $('.emailClientBis').val();
			if (mail == "" && mailBis != "") { 
				mail = mailBis; 
				var ec = document.querySelector('.emailClientBis');
			}
			else { var ec = document.querySelector('.emailClient');	}

			if (mailBis == "" && window.innerWidth < 992) { 
				document.querySelector('.emailClientBis').setAttribute('placeholder',"Votre email SVP");
				$('#idNoteEBis').addClass('error'); 
			}
			else if (mail == "" && window.innerWidth >= 992) { 
				ec.setAttribute('placeholder',"Votre email SVP");
				$('.noteE').addClass('error'); 
			}
			else {
				if (window.innerWidth < 992) { 
					$("#idAttenteEnvoiMailBis").removeClass('non');
					$("#idAttenteEnvoiMailBis").addClass('oui');
				}
				else {
					$("#idAttenteEnvoiMail").removeClass('non');
					$("#idAttenteEnvoiMail").addClass('oui');
				}
				var si = Sites.findOne({_id: ec.id});
				const n = parseFloat(Session.get('laNote'));
				var newNote = {
					mailClient : mail,
					noteClient : n,
					dateNote : new Date()
				}
				if ((si.siteNote !== undefined) && (si.siteNote > 0)) {
					Meteor.call('noteSite', { id : ec.id, mail : mail}, function(err, result){
						if (window.innerWidth < 992) { 
							$("#idAttenteEnvoiMailBis").removeClass('oui');
							$("#idAttenteEnvoiMailBis").addClass('non');
						}
						else {
							$("#idAttenteEnvoiMail").removeClass('oui');
							$("#idAttenteEnvoiMail").addClass('non');
						}
						if (err || ((result != 'OK') && (result != 'KO'))) {
							if (mailBis != "") { 
								document.querySelector('.emailClientBis').setAttribute('placeholder',"Votre email SVP");
								$('#idNoteEBis').addClass('error'); 
							}
							else { 
								ec.setAttribute('placeholder',"Votre email SVP");
								$('.noteE').addClass('error'); 
							}
			            }
						else {
							if (result == 'OK') {
								Session.set('leS', si);
								Session.set('newN', newNote);
								Session.set('lId', ec.id);
								Session.set('leM', mail);
					            if (mailBis == "") {
					            	$("#idConfirmModifNote").removeClass('non');
									$("#idConfirmModifNote").addClass('oui');

									$(".noteEmail").removeClass('oui');
									$(".noteEmail").addClass('non');
									$(".crayon").removeClass('crayonVert');
					            }
					            else {
					            	$("#idConfirmModifNoteBis").removeClass('non');
									$("#idConfirmModifNoteBis").addClass('oui');

									$("#idNoteEmailBis").removeClass('oui');
									$("#idNoteEmailBis").addClass('non');
									$("#idCrayonBis").removeClass('crayonVert');
					            }
							}
							else {
								const https = require('https');
							    https.get("https://emailvalidation.abstractapi.com/v1/?api_key=84957fa29d774d298b8f093657e03c88&email="+mail, (resp) => {
							      let data = "";
							      resp.on("data", (chunk) => {
							        data += chunk;
							      });
							      resp.on("end", () => {
							      	var rep = JSON.parse(data);
							      	if ((rep.deliverability == 'UNDELIVERABLE') || (rep.deliverability == 'UNKNOWN')) {
							      		if ($('.emailClientBis').val() != "") {
							      			$('.emailClientBis').val('');
							      			$('#idNoteEBis').addClass('err');
							      		}
							      		else { 
							      			$('.emailClient').val(''); 
							      			$('.noteE').addClass('err');
							      		}
							      		ec.setAttribute('placeholder',"Entrez un email valide SVP");						      		
							      	}
							      	else {
							      		if (window.innerWidth < 992) { 
											$("#idAttenteEnvoiMailBis").removeClass('non');
											$("#idAttenteEnvoiMailBis").addClass('oui');
										}
										else {
											$("#idAttenteEnvoiMail").removeClass('non');
											$("#idAttenteEnvoiMail").addClass('oui');
										}
								      	const nouvelleNote = { id : ec.id, laNObj : newNote, laN : n, leMail : mail, nExists : 'OUI' };
								      	Meteor.call('ajoutNote', nouvelleNote, function(err, result){
								      		if (window.innerWidth < 992) { 
												$("#idAttenteEnvoiMailBis").removeClass('oui');
												$("#idAttenteEnvoiMailBis").addClass('non');
											}
											else {
												$("#idAttenteEnvoiMail").removeClass('oui');
												$("#idAttenteEnvoiMail").addClass('non');
											}
								      		if (err || (result != 'sent')) {
								      			if ($('.emailClientBis').val() != "") {
								      				document.querySelector('.emailClientBis').setAttribute('placeholder',"Votre email SVP");
													$('#idNoteEBis').addClass('error'); 
								      			}
								      			else {
													ec.setAttribute('placeholder',"Votre email SVP");
													$('.noteE').addClass('error'); 
								      			}
								      		}
								      		else {
								      			if ($('.emailClientBis').val() != "") {
									      			$("#idAlertConfirmBis").removeClass('non');
													$("#idAlertConfirmBis").addClass('oui');

													$("#idNoteEmailBis").removeClass('oui');
													$("#idNoteEBis").removeClass('error');
													$("#idNoteEmailBis").addClass('non');
													$("#idCrayonBis").removeClass('crayonVert');
									      		}
									      		else { 
									      			$("#idAlertConfirm").removeClass('non');
													$("#idAlertConfirm").addClass('oui');

													$(".noteEmail").removeClass('oui');
													$(".noteE").removeClass('error');
													$(".noteEmail").addClass('non');
													$(".crayon").removeClass('crayonVert');
									      		}
								      		}
								      	});
									}
							      });
							    }).on("error", (err) => {
							    	ec.setAttribute('placeholder',"Votre email SVP");
							    }); 
							}
						}
					});
				}
				else {
					const https = require('https')
				    https.get("https://emailvalidation.abstractapi.com/v1/?api_key=84957fa29d774d298b8f093657e03c88&email="+mail, (resp) => {
				      let data = "";
				      resp.on("data", (chunk) => {
				        data += chunk;
				      });
				      resp.on("end", () => {
				      	var rep = JSON.parse(data);
				      	if ((rep.deliverability == 'UNDELIVERABLE') || (rep.deliverability == 'UNKNOWN')) {
				      		if ($('.emailClientBis').val() != "") {
				      			$('.emailClientBis').val('');
				      			$('#idNoteEBis').addClass('err');
				      		}
				      		else { 
				      			$('.emailClient').val(''); 
				      			$('.noteE').addClass('err');
				      		}
				      		ec.setAttribute('placeholder',"Entrez un email valide SVP");
				      	}
				      	else {
				      		if (window.innerWidth < 992) { 
								$("#idAttenteEnvoiMailBis").removeClass('non');
								$("#idAttenteEnvoiMailBis").addClass('oui');
							}
							else {
								$("#idAttenteEnvoiMail").removeClass('non');
								$("#idAttenteEnvoiMail").addClass('oui');
							}
					      	const nouvelleNote = { id : ec.id, laNObj : newNote, laN : n, leMail : mail, nExists : 'NON' };
					      	Meteor.call('ajoutNote', nouvelleNote, function(err, result){
					      		if (window.innerWidth < 992) { 
									$("#idAttenteEnvoiMailBis").removeClass('oui');
									$("#idAttenteEnvoiMailBis").addClass('non');
								}
								else {
									$("#idAttenteEnvoiMail").removeClass('oui');
									$("#idAttenteEnvoiMail").addClass('non');
								}
					      		if (err || (result != 'sent')) {
					      			if ($('.emailClientBis').val() != "") {
					      				$("#idNoteEmailBis").addClass('error');
					      				document.querySelector('.emailClientBis').setAttribute('placeholder',"Votre email SVP");
										$('#idNoteEBis').addClass('error'); 
					      			}
					      			else {  
										ec.setAttribute('placeholder',"Votre email SVP");
										$('.noteE').addClass('error');  
					      			}
					      		}
					      		else {
					      			if ($('.emailClientBis').val() != "") {
						      			$("#idAlertConfirmBis").removeClass('non');
										$("#idAlertConfirmBis").addClass('oui');

										$("#idNoteEmailBis").removeClass('oui');
										$("#idNoteEBis").removeClass('error');
										$("#idNoteEmailBis").addClass('non');
										$("#idCrayonBis").removeClass('crayonVert');
						      		}
						      		else { 
						      			$("#idAlertConfirm").removeClass('non');
										$("#idAlertConfirm").addClass('oui');

										$(".noteEmail").removeClass('oui');
										$(".noteE").removeClass('error');
										$(".noteEmail").addClass('non');
										$(".crayon").removeClass('crayonVert');
						      		}
					      		}
					      	});
						}
				      });
				    }).on("error", (err) => {
				    	ec.setAttribute('placeholder',"Votre email SVP");
				    });
				}				
			}
		},
		'click #idConfirmModifOui' : function(event, instance){
			event.preventDefault();
			$("#idAttenteEnvoiMail").removeClass('non');
			$("#idAttenteEnvoiMail").addClass('oui');
			var s = Session.get('leS');
            const nN = Session.get('newN');
            const id = Session.get('lId');
            const m = Session.get('leM');
            const n = parseFloat(Session.get('laNote'));
			const nouvelleNote = { id : id, laNObj : nN, laN : n, leMail : m, nExists : 'OUI' };
	      	Meteor.call('modifNote', nouvelleNote, function(err, result){
	      		$("#idAttenteEnvoiMail").removeClass('oui');
				$("#idAttenteEnvoiMail").addClass('non');
	      		if (err || (result != 'sent')) {
	      			document.querySelector('.emailClientBis').setAttribute('placeholder',"Votre email SVP");
					$('#idNoteEBis').addClass('error');  
	      		}
	      		else {	      			 
	      			$("#idAlertConfirm").removeClass('non');
					$("#idAlertConfirm").addClass('oui');
					$("#idNoteEBis").removeClass('error');
	      		}
	      		$("#idConfirmModifNote").removeClass('oui');
				$("#idConfirmModifNote").addClass('non');
	      	});
		},
		'click #idConfirmModifOuiBis' : function(event, instance){
			event.preventDefault();
			$("#idAttenteEnvoiMailBis").removeClass('non');
			$("#idAttenteEnvoiMailBis").addClass('oui');
			var s = Session.get('leS');
            const nN = Session.get('newN');
            const id = Session.get('lId');
            const m = Session.get('leM');
            const n = parseFloat(Session.get('laNote'));
			const nouvelleNote = { id : id, laNObj : nN, laN : n, leMail : m, nExists : 'OUI' };
	      	Meteor.call('modifNote', nouvelleNote, function(err, result){
	      		$("#idAttenteEnvoiMailBis").removeClass('oui');
				$("#idAttenteEnvoiMailBis").addClass('non');
	      		if (err || (result != 'sent')) {
	      			document.querySelector('.emailClient').setAttribute('placeholder',"Votre email SVP"); 
					$('.noteE').addClass('error'); 
	      		}
	      		else {	      			 
	      			$("#idAlertConfirmBis").removeClass('non');
					$("#idAlertConfirmBis").addClass('oui');
					$(".noteE").removeClass('error');
	      		}
	      		$("#idConfirmModifNoteBis").removeClass('oui');
				$("#idConfirmModifNoteBis").addClass('non');
	      	});
		},
		'click #idConfirmModifNon' : function(event, instance){
			event.preventDefault();
			$("#idConfirmModifNote").removeClass('oui');
			$("#idConfirmModifNote").addClass('non');

			$(".noteEmail").removeClass('non');
			$(".noteEmail").addClass('oui');
			$(".crayon").addClass('crayonVert');	
		},
		'click #idConfirmModifNonBis' : function(event, instance){
			event.preventDefault();
			$("#idConfirmModifNoteBis").removeClass('oui');
			$("#idConfirmModifNoteBis").addClass('non');

			$("#idNoteEmailBis").removeClass('non');
			$("#idNoteEmailBis").addClass('oui');
			$("#idCrayonBis").addClass('crayonVert');	
		},
		'click #idDMESaleeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESalee');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMESaleePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMESaleeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMESaleePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESalee');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMESaleeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMESaleePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMESucreeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESucree');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMESucreePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMESucreeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMESucreePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESucree');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMESucreeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMESucreePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMPFraisNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMPFraisPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMPFraisNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMPFraisPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMPFraisNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMPFraisPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFLegumesNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMFLegumesPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMFLegumesNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFLegumesPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMFLegumesNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMFLegumesPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPoissVolNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMBPoissVolPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMBPoissVolNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPoissVolPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMBPoissVolNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMBPoissVolPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBVinLiqNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMBVinLiqPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMBVinLiqNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBVinLiqPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMBVinLiqNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMBVinLiqPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPatisserieNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMBPatisseriePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMBPatisserieNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPatisseriePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMBPatisserieNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMBPatisseriePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFFoodNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFFood');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMFFoodPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMFFoodNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFFoodPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFFood');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMFFoodNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMFFoodPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESaleeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESalee');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPESaleePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPESaleeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESaleePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESalee');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPESaleeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPESaleePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESucreeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESucree');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPESucreePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPESucreeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESucreePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESucree');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPESucreeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPESucreePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPPFraisNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPPFraisPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPPFraisNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPPFraisPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPPFraisNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPPFraisPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFLegumesNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPFLegumesPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPFLegumesNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFLegumesPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPFLegumesNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPFLegumesPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPoissVolNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBPoissVolPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBPoissVolNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPoissVolPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBPoissVolNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBPoissVolPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBVinLiqNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBVinLiqPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBVinLiqNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBVinLiqPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBVinLiqNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBVinLiqPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPatisserieNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBPatisseriePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBPatisserieNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPatisseriePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBPatisserieNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBPatisseriePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFFoodNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFFood');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPFFoodPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPFFoodNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFFoodPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFFood');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPFFoodNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPFFoodPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBazarNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBazar');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBazarPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBazarNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBazarPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBazar');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBazarNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBazarPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		}
	});

Template.tmplteContact.events({
	'click #idEnvoiMail' : function(event, instance){
		event.preventDefault();
		var mailContact = $('#idInputContactEmail').val();
		var objetContact = $('#idObjetContact').val();
		var messageContact = $('#idMessageContact').val();
		if (mailContact == "" || objetContact == "" || messageContact == "") {
			if (mailContact == "") { 
				document.querySelector('#idInputContactEmail').setAttribute('placeholder',"Votre email SVP");
				$('#idInputContactEmail').addClass('error');
			}
			else { $('#idInputContactEmail').removeClass('error'); }
			if (objetContact == "") { 
				document.querySelector('#idObjetContact').setAttribute('placeholder',"L'objet du mail SVP");
				$('#idObjetContact').addClass('error');
			}
			else { $('#idObjetContact').removeClass('error'); }
			if (messageContact == "") { 
				$('#idMessageContact').val("Votre message SVP");
				$('#idMessageContact').addClass('error');
			}
			else { $('#idMessageContact').removeClass('error'); }
		}
		else {
			Session.set('mContact', mailContact);
			Session.set('objContact', objetContact);
			Session.set('msgContact', messageContact);
			$('#idInputContactEmail').removeClass('error');
			$('#idObjetContact').removeClass('error');
			$('#idMessageContact').removeClass('error');
			$("#idEnvoiMail").removeClass('oui');			
			$("#idEnvoiMail").addClass('non');			
  			$("#idConfirmEnvoiMail").removeClass('non');
			$("#idConfirmEnvoiMail").addClass('oui');
		}
	},
	'click #idConfirmEnvoiMailNON' : function(event, instance){
		event.preventDefault();
		Session.set('mContact', '');
		Session.set('objContact', '');
		Session.set('msgContact', '');						
		$("#idConfirmEnvoiMail").removeClass('oui'); 
		$("#idConfirmEnvoiMail").addClass('non');
		$("#idEnvoiMail").removeClass('non');
		$("#idEnvoiMail").addClass('oui');
	},
	'click #idConfirmEnvoiMailOUI' : function(event, instance){
		event.preventDefault();
		$("#idConfirmEnvoiMail").removeClass('oui');
		$("#idConfirmEnvoiMail").addClass('non');
		$("#idAttenteEnvoiMail").removeClass('non');
		$("#idAttenteEnvoiMail").addClass('oui');
		
		const mC = Session.get('mContact');
		const oC = Session.get('objContact');
		const msgC = Session.get('msgContact');
		const m = { mC : mC, oC : oC, msgC : msgC }
		Meteor.call('envoiEmail', m, function(err, result){
			$("#idAttenteEnvoiMail").removeClass('oui');
			$("#idAttenteEnvoiMail").addClass('non');
			if (err) {
				$('#idInputContactEmail').addClass('error');
				$('#idObjetContact').addClass('error');
				$('#idMessageContact').addClass('error');
				$("#idEnvoiMail").removeClass('non');
				$("#idEnvoiMail").addClass('oui');
			}
			else {
				if (result == 'sent') {
					Session.set('mContact', '');
					Session.set('objContact', '');
					Session.set('msgContact', '');

			      	$('#idInputContactEmail').val('');
					$('#idObjetContact').val('');
					$('#idMessageContact').val('');
					$("#idAlertConfirmContact").removeClass('non');
					$("#idAlertConfirmContact").addClass('oui');
				}
				else {
					const rlength = result.length;
					for (var i = 0; i < rlength; i++) {
						switch (result[i].name){
							case 'mC' : $('#idInputContactEmail').addClass('error'); break;
							case 'oC' : $('#idObjetContact').addClass('error'); break;
							case 'msgC' : $('#idMessageContact').addClass('error'); break;
							default : 
								$('#idInputContactEmail').addClass('error');
								$('#idObjetContact').addClass('error');
								$('#idMessageContact').addClass('error'); 
						}
					}
					$("#idConfirmEnvoiMail").removeClass('oui');
					$("#idConfirmEnvoiMail").addClass('non');
					$("#idEnvoiMail").removeClass('non');
					$("#idEnvoiMail").addClass('oui');
				}
			}
		});
	},
	'click #idClose' : function(event, instance){
		event.preventDefault();
		$("#idAlertConfirmContact").removeClass('oui');
		$("#idAlertConfirmContact").addClass('non');
		$("#idEnvoiMail").removeClass('non');
		$("#idEnvoiMail").addClass('oui');
	}	
});

Template.tmplteUsers.events({
	'click #login-sign-in-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click .login-close-text' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		var eft = document.getElementById('login-dropdown-list');
		prt.removeChild(eft);
	},
	'click #login-buttons-password' : function(event, instance){
		event.preventDefault();
		var loginMail = $('#login-email').val();
		var loginPass = $('#login-password').val();
        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
            if(!err){ 
            	$('#idErrLogin').removeClass('oui');
	            $('#idErrLogin').addClass('non');
            }
            else{
	           $('#idErrLogin').removeClass('non');
	           $('#idErrLogin').addClass('oui');
	          }
        });
	},
	'click #login-name-link' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #idChangePwd' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-ChangePwd' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalModifPassword', Meteor.userId());
	},
	'click #forgot-password-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form'>" +
            "<div id='forgot-password-email-label-and-input'>" +
              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
            "</div>" +
			"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
              "Reset du Mot de Passe" +
            "</div>" +
            "<div class='additional-link-container'>" +
            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
            "</div>" +
            "<div id='idErrReset' class='error non errReset'>Reset password échoué</div>" +
            "<div id='idSuccReset' class='vert non succReset'>Reset password réussi. Vérifiez votre mail</div>" +
          "</form>" +
        "</div>";
	},
				'click #login-buttons-forgot-password' : function(event, instance){
					event.preventDefault();
				    let email = $('#forgot-password-email').val();
				    Accounts.forgotPassword({email: email}, function (e, r) {
				        if (e) {
				            $('#idErrReset').removeClass('non');
				            $('#idErrReset').addClass('oui');
				        } else {
				        	$('#idErrReset').addClass('non');
				            $('#idSuccReset').removeClass('non');
				            $('#idSuccReset').addClass('oui');
				        }
				    }); 
				},
	'click #back-to-login-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
	'click .js-siteUtilisateur' : function(event, instance){
		event.preventDefault();
		Session.set('utilisateurChoisi', $(event.currentTarget).[0].id);
		Modal.show('tmplteModalForgotPassword');
	},
	'click #idLesUtilisateurs' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalNouvelUtilisateur');
	}	
});
	Template.tmplteModalNouvelUtilisateur.events({
		'click #idSubmitNewUser' : function(event, instance){
			event.preventDefault();
			if ($('#idMailNewUser').val() != '') {
				$('#idSubmitNewUser').addClass('non');
				$('#idMailNewUser').addClass('non');
				$('#idSubmitNewUserConfirm').removeClass('non');
			    $('#idSubmitNewUserConfirm').addClass('oui');
			    $('#idErrorMailNewUser').removeClass('oui'); 
			 	$('#idErrorMailNewUser').addClass('non');
			}
			else {
				$('#idErrorMailNewUser').removeClass('non'); 
			 	$('#idErrorMailNewUser').addClass('oui'); 
			}	
		},
		'click #idSubmitNewUserConfirm' : function(event, instance){
			event.preventDefault();
			const user = { m : $('#idMailNewUser').val(), p : 'password', typeUser : 'u' };

			Meteor.call('creationUser', user, function(err, result){
			 	if (err || (result.length > 18)) {
			 		$('#idErrorMailNewUser').removeClass('non'); 
			 		$('#idErrorMailNewUser').addClass('oui'); 
			 		$('#idMailNewUser').removeClass('non');
			 		$('#idMailNewUser').addClass('oui');
			 		$('#idSubmitNewUser').removeClass('non');
			 		$('#idSubmitNewUser').addClass('oui');
					$('#idSubmitNewUserConfirm').removeClass('oui');
		    		$('#idSubmitNewUserConfirm').addClass('non');
			 	}
			 	else { 	
			 		$('#idModalNouvelUtilisateur').modal('hide');
			 	}
			});
		}
	});
	Template.tmplteModalForgotPassword.events({
		'click #idSuppUtilisateur' : function(event, instance){
			event.preventDefault();
			const usr = Meteor.users.findOne({_id: Session.get('utilisateurChoisi')}); 
			if (usr.profile == 'userApp') {
				$('#idErrorForgotPwd').removeClass('non'); 
	 			$('#idErrorForgotPwd').addClass('oui'); 
	 			 $('#idBloqUserDiv').addClass('non');
			}
			else {
				Session.set('usrSupp',usr);
				$('#idSuppUtilisateur').addClass('non');
				$('#idSuppUtilisateurDiv').removeClass('non');
			    $('#idSuppUtilisateurDiv').addClass('oui');
			    $('#idBloqUserDiv').addClass('non');
			}
		},
		'click #idBloqUtilisateur' : function(event, instance){
			event.preventDefault();
			$('#idBloqUtilisateur').addClass('non');
			$('#idBloqUtilisateurDiv').removeClass('non');
		    $('#idBloqUtilisateurDiv').addClass('oui');
		    $('#idSuppUserDiv').addClass('non');
		},
		'click #idSuppUser' : function(event, instance){
			event.preventDefault();
			const usr = Session.get('usrSupp'); 
			Meteor.call('supprimerUser',  {id : usr._id, profileUser : usr.profile}, function(err, result){
			 	if (err) {
			 		$('#idErrorForgotPwd').removeClass('non'); 
	 				$('#idErrorForgotPwd').addClass('oui');  
			 	}
			 	else { 	
			 		$('#idModalForgotPassword').modal('hide');
			 	}
			});
		},
		'click #idBloqUser' : function(event, instance){
			event.preventDefault();
			const utilisateurChoisi = Session.get('utilisateurChoisi');
			$('#idBloqUser').addClass('non');

			const usr = Meteor.users.findOne({_id: utilisateurChoisi});
			const nbreUA = Meteor.users.find({profile:'userApp'}).count();
			Session.set('utilisateurBlkDblk',usr);
			if ((usr.profile == 'user') || ((usr.profile == 'userApp') && (nbreUA >= 2))) {
				$('#idBloq').removeClass('non');
				$('#idBloq').addClass('oui');
			}
			else if ((usr.profile == 'userApp') && (nbreUA < 2)) {
				$('#idErrorForgotPwd').removeClass('non'); 
	 			$('#idErrorForgotPwd').addClass('oui');
			}
			else {
				$('#idDebloq').removeClass('non');
				$('#idDebloq').addClass('oui');
			}				
		},
		'click #idBloq' : function(event, instance){
			event.preventDefault();
			const utilisateurBlkDblk = Session.get('utilisateurBlkDblk');
	 		Meteor.call('bloquerUser', {idUser : utilisateurBlkDblk._id, profileUser : utilisateurBlkDblk.profile}, function(err, result){
			 	if (err) {
			 		$('#idErrorForgotPwd').removeClass('non'); 
	 				$('#idErrorForgotPwd').addClass('oui');  
			 	}
			 	else { $('#idModalForgotPassword').modal('hide'); }
			});		
		},
		'click #idDebloq' : function(event, instance){
			event.preventDefault();
			const utilisateurBlkDblk = Session.get('utilisateurBlkDblk');
	 		Meteor.call('debloquerUser', {idUser : utilisateurBlkDblk._id, profileUser : utilisateurBlkDblk.profile}, function(err, result){
			 	if (err) {
			 		$('#idErrorForgotPwd').removeClass('non'); 
	 				$('#idErrorForgotPwd').addClass('oui');  
			 	}
			 	else { $('#idModalForgotPassword').modal('hide'); }
			});		
		},
	});

Template.tmplteMySpace.events({
	'click #login-sign-in-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click .login-close-text' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		var eft = document.getElementById('login-dropdown-list');
		prt.removeChild(eft);
	},
	'click #login-buttons-password' : function(event, instance){
		event.preventDefault();
		var loginMail = $('#login-email').val();
		var loginPass = $('#login-password').val();
        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
            if(!err){ 
            	$('#idErrLogin').removeClass('oui');
	            $('#idErrLogin').addClass('non');
            }
            else{
	           $('#idErrLogin').removeClass('non');
	           $('#idErrLogin').addClass('oui');
	          }
        });
	},
	'click #login-name-link' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #idChangePwd' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-ChangePwd' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalModifPassword', Meteor.userId());
	},
	'click #forgot-password-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form'>" +
            "<div id='forgot-password-email-label-and-input'>" +
              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
            "</div>" +
			"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
              "Reset du Mot de Passe" +
            "</div>" +
            "<div class='additional-link-container'>" +
            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
            "</div>" +
            "<div id='idErrReset' class='error non errReset'>Reset password échoué</div>" +
            "<div id='idSuccReset' class='vert non succReset'>Reset password réussi. Vérifiez votre mail</div>" +
          "</form>" +
        "</div>";
	},
				'click #login-buttons-forgot-password' : function(event, instance){
					event.preventDefault();
				    let email = $('#forgot-password-email').val();
				    Accounts.forgotPassword({email: email}, function (e, r) {
				        if (e) {
				            $('#idErrReset').removeClass('non');
				            $('#idErrReset').addClass('oui');
				        } else {
				        	$('#idErrReset').addClass('non');
				            $('#idSuccReset').removeClass('non');
				            $('#idSuccReset').addClass('oui');
				        }
				    }); 
				},
	'click #back-to-login-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
	'click #idDMESaleeNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMESalee');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMESaleePrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMESaleeNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMESaleePrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMESalee');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMESaleeNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMESaleePrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMESucreeNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMESucree');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMESucreePrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMESucreeNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMESucreePrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMESucree');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMESucreeNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMESucreePrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMPFraisNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMPFrais');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMPFraisPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMPFraisNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMPFraisPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMPFrais');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMPFraisNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMPFraisPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMFLegumesNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMFLegumes');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMFLegumesPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMFLegumesNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMFLegumesPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMFLegumes');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMFLegumesNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMFLegumesPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMBPoissVolNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMBPoissVol');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMBPoissVolPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMBPoissVolNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMBPoissVolPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMBPoissVol');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMBPoissVolNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMBPoissVolPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMBVinLiqNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMBVinLiq');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMBVinLiqPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMBVinLiqNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMBVinLiqPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMBVinLiq');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMBVinLiqNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMBVinLiqPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMBPatisserieNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMBPatisserie');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMBPatisseriePrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMBPatisserieNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMBPatisseriePrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMBPatisserie');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMBPatisserieNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMBPatisseriePrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMFFoodNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMFFood');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idDMFFoodPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idDMFFoodNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idDMFFoodPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselDMFFood');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idDMFFoodNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idDMFFoodPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPESaleeNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPESalee');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPESaleePrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPESaleeNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPESaleePrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPESalee');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPESaleeNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPESaleePrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPESucreeNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPESucree');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPESucreePrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPESucreeNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPESucreePrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPESucree');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPESucreeNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPESucreePrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPPFraisNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPPFrais');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPPFraisPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPPFraisNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPPFraisPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPPFrais');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPPFraisNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPPFraisPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPFLegumesNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPFLegumes');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPFLegumesPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPFLegumesNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPFLegumesPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPFLegumes');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPFLegumesNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPFLegumesPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBPoissVolNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBPoissVol');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPBPoissVolPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPBPoissVolNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBPoissVolPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBPoissVol');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPBPoissVolNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPBPoissVolPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBVinLiqNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBVinLiq');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPBVinLiqPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPBVinLiqNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBVinLiqPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBVinLiq');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPBVinLiqNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPBVinLiqPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBPatisserieNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBPatisserie');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPBPatisseriePrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPBPatisserieNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBPatisseriePrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBPatisserie');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPBPatisserieNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPBPatisseriePrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPFFoodNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPFFood');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPFFoodPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPFFoodNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPFFoodPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPFFood');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPFFoodNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPFFoodPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBazarNext' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBazar');
		var index = parseInt(offre.getAttribute('tabindex')) + 1;
		if (index < offre.children.length) {
			const offrePrev = document.getElementById('idPBazarPrev');
			if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
				offrePrev.classList.remove('myCarousel__prev-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offreNext = document.getElementById('idPBazarNext');
			if ((index+1) >= offre.children.length) { 
				offreNext.classList.add('myCarousel__next-hidden');
			}
			else { offreNext.classList.remove('myCarousel__next-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	},
	'click #idPBazarPrev' : function(event, instance){
		event.preventDefault();
		var offre = document.getElementById('idCarouselPBazar');
		var index = parseInt(offre.getAttribute('tabindex')) - 1;
		if (index >= 0) {
			const offreNext = document.getElementById('idPBazarNext');
			if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
				offreNext.classList.remove('myCarousel__next-hidden');
			}
			let translateX = index * (-320);
			offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			const offrePrev = document.getElementById('idPBazarPrev');
			if (index <= 0) { 
				offrePrev.classList.add('myCarousel__prev-hidden');
			}
			else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
			offre.setAttribute('tabindex', index);
		}
	}
});

	Template.tmplteChaqueSiteMySpace.events({
		'click .js-modif-site' : function(event, instance){
			event.preventDefault();
			Session.set('lUser',instance.data.uSite._id);
			Modal.show('tmplteModalModifSiteMySpace', instance.data);
		}
	});
	Template.tmplteModalModifSiteMySpace.onCreated(function(){
		this.subscribe('toutesLesPromos_SiteDetailSub', Session.get('lUser'));
		this.subscribe('lesImagesSub');
		this.subscribe('userData');
	});
	Template.tmplteModalModifSiteMySpace.events({
		'click .js-modifInfos-site' : function(event, instance){
			event.preventDefault();
			$( event.target ).toggleClass('On');
		},
		'click .js-btn-promotion' : function(event, instance){
			event.preventDefault();

			$('#idConfirmation').removeClass('confirmationNON');
			$('#idConfirmation').addClass('confirmationOUI');

			$('#idConfirmPromotion').removeClass('non');
			$('#idConfirmPromotion').addClass('oui');
			$('#idConfirmAnnul').removeClass('non');
			$('#idConfirmAnnul').addClass('oui');

			$('#idModalModifSite').animate({
					scrollTop : 0
			}, 0);					
		},
		'click #idConfirmAnnul' : function(event, instance){
			event.preventDefault();
			$('#idConfirmation').removeClass('confirmationOUI');
			$('#idConfirmation').addClass('confirmationNON');
		},
		'change [name="selectTypePromo"]' : function(event, instance){
			event.preventDefault();
			let typPromo = $( event.target ).find( 'option:selected' ).val();
			$('#idSelectRayonPromo').val('--');
			if (typPromo == '--') {
				$('#idRayonPromo').addClass('non');
				$('#idDefinitionPromo').addClass('non');
				$('#idValidationPromo').addClass('non');
			}
			else {
				$('#idRayonPromo').removeClass('non');
				$('#idRayonPromo').addClass('oui');

				$('#idDefinitionPromo').addClass('non');
				$('#idValidationPromo').addClass('non');

				if (typPromo == 'dernierMarche') {
					$('#idSelectRayonPromoBazar').removeClass('oui');
					$('#idSelectRayonPromoBazar').addClass('non');
				}
				else {
					$('#idSelectRayonPromoBazar').removeClass('non');
					$('#idSelectRayonPromoBazar').addClass('oui');
				}
			}
			$('#idModalModifSite').animate({
				scrollTop : 0
			}, 300);
		},
		'change [name="selectRayonPromo"]' : function(event, instance){
			event.preventDefault();
			let typPromo = $( event.target ).find( 'option:selected' ).val();
			if (typPromo == '--') {
				$('#idDefinitionPromo').addClass('non');
				$('#idValidationPromo').addClass('non');
			}
			else {
				$('#idDefinitionPromo').removeClass('non');
				$('#idDefinitionPromo').addClass('oui');

				$('#idValidationPromo').removeClass('non');
				$('#idValidationPromo').addClass('oui');
			}
			const hauteurDevice = window.innerHeight;
			if (hauteurDevice < 560) {
				$('#idModalModifSite').animate({
					scrollTop : 430
				}, 300);
			}
			else if (hauteurDevice >= 560 && hauteurDevice < 635) {
				$('#idModalModifSite').animate({
					scrollTop : 520
				}, 300);
			}
			else if (hauteurDevice >= 635 && hauteurDevice < 1024) {
				$('#idModalModifSite').animate({
					scrollTop : 350
				}, 300);
			}
		},
		'submit .js-ajout-promotion' : function(event, instance){ 
			event.preventDefault();
			$('#idSelectTypePromo').remove('error');
			$('#idSelectRayonPromo').remove('error');
			$('#idNomProduit').remove('error');
			//$('#idQuantiteProduit').remove('error');
			$('#idPrixProduit').remove('error');
			// $('#idExpProduit').remove('error'); 
			$('#idRemisePromotion').remove('error');
			$('#idExpPromotion').remove('error');
			$('#idDetailPromotion').remove('error');

			var typePromo = $('#idSelectTypePromo').val();
			var rayonPromo = $('#idSelectRayonPromo').val(); 

			if ( !lesTypesDePromo.includes(typePromo) ){
				$('#idSelectTypePromo').addClass('error');
			}
			if ( !lesRayonsDePromo.includes(rayonPromo) ) {
				$('#idSelectRayonPromo').addClass('error');
			}
			else {
				var nomProduit = $('#idNomProduit').val();
				var identifiantPromo = instance.data.uSite.siteEspace+"_"+instance.data.uSite.siteQuartier+"_"+nomProduit;
				nomProduit = nomProduit.toUpperCase();
				identifiantPromo = identifiantPromo.toUpperCase();
				//const qteProduit = $('#idQuantiteProduit').val();

				var tofProduit = Session.get('objImg'); 
				const laTof = ImagesPromo.findOne({_id : tofProduit});
				const urlTof = laTof.urlImage;

				const prixProduit = parseInt($('#idPrixProduit').val());
				// const expirationProduit = $('#idExpProduit').val();
				const remisePromotion = parseInt($('#idRemisePromotion').val());
				const expirationPromotion = $('#idExpPromotion').val();
				const detailPromotion = $('#idDetailPromotion').val();
				const promoPrix = parseInt(prixProduit-(prixProduit*remisePromotion/100));
				// const dteExpProduit = new Date(expirationProduit);
				var dteExpPromo = new Date(expirationPromotion);
				const dte = new Date();	
				const siteDte = laDate(dte);
				if ((dteExpPromo.getTime() + 82800000 >= dte.getTime())) {
					// const leSiteP = Sites.findOne({_id: instance.data.uSite._id});
					const newPromo = {
						idPromotion : identifiantPromo,
						idSitePromo : instance.data.uSite._id,
						typeDePromo : typePromo,
						rayonDePromo : rayonPromo,
						produitNom : nomProduit,
						//produitQte : qteProduit,
						idTofPromo : tofProduit,
						produitTof : urlTof,
						produitPrix : prixProduit,
						prixPromo : promoPrix,
						// produitExpiration : dteExpProduit,
						// produitExp : laDate(dteExpProduit),
						promoRemise : remisePromotion,
						promoExpiration : new Date(expirationPromotion),
						promoExpirationTime : dteExpPromo.getTime(),
						promoDateExp : laDate(dteExpPromo),
						promoDetail : detailPromotion,
						promoDateCreation : siteDte
					}
					Meteor.call('creationPromo', newPromo, function(err, result){
						if (err) {
							$('#idSelectTypePromo').addClass('error');
							$('#idSelectRayonPromo').addClass('error');
							$('#idNomProduit').addClass('error');
							//$('#idQuantiteProduit').addClass('error');
							$('#idPrixProduit').addClass('error');
							// $('#idExpProduit').addClass('error'); 
							Session.set('objImg', '');
							$('#idRemisePromotion').addClass('error');
							$('#idExpPromotion').addClass('error');
							$('#idDetailPromotion').addClass('error');	

						}
						else {
							if (result == 'sent') {
								$('#idSelectTypePromo').val('--');
								$('#idSelectRayonPromo').val('--');
								$('#idNomProduit').val('');
								//$('#idQuantiteProduit').val('');
								$('#idPrixProduit').val('');
								// $('#idExpProduit').val(''); 
								Session.set('objImg', '');
								$('#idRemisePromotion').val('');
								$('#idExpPromotion').val('');
								$('#idDetailPromotion').val('');
								$('#idConfirmation').removeClass('confirmationOUI');
								$('#idConfirmation').addClass('confirmationNON');
								$('#idModalModifSite').modal('hide');

								Meteor.call('ajoutPromoSite', {id : instance.data.uSite._id, newPromo : newPromo}, function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');
									}
									else { 
										// if (leSiteP.siteInizio == 'SI') {
										// 	Meteor.call('modifBlockSite', { id : leSiteP._id, siteB : 'NON', dte : siteDte, sI : 'NO' }, function(err, result){
										// 		if (err || (result != 'OK')) {
										// 			$('#idNotification').removeClass('notificationNON');
										// 			$('#idNotification').addClass('notificationOUI');
										// 		}
										// 	});
										// }
										Modal.hide(); 
									}
								});
							}
							else {
								const rlength = result.length;
								for (var i = 0; i < rlength; i++) {
									switch (result[i].name){
										case 'typeDePromo' : $('#idSelectTypePromo').addClass('error'); break;
										case 'rayonDePromo' : 
											$('#idSelectRayonPromo').addClass('error');									
											break;
										case 'produitNom' : 
											$('#idNomProduit').addClass('error'); 
											const nomP = $('#idNomProduit').val();
											$('#idNomProduit').val(''); 
											document.getElementById('idNomProduit').setAttribute('placeholder', nomP);
											break;
										// case 'produitQte' : 
										// 	$('#idQuantiteProduit').addClass('error'); 
										// 	const qteP = $('#idQuantiteProduit').val();
										// 	$('#idQuantiteProduit').val(''); 
										// 	document.getElementById('idQuantiteProduit').setAttribute('placeholder', qteP);
										// 	break;
										case 'produitPrix' : 
											$('#idPrixProduit').addClass('error'); 
											const pP = $('#idPrixProduit').val();
											$('#idPrixProduit').val(''); 
											document.getElementById('idPrixProduit').setAttribute('placeholder', pP);
											break;
										// case 'produitExpiration' : 
										// 	$('#idExpProduit').addClass('error'); 
										// 	const expP = $('#idExpProduit').val();
										// 	$('#idExpProduit').val(''); 
										// 	document.getElementById('idExpProduit').setAttribute('placeholder', expP);
										// 	break;
										case 'promoRemise' : 
											$('#idRemisePromotion').addClass('error'); 
											const remPro = $('#idRemisePromotion').val();
											$('#idRemisePromotion').val(''); 
											document.getElementById('idRemisePromotion').setAttribute('placeholder', remPro);
											break;
										case 'promoExpiration' : 
											$('#idExpPromotion').addClass('error');
											const expPromo = $('#idExpPromotion').val();
											$('#idExpPromotion').val(''); 
											document.getElementById('idExpPromotion').setAttribute('placeholder', expPromo); 
											break;
										case 'promoDetail' : 
											$('#idDetailPromotion').addClass('error'); 
											const detailPromo = $('#idDetailPromotion').val();
											$('#idDetailPromotion').val(''); 
											document.getElementById('idDetailPromotion').setAttribute('placeholder', detailPromo);
											break;										
										default :
											$('#idSelectTypePromo').addClass('error');
											$('#idSelectRayonPromo').addClass('error');
											$('#idNomProduit').addClass('error');
											//$('#idQuantiteProduit').addClass('error');
											$('#idPrixProduit').addClass('error');
											// $('#idExpProduit').addClass('error'); 
											$('#idRemisePromotion').addClass('error');
											$('#idExpPromotion').addClass('error');
											$('#idDetailPromotion').addClass('error'); 
									}
								}
							}
						}								
					});
				}
				else { $('#idExpPromotion').addClass('error'); }
			}
			$('#idConfirmation').removeClass('confirmationNON');
			$('#idConfirmation').addClass('confirmationOUI');
		}
	});

Template.tmplteCreationEspace.onCreated(function(){
	this.subscribe('tousLesEspacesSub');
});
Template.tmplteCreationEspace.events({
	'click #login-sign-in-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click .login-close-text' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		var eft = document.getElementById('login-dropdown-list');
		prt.removeChild(eft);
	},
	'click #login-buttons-password' : function(event, instance){
		event.preventDefault();
		var loginMail = $('#login-email').val();
		var loginPass = $('#login-password').val();
        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
            if(!err){ 
            	$('#idErrLogin').removeClass('oui');
	            $('#idErrLogin').addClass('non');
            }
            else{
	           $('#idErrLogin').removeClass('non');
	           $('#idErrLogin').addClass('oui');
	          }
        });
	},
	'click #login-name-link' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #idChangePwd' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-ChangePwd' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalModifPassword', Meteor.userId());
	},
	'click #forgot-password-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form'>" +
            "<div id='forgot-password-email-label-and-input'>" +
              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
            "</div>" +
			"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
              "Reset du Mot de Passe" +
            "</div>" +
            "<div class='additional-link-container'>" +
            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
            "</div>" +
            "<div id='idErrReset' class='error non errReset'>Reset password échoué</div>" +
            "<div id='idSuccReset' class='vert non succReset'>Reset password réussi. Vérifiez votre mail</div>" +
          "</form>" +
        "</div>";
	},
				'click #login-buttons-forgot-password' : function(event, instance){
					event.preventDefault();
				    let email = $('#forgot-password-email').val();
				    Accounts.forgotPassword({email: email}, function (e, r) {
				        if (e) {
				            $('#idErrReset').removeClass('non');
				            $('#idErrReset').addClass('oui');
				        } else {
				        	$('#idErrReset').addClass('non');
				            $('#idSuccReset').removeClass('non');
				            $('#idSuccReset').addClass('oui');
				        }
				    }); 
				},
	'click #back-to-login-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
	'submit .js-new-espace' : function(event, instance){
		event.preventDefault();
		var newEspaceNom = $('#idNomEspace').val();
		newEspaceNom = newEspaceNom.toUpperCase();
		const nbreEspace = Espaces.find({espaceNom : newEspaceNom}).count();
		if (nbreEspace > 0) { $('#modalEspaceAlreadyCreated').modal('show'); }
		else { $('#modalCreationEspace').modal('show'); }
	},
	'click .js-new-espace-confirm' : function(event, instance){
		event.preventDefault();
		$('#idNomEremoveClass').removeClass('error');
		$('#idVilleEspace').removeClass('error');
		$('#idContactEspace').removeClass('error');
		$('#idMailEspace').removeClass('error');
		var newEspaceNom = $('#idNomEspace').val();
		newEspaceNom = newEspaceNom.toUpperCase();
		var newEspaceVille = $('#idVilleEspace').val();
		newEspaceVille = newEspaceVille.toUpperCase();
		var newEspaceContact = $('#idContactEspace').val();
		newEspaceContact = parseInt(newEspaceContact.trim());
		const newEspaceMail = $('#idMailEspace').val();
		var espCreaDate = new Date();
		espCreaDate = laDate(espCreaDate);
		var newEspace = {
			espaceNom : newEspaceNom,
			espaceVille : newEspaceVille,
			espaceContact : newEspaceContact,
			espaceMail : newEspaceMail,
			espaceDateCreation : espCreaDate,
			espaceBlocked : 'NON'
		}
		Meteor.call('creationEspace', newEspace, function(err, result){
			if (err) {
				$('#idNomEspace').addClass('error');
				document.getElementById('idNomEspace').setAttribute('placeholder', $('#idNomEspace').val());
				$('#idVilleEspace').addClass('error');
				document.getElementById('idVilleEspace').setAttribute('placeholder', $('#idVilleEspace').val());
				$('#idContactEspace').addClass('error');
				document.getElementById('idContactEspace').setAttribute('placeholder', $('#idContactEspace').val());
				$("#idMailEspace").addClass('error');
				document.getElementById('idMailEspace').setAttribute('placeholder', $('#idMailEspace').val());
			}
			else {
				if (result == 'sent') {
			      	$('#idNomEspace').val('');
					$('#idVilleEspace').val('');
					$('#idContactEspace').val('');
					$('#idMailEspace').val('');  
				}
				else {
					const rlength = result.length;
					for (var i = 0; i < rlength; i++) {
						switch (result[i].name){
							case 'espaceNom' : 
								$('#idNomEspace').addClass('error');
								const nE = $('#idNomEspace').val();
								$('#idNomEspace').val('');
								document.getElementById('idNomEspace').setAttribute('placeholder', nE);
								break;
							case 'espaceVille' : 
								$('#idVilleEspace').addClass('error'); 
								const vE = $('#idVilleEspace').val();
								$('#idVilleEspace').val('');
								document.getElementById('idVilleEspace').setAttribute('placeholder', vE);
								break;
							case 'espaceContact' : 
								$('#idContactEspace').addClass('error'); 
								const cE = $('#idContactEspace').val();
								$('#idContactEspace').val('');
								document.getElementById('idContactEspace').setAttribute('placeholder', cE);
								break;
							case 'espaceMail' : 
								$('#idMailEspace').addClass('error'); 
								const mE = $('#idMailEspace').val();
								$('#idMailEspace').val('');
								document.getElementById('idMailEspace').setAttribute('placeholder', mE);
								break;
							default :
								$('#idNomEspace').addClass('error');
								$('#idVilleEspace').addClass('error');
								$('#idContactEspace').addClass('error');
								$('#idMailEspace').addClass('error'); 
						}
					}
				}
			}
			$('#modalCreationEspace').modal('hide');
		});
	}
});
Template.tmplteEspaces.events({
	'click #login-sign-in-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click .login-close-text' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		var eft = document.getElementById('login-dropdown-list');
		prt.removeChild(eft);
	},
	'click #login-buttons-password' : function(event, instance){
		event.preventDefault();
		var loginMail = $('#login-email').val();
		var loginPass = $('#login-password').val();
        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
            if(!err){ 
            	$('#idErrLogin').removeClass('oui');
	            $('#idErrLogin').addClass('non');
            }
            else{
	           $('#idErrLogin').removeClass('non');
	           $('#idErrLogin').addClass('oui');
	          }
        });
	},
	'click #login-name-link' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #idChangePwd' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-ChangePwd' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalModifPassword', Meteor.userId());
	},
	'click #forgot-password-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form'>" +
            "<div id='forgot-password-email-label-and-input'>" +
              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
            "</div>" +
			"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
              "Reset du Mot de Passe" +
            "</div>" +
            "<div class='additional-link-container'>" +
            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email invalide</div>" +
          "</form>" +
        "</div>";
	},
				'click #login-buttons-forgot-password' : function(event, instance){
					event.preventDefault();
					const forgotPasswordMail = $('#forgot-password-email').val();
					var options = {};
					options.email = forgotPasswordMail;
					Accounts.forgotPassword(options, function(error){  
					    if (error) { 
							alert('erreur');
					    }
					    else{
					    	alert('Check your mailbox!');
					    } 
					});
				},
	'click #back-to-login-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
});
		Template.tmplteChaqueEspace.events({
			'click .js-modif-espace' : function(event, instance){
				event.preventDefault();
				Modal.show('tmplteModalModifEspace', instance.data);
			}
		});	
		Template.tmplteModalModifEspace.onCreated(function(){
			this.subscribe('tousLesEspacesSub');
			this.subscribe('tousLesSites_EspacesDispSub');
			this.subscribe('toutesLesVilles_EspacesDispSub');
				// this.subscribe('toutesLesVillesSub');
				// this.subscribe('toutesLesPromosSub');
				// this.subscribe('tousLesSitesSub');
		});
		Template.tmplteModalModifEspace.events({
			'click .js-btn-modifier' : function(event, instance){
				event.preventDefault();
				var espaceNomModified = $('#idModifNomEspace').val();
				espaceNomModified = espaceNomModified.toUpperCase();
				if (espaceNomModified != instance.data.espace.espaceNom) {
					const nbreEspace = Espaces.find({espaceNom : espaceNomModified}).count();
					if (nbreEspace > 0) { 
						$('#idNotificationExist').addClass('notificationExistNON');
						$('#idNotification').removeClass('notificationNON');
						$('#idNotification').addClass('notificationOUI');

						$('#idModalModifEspace').animate({
							scrollTop : 0
						}, 0);
					}
					else {
						$('#idNotification').removeClass('notificationOUI');
						$('#idNotification').addClass('notificationNON');

						$('#idConfirmation').removeClass('confirmationNON');
						$('#idConfirmation').addClass('confirmationOUI');

						$('#idConfirmSupp').addClass('non');
						$('#idConfirmBlock').addClass('non');
						$('#idConfirmDeblock').addClass('non');

						$('#idConfirmModif').removeClass('non');
						$('#idConfirmModif').addClass('oui');
						$('#idConfirmAnnul').removeClass('non');
						$('#idConfirmAnnul').addClass('oui');
					}
				}
				else {
					var espaceVilleModified = $('#idModifVilleEspace').val();
					espaceVilleModified = espaceVilleModified.toUpperCase();

					const espaceContactModified = $('#idModifContactEspace').val();
					const espaceMailModified = $('#idModifMailEspace').val();

					if (espaceNomModified == instance.data.espace.espaceNom && 
						espaceVilleModified == instance.data.espace.espaceVille &&
						espaceContactModified == instance.data.espace.espaceContact &&
						espaceMailModified == instance.data.espace.espaceMail) {

						$('#idNotificationExist').addClass('notificationExistNON');
					
						$('#idNotification').removeClass('notificationNON');
						$('#idNotification').addClass('notificationOUI');

						$('#idModalModifEspace').animate({
							scrollTop : 0
						}, 0);
					}
					else {
						$('#idConfirmation').removeClass('confirmationNON');
						$('#idConfirmation').addClass('confirmationOUI');

						$('#idConfirmSupp').addClass('non');
						$('#idConfirmBlock').addClass('non');
						$('#idConfirmDeblock').addClass('non');

						$('#idConfirmModif').removeClass('non');
						$('#idConfirmModif').addClass('oui');
						$('#idConfirmAnnul').removeClass('non');
						$('#idConfirmAnnul').addClass('oui');
					}						
				}
				$('#idModalModifEspace').animate({
					scrollTop : 0
				}, 0);
			},
			'click .js-btn-supprimer' : function(event, instance){
				event.preventDefault();
				var espaceNomModified = $('#idModifNomEspace').val();
				espaceNomModified = espaceNomModified.toUpperCase();

				var espaceVilleModified = $('#idModifVilleEspace').val();
				espaceVilleModified = espaceVilleModified.toUpperCase();

				const espaceContactModified = $('#idModifContactEspace').val();
				const espaceMailModified = $('#idModifMailEspace').val();

				if (espaceNomModified == instance.data.espace.espaceNom && 
					espaceVilleModified == instance.data.espace.espaceVille &&
					espaceContactModified == instance.data.espace.espaceContact &&
					espaceMailModified == instance.data.espace.espaceMail) {
					$('#idConfirmation').removeClass('confirmationNON');
					$('#idConfirmation').addClass('confirmationOUI');

					$('#idConfirmModif').addClass('non');
					$('#idConfirmBlock').addClass('non');
					$('#idConfirmDeblock').addClass('non');

					$('#idConfirmSupp').removeClass('non');
					$('#idConfirmSupp').addClass('oui');
					$('#idConfirmAnnul').removeClass('non');
					$('#idConfirmAnnul').addClass('oui');
				}
				else {
					$('#idNotification').addClass('notificationNON');

					$('#idNotificationExist').removeClass('notificationExistNON');
					$('#idNotificationExist').addClass('notificationExistOUI');

					$('#idModalModifEspace').animate({
							scrollTop : 0
						}, 0);
				}
				$('#idModalModifEspace').animate({
					scrollTop : 0
				}, 0);
			},
			'click .js-btn-blocked' : function(event, instance){
				event.preventDefault();
				var espaceNomModified = $('#idModifNomEspace').val();
				espaceNomModified = espaceNomModified.toUpperCase();

				var espaceVilleModified = $('#idModifVilleEspace').val();
				espaceVilleModified = espaceVilleModified.toUpperCase();

				const espaceContactModified = $('#idModifContactEspace').val();
				const espaceMailModified = $('#idModifMailEspace').val();

				if (espaceNomModified == instance.data.espace.espaceNom && 
					espaceVilleModified == instance.data.espace.espaceVille &&
					espaceContactModified == instance.data.espace.espaceContact &&
					espaceMailModified == instance.data.espace.espaceMail) {

					const esp = Espaces.findOne({_id : instance.data.espace._id});

					$('#idConfirmation').removeClass('confirmationNON');
					$('#idConfirmation').addClass('confirmationOUI');

					$('#idConfirmModif').addClass('non');
					$('#idConfirmSupp').addClass('non');

					if (esp.espaceBlocked == 'NON') {
						$('#idConfirmDeblock').addClass('non');
						$('#idConfirmBlock').removeClass('non');
						$('#idConfirmBlock').addClass('oui');
					}
					else {
						$('#idConfirmBlock').addClass('non'); 
						$('#idConfirmDeblock').removeClass('non');
						$('#idConfirmDeblock').addClass('oui');
					}
					$('#idConfirmAnnul').removeClass('non');
					$('#idConfirmAnnul').addClass('oui');
				}
				else {
					$('#idNotification').addClass('notificationNON');
					$('#idNotificationExist').removeClass('notificationExistNON');
					$('#idNotificationExist').addClass('notificationExistOUI');
				}
				$('#idModalModifEspace').animate({
					scrollTop : 0
				}, 0);
			},
			'click #idConfirmAnnul' : function(event, instance){
				event.preventDefault();
				$('#idConfirmation').removeClass('confirmationOUI');
				$('#idConfirmation').addClass('confirmationNON');

				$('#idModalModifEspace').animate({
					scrollTop : 0
				}, 0);
			},
			'click #idConfirmModif' : function(event, instance){
				event.preventDefault();
				$('#idModifNomEspace').removeClass('error');
				$('#idModifVilleEspace').removeClass('error');
				$('#idModifContactEspace').removeClass('error');
				$('#idModifMailEspace').removeClass('error');
				var espaceNomModified = $('#idModifNomEspace').val();
				espaceNomModified = espaceNomModified.toUpperCase();
				const espaceN = instance.data.espace.espaceNom;

				var espaceVilleModified = $('#idModifVilleEspace').val();
				espaceVilleModified = espaceVilleModified.toUpperCase();

				const espaceContactModified = parseInt($('#idModifContactEspace').val());
				const espaceMailModified = $('#idModifMailEspace').val();
				const espaceModified = { 
					espNomM : espaceNomModified, 
					espVilleM : espaceVilleModified, 
					espContactM : espaceContactModified, 
					espMailM : espaceMailModified 
				};
				const dte = new Date();
				const espaceDteModif = laDate(dte);
				const espModif = { 
					id : instance.data.espace._id, 
					espM : espaceModified, 
					espDate : espaceDteModif 
				}
				Meteor.call('modifEspace', espModif, function(err, result){
					if (err || (result != 'OK')) {
						if (err) {
							$('#idModifNomEspace').addClass('error');
							$('#idModifVilleEspace').addClass('error');
							$('#idModifContactEspace').addClass('error');
							$("#idModifMailEspace").addClass('error');
						}
						else if (result != 'OK') {
							const rlength = result.length;
							for (var i = 0; i < rlength; i++) {
								switch (result[i].name){
									case 'espM.espNomM' : 
										$('#idModifNomEspace').addClass('error');
										document.getElementById('idModifNomEspace').setAttribute('placeholder', $('#idModifNomEspace').val());
										break;
									case 'espM.espVilleM' : 
										$('#idModifVilleEspace').addClass('error');
										document.getElementById('idModifVilleEspace').setAttribute('placeholder', $('#idModifVilleEspace').val());
										break;
									case 'espM.espContactM' : 
										$('#idModifContactEspace').addClass('error');
										document.getElementById('idModifContactEspace').setAttribute('placeholder', $('#idModifContactEspace').val());
										break;
									case 'espM.espMailM' : 
										$("#idModifMailEspace").addClass('error');
										document.getElementById('idModifMailEspace').setAttribute('placeholder', $('#idModifMailEspace').val());
										break;
									default :
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');
								}
							}
						}
						$('#idConfirmation').removeClass('confirmationOUI');
						$('#idConfirmation').addClass('confirmationNON');
					}
					else {
						var lesIdSites = Sites.find({siteEspace : espaceN}).fetch();
						if (lesIdSites.length > 0) {
							Meteor.call('modifNomEspSite', 
								{
									lesIdSites : lesIdSites, 
									espaceNomModified : espaceNomModified, 
									espaceDteModif : espaceDteModif
								}, 
								function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('non');
										$('#idNotification').addClass('oui');
									}
									else { 
										if (Villes.find({espaces : espaceN}).count() > 0) {
											Meteor.call('modifNomEspVille', 
												{
													aEsp : espaceN,
													nEsp : espaceNomModified
												},
												function(err, result){
													if (err || (result != 'OK')) {
														$('#idModifVilleEspace').addClass('error');
														document.getElementById('idModifVilleEspace').setAttribute('placeholder', $('#idModifVilleEspace').val());
													}
												}
											);
										}
										Modal.hide(); 
									}
								}
							);
			 			}
			 			$('#idConfirmation').removeClass('confirmationOUI');
						$('#idConfirmation').addClass('confirmationNON');
					}
				});
			},
			'click #idConfirmSupp' : function(event, instance){
				event.preventDefault();
				const espId = instance.data.espace._id;
				const espNom = instance.data.espace.espaceNom;
				Meteor.call('suppEspace', {id : espId}, function(err, result){
					if (err || (result != 'OK')) {
						$('#idNotification').removeClass('notificationNON');
						$('#idNotification').addClass('notificationOUI');
						$('#idConfirmation').removeClass('confirmationNON');
						$('#idConfirmation').addClass('confirmationOUI');
					}
					else {
						var lesIdSites = Sites.find({siteEspace : espNom}).fetch();
						if (lesIdSites.length > 0) {
							var espV = [];
							var espVE = [];
							var espVQ = [];
							var lesIdSitesPromos = [];
							lesIdSites.forEach(function(transaction){
								lesIdSitesPromos.push(transaction._id);
								if (!espV.includes(transaction.siteVille)) { 
									const eltVilEsp = {
										vil : transaction.siteVille,
										esp : transaction.siteEspace
									}
									espV.push(transaction.siteVille); 
									espVE.push(eltVilEsp);
								}	
								const numEspVQ = Sites.find({siteVille: transaction.siteVille, siteQuartier: transaction.siteQuartier}).count();
								const eltVilQtier = {
									vil : transaction.siteVille,
									qtier : transaction.siteQuartier,
									numEspVQ : numEspVQ
								}
								espVQ.push(eltVilQtier);
							});
							Meteor.call('suppUsersSitesEspace', { lesIdSites : lesIdSitesPromos }, function(err, result){
								if (err || (result != 'OK')) {
									$('#idNotification').removeClass('notificationNON');
									$('#idNotification').addClass('notificationOUI');
									$('#idConfirmation').removeClass('confirmationNON');
									$('#idConfirmation').addClass('confirmationOUI');
								}
								else {
									Meteor.call('suppLesPromosDesSites', { lesIdSites : lesIdSitesPromos }, function(err, result){
										if (err || (result != 'OK')) {
											$('#idNotification').removeClass('notificationNON');
											$('#idNotification').addClass('notificationOUI');
											$('#idConfirmation').removeClass('confirmationNON');
											$('#idConfirmation').addClass('confirmationOUI');
										}
										else {
											Meteor.call('suppSite', { lesIdSites : lesIdSitesPromos }, function(err, result){
												if (err || (result != 'OK')) {
													$('#idNotification').removeClass('notificationNON');
													$('#idNotification').addClass('notificationOUI');
													$('#idConfirmation').removeClass('confirmationNON');
													$('#idConfirmation').addClass('confirmationOUI');
												}
												else {
													Meteor.call('suppEspVille', { espVE : espVE, espVQ : espVQ }, function(err, result){
														if (err || (result != 'OK')) {
															$('#idNotification').removeClass('notificationNON');
															$('#idNotification').addClass('notificationOUI');
															$('#idConfirmation').removeClass('confirmationNON');
															$('#idConfirmation').addClass('confirmationOUI');
														}
													});
												}
											});
										}
									});
								}
							});	
			 			}
						Modal.hide();
					}
				});
			},
			'click #idConfirmBlock' : function(event, instance){
				event.preventDefault();
				const dte = new Date();
				const espDte = laDate(dte);
				Meteor.call('modifBlockEspace', { id : instance.data.espace._id, espB : 'OUI', dte : espDte }, function(err, result){
					if (err || (result != 'OK')) {
						$('#idNotification').removeClass('notificationNON');
						$('#idNotification').addClass('notificationOUI');
						$('#idConfirmation').removeClass('confirmationNON');
						$('#idConfirmation').addClass('confirmationOUI');
					}
					else { Modal.hide(); }
				});
			},
			'click #idConfirmDeblock' : function(event, instance){
				event.preventDefault();
				const dte = new Date();
				const espDte = laDate(dte);
				Meteor.call('modifBlockEspace', { id : instance.data.espace._id, espB : 'NON', dte : espDte }, function(err, result){
					if (err || (result != 'OK')) {
						$('#idNotification').removeClass('notificationNON');
						$('#idNotification').addClass('notificationOUI');
						$('#idConfirmation').removeClass('confirmationNON');
						$('#idConfirmation').addClass('confirmationOUI');
					}
					else { Modal.hide(); }
				});
			}
		});

Template.tmplteCreationSite.events({
	'click #login-sign-in-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click .login-close-text' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		var eft = document.getElementById('login-dropdown-list');
		prt.removeChild(eft);
	},
	'click #login-buttons-password' : function(event, instance){
		event.preventDefault();
		var loginMail = $('#login-email').val();
		var loginPass = $('#login-password').val();
        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
            if(!err){ 
            	$('#idErrLogin').removeClass('oui');
	            $('#idErrLogin').addClass('non');
            }
            else{
	           $('#idErrLogin').removeClass('non');
	           $('#idErrLogin').addClass('oui');
	          }
        });
	},
	'click #login-name-link' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #idChangePwd' : function(event, instance){
		event.preventDefault();
		var loginName = document.getElementById('login-name-link');
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
        						"<a class='login-close-text'>Fermer</a>" +
        						"<div class='login-close-text-clear'></div>" +
        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
        						"<div class='additional-link-container'>" +
					            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
					            "</div>" +
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-ChangePwd' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalModifPassword', Meteor.userId());
	},
	'click #forgot-password-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form'>" +
            "<div id='forgot-password-email-label-and-input'>" +
              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
            "</div>" +
			"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
              "Reset du Mot de Passe" +
            "</div>" +
            "<div class='additional-link-container'>" +
            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
            "</div>" +
            "<div id='idErrReset' class='error non errReset'>Reset password échoué</div>" +
            "<div id='idSuccReset' class='vert non succReset'>Reset password réussi. Vérifiez votre mail</div>" +
          "</form>" +
        "</div>";
	},
				'click #login-buttons-forgot-password' : function(event, instance){
					event.preventDefault();
				    let email = $('#forgot-password-email').val();
				    Accounts.forgotPassword({email: email}, function (e, r) {
				        if (e) {
				            $('#idErrReset').removeClass('non');
				            $('#idErrReset').addClass('oui');
				        } else {
				        	$('#idErrReset').addClass('non');
				            $('#idSuccReset').removeClass('non');
				            $('#idSuccReset').addClass('oui');
				        }
				    }); 
				},
	'click #back-to-login-link' : function(event, instance){
		event.preventDefault();
		var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
		prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
		"<div id='login-dropdown-list' class='accounts-dialog'>" +
          "<a class='login-close-text'>Fermer</a>" +
          "<div class='login-close-text-clear'></div>" +
          "<form class='login-form login-password-form'>" +
            "<div id='login-email-label-and-input'>" +
              "<label id='login-email-label' for='login-email'>Email</label>" +
              "<input id='login-email' type='email' autocomplete='email'>" +
            "</div>" +
            "<div id='login-password-label-and-input'>" +
              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
              "<input id='login-password' type='password' autocomplete='current-password'>" +
            "</div>" +
            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
            "<div class='additional-link-container'>" +
            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
            "</div>" +
            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
          "</form>" +
        "</div>";
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
	'submit .js-new-site' : function(event, instance){
		event.preventDefault(); 
		var newSiteEspace = $('#idEspaceSite').val();
		var newSiteQuartier = $('#idQuartierSite').val();
		newSiteQuartier = newSiteQuartier.toUpperCase();
		var nbreSite = Sites.find({siteEspace : newSiteEspace, siteQuartier : newSiteQuartier}).count();
		if (nbreSite > 0) { $('#modalSiteAlreadyCreated').modal('show'); }
		else { $('#modalCreationSite').modal('show'); }
	},
	'click .js-new-site-confirm' : function(event, instance){
		event.preventDefault();
		$('#idEspaceSite').removeClass('error');
		$('#idQuartierSite').removeClass('error');
		$('#idVilleSite').removeClass('error');
		$('#idContactSite').removeClass('error');
		$('#idMailSite').removeClass('error');
		$('#idOuvertureFeriesSite').removeClass('error');
		$('#idFermetureFeriesSite').removeClass('error');
		$('#idOuvertureLundiSite').removeClass('error');
		$('#idFermetureLundiSite').removeClass('error');
		$('#idOuvertureMardiSite').removeClass('error');
		$('#idFermetureMardiSite').removeClass('error');
		$('#idOuvertureMercrediSite').removeClass('error');
		$('#idFermetureMercrediSite').removeClass('error');
		$('#idOuvertureJeudiSite').removeClass('error');
		$('#idFermetureJeudiSite').removeClass('error');
		$('#idOuvertureVendrediSite').removeClass('error');
		$('#idFermetureVendrediSite').removeClass('error');
		$('#idOuvertureSamediSite').removeClass('error');
		$('#idFermetureSamediSite').removeClass('error');
		$('#idOuvertureDimancheSite').removeClass('error');
		$('#idFermetureDimancheSite').removeClass('error');
		$('#idEmplacementSite').removeClass('error');
		var newSiteEspace = $('#idEspaceSite').val();

		var newSiteQuartier = $('#idQuartierSite').val();
		newSiteQuartier = newSiteQuartier.toUpperCase();

		var newSiteVille = $('#idVilleSite').val();
		newSiteVille = newSiteVille.toUpperCase();

		var newSiteContact = $('#idContactSite').val();
		newSiteContact = parseInt(newSiteContact.trim());

		const newSiteMail = $('#idMailSite').val();
		const newSiteOuvFeries =  $('#idOuvertureFeriesSite').val();
		const newSiteFermFeries =  $('#idFermetureFeriesSite').val();
		const newSiteOuvLundi =  $('#idOuvertureLundiSite').val();
		const newSiteFermLundi =  $('#idFermetureLundiSite').val();
		const newSiteOuvMardi =  $('#idOuvertureMardiSite').val();
		const newSiteFermMardi =  $('#idFermetureMardiSite').val();
		const newSiteOuvMercredi =  $('#idOuvertureMercrediSite').val();
		const newSiteFermMercredi =  $('#idFermetureMercrediSite').val();
		const newSiteOuvJeudi =  $('#idOuvertureJeudiSite').val();
		const newSiteFermJeudi =  $('#idFermetureJeudiSite').val();
		const newSiteOuvVendredi =  $('#idOuvertureVendrediSite').val();
		const newSiteFermVendredi =  $('#idFermetureVendrediSite').val();
		const newSiteOuvSamedi =  $('#idOuvertureSamediSite').val();
		const newSiteFermSamedi =  $('#idFermetureSamediSite').val();
		const newSiteOuvDimanche =  $('#idOuvertureDimancheSite').val();
		const newSiteFermDimanche =  $('#idFermetureDimancheSite').val();
		var newSiteEmplacement =  $('#idEmplacementSite').val();
		newSiteEmplacement = newSiteEmplacement.slice(13, -36);
		const dte = new Date();
		const siteDteCrea = laDate(dte);

		var user = { m : newSiteMail, p : 'password', typeUser : 'c' };

		Meteor.call('creationUser', user, function(err, result){
		 	if (err || (result.length > 18)) {
		 		$('#idMailSite').addClass('error'); 
		 		$('#idMailSite').val(''); 
		 	}
		 	else { 
		 		var newSite = {
					siteEspace : newSiteEspace,
					siteQuartier : newSiteQuartier,
					siteVille : newSiteVille,
					siteContact : newSiteContact,
					siteMail : newSiteMail,
					siteOuvFeries : newSiteOuvFeries,
					siteFermFeries : newSiteFermFeries,
					siteOuvLundi : newSiteOuvLundi,
					siteFermLundi : newSiteFermLundi,
					siteOuvMardi : newSiteOuvMardi,
					siteFermMardi : newSiteFermMardi,
					siteOuvMercredi : newSiteOuvMercredi,
					siteFermMercredi : newSiteFermMercredi,
					siteOuvJeudi : newSiteOuvJeudi,
					siteFermJeudi : newSiteFermJeudi,
					siteOuvVendredi : newSiteOuvVendredi,
					siteFermVendredi : newSiteFermVendredi,
					siteOuvSamedi : newSiteOuvSamedi,
					siteFermSamedi : newSiteFermSamedi,
					siteOuvDimanche : newSiteOuvDimanche,
					siteFermDimanche : newSiteFermDimanche,
					siteEmplacement : newSiteEmplacement,
					siteUser : result,
					siteNote : 5,
					siteVotants : [],
					siteLesNotes : [],
					siteDateCreation : siteDteCrea,
					siteBlocked : 'NON',
					siteInizio : 'SI'
				}
				const v = Villes.findOne({ville : newSiteVille});
				if (!v) { 
					const newVille = {
						ville : newSiteVille,
						espaces : [newSiteEspace],
						quartiers : [newSiteQuartier]
					}
					Meteor.call('ajoutVille', newVille, {}, function(err, result){
						if (err || (result != 'sent')) {
							$('#idVilleSite').addClass('error'); 
							const vS = $('#idVilleSite').val();
							$('#idVilleSite').val(''); 
							document.getElementById('idVilleSite').setAttribute('placeholder', vS);
						}
						else {
							Meteor.call('creationSite', newSite, function(err, result){
								if (err) {
									$('#idEspaceSite').addClass('error');
									$('#idQuartierSite').addClass('error');
									$('#idVilleSite').addClass('error');
									$('#idContactSite').addClass('error');
									$('#idMailSite').addClass('error');
									$('#idOuvertureFeriesSite').addClass('error');
									$('#idFermetureFeriesSite').addClass('error');
									$('#idOuvertureLundiSite').addClass('error');
									$('#idFermetureLundiSite').addClass('error');
									$('#idOuvertureMardiSite').addClass('error');
									$('#idFermetureMardiSite').addClass('error');
									$('#idOuvertureMercrediSite').addClass('error');
									$('#idFermetureMercrediSite').addClass('error');
									$('#idOuvertureJeudiSite').addClass('error');
									$('#idFermetureJeudiSite').addClass('error');
									$('#idOuvertureVendrediSite').addClass('error');
									$('#idFermetureVendrediSite').addClass('error');
									$('#idOuvertureSamediSite').addClass('error');
									$('#idFermetureSamediSite').addClass('error');
									$('#idOuvertureDimancheSite').addClass('error');
									$('#idFermetureDimancheSite').addClass('error');
									$('#idEmplacementSite').addClass('error'); 
								}
								else {
									if (result == 'sent') {
										$('#idQuartierSite').val('');
										$('#idVilleSite').val('');
										$('#idContactSite').val('');
										$('#idMailSite').val('');
										$('#idOuvertureFeriesSite').val('');
										$('#idFermetureFeriesSite').val('');
										$('#idOuvertureLundiSite').val('');
										$('#idFermetureLundiSite').val('');
										$('#idOuvertureMardiSite').val('');
										$('#idFermetureMardiSite').val('');
										$('#idOuvertureMercrediSite').val('');
										$('#idFermetureMercrediSite').val('');
										$('#idOuvertureJeudiSite').val('');
										$('#idFermetureJeudiSite').val('');
										$('#idOuvertureVendrediSite').val('');
										$('#idFermetureVendrediSite').val('');
										$('#idOuvertureSamediSite').val('');
										$('#idFermetureSamediSite').val('');
										$('#idOuvertureDimancheSite').val('');
										$('#idFermetureDimancheSite').val('');
										$('#idEmplacementSite').val('');  
									}
									else {
										const rlength = result.length;
										for (var i = 0; i < rlength; i++) {
											switch (result[i].name){
												case 'siteEspace' : 								
													$('#idEspaceSite').addClass('error');
													const espS = $('#idEspaceSite').val();
													$('#idEspaceSite').val(''); 
													document.getElementById('idEspaceSite').setAttribute('placeholder', espS);
													break;
												case 'siteQuartier' : 
													$('#idQuartierSite').addClass('error'); 
													const qrtS = $('#idQuartierSite').val();
													$('#idQuartierSite').val(''); 
													document.getElementById('idQuartierSite').setAttribute('placeholder', qrtS);
													break;
												case 'siteVille' : 
													$('#idVilleSite').addClass('error'); 
													const vS = $('#idVilleSite').val();
													$('#idVilleSite').val(''); 
													document.getElementById('idVilleSite').setAttribute('placeholder', vS);
													break;
												case 'siteContact' : 
													$('#idContactSite').addClass('error'); 
													const ctS = $('#idContactSite').val();
													$('#idContactSite').val(''); 
													document.getElementById('idContactSite').setAttribute('placeholder', ctS);
													break;
												case 'siteMail' : 
													$('#idMailSite').addClass('error'); 
													const mailS = $('#idMailSite').val();
													$('#idMailSite').val(''); 
													document.getElementById('idMailSite').setAttribute('placeholder', mailS);
													break;
												case 'siteOuvFeries' : 
													$('#idOuvertureFeriesSite').addClass('error'); 
													const oFerS = $('#idOuvertureFeriesSite').val();
													$('#idOuvertureFeriesSite').val(''); 
													document.getElementById('idOuvertureFeriesSite').setAttribute('placeholder', oFerS);
													break;
												case 'siteFermFeries' : 
													$('#idFermetureFeriesSite').addClass('error'); 
													const fFerS = $('#idFermetureFeriesSite').val();
													$('#idFermetureFeriesSite').val(''); 
													document.getElementById('idFermetureFeriesSite').setAttribute('placeholder', fFerS);
													break;
												case 'siteOuvLundi' : 
													$('#idOuvertureLundiSite').addClass('error');
													const oLunS = $('#idOuvertureLundiSite').val();
													$('#idOuvertureLundiSite').val(''); 
													document.getElementById('idOuvertureLundiSite').setAttribute('placeholder', oLunS); 
													break;
												case 'siteFermLundi' : 
													$('#idFermetureLundiSite').addClass('error'); 
													const fLunS = $('#idFermetureLundiSite').val();
													$('#idFermetureLundiSite').val(''); 
													document.getElementById('idFermetureLundiSite').setAttribute('placeholder', fLunS);
													break;
												case 'siteOuvMardi' : 
													$('#idOuvertureMardiSite').addClass('error'); 
													const oMarS = $('#idOuvertureMardiSite').val();
													$('#idOuvertureMardiSite').val(''); 
													document.getElementById('idOuvertureMardiSite').setAttribute('placeholder', oMarS);
													break;
												case 'siteFermMardi' : 
													$('#idFermetureMardiSite').addClass('error');
													const fMarS = $('#idFermetureMardiSite').val();
													$('#idFermetureMardiSite').val(''); 
													document.getElementById('idFermetureMardiSite').setAttribute('placeholder', fMarS); 
													break;
												case 'siteOuvMercredi' : 
													$('#idOuvertureMercrediSite').addClass('error'); 
													const oMerS = $('#idOuvertureMercrediSite').val();
													$('#idOuvertureMercrediSite').val(''); 
													document.getElementById('idOuvertureMercrediSite').setAttribute('placeholder', oMerS);
													break;
												case 'siteFermMercredi' : 
													$('#idFermetureMercrediSite').addClass('error'); 
													const fMerS = $('#idFermetureMercrediSite').val();
													$('#idFermetureMercrediSite').val(''); 
													document.getElementById('idFermetureMercrediSite').setAttribute('placeholder', fMerS);
													break;
												case 'siteOuvJeudi' : 
													$('#idOuvertureJeudiSite').addClass('error'); 
													const oJeuS = $('#idOuvertureJeudiSite').val();
													$('#idOuvertureJeudiSite').val(''); 
													document.getElementById('idOuvertureJeudiSite').setAttribute('placeholder', oJeuS);
													break;
												case 'siteFermJeudi' : 
													$('#idFermetureJeudiSite').addClass('error'); 
													const fJeuS = $('#idFermetureJeudiSite').val();
													$('#idFermetureJeudiSite').val(''); 
													document.getElementById('idFermetureJeudiSite').setAttribute('placeholder', fJeuS);
													break;
												case 'siteOuvVendredi' : 
													$('#idOuvertureVendrediSite').addClass('error');
													const oVenS = $('#idOuvertureVendrediSite').val();
													$('#idOuvertureVendrediSite').val(''); 
													document.getElementById('idOuvertureVendrediSite').setAttribute('placeholder', oVenS); 
													break;
												case 'siteFermVendredi' : 
													$('#idFermetureVendrediSite').addClass('error'); 
													const fVenS = $('#idFermetureVendrediSite').val();
													$('#idFermetureVendrediSite').val(''); 
													document.getElementById('idFermetureVendrediSite').setAttribute('placeholder', fVenS);
													break;
												case 'siteOuvSamedi' : 
													$('#idOuvertureSamediSite').addClass('error'); 
													const oSamS = $('#idOuvertureSamediSite').val();
													$('#idOuvertureSamediSite').val(''); 
													document.getElementById('idOuvertureSamediSite').setAttribute('placeholder', oSamS);
													break;
												case 'siteFermSamedi' : 
													$('#idFermetureSamediSite').addClass('error'); 
													const fSamS = $('#idFermetureSamediSite').val();
													$('#idFermetureSamediSite').val(''); 
													document.getElementById('idFermetureSamediSite').setAttribute('placeholder', fSamS);
													break;
												case 'siteOuvDimanche' : 
													$('#idOuvertureDimancheSite').addClass('error'); 
													const oDimS = $('#idOuvertureDimancheSite').val();
													$('#idOuvertureDimancheSite').val(''); 
													document.getElementById('idOuvertureDimancheSite').setAttribute('placeholder', oDimS);
													break;
												case 'siteFermDimanche' : 
													$('#idFermetureDimancheSite').addClass('error'); 
													const fDimS = $('#idFermetureDimancheSite').val();
													$('#idFermetureDimancheSite').val(''); 
													document.getElementById('idFermetureDimancheSite').setAttribute('placeholder', fDimS);
													break;
												case 'siteEmplacement' : 
													$('#idEmplacementSite').addClass('error'); 
													$('#idEmplacementSite').val(''); 
													break;
												default :
													$('#idQuartierSite').addClass('error');
													$('#idVilleSite').addClass('error');
													$('#idContactSite').addClass('error');
													$('#idMailSite').addClass('error');
													$('#idOuvertureFeriesSite').addClass('error');
													$('#idFermetureFeriesSite').addClass('error');
													$('#idOuvertureLundiSite').addClass('error');
													$('#idFermetureLundiSite').addClass('error');
													$('#idOuvertureMardiSite').addClass('error');
													$('#idFermetureMardiSite').addClass('error');
													$('#idOuvertureMercrediSite').addClass('error');
													$('#idFermetureMercrediSite').addClass('error');
													$('#idOuvertureJeudiSite').addClass('error');
													$('#idFermetureJeudiSite').addClass('error');
													$('#idOuvertureVendrediSite').addClass('error');
													$('#idFermetureVendrediSite').addClass('error');
													$('#idOuvertureSamediSite').addClass('error');
													$('#idFermetureSamediSite').addClass('error');
													$('#idOuvertureDimancheSite').addClass('error');
													$('#idFermetureDimancheSite').addClass('error');
													$('#idEmplacementSite').addClass('error'); 
											}
										}
									}
								}
							});
						}
						$('#modalCreationSite').modal('hide');
					}); 
				}
				else {
					const nVille = { nSQuartier : newSiteQuartier, nSEspace : newSiteEspace};
					Meteor.call('majVille', v, nVille, function(err, result){
						if (err || (result != 'sent')) {
							$('#idVilleSite').addClass('error'); 
							const vS = $('#idVilleSite').val();
							$('#idVilleSite').val(''); 
							document.getElementById('idVilleSite').setAttribute('placeholder', vS);
						}
						else {
							Meteor.call('creationSite', newSite, function(err, result){
								if (err) {
									$('#idEspaceSite').addClass('error');
									$('#idQuartierSite').addClass('error');
									$('#idVilleSite').addClass('error');
									$('#idContactSite').addClass('error');
									$('#idMailSite').addClass('error');
									$('#idOuvertureFeriesSite').addClass('error');
									$('#idFermetureFeriesSite').addClass('error');
									$('#idOuvertureLundiSite').addClass('error');
									$('#idFermetureLundiSite').addClass('error');
									$('#idOuvertureMardiSite').addClass('error');
									$('#idFermetureMardiSite').addClass('error');
									$('#idOuvertureMercrediSite').addClass('error');
									$('#idFermetureMercrediSite').addClass('error');
									$('#idOuvertureJeudiSite').addClass('error');
									$('#idFermetureJeudiSite').addClass('error');
									$('#idOuvertureVendrediSite').addClass('error');
									$('#idFermetureVendrediSite').addClass('error');
									$('#idOuvertureSamediSite').addClass('error');
									$('#idFermetureSamediSite').addClass('error');
									$('#idOuvertureDimancheSite').addClass('error');
									$('#idFermetureDimancheSite').addClass('error');
									$('#idEmplacementSite').addClass('error'); 
								}
								else {
									if (result == 'sent') {
										$('#idQuartierSite').val('');
										$('#idVilleSite').val('');
										$('#idContactSite').val('');
										$('#idMailSite').val('');
										$('#idOuvertureFeriesSite').val('');
										$('#idFermetureFeriesSite').val('');
										$('#idOuvertureLundiSite').val('');
										$('#idFermetureLundiSite').val('');
										$('#idOuvertureMardiSite').val('');
										$('#idFermetureMardiSite').val('');
										$('#idOuvertureMercrediSite').val('');
										$('#idFermetureMercrediSite').val('');
										$('#idOuvertureJeudiSite').val('');
										$('#idFermetureJeudiSite').val('');
										$('#idOuvertureVendrediSite').val('');
										$('#idFermetureVendrediSite').val('');
										$('#idOuvertureSamediSite').val('');
										$('#idFermetureSamediSite').val('');
										$('#idOuvertureDimancheSite').val('');
										$('#idFermetureDimancheSite').val('');
										$('#idEmplacementSite').val(''); 
									}
									else {
										const rlength = result.length;
										for (var i = 0; i < rlength; i++) {
											switch (result[i].name){
												case 'siteEspace' : 								
													$('#idEspaceSite').addClass('error');
													const espS = $('#idEspaceSite').val();
													$('#idEspaceSite').val(''); 
													document.getElementById('idEspaceSite').setAttribute('placeholder', espS);
													break;
												case 'siteQuartier' : 
													$('#idQuartierSite').addClass('error'); 
													const qrtS = $('#idQuartierSite').val();
													$('#idQuartierSite').val(''); 
													document.getElementById('idQuartierSite').setAttribute('placeholder', qrtS);
													break;
												case 'siteVille' : 
													$('#idVilleSite').addClass('error'); 
													const vS = $('#idVilleSite').val();
													$('#idVilleSite').val(''); 
													document.getElementById('idVilleSite').setAttribute('placeholder', vS);
													break;
												case 'siteContact' : 
													$('#idContactSite').addClass('error'); 
													const ctS = $('#idContactSite').val();
													$('#idContactSite').val(''); 
													document.getElementById('idContactSite').setAttribute('placeholder', ctS);
													break;
												case 'siteMail' : 
													$('#idMailSite').addClass('error'); 
													const mailS = $('#idMailSite').val();
													$('#idMailSite').val(''); 
													document.getElementById('idMailSite').setAttribute('placeholder', mailS);
													break;
												case 'siteOuvFeries' : 
													$('#idOuvertureFeriesSite').addClass('error'); 
													const oFerS = $('#idOuvertureFeriesSite').val();
													$('#idOuvertureFeriesSite').val(''); 
													document.getElementById('idOuvertureFeriesSite').setAttribute('placeholder', oFerS);
													break;
												case 'siteFermFeries' : 
													$('#idFermetureFeriesSite').addClass('error'); 
													const fFerS = $('#idFermetureFeriesSite').val();
													$('#idFermetureFeriesSite').val(''); 
													document.getElementById('idFermetureFeriesSite').setAttribute('placeholder', fFerS);
													break;
												case 'siteOuvLundi' : 
													$('#idOuvertureLundiSite').addClass('error');
													const oLunS = $('#idOuvertureLundiSite').val();
													$('#idOuvertureLundiSite').val(''); 
													document.getElementById('idOuvertureLundiSite').setAttribute('placeholder', oLunS); 
													break;
												case 'siteFermLundi' : 
													$('#idFermetureLundiSite').addClass('error'); 
													const fLunS = $('#idFermetureLundiSite').val();
													$('#idFermetureLundiSite').val(''); 
													document.getElementById('idFermetureLundiSite').setAttribute('placeholder', fLunS);
													break;
												case 'siteOuvMardi' : 
													$('#idOuvertureMardiSite').addClass('error'); 
													const oMarS = $('#idOuvertureMardiSite').val();
													$('#idOuvertureMardiSite').val(''); 
													document.getElementById('idOuvertureMardiSite').setAttribute('placeholder', oMarS);
													break;
												case 'siteFermMardi' : 
													$('#idFermetureMardiSite').addClass('error');
													const fMarS = $('#idFermetureMardiSite').val();
													$('#idFermetureMardiSite').val(''); 
													document.getElementById('idFermetureMardiSite').setAttribute('placeholder', fMarS); 
													break;
												case 'siteOuvMercredi' : 
													$('#idOuvertureMercrediSite').addClass('error'); 
													const oMerS = $('#idOuvertureMercrediSite').val();
													$('#idOuvertureMercrediSite').val(''); 
													document.getElementById('idOuvertureMercrediSite').setAttribute('placeholder', oMerS);
													break;
												case 'siteFermMercredi' : 
													$('#idFermetureMercrediSite').addClass('error'); 
													const fMerS = $('#idFermetureMercrediSite').val();
													$('#idFermetureMercrediSite').val(''); 
													document.getElementById('idFermetureMercrediSite').setAttribute('placeholder', fMerS);
													break;
												case 'siteOuvJeudi' : 
													$('#idOuvertureJeudiSite').addClass('error'); 
													const oJeuS = $('#idOuvertureJeudiSite').val();
													$('#idOuvertureJeudiSite').val(''); 
													document.getElementById('idOuvertureJeudiSite').setAttribute('placeholder', oJeuS);
													break;
												case 'siteFermJeudi' : 
													$('#idFermetureJeudiSite').addClass('error'); 
													const fJeuS = $('#idFermetureJeudiSite').val();
													$('#idFermetureJeudiSite').val(''); 
													document.getElementById('idFermetureJeudiSite').setAttribute('placeholder', fJeuS);
													break;
												case 'siteOuvVendredi' : 
													$('#idOuvertureVendrediSite').addClass('error');
													const oVenS = $('#idOuvertureVendrediSite').val();
													$('#idOuvertureVendrediSite').val(''); 
													document.getElementById('idOuvertureVendrediSite').setAttribute('placeholder', oVenS); 
													break;
												case 'siteFermVendredi' : 
													$('#idFermetureVendrediSite').addClass('error'); 
													const fVenS = $('#idFermetureVendrediSite').val();
													$('#idFermetureVendrediSite').val(''); 
													document.getElementById('idFermetureVendrediSite').setAttribute('placeholder', fVenS);
													break;
												case 'siteOuvSamedi' : 
													$('#idOuvertureSamediSite').addClass('error'); 
													const oSamS = $('#idOuvertureSamediSite').val();
													$('#idOuvertureSamediSite').val(''); 
													document.getElementById('idOuvertureSamediSite').setAttribute('placeholder', oSamS);
													break;
												case 'siteFermSamedi' : 
													$('#idFermetureSamediSite').addClass('error'); 
													const fSamS = $('#idFermetureSamediSite').val();
													$('#idFermetureSamediSite').val(''); 
													document.getElementById('idFermetureSamediSite').setAttribute('placeholder', fSamS);
													break;
												case 'siteOuvDimanche' : 
													$('#idOuvertureDimancheSite').addClass('error'); 
													const oDimS = $('#idOuvertureDimancheSite').val();
													$('#idOuvertureDimancheSite').val(''); 
													document.getElementById('idOuvertureDimancheSite').setAttribute('placeholder', oDimS);
													break;
												case 'siteFermDimanche' : 
													$('#idFermetureDimancheSite').addClass('error'); 
													const fDimS = $('#idFermetureDimancheSite').val();
													$('#idFermetureDimancheSite').val(''); 
													document.getElementById('idFermetureDimancheSite').setAttribute('placeholder', fDimS);
													break;
												case 'siteEmplacement' : 
													$('#idEmplacementSite').addClass('error'); 
													$('#idEmplacementSite').val(''); 
													break;
												default :
													$('#idQuartierSite').addClass('error');
													$('#idVilleSite').addClass('error');
													$('#idContactSite').addClass('error');
													$('#idMailSite').addClass('error');
													$('#idOuvertureFeriesSite').addClass('error');
													$('#idFermetureFeriesSite').addClass('error');
													$('#idOuvertureLundiSite').addClass('error');
													$('#idFermetureLundiSite').addClass('error');
													$('#idOuvertureMardiSite').addClass('error');
													$('#idFermetureMardiSite').addClass('error');
													$('#idOuvertureMercrediSite').addClass('error');
													$('#idFermetureMercrediSite').addClass('error');
													$('#idOuvertureJeudiSite').addClass('error');
													$('#idFermetureJeudiSite').addClass('error');
													$('#idOuvertureVendrediSite').addClass('error');
													$('#idFermetureVendrediSite').addClass('error');
													$('#idOuvertureSamediSite').addClass('error');
													$('#idFermetureSamediSite').addClass('error');
													$('#idOuvertureDimancheSite').addClass('error');
													$('#idFermetureDimancheSite').addClass('error');
													$('#idEmplacementSite').addClass('error'); 
											}
										}
									}
								}
							});
						}
						$('#modalCreationSite').modal('hide');
					});
				}
		 	}
		});
	}
});

	Template.tmplteSites.events({
		'click #login-sign-in-link' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
			"<div id='login-dropdown-list' class='accounts-dialog'>" +
	          "<a class='login-close-text'>Fermer</a>" +
	          "<div class='login-close-text-clear'></div>" +
	          "<form class='login-form login-password-form'>" +
	            "<div id='login-email-label-and-input'>" +
	              "<label id='login-email-label' for='login-email'>Email</label>" +
	              "<input id='login-email' type='email' autocomplete='email'>" +
	            "</div>" +
	            "<div id='login-password-label-and-input'>" +
	              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
	              "<input id='login-password' type='password' autocomplete='current-password'>" +
	            "</div>" +
	            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
	            "<div class='additional-link-container'>" +
	            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
	            "</div>" +
	            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
	          "</form>" +
	        "</div>";
		},
		'click .login-close-text' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			var eft = document.getElementById('login-dropdown-list');
			prt.removeChild(eft);
		},
		'click #login-buttons-password' : function(event, instance){
			event.preventDefault();
			var loginMail = $('#login-email').val();
			var loginPass = $('#login-password').val();
	        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
	            if(!err){ 
	            	$('#idErrLogin').removeClass('oui');
		            $('#idErrLogin').addClass('non');
	            }
	            else{
		           $('#idErrLogin').removeClass('non');
		           $('#idErrLogin').addClass('oui');
		          }
	        });
		},
		'click #login-name-link' : function(event, instance){
			event.preventDefault();
			var loginName = document.getElementById('login-name-link');
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
	        						"<a class='login-close-text'>Fermer</a>" +
	        						"<div class='login-close-text-clear'></div>" +
	        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
	        						"<div class='additional-link-container'>" +
						            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
						            "</div>" +
	        					  "</div>";
	        var eft = document.getElementById('login-dropdown-list');
	        prt.insertBefore(loginName, eft);
		},
		'click #idChangePwd' : function(event, instance){
			event.preventDefault();
			var loginName = document.getElementById('login-name-link');
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
	        						"<a class='login-close-text'>Fermer</a>" +
	        						"<div class='login-close-text-clear'></div>" +
	        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
	        						"<div class='additional-link-container'>" +
						            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
						            "</div>" +
	        					  "</div>";
	        var eft = document.getElementById('login-dropdown-list');
	        prt.insertBefore(loginName, eft);
		},
		'click #login-buttons-ChangePwd' : function(event, instance){
			event.preventDefault();
			Modal.show('tmplteModalModifPassword', Meteor.userId());
		},
		'click #forgot-password-link' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
			"<div id='login-dropdown-list' class='accounts-dialog'>" +
	          "<a class='login-close-text'>Fermer</a>" +
	          "<div class='login-close-text-clear'></div>" +
	          "<form class='login-form'>" +
	            "<div id='forgot-password-email-label-and-input'>" +
	              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
	              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
	            "</div>" +
				"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
	              "Reset du Mot de Passe" +
	            "</div>" +
	            "<div class='additional-link-container'>" +
	            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
	            "</div>" +
	            "<div id='idErrReset' class='error non errReset'>Reset password échoué</div>" +
            	"<div id='idSuccReset' class='vert non succReset'>Reset password réussi. Vérifiez votre mail</div>" +
	          "</form>" +
	        "</div>";
		},
					'click #login-buttons-forgot-password' : function(event, instance){
						event.preventDefault();
					    let email = $('#forgot-password-email').val();
					    Accounts.forgotPassword({email: email}, function (e, r) {
					        if (e) {
					            $('#idErrReset').removeClass('non');
					            $('#idErrReset').addClass('oui');
					        } else {
					        	$('#idErrReset').addClass('non');
					            $('#idSuccReset').removeClass('non');
					            $('#idSuccReset').addClass('oui');
					        }
					    }); 
					},
		'click #back-to-login-link' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
			"<div id='login-dropdown-list' class='accounts-dialog'>" +
	          "<a class='login-close-text'>Fermer</a>" +
	          "<div class='login-close-text-clear'></div>" +
	          "<form class='login-form login-password-form'>" +
	            "<div id='login-email-label-and-input'>" +
	              "<label id='login-email-label' for='login-email'>Email</label>" +
	              "<input id='login-email' type='email' autocomplete='email'>" +
	            "</div>" +
	            "<div id='login-password-label-and-input'>" +
	              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
	              "<input id='login-password' type='password' autocomplete='current-password'>" +
	            "</div>" +
	            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
	            "<div class='additional-link-container'>" +
	            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
	            "</div>" +
	            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
	          "</form>" +
	        "</div>";
		},
		'click #login-buttons-logout' : function(event, instance){
			event.preventDefault();
			Meteor.logout();
		},
		'change [name="selectEspace"]' : function(event, instance){
			event.preventDefault();
			let espChoisi = $( event.target ).find( 'option:selected' ).val(); 
			Session.set('espaceChoisi', espChoisi);
		},
		'click #idLesSites' : function(event, instance){
			event.preventDefault();
			Modal.show('tmplteModalLesSites');
		}
	});
		Template.tmplteSites.onCreated(function(){
			this.subscribe('tousLesSites_EspacesDispSub');
			this.subscribe('tousLesEspaces_EspacesDispSub');
		});
		Template.tmplteSites.helpers({
			lEspaces : function(){
				var lesEsp = [""];
				var lesEspaces = Espaces.find({}, {sort : {espaceNom : 1}}).fetch();
				return lesEsp.concat(lesEspaces);
			},
			lSites : function(){ return Sites.find({siteEspace : Session.get('espaceChoisi')}, {sort : {siteVille : 1, siteQuartier : 1}}); }
		});

				Template.tmplteModalLesSites.onCreated(function(){
					this.subscribe('lesSitesSub');
					this.subscribe('toutesLesPromosSub');
				});
				Template.tmplteModalLesSites.events({
					'click #idSitesMalNotes' : function(event, instance){			
						event.preventDefault();
						$('#idChoixLesSites').addClass('non');
						$('#idLesSitesMN').removeClass('non');
	           			$('#idLesSitesMN').addClass('oui');
					},
					'click #idExpirationsPromos' : function(event, instance){					
						event.preventDefault();
						$('#idChoixLesSites').addClass('non');
						$('#idLesPromosExpi').removeClass('non');
	           			$('#idLesPromosExpi').addClass('oui');
					},
					'click #idSitesSSPromo' : function(event, instance){			
						event.preventDefault();
						$('#idChoixLesSites').addClass('non');
						$('#idLesSitesSsPromo').removeClass('non');
	           			$('#idLesSitesSsPromo').addClass('oui');
					},
					'click .js-lesSiteS' : function(event, instance){			
						Modal.hide();
					}
				});
				Template.tmplteModalLesSites.helpers({
					lSiteMN : function(){ return Sites.find({ siteNote: { $lt: 3 } }).fetch(); },
					lPromosExpi : function(){ 
						var oggi = new Date().getTime();
						oggi += 43200000;
						return Promotions.find({promoExpirationTime : { $lte: oggi }},
							{ sort: { idSitePromo: 1 } }).fetch(); },
					lSitesSsPromo : function(){
						const lesSites = Sites.find(
											{ $or: [ 
												{ sitePromos: { $exists: false } }, 
												{ sitePromos: { $eq: [] } } 
												] 
											}).fetch();
						return lesSites;
					}
				});

	Template.tmplteSitesDetail.events({
		'click #login-sign-in-link' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
			"<div id='login-dropdown-list' class='accounts-dialog'>" +
	          "<a class='login-close-text'>Fermer</a>" +
	          "<div class='login-close-text-clear'></div>" +
	          "<form class='login-form login-password-form'>" +
	            "<div id='login-email-label-and-input'>" +
	              "<label id='login-email-label' for='login-email'>Email</label>" +
	              "<input id='login-email' type='email' autocomplete='email'>" +
	            "</div>" +
	            "<div id='login-password-label-and-input'>" +
	              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
	              "<input id='login-password' type='password' autocomplete='current-password'>" +
	            "</div>" +
	            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
	            "<div class='additional-link-container'>" +
	            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
	            "</div>" +
	            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
	          "</form>" +
	        "</div>";
		},
		'click .login-close-text' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			var eft = document.getElementById('login-dropdown-list');
			prt.removeChild(eft);
		},
		'click #login-buttons-password' : function(event, instance){
			event.preventDefault();
			var loginMail = $('#login-email').val();
			var loginPass = $('#login-password').val();
	        Meteor.loginWithPassword(loginMail, loginPass, function(err,result){
	            if(!err){ 
	            	$('#idErrLogin').removeClass('oui');
		            $('#idErrLogin').addClass('non');
	            }
	            else{
		           $('#idErrLogin').removeClass('non');
		           $('#idErrLogin').addClass('oui');
		        }
	        });
		},
		'click #login-name-link' : function(event, instance){
			event.preventDefault();
			var loginName = document.getElementById('login-name-link');
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
	        						"<a class='login-close-text'>Fermer</a>" +
	        						"<div class='login-close-text-clear'></div>" +
	        						"<div class='login-button' id='login-buttons-logout'>Se déconnecter</div>" +
	        						"<div class='additional-link-container'>" +
						            	"<a id='idChangePwd' class='additional-link'>Modifier le mot de passe</a>" +
						            "</div>" +
	        					  "</div>";
	        var eft = document.getElementById('login-dropdown-list');
	        prt.insertBefore(loginName, eft);
		},
		'click #idChangePwd' : function(event, instance){
			event.preventDefault();
			var loginName = document.getElementById('login-name-link');
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML = "<div id='login-dropdown-list' class='accounts-dialog'>" +
	        						"<a class='login-close-text'>Fermer</a>" +
	        						"<div class='login-close-text-clear'></div>" +
	        						"<div class='login-button' id='login-buttons-ChangePwd'>Modifier le mot de passe</div>" +
	        						"<div class='additional-link-container'>" +
						            	"<a id='login-name-link' class='additional-link'>Se déconnecter</a>" +
						            "</div>" +
	        					  "</div>";
	        var eft = document.getElementById('login-dropdown-list');
	        prt.insertBefore(loginName, eft);
		},
		'click #login-buttons-ChangePwd' : function(event, instance){
			event.preventDefault();
			Modal.show('tmplteModalModifPassword', Meteor.userId());
		},
		'click #forgot-password-link' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
			"<div id='login-dropdown-list' class='accounts-dialog'>" +
	          "<a class='login-close-text'>Fermer</a>" +
	          "<div class='login-close-text-clear'></div>" +
	          "<form class='login-form'>" +
	            "<div id='forgot-password-email-label-and-input'>" +
	              "<label id='forgot-password-email-label' for='forgot-password-email'>Email</label>" +
	              "<input id='forgot-password-email' type='email' autocomplete='email'>" +
	            "</div>" +
				"<div class='login-button login-button-form-submit' id='login-buttons-forgot-password'>" +
	              "Reset du Mot de Passe" +
	            "</div>" +
	            "<div class='additional-link-container'>" +
	            	"<a id='back-to-login-link' class='additional-link'>Se connecter</a>" +
	            "</div>" +
	            "<div id='idErrReset' class='error non errReset'>Reset password échoué</div>" +
            	"<div id='idSuccReset' class='vert non succReset'>Reset password réussi. Vérifiez votre mail</div>" +
	          "</form>" +
	        "</div>";
		},
					'click #login-buttons-forgot-password' : function(event, instance){
						event.preventDefault();
					    let email = $('#forgot-password-email').val();
					    Accounts.forgotPassword({email: email}, function (e, r) {
					        if (e) {
					            $('#idErrReset').removeClass('non');
					            $('#idErrReset').addClass('oui');
					        } else {
					        	$('#idErrReset').addClass('non');
					            $('#idSuccReset').removeClass('non');
					            $('#idSuccReset').addClass('oui');
					        }
					    }); 
					},
		'click #back-to-login-link' : function(event, instance){
			event.preventDefault();
			var prt = document.getElementsByClassName('login-link-and-dropdown-list')[0];
			prt.innerHTML =	"<a class='login-link-text' id='login-sign-in-link'>Sign in ▾</a>" +
			"<div id='login-dropdown-list' class='accounts-dialog'>" +
	          "<a class='login-close-text'>Fermer</a>" +
	          "<div class='login-close-text-clear'></div>" +
	          "<form class='login-form login-password-form'>" +
	            "<div id='login-email-label-and-input'>" +
	              "<label id='login-email-label' for='login-email'>Email</label>" +
	              "<input id='login-email' type='email' autocomplete='email'>" +
	            "</div>" +
	            "<div id='login-password-label-and-input'>" +
	              "<label id='login-password-label' for='login-password'>Mot de Passe</label>" +
	              "<input id='login-password' type='password' autocomplete='current-password'>" +
	            "</div>" +
	            "<button class='login-button login-button-form-submit' id='login-buttons-password'>Se connecter</button>" +
	            "<div class='additional-link-container'>" +
	            	"<a id='forgot-password-link' class='additional-link'>Mot de passe oublié</a>" +
	            "</div>" +
	            "<div id='idErrLogin' class='error non errLogin'>Email et/ou mot de passe invalide(s)</div>" +
	          "</form>" +
	        "</div>";
		},
		'click #login-buttons-logout' : function(event, instance){
			event.preventDefault();
			Meteor.logout();
		},
		'click #idDMESaleeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESalee');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMESaleePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMESaleeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMESaleePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESalee');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMESaleeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMESaleePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMESucreeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESucree');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMESucreePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMESucreeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMESucreePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMESucree');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMESucreeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMESucreePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMPFraisNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMPFraisPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMPFraisNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMPFraisPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMPFraisNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMPFraisPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFLegumesNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMFLegumesPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMFLegumesNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFLegumesPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMFLegumesNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMFLegumesPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPoissVolNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMBPoissVolPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMBPoissVolNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPoissVolPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMBPoissVolNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMBPoissVolPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBVinLiqNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMBVinLiqPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMBVinLiqNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBVinLiqPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMBVinLiqNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMBVinLiqPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPatisserieNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMBPatisseriePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMBPatisserieNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMBPatisseriePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMBPatisserieNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMBPatisseriePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFFoodNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFFood');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idDMFFoodPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idDMFFoodNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idDMFFoodPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselDMFFood');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idDMFFoodNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idDMFFoodPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESaleeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESalee');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPESaleePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPESaleeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESaleePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESalee');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPESaleeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPESaleePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESucreeNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESucree');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPESucreePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPESucreeNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPESucreePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPESucree');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPESucreeNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPESucreePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPPFraisNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPPFraisPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPPFraisNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPPFraisPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPPFrais');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPPFraisNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPPFraisPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFLegumesNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPFLegumesPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPFLegumesNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFLegumesPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFLegumes');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPFLegumesNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPFLegumesPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPoissVolNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBPoissVolPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBPoissVolNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPoissVolPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPoissVol');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBPoissVolNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBPoissVolPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBVinLiqNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBVinLiqPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBVinLiqNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBVinLiqPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBVinLiq');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBVinLiqNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBVinLiqPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPatisserieNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBPatisseriePrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBPatisserieNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBPatisseriePrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBPatisserie');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBPatisserieNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBPatisseriePrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFFoodNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFFood');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPFFoodPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPFFoodNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPFFoodPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPFFood');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPFFoodNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPFFoodPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBazarNext' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBazar');
			var index = parseInt(offre.getAttribute('tabindex')) + 1;
			if (index < offre.children.length) {
				const offrePrev = document.getElementById('idPBazarPrev');
				if (offrePrev.classList.contains('myCarousel__prev-hidden')) {
					offrePrev.classList.remove('myCarousel__prev-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offreNext = document.getElementById('idPBazarNext');
				if ((index+1) >= offre.children.length) { 
					offreNext.classList.add('myCarousel__next-hidden');
				}
				else { offreNext.classList.remove('myCarousel__next-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		},
		'click #idPBazarPrev' : function(event, instance){
			event.preventDefault();
			var offre = document.getElementById('idCarouselPBazar');
			var index = parseInt(offre.getAttribute('tabindex')) - 1;
			if (index >= 0) {
				const offreNext = document.getElementById('idPBazarNext');
				if (offre.children.length > 2 && offreNext.classList.contains('myCarousel__next-hidden')) {
					offreNext.classList.remove('myCarousel__next-hidden');
				}
				let translateX = index * (-320);
				offre.style.transform = 'translate3d(' + translateX + 'px,0,0)';
				const offrePrev = document.getElementById('idPBazarPrev');
				if (index <= 0) { 
					offrePrev.classList.add('myCarousel__prev-hidden');
				}
				else { offrePrev.classList.remove('myCarousel__prev-hidden'); }
				offre.setAttribute('tabindex', index);
			}
		}
	});
		Template.tmplteSitesDetail.onCreated(function(){
			this.subscribe('lesImagesSub');
		});
		Template.tmplteSitesDetail.helpers({
			uSite : function(){ return Sites.findOne({_id : Session.get('siteOffres')}); },

			dMOffres : function(){
				var leSiteDesOffres = '';
				var dmarcheOffres = [];
				var dMOEpiSalee = [];
				var dMOEpiSucree = [];
				var dMOProdFrais = [];
				var dMOFruitsLegumes = [];
				var dMOBouchPoissVol = [];
				var dMOBoissVinLiq = [];
				var dMOBoulPatisserie = [];
				var dMOFastFood = [];

				var id = Session.get('siteOffres');
				if (id !== undefined) { 
					leSiteDesOffres = Sites.findOne({_id : id}); 
					const lesOffres = leSiteDesOffres.sitePromos;
					if ((lesOffres !== undefined) && (lesOffres.length > 0)) {
						lesOffres.forEach(function(transaction){ 
							if (transaction.typeDePromo == 'dernierMarche'){ dmarcheOffres.push(transaction); }    
					    });
					    dmarcheOffres.forEach(function(transaction){ 
							if (transaction.rayonDePromo == 'epicerieSalee'){ dMOEpiSalee.push(transaction); }
							else if (transaction.rayonDePromo == 'epicerieSucree'){ dMOEpiSucree.push(transaction); }
							else if (transaction.rayonDePromo == 'produitsFrais'){ dMOProdFrais.push(transaction); }
							else if (transaction.rayonDePromo == 'fruitsLegumes'){ dMOFruitsLegumes.push(transaction); }
							else if (transaction.rayonDePromo == 'bouchPoissVol'){ dMOBouchPoissVol.push(transaction); }
							else if (transaction.rayonDePromo == 'boissVinLiq'){ dMOBoissVinLiq.push(transaction); }
							else if (transaction.rayonDePromo == 'boulPatisserie'){ dMOBoulPatisserie.push(transaction); }
							else if (transaction.rayonDePromo == 'fastFood'){ dMOFastFood.push(transaction); }
					    });
					}
				    var qteDMO = { qte : {}, num : 0, qteDMOBool : false };
				    var qteDMOEpiSalee = dMOEpiSalee.length;
				    var qteDMOEpiSucree = dMOEpiSucree.length;
				    var qteDMOProdFrais = dMOProdFrais.length;
				    var qteDMOFruitsLegumes = dMOFruitsLegumes.length;
					var qteDMOBouchPoissVol = dMOBouchPoissVol.length;
				    var qteDMOBoissVinLiq = dMOBoissVinLiq.length;
					var qteDMOBoulPatisserie = dMOBoulPatisserie.length;
				    var qteDMOFastFood = dMOFastFood.length;
				    if (qteDMOEpiSalee > 0){ qteDMO.qte.dMESal = qteDMOEpiSalee; qteDMO.num++; }  
					if (qteDMOEpiSucree > 0){ qteDMO.qte.dMESuc = qteDMOEpiSucree; qteDMO.num++; }  
					if (qteDMOProdFrais > 0){ qteDMO.qte.dMPF = qteDMOProdFrais; qteDMO.num++; }  
					if (qteDMOFruitsLegumes > 0){ qteDMO.qte.dMFL = qteDMOFruitsLegumes; qteDMO.num++; }  
					if (qteDMOBouchPoissVol > 0){ qteDMO.qte.dMBPV = qteDMOBouchPoissVol; qteDMO.num++; }
					if (qteDMOBoissVinLiq > 0){ qteDMO.qte.dMBVL = qteDMOBoissVinLiq; qteDMO.num++; } 
					if (qteDMOBoulPatisserie > 0){ qteDMO.qte.dMBP = qteDMOBoulPatisserie; qteDMO.num++; } 
					if (qteDMOFastFood > 0){ qteDMO.qte.dMFF = qteDMOFastFood; qteDMO.num++; } 
					if (qteDMO.num > 0){ qteDMO.qteDMOBool = true; }

				    Session.set('dernierMarcheOffEpiSalee', dMOEpiSalee);
				    Session.set('dernierMarcheOffEpiSucree', dMOEpiSucree);
				    Session.set('dernierMarcheOffProdFrais', dMOProdFrais);
				    Session.set('dernierMarcheOffFruitsLegumes', dMOFruitsLegumes);
				    Session.set('dernierMarcheOffBouchPoissVol', dMOBouchPoissVol);
				    Session.set('dernierMarcheOffBoissVinLiq', dMOBoissVinLiq);
				    Session.set('dernierMarcheOffBoulPatisserie', dMOBoulPatisserie);
				    Session.set('dernierMarcheOffFastFood', dMOFastFood);
			    	return qteDMO; 
			    } 
			},
			pOffres : function(){
				var leSiteDesOffres = '';
				var promotionsOffres = [];
				var pOEpiSalee = [];
				var pOEpiSucree = [];
				var pOProdFrais = [];
				var pOFruitsLegumes = [];
				var pOBouchPoissVol = [];
				var pOBoissVinLiq = [];
				var pOBoulPatisserie = [];
				var pOFastFood = [];
				var pOBazar = [];

				var id = Session.get('siteOffres');
				if (id !== undefined) {
					leSiteDesOffres = Sites.findOne({_id : id});
					const lesOffres = leSiteDesOffres.sitePromos;
					if ((lesOffres !== undefined) && (lesOffres.length > 0)) {
						lesOffres.forEach(function(transaction){ 
							if (transaction.typeDePromo == 'promotion'){ promotionsOffres.push(transaction); }    
					    });
						promotionsOffres.forEach(function(transaction){ 
							if (transaction.rayonDePromo == 'epicerieSalee'){ pOEpiSalee.push(transaction); }
							else if (transaction.rayonDePromo == 'epicerieSucree'){ pOEpiSucree.push(transaction); }
							else if (transaction.rayonDePromo == 'produitsFrais'){ pOProdFrais.push(transaction); }
							else if (transaction.rayonDePromo == 'fruitsLegumes'){ pOFruitsLegumes.push(transaction); }
							else if (transaction.rayonDePromo == 'bouchPoissVol'){ pOBouchPoissVol.push(transaction); }  
							else if (transaction.rayonDePromo == 'boissVinLiq'){ pOBoissVinLiq.push(transaction); }
							else if (transaction.rayonDePromo == 'boulPatisserie'){ pOBoulPatisserie.push(transaction); }
							else if (transaction.rayonDePromo == 'fastFood'){ pOFastFood.push(transaction); }
							else if (transaction.rayonDePromo == 'bazar'){ pOBazar.push(transaction); }
					    });
					}
					var qtePO = { qte : {}, num : 0, qtePOBool : false };
				    var qtePOEpiSalee = pOEpiSalee.length;
				    var qtePOEpiSucree = pOEpiSucree.length;
				    var qtePOProdFrais = pOProdFrais.length;
				    var qtePOFruitsLegumes = pOFruitsLegumes.length;
					var qtePOBouchPoissVol = pOBouchPoissVol.length;
				    var qtePOBoissVinLiq = pOBoissVinLiq.length;
					var qtePOBoulPatisserie = pOBoulPatisserie.length;
				    var qtePOFastFood = pOFastFood.length;
					var qtePOBazar = pOBazar.length;
				    if (qtePOEpiSalee > 0){ qtePO.qte.pESal = qtePOEpiSalee; qtePO.num++; }  
					if (qtePOEpiSucree > 0){ qtePO.qte.pESuc = qtePOEpiSucree; qtePO.num++; }  
					if (qtePOProdFrais > 0){ qtePO.qte.pPF = qtePOProdFrais; qtePO.num++; }  
					if (qtePOFruitsLegumes > 0){ qtePO.qte.pFL = qtePOFruitsLegumes; qtePO.num++; }
					if (qtePOBouchPoissVol > 0){ qtePO.qte.pBPV = qtePOBouchPoissVol; qtePO.num++; }  
					if (qtePOBoissVinLiq > 0){ qtePO.qte.pBVL = qtePOBoissVinLiq; qtePO.num++; }
					if (qtePOBoulPatisserie > 0){ qtePO.qte.pBP = qtePOBoulPatisserie; qtePO.num++; }  
					if (qtePOFastFood > 0){ qtePO.qte.pFF = qtePOFastFood; qtePO.num++; } 
					if (qtePOBazar > 0){ qtePO.qte.pB = qtePOBazar; qtePO.num++; }
					if (qtePO.num > 0){ qtePO.qtePOBool = true; }
				    Session.set('promotionOffEpiSalee', pOEpiSalee);
				    Session.set('promotionOffEpiSucree', pOEpiSucree);
				    Session.set('promotionOffProdFrais', pOProdFrais);
				    Session.set('promotionOffFruitsLegumes', pOFruitsLegumes);
					Session.set('promotionOffBouchPoissVol', pOBouchPoissVol);
				    Session.set('promotionOffBoissVinLiq', pOBoissVinLiq);
					Session.set('promotionOffBoulPatisserie', pOBoulPatisserie);
				    Session.set('promotionOffFastFood', pOFastFood);
					Session.set('promotionOffBazar', pOBazar);	
			    	return qtePO;
			    }
			},
			dMOffresEpicerieSalee : function(){ 
				let DMESalee = Session.get('dernierMarcheOffEpiSalee');
				if (ecranWidth){
					let offreDMESalee = document.getElementById('idCarouselDMESalee'); 
				    if (offreDMESalee !== null) {
				    	let nbreDMESalee = DMESalee.length;
				    	let numoffreDMESalee = 320 * nbreDMESalee;
					    offreDMESalee.style.width = numoffreDMESalee + 'px';
					    offreDMESalee.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMESalee.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMESaleePrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMESalee > 2) { 
					    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMESaleeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				} 
				return DMESalee !== undefined ? DMESalee : false;
			},
			dMOffresEpicerieSucree : function(){ 
				let DMESucree = Session.get('dernierMarcheOffEpiSucree');
				if (ecranWidth) {
					let offreDMESucree = document.getElementById('idCarouselDMESucree');
					if (offreDMESucree !== null) {
						let nbreDMESucree = DMESucree.length;
				    	let numoffreDMESucree = 320 * nbreDMESucree;
					    offreDMESucree.style.width = numoffreDMESucree + 'px';
					    offreDMESucree.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMESucree.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMESucreePrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMESucree > 2) { 
					    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMESucreeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMESucree !== undefined ? DMESucree : false;
			},
			dMOffresProduitsFrais : function(){ 
				let DMPFrais = Session.get('dernierMarcheOffProdFrais');
				if (ecranWidth){
					let offreDMPFrais = document.getElementById('idCarouselDMPFrais');
					if (offreDMPFrais !== null) {
						let nbreDMPFrais = DMPFrais.length;
				    	let numoffreDMPFrais = 320 * nbreDMPFrais;
					    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
					    offreDMPFrais.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMPFrais.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMPFraisPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMPFrais > 2) { 
					    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMPFraisNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMPFrais !== undefined ? DMPFrais : false;
			},
			dMOffresFruitsLegumes : function(){ 
				let DMFLegumes = Session.get('dernierMarcheOffFruitsLegumes');
				if (ecranWidth){
					let offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
					if (offreDMFLegumes !== null) {
						let nbreDMFLegumes = DMFLegumes.length;
				    	let numoffreDMFLegumes = 320 * nbreDMFLegumes;
					    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
					    offreDMFLegumes.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMFLegumes.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMFLegumesPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMFLegumes > 2) { 
					    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMFLegumesNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMFLegumes !== undefined ? DMFLegumes : false;
			},
			dMOffresBoucheriePoissVol : function(){ 
				let DMBPoissVol = Session.get('dernierMarcheOffBouchPoissVol');
				if (ecranWidth){
					let offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
					if (offreDMBPoissVol !== null) {
						let nbreDMBPoissVol = DMBPoissVol.length;
				    	let numoffreDMBPoissVol = 320 * nbreDMBPoissVol;
					    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
					    offreDMBPoissVol.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMBPoissVol.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMBPoissVolPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMBPoissVol > 2) { 
					    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMBPoissVolNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMBPoissVol !== undefined ? DMBPoissVol : false;
			},
			dMOffresBoissonVinLiq : function(){ 
				let DMBVinLiq = Session.get('dernierMarcheOffBoissVinLiq');
				if (ecranWidth){
					let offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
					if (offreDMBVinLiq !== null) {
						let nbreDMBVinLiq = DMBVinLiq.length;
				    	let numoffreDMBVinLiq = 320 * nbreDMBVinLiq;
					    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
					    offreDMBVinLiq.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMBVinLiq.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMBVinLiqPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMBVinLiq > 2) { 
					    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMBVinLiqNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMBVinLiq !== undefined ? DMBVinLiq : false;
			},
			dMOffresBoulangeriePatisserie : function(){ 
				let DMBPatisserie = Session.get('dernierMarcheOffBoulPatisserie');
				if (ecranWidth){
					let offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
					if (offreDMBPatisserie !== null) {
						let nbreDMBPatisserie = DMBPatisserie.length;
				    	let numoffreDMBPatisserie = 320 * nbreDMBPatisserie;
					    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
					    offreDMBPatisserie.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMBPatisserie.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMBPatisseriePrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMBPatisserie > 2) { 
					    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMBPatisserieNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMBPatisserie !== undefined ? DMBPatisserie : false;
			},
			dMOffresFastFood : function(){ 
				let DMFFood = Session.get('dernierMarcheOffFastFood');
				if (ecranWidth){
					let offreDMFFood = document.getElementById('idCarouselDMFFood');
					if (offreDMFFood !== null) {
						let nbreDMFFood = DMFFood.length;
				    	let numoffreDMFFood = 320 * nbreDMFFood;
					    offreDMFFood.style.width = numoffreDMFFood + 'px';
					    offreDMFFood.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMFFood.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMFFoodPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMFFood > 2) { 
					    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMFFoodNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMFFood !== undefined ? DMFFood : false;
			},
			pOffresEpicerieSalee : function(){ 
				let PESalee = Session.get('promotionOffEpiSalee');
				if (ecranWidth){
					let offrePESalee = document.getElementById('idCarouselPESalee');
					if (offrePESalee !== null) {
						let nbrePESalee = PESalee.length;
				    	let numoffrePESalee = 320 * nbrePESalee;
					    offrePESalee.style.width = numoffrePESalee + 'px';
					    offrePESalee.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePESalee.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPESaleePrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePESalee > 2) { 
					    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPESaleeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PESalee !== undefined ? PESalee : false;
			},
			pOffresEpicerieSucree : function(){ 	
				let PESucree = Session.get('promotionOffEpiSucree');
				if (ecranWidth){
					let offrePESucree = document.getElementById('idCarouselPESucree');
					if (offrePESucree !== null) {
						let nbrePESucree = PESucree.length;
				    	let numoffrePESucree = 320 * nbrePESucree;
					    offrePESucree.style.width = numoffrePESucree + 'px';
					    offrePESucree.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePESucree.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPESucreePrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePESucree > 2) { 
					    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPESucreeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PESucree !== undefined ? PESucree : false;
			},
			pOffresProduitsFrais : function(){ 
				let PPFrais = Session.get('promotionOffProdFrais');
				if (ecranWidth){
					let offrePPFrais = document.getElementById('idCarouselPPFrais');
					if (offrePPFrais !== null) {
						let nbrePPFrais = PPFrais.length;
				    	let numoffrePPFrais = 320 * nbrePPFrais;
					    offrePPFrais.style.width = numoffrePPFrais + 'px';
					    offrePPFrais.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePPFrais.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPPFraisPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePPFrais > 2) { 
					    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPPFraisNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PPFrais !== undefined ? PPFrais : false;
			},
			pOffresFruitsLegumes : function(){ 
				let PFLegumes = Session.get('promotionOffFruitsLegumes');
				if (ecranWidth){
					let offrePFLegumes = document.getElementById('idCarouselPFLegumes');
					if (offrePFLegumes !== null) {
						let nbrePFLegumes = PFLegumes.length;
				    	let numoffrePFLegumes = 320 * nbrePFLegumes;
					    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
					    offrePFLegumes.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePFLegumes.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPFLegumesPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePFLegumes > 2) { 
					    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPFLegumesNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PFLegumes !== undefined ? PFLegumes : false;
			},
			pOffresBoucheriePoissVol : function(){ 	
				let PBPoissVol = Session.get('promotionOffBouchPoissVol');
				if (ecranWidth){
					let offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');
					if (offrePBPoissVol !== null) {
						let nbrePBPoissVol = PBPoissVol.length;
				    	let numoffrePBPoissVol = 320 * nbrePBPoissVol;
					    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
					    offrePBPoissVol.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBPoissVol.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBPoissVolPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBPoissVol > 2) { 
					    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBPoissVolNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBPoissVol !== undefined ? PBPoissVol : false;
			},
			pOffresBoissonVinLiq : function(){ 
				let PBVinLiq = Session.get('promotionOffBoissVinLiq');
				if (ecranWidth){
					let offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
					if (offrePBVinLiq !== null) {
						let nbrePBVinLiq = PBVinLiq.length;
				    	let numoffrePBVinLiq = 320 * nbrePBVinLiq;
					    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
					    offrePBVinLiq.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBVinLiq.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBVinLiqPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBVinLiq > 2) { 
					    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBVinLiqNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBVinLiq !== undefined ? PBVinLiq : false;
			},
			pOffresBoulangeriePatisserie : function(){ 
				let PBPatisserie = Session.get('promotionOffBoulPatisserie');
				if (ecranWidth){
					let offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
					if (offrePBPatisserie !== null) {
						let nbrePBPatisserie = PBPatisserie.length;
				    	let numoffrePBPatisserie = 320 * nbrePBPatisserie;
					    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
					    offrePBPatisserie.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBPatisserie.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBPatisseriePrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBPatisserie > 2) { 
					    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBPatisserieNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBPatisserie !== undefined ? PBPatisserie : false;
			},
			pOffresFastFood : function(){ 
				let PFFood = Session.get('promotionOffFastFood');
				if (ecranWidth){
					let offrePFFood = document.getElementById('idCarouselPFFood');
					if (offrePFFood !== null) {
						let nbrePFFood = PFFood.length;
				    	let numoffrePFFood = 320 * nbrePFFood;
					    offrePFFood.style.width = numoffrePFFood + 'px';
					    offrePFFood.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePFFood.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPFFoodPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePFFood > 2) { 
					    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPFFoodNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PFFood !== undefined ? PFFood : false;
			},
			pOffresBazar : function(){ 
				let PBazar = Session.get('promotionOffBazar');
				if (ecranWidth){
					let offrePBazar = document.getElementById('idCarouselPBazar');
					if (offrePBazar !== null) {
						let nbrePBazar = PBazar.length;
				    	let numoffrePBazar = 320 * nbrePBazar;
					    offrePBazar.style.width = numoffrePBazar + 'px';
					    offrePBazar.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBazar.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBazarPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBazar > 2) { 
					    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBazarNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBazar !== undefined ? PBazar : false;
			}
		});

				Template.tmplteChaqueSite.events({
					'click .js-modif-site' : function(event, instance){
						event.preventDefault();
						Session.set('lUser',instance.data.uSite._id);
						Modal.show('tmplteModalModifSite', instance.data);
					}
				});
						Template.tmplteModalModifSite.onCreated(function(){
							// this.subscribe('toutesLesPromos_SiteDetailSub', Session.get('lUser'));
							this.subscribe('lesImagesSub');
							this.subscribe('userData');
							this.subscribe('toutesLesVillesSub');
								this.subscribe('tousLesSitesSub');				
						});
						Template.tmplteModalModifSite.events({
							'click .js-modifInfos-site' : function(event, instance){
								event.preventDefault();
								$( event.target ).toggleClass('On');
							},
							'click .js-btn-modifier' : function(event, instance){
								event.preventDefault();
								var siteNomModified = $('#idModifNomSite').val();
								siteNomModified = siteNomModified.toUpperCase();
								if (siteNomModified != instance.data.uSite.siteQuartier) {
									const nbreSite = Sites.find({siteEspace : instance.data.uSite.siteEspace, siteQuartier : siteNomModified}).count();
									if (nbreSite > 0) { 
										$('#idNotificationExist').addClass('notificationExistNON');

										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');

										$('#idModalModifSite').animate({
											scrollTop : 0
										}, 0);
									}
									else {
										$('#idNotification').removeClass('notificationOUI');
										$('#idNotification').addClass('notificationNON');

										$('#idConfirmation').removeClass('confirmationNON');
										$('#idConfirmation').addClass('confirmationOUI');

										$('#idConfirmSupp').addClass('non');
										$('#idConfirmBlock').addClass('non');
										$('#idConfirmDeblock').addClass('non');
										$('#idConfirmPromotion').addClass('non');
										$('#idGestionUser').addClass('non');

										$('#idConfirmModif').removeClass('non');
										$('#idConfirmModif').addClass('oui');
										$('#idConfirmAnnul').removeClass('non');
										$('#idConfirmAnnul').addClass('oui');

										$('#idModalModifSite').animate({
											scrollTop : 0
										}, 0);
									}
								}
								else {
									var siteVilleModified = $('#idModifVilleSite').val();
									siteVilleModified = siteVilleModified.toUpperCase();

									const siteContactModified = $('#idModifContactSite').val();
									// const siteMailModified = $('#idModifMailSite').val();

									const siteOuvFeriesModified = $('#idModifOuvertureFeriesSite').val();
									const siteFermFeriesModified = $('#idModifFermetureFeriesSite').val();
									const siteOuvLundiModified = $('#idModifOuvertureLundiSite').val();
									const siteFermLundiModified = $('#idModifFermetureLundiSite').val();
									const siteOuvMardiModified = $('#idModifOuvertureMardiSite').val();
									const siteFermMardiModified = $('#idModifFermetureMardiSite').val();
									const siteOuvMercrediModified = $('#idModifOuvertureMercrediSite').val();
									const siteFermMercrediModified = $('#idModifFermetureMercrediSite').val();
									const siteOuvJeudiModified = $('#idModifOuvertureJeudiSite').val();
									const siteFermJeudiModified = $('#idModifFermetureJeudiSite').val();
									const siteOuvVendrediModified = $('#idModifOuvertureVendrediSite').val();
									const siteFermVendrediModified = $('#idModifFermetureVendrediSite').val();
									const siteOuvSamediModified = $('#idModifOuvertureSamediSite').val();
									const siteFermSamediModified = $('#idModifFermetureSamediSite').val();
									const siteOuvDimancheModified = $('#idModifOuvertureDimancheSite').val();
									const siteFermDimancheModified = $('#idModifFermetureDimancheSite').val();

									const siteEmplacementModified = $('#idModifEmplacementSite').val();

									if (siteNomModified == instance.data.uSite.siteQuartier && 
										siteVilleModified == instance.data.uSite.siteVille &&
										siteContactModified == instance.data.uSite.siteContact &&
										// siteMailModified == instance.data.uSite.siteMail &&

										siteOuvFeriesModified == instance.data.uSite.siteOuvFeries &&
										siteFermFeriesModified == instance.data.uSite.siteFermFeries &&
										siteOuvLundiModified == instance.data.uSite.siteOuvLundi &&
										siteFermLundiModified == instance.data.uSite.siteFermLundi &&
										siteOuvMardiModified == instance.data.uSite.siteOuvMardi &&
										siteFermMardiModified == instance.data.uSite.siteFermMardi &&
										siteOuvMercrediModified == instance.data.uSite.siteOuvMercredi &&
										siteFermMercrediModified == instance.data.uSite.siteFermMercredi &&
										siteOuvJeudiModified == instance.data.uSite.siteOuvJeudi &&
										siteFermJeudiModified == instance.data.uSite.siteFermJeudi &&
										siteOuvVendrediModified == instance.data.uSite.siteOuvVendredi &&
										siteFermVendrediModified == instance.data.uSite.siteFermVendredi &&
										siteOuvSamediModified == instance.data.uSite.siteOuvSamedi &&
										siteFermSamediModified == instance.data.uSite.siteFermSamedi &&
										siteOuvDimancheModified == instance.data.uSite.siteOuvDimanche &&
										siteFermDimancheModified == instance.data.uSite.siteFermDimanche &&
										siteEmplacementModified == instance.data.uSite.siteEmplacement) {

										$('#idNotificationExist').addClass('notificationExistNON');
									
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');

										$('#idModalModifSite').animate({
											scrollTop : 0
										}, 0);
									}
									else {
										$('#idConfirmation').removeClass('confirmationNON');
										$('#idConfirmation').addClass('confirmationOUI');

										$('#idConfirmSupp').addClass('non');
										$('#idConfirmBlock').addClass('non');
										$('#idConfirmDeblock').addClass('non');
										$('#idConfirmPromotion').addClass('non');
										$('#idGestionUser').addClass('non');

										$('#idConfirmModif').removeClass('non');
										$('#idConfirmModif').addClass('oui');
										$('#idConfirmAnnul').removeClass('non');
										$('#idConfirmAnnul').addClass('oui');

										$('#idModalModifSite').animate({
											scrollTop : 0
										}, 0);
									}						
								}
							},
							'click .js-btn-supprimer' : function(event, instance){
								event.preventDefault();
								var siteNomModified = $('#idModifNomSite').val();
								siteNomModified = siteNomModified.toUpperCase();

								var siteVilleModified = $('#idModifVilleSite').val();
								siteVilleModified = siteVilleModified.toUpperCase();

								const siteContactModified = $('#idModifContactSite').val();
								// const siteMailModified = $('#idModifMailSite').val();

								const siteOuvFeriesModified = $('#idModifOuvertureFeriesSite').val();
								const siteFermFeriesModified = $('#idModifFermetureFeriesSite').val();
								const siteOuvLundiModified = $('#idModifOuvertureLundiSite').val();
								const siteFermLundiModified = $('#idModifFermetureLundiSite').val();
								const siteOuvMardiModified = $('#idModifOuvertureMardiSite').val();
								const siteFermMardiModified = $('#idModifFermetureMardiSite').val();
								const siteOuvMercrediModified = $('#idModifOuvertureMercrediSite').val();
								const siteFermMercrediModified = $('#idModifFermetureMercrediSite').val();
								const siteOuvJeudiModified = $('#idModifOuvertureJeudiSite').val();
								const siteFermJeudiModified = $('#idModifFermetureJeudiSite').val();
								const siteOuvVendrediModified = $('#idModifOuvertureVendrediSite').val();
								const siteFermVendrediModified = $('#idModifFermetureVendrediSite').val();
								const siteOuvSamediModified = $('#idModifOuvertureSamediSite').val();
								const siteFermSamediModified = $('#idModifFermetureSamediSite').val();
								const siteOuvDimancheModified = $('#idModifOuvertureDimancheSite').val();
								const siteFermDimancheModified = $('#idModifFermetureDimancheSite').val();

								const siteEmplacementModified = $('#idModifEmplacementSite').val();

								if (siteNomModified == instance.data.uSite.siteQuartier && 
									siteVilleModified == instance.data.uSite.siteVille &&
									siteContactModified == instance.data.uSite.siteContact &&
									// siteMailModified == instance.data.uSite.siteMail &&

									siteOuvFeriesModified == instance.data.uSite.siteOuvFeries &&
									siteFermFeriesModified == instance.data.uSite.siteFermFeries &&
									siteOuvLundiModified == instance.data.uSite.siteOuvLundi &&
									siteFermLundiModified == instance.data.uSite.siteFermLundi &&
									siteOuvMardiModified == instance.data.uSite.siteOuvMardi &&
									siteFermMardiModified == instance.data.uSite.siteFermMardi &&
									siteOuvMercrediModified == instance.data.uSite.siteOuvMercredi &&
									siteFermMercrediModified == instance.data.uSite.siteFermMercredi &&
									siteOuvJeudiModified == instance.data.uSite.siteOuvJeudi &&
									siteFermJeudiModified == instance.data.uSite.siteFermJeudi &&
									siteOuvVendrediModified == instance.data.uSite.siteOuvVendredi &&
									siteFermVendrediModified == instance.data.uSite.siteFermVendredi &&
									siteOuvSamediModified == instance.data.uSite.siteOuvSamedi &&
									siteFermSamediModified == instance.data.uSite.siteFermSamedi &&
									siteOuvDimancheModified == instance.data.uSite.siteOuvDimanche &&
									siteFermDimancheModified == instance.data.uSite.siteFermDimanche &&
									siteEmplacementModified == instance.data.uSite.siteEmplacement) {
									$('#idConfirmation').removeClass('confirmationNON');
									$('#idConfirmation').addClass('confirmationOUI');

									$('#idConfirmModif').addClass('non');
									$('#idConfirmBlock').addClass('non');
									$('#idConfirmDeblock').addClass('non');
									$('#idConfirmPromotion').addClass('non');
									$('#idGestionUser').addClass('non');

									$('#idConfirmSupp').removeClass('non');
									$('#idConfirmSupp').addClass('oui');
									$('#idConfirmAnnul').removeClass('non');
									$('#idConfirmAnnul').addClass('oui');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}
								else {
									$('#idNotification').addClass('notificationNON');

									$('#idNotificationExist').removeClass('notificationExistNON');
									$('#idNotificationExist').addClass('notificationExistOUI');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}
							},
							'click .js-btn-blocked' : function(event, instance){
								event.preventDefault();
								var siteNomModified = $('#idModifNomSite').val();
								siteNomModified = siteNomModified.toUpperCase();

								var siteVilleModified = $('#idModifVilleSite').val();
								siteVilleModified = siteVilleModified.toUpperCase();

								const siteContactModified = $('#idModifContactSite').val();
								// const siteMailModified = $('#idModifMailSite').val();

								const siteOuvFeriesModified =  $('#idModifOuvertureFeriesSite').val();
								const siteFermFeriesModified =  $('#idModifFermetureFeriesSite').val();
								const siteOuvLundiModified =  $('#idModifOuvertureLundiSite').val();
								const siteFermLundiModified =  $('#idModifFermetureLundiSite').val();
								const siteOuvMardiModified =  $('#idModifOuvertureMardiSite').val();
								const siteFermMardiModified =  $('#idModifFermetureMardiSite').val();
								const siteOuvMercrediModified =  $('#idModifOuvertureMercrediSite').val();
								const siteFermMercrediModified =  $('#idModifFermetureMercrediSite').val();
								const siteOuvJeudiModified =  $('#idModifOuvertureJeudiSite').val();
								const siteFermJeudiModified =  $('#idModifFermetureJeudiSite').val();
								const siteOuvVendrediModified =  $('#idModifOuvertureVendrediSite').val();
								const siteFermVendrediModified =  $('#idModifFermetureVendrediSite').val();
								const siteOuvSamediModified =  $('#idModifOuvertureSamediSite').val();
								const siteFermSamediModified =  $('#idModifFermetureSamediSite').val();
								const siteOuvDimancheModified =  $('#idModifOuvertureDimancheSite').val();
								const siteFermDimancheModified =  $('#idModifFermetureDimancheSite').val();

								const siteEmplacementModified =  $('#idModifEmplacementSite').val();

								if (siteNomModified == instance.data.uSite.siteQuartier && 
									siteVilleModified == instance.data.uSite.siteVille &&
									siteContactModified == instance.data.uSite.siteContact &&
									// siteMailModified == instance.data.uSite.siteMail &&

									siteOuvFeriesModified == instance.data.uSite.siteOuvFeries &&
									siteFermFeriesModified == instance.data.uSite.siteFermFeries &&
									siteOuvLundiModified == instance.data.uSite.siteOuvLundi &&
									siteFermLundiModified == instance.data.uSite.siteFermLundi &&
									siteOuvMardiModified == instance.data.uSite.siteOuvMardi &&
									siteFermMardiModified == instance.data.uSite.siteFermMardi &&
									siteOuvMercrediModified == instance.data.uSite.siteOuvMercredi &&
									siteFermMercrediModified == instance.data.uSite.siteFermMercredi &&
									siteOuvJeudiModified == instance.data.uSite.siteOuvJeudi &&
									siteFermJeudiModified == instance.data.uSite.siteFermJeudi &&
									siteOuvVendrediModified == instance.data.uSite.siteOuvVendredi &&
									siteFermVendrediModified == instance.data.uSite.siteFermVendredi &&
									siteOuvSamediModified == instance.data.uSite.siteOuvSamedi &&
									siteFermSamediModified == instance.data.uSite.siteFermSamedi &&
									siteOuvDimancheModified == instance.data.uSite.siteOuvDimanche &&
									siteFermDimancheModified == instance.data.uSite.siteFermDimanche &&
									siteEmplacementModified == instance.data.uSite.siteEmplacement) {

									const uSt = Sites.findOne({_id : instance.data.uSite._id});

									$('#idConfirmation').removeClass('confirmationNON');
									$('#idConfirmation').addClass('confirmationOUI');

									$('#idConfirmModif').addClass('non');
									$('#idConfirmSupp').addClass('non');
									$('#idConfirmPromotion').addClass('non');
									$('#idGestionUser').addClass('non');

									if (uSt.siteBlocked == 'NON') {
										$('#idConfirmDeblock').addClass('non');

										$('#idConfirmBlock').removeClass('non');
										$('#idConfirmBlock').addClass('oui');
									}
									else {
										$('#idConfirmBlock').addClass('non');

										$('#idConfirmDeblock').removeClass('non');
										$('#idConfirmDeblock').addClass('oui');
									}
									$('#idConfirmAnnul').removeClass('non');
									$('#idConfirmAnnul').addClass('oui');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}
								else {
									$('#idNotification').addClass('notificationNON');

									$('#idNotificationExist').removeClass('notificationExistNON');
									$('#idNotificationExist').addClass('notificationExistOUI');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}
							},
							'click .js-btn-promotion' : function(event, instance){
								event.preventDefault();
								var siteNom = $('#idModifNomSite').val();
								siteNom = siteNom.toUpperCase();

								var siteVille = $('#idModifVilleSite').val();
								siteVille = siteVille.toUpperCase();

								const siteContact = $('#idModifContactSite').val();
								// const siteMail = $('#idModifMailSite').val();

								const siteOuvFeriesModified = $('#idModifOuvertureFeriesSite').val();
								const siteFermFeriesModified = $('#idModifFermetureFeriesSite').val();
								const siteOuvLundiModified = $('#idModifOuvertureLundiSite').val();
								const siteFermLundiModified = $('#idModifFermetureLundiSite').val();
								const siteOuvMardiModified = $('#idModifOuvertureMardiSite').val();
								const siteFermMardiModified = $('#idModifFermetureMardiSite').val();
								const siteOuvMercrediModified = $('#idModifOuvertureMercrediSite').val();
								const siteFermMercrediModified = $('#idModifFermetureMercrediSite').val();
								const siteOuvJeudiModified = $('#idModifOuvertureJeudiSite').val();
								const siteFermJeudiModified = $('#idModifFermetureJeudiSite').val();
								const siteOuvVendrediModified = $('#idModifOuvertureVendrediSite').val();
								const siteFermVendrediModified = $('#idModifFermetureVendrediSite').val();
								const siteOuvSamediModified = $('#idModifOuvertureSamediSite').val();
								const siteFermSamediModified = $('#idModifFermetureSamediSite').val();
								const siteOuvDimancheModified = $('#idModifOuvertureDimancheSite').val();
								const siteFermDimancheModified = $('#idModifFermetureDimancheSite').val();

								const siteEmplacementModified = $('#idModifEmplacementSite').val();

								if (siteNom == instance.data.uSite.siteQuartier && 
									siteVille == instance.data.uSite.siteVille &&
									siteContact == instance.data.uSite.siteContact &&
									// siteMail == instance.data.uSite.siteMail &&
									siteOuvFeriesModified == instance.data.uSite.siteOuvFeries &&
									siteFermFeriesModified == instance.data.uSite.siteFermFeries &&
									siteOuvLundiModified == instance.data.uSite.siteOuvLundi &&
									siteFermLundiModified == instance.data.uSite.siteFermLundi &&
									siteOuvMardiModified == instance.data.uSite.siteOuvMardi &&
									siteFermMardiModified == instance.data.uSite.siteFermMardi &&
									siteOuvMercrediModified == instance.data.uSite.siteOuvMercredi &&
									siteFermMercrediModified == instance.data.uSite.siteFermMercredi &&
									siteOuvJeudiModified == instance.data.uSite.siteOuvJeudi &&
									siteFermJeudiModified == instance.data.uSite.siteFermJeudi &&
									siteOuvVendrediModified == instance.data.uSite.siteOuvVendredi &&
									siteFermVendrediModified == instance.data.uSite.siteFermVendredi &&
									siteOuvSamediModified == instance.data.uSite.siteOuvSamedi &&
									siteFermSamediModified == instance.data.uSite.siteFermSamedi &&
									siteOuvDimancheModified == instance.data.uSite.siteOuvDimanche &&
									siteFermDimancheModified == instance.data.uSite.siteFermDimanche &&
									siteEmplacementModified == instance.data.uSite.siteEmplacement) {
									$('#idConfirmation').removeClass('confirmationNON');
									$('#idConfirmation').addClass('confirmationOUI');

									$('#idConfirmModif').addClass('non');
									$('#idConfirmSupp').addClass('non');
									$('#idConfirmBlock').addClass('non');
									$('#idConfirmDeblock').addClass('non');
									$('#idGestionUser').addClass('non');

									$('#idConfirmPromotion').removeClass('non');
									$('#idConfirmPromotion').addClass('oui');
									$('#idConfirmAnnul').removeClass('non');
									$('#idConfirmAnnul').addClass('oui');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}
								else {
									$('#idNotification').addClass('notificationNON');

									$('#idNotificationExist').removeClass('notificationExistNON');
									$('#idNotificationExist').addClass('notificationExistOUI');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}					
							},
							'click .js-btn-gererUser' : function(event, instance){
								event.preventDefault();
								var siteNom = $('#idModifNomSite').val();
								siteNom = siteNom.toUpperCase();

								var siteVille = $('#idModifVilleSite').val();
								siteVille = siteVille.toUpperCase();

								if (siteNom == instance.data.uSite.siteQuartier && 
									siteVille == instance.data.uSite.siteVille) {
									$('#idConfirmation').removeClass('confirmationNON');
									$('#idConfirmation').addClass('confirmationOUI');

									$('#idConfirmModif').addClass('non');
									$('#idConfirmSupp').addClass('non');
									$('#idConfirmBlock').addClass('non');
									$('#idConfirmDeblock').addClass('non');
									$('#idConfirmPromotion').addClass('non');

									$('#idGestionUser').removeClass('non');
									$('#idGestionUser').addClass('oui');

									$('#idConfirmAnnul').removeClass('oui');
									$('#idConfirmAnnul').addClass('non');
									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}
								else {
									$('#idNotification').addClass('notificationNON');

									$('#idNotificationExist').removeClass('notificationExistNON');
									$('#idNotificationExist').addClass('notificationExistOUI');

									$('#idModalModifSite').animate({
											scrollTop : 0
									}, 0);
								}					
							},
							'click #idAjoutUser' : function(event, instance){
								event.preventDefault();
								$('#idGestionUser').removeClass('oui');
								$('#idGestionUser').addClass('non');
								if ((instance.data.uSite.siteUser !== undefined) &&
									(instance.data.uSite.siteUserTwo !== undefined)) {
									$('#idQuotaAtteint').removeClass('non');
									$('#idQuotaAtteint').addClass('oui');
								}
								else {
									$('#idFormNewUser').removeClass('non');
									$('#idFormNewUser').addClass('oui');
								}			
							},
							'click #idSubmitNewUser' : function(event, instance){
								event.preventDefault();
								const newMailSite = $('#idMailNewUser').val();
								const user = { m : newMailSite, p : 'password', typeUser : 'c' };

								Meteor.call('creationUser', user, function(err, result){
								 	if (err || (result.length > 18)) {
								 		$('#idMailNewUser').addClass('error'); 
								 		$('#idMailNewUser').val(''); 
								 	}
								 	else { 
								 		const userSite = { 
								 			idSite : instance.data.uSite._id, 
								 			m : newMailSite, 
								 			idUser : result,
								 			placeUser : instance.data.uSite.siteUser === undefined ? 'a' : 'b'
								 		};
								 		Meteor.call('ajoutUserSite', userSite, function(err, result){
										 	if (err) {
										 		$('#idMailNewUser').addClass('error'); 
										 		$('#idMailNewUser').val(''); 
										 	}
										 	else { 	
										 		$('#idModalModifSite').modal('hide');
										 	}
										});
								 	}
								});			
							}, 
							'click #idSuppUser' : function(event, instance){
								event.preventDefault();
								$('#idGestionUser').removeClass('oui');
								$('#idGestionUser').addClass('non');
								$('#idSupprimerUser').removeClass('non');
								$('#idSupprimerUser').addClass('oui');			
							},
							'click #idSubmitSuppUser' : function(event, instance){
								event.preventDefault();
								const mailSite = $('#idSelectSuppUser').find( 'option:selected' ).val();
								const userSite = { 
						 			idSite : instance.data.uSite._id, 
						 			idUser : mailSite == instance.data.uSite.siteMail ? instance.data.uSite.siteUser : instance.data.uSite.siteUserTwo,
						 			placeUser : mailSite == instance.data.uSite.siteMail ? 'a' : 'b'
						 		};
						 		Meteor.call('supprimerUserSite', userSite, function(err, result){
								 	if (err) {
								 		$('#idSuppUserError').removeClass('non'); 
						 				$('#idSuppUserError').addClass('oui');  
								 	}
								 	else { 	
								 		$('#idModalModifSite').modal('hide');
								 	}
								});		
							},						
							'click #idBlockageUser' : function(event, instance){
								event.preventDefault();
								$('#idGestionUser').removeClass('oui');
								$('#idGestionUser').addClass('non');
								$('#idBlockDeblockUser').removeClass('non');
								$('#idBlockDeblockUser').addClass('oui');			
							},
							'click #idSubmitBlkDblkUser' : function(event, instance){
								event.preventDefault();
								const mailSite = $('#idBlkDblkUser').find( 'option:selected' ).val();
								const idUser = (mailSite == instance.data.uSite.siteMail) ? instance.data.uSite.siteUser : instance.data.uSite.siteUserTwo;	
								$('#idBlkDblkUser').addClass('non');
								$('#idSubmitBlkDblkUser').addClass('non');
								const usr = Meteor.users.findOne({_id: idUser});
								Session.set('usrBlkDblk',usr);
								if (usr.profile == 'client') {
									$('#idSubmitBlkUser').removeClass('non');
									$('#idSubmitBlkUser').addClass('oui');
								}
								else {
									$('#idSubmitDblkUser').removeClass('non');
									$('#idSubmitDblkUser').addClass('oui');
								}		
							},
							'click #idSubmitBlkUser' : function(event, instance){
								event.preventDefault();
								const usrBlkDblk = Session.get('usrBlkDblk');
						 		Meteor.call('bloquerUser', {idUser : usrBlkDblk._id, profileUser : usrBlkDblk.profile}, function(err, result){
								 	if (err) {
								 		$('#idBlkDblkUserError').removeClass('non'); 
						 				$('#idBlkDblkUserError').addClass('oui');  
								 	}
								 	else { $('#idModalModifSite').modal('hide'); }
								});		
							},
							'click #idSubmitDblkUser' : function(event, instance){
								event.preventDefault();
								const usrBlkDblk = Session.get('usrBlkDblk');
						 		Meteor.call('debloquerUser', {idUser : usrBlkDblk._id, profileUser : usrBlkDblk.profile}, function(err, result){
								 	if (err) {
								 		$('#idBlkDblkUserError').removeClass('non'); 
						 				$('#idBlkDblkUserError').addClass('oui');  
								 	}
								 	else { $('#idModalModifSite').modal('hide'); }
								});		
							},
							'click #idConfirmAnnul' : function(event, instance){
								event.preventDefault();
								$('#idConfirmation').removeClass('confirmationOUI');
								$('#idConfirmation').addClass('confirmationNON');
							},
							'click #idConfirmModif' : function(event, instance){
								event.preventDefault();
								var siteNomModified = $('#idModifNomSite').val();
								siteNomModified = siteNomModified.toUpperCase();

								var siteVilleModified = $('#idModifVilleSite').val();
								siteVilleModified = siteVilleModified.toUpperCase();

								const siteContactModified = parseInt($('#idModifContactSite').val());
								// const siteMailModified = $('#idModifMailSite').val();

								const siteOuvFeriesModified =  $('#idModifOuvertureFeriesSite').val();
								const siteFermFeriesModified =  $('#idModifFermetureFeriesSite').val();
								const siteOuvLundiModified =  $('#idModifOuvertureLundiSite').val();
								const siteFermLundiModified =  $('#idModifFermetureLundiSite').val();
								const siteOuvMardiModified =  $('#idModifOuvertureMardiSite').val();
								const siteFermMardiModified =  $('#idModifFermetureMardiSite').val();
								const siteOuvMercrediModified =  $('#idModifOuvertureMercrediSite').val();
								const siteFermMercrediModified =  $('#idModifFermetureMercrediSite').val();
								const siteOuvJeudiModified =  $('#idModifOuvertureJeudiSite').val();
								const siteFermJeudiModified =  $('#idModifFermetureJeudiSite').val();
								const siteOuvVendrediModified =  $('#idModifOuvertureVendrediSite').val();
								const siteFermVendrediModified =  $('#idModifFermetureVendrediSite').val();
								const siteOuvSamediModified =  $('#idModifOuvertureSamediSite').val();
								const siteFermSamediModified =  $('#idModifFermetureSamediSite').val();
								const siteOuvDimancheModified =  $('#idModifOuvertureDimancheSite').val();
								const siteFermDimancheModified =  $('#idModifFermetureDimancheSite').val();

								var siteEmplacementModified =  $('#idModifEmplacementSite').val();
								siteEmplacementModified = siteEmplacementModified.slice(13, -36);
								const dte = new Date();
								const siteDteModif = laDate(dte);
								var siteModif = [];

								if (siteNomModified != instance.data.uSite.siteQuartier) {
									siteModif.push({ nom : 'siteQuartier', siteQuartier : siteNomModified });
								}
								if (siteVilleModified != instance.data.uSite.siteVille) {
									siteModif.push({ nom : 'siteVille', siteVille : siteVilleModified });
								}
								if (siteContactModified != instance.data.uSite.siteContact) {
									siteModif.push({ nom : 'siteContact', siteContact : siteContactModified });
								}
								// if (siteMailModified != instance.data.uSite.siteMail) {
								// 	siteModif.push({ nom : 'siteMail', siteMail : siteMailModified });
								// }
								if (siteOuvFeriesModified != instance.data.uSite.siteOuvFeries) {
									siteModif.push({ nom : 'siteOuvFeries', siteOuvFeries : siteOuvFeriesModified });
								}
								if (siteFermFeriesModified != instance.data.uSite.siteFermFeries) {
									siteModif.push({ nom : 'siteFermFeries', siteFermFeries : siteFermFeriesModified });
								}
								if (siteOuvLundiModified != instance.data.uSite.siteOuvLundi) {
									siteModif.push({ nom : 'siteOuvLundi', siteOuvLundi : siteOuvLundiModified });
								}
								if (siteFermLundiModified != instance.data.uSite.siteFermLundi) {
									siteModif.push({ nom : 'siteFermLundi', siteFermLundi : siteFermLundiModified });
								}
								if (siteOuvMardiModified != instance.data.uSite.siteOuvMardi) {
									siteModif.push({ nom : 'siteOuvMardi', siteOuvMardi : siteOuvMardiModified });
								}
								if (siteFermMardiModified != instance.data.uSite.siteFermMardi) {
									siteModif.push({ nom : 'siteFermMardi', siteFermMardi : siteFermMardiModified });
								}
								if (siteOuvMercrediModified != instance.data.uSite.siteOuvMercredi) {
									siteModif.push({ nom : 'siteOuvMercredi', siteOuvMercredi : siteOuvMercrediModified });
								}
								if (siteFermMercrediModified != instance.data.uSite.siteFermMercredi) {
									siteModif.push({ nom : 'siteFermMercredi', siteFermMercredi : siteFermMercrediModified });
								}
								if (siteOuvJeudiModified != instance.data.uSite.siteOuvJeudi) {
									siteModif.push({ nom : 'siteOuvJeudi', siteOuvJeudi : siteOuvJeudiModified });
								}
								if (siteFermJeudiModified != instance.data.uSite.siteFermJeudi) {
									siteModif.push({ nom : 'siteFermJeudi', siteFermJeudi : siteFermJeudiModified });
								}
								if (siteOuvVendrediModified != instance.data.uSite.siteOuvVendredi) {
									siteModif.push({ nom : 'siteOuvVendredi', siteOuvVendredi : siteOuvVendrediModified });
								}
								if (siteFermVendrediModified != instance.data.uSite.siteFermVendredi) {
									siteModif.push({ nom : 'siteFermVendredi', siteFermVendredi : siteFermVendrediModified });
								}
								if (siteOuvSamediModified != instance.data.uSite.siteOuvSamedi) {
									siteModif.push({ nom : 'siteOuvSamedi', siteOuvSamedi : siteOuvSamediModified });
								}
								if (siteFermSamediModified != instance.data.uSite.siteFermSamedi) {
									siteModif.push({ nom : 'siteFermSamedi', siteFermSamedi : siteFermSamediModified });
								}
								if (siteOuvDimancheModified != instance.data.uSite.siteOuvDimanche) {
									siteModif.push({ nom : 'siteOuvDimanche', siteOuvDimanche : siteOuvDimancheModified });
								}
								if (siteFermDimancheModified != instance.data.uSite.siteFermDimanche) {
									siteModif.push({ nom : 'siteFermDimanche', siteFermDimanche : siteFermDimancheModified });
								}
								if (siteEmplacementModified != instance.data.uSite.siteEmplacement) {
									siteModif.push({ nom : 'siteEmplacement', siteEmplacement : siteEmplacementModified });
								}
								const numAE = Sites.find({siteVille : instance.data.uSite.siteVille, 
													siteQuartier : instance.data.uSite.siteQuartier}).count();
								const numAQ = Sites.find({siteVille : instance.data.uSite.siteVille, 
													siteEspace : instance.data.uSite.siteEspace}).count();
								const numEQV = Sites.find({siteVille : instance.data.uSite.siteVille, 
													siteQuartier : siteNomModified,
													siteEspace : instance.data.uSite.siteEspace}).count();
								Meteor.call('modifSite', { id : instance.data.uSite._id, siteModif : siteModif, siteDteModif : siteDteModif }, function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');
										$('#idConfirmation').removeClass('confirmationNON');
										$('#idConfirmation').addClass('confirmationOUI');
									}
									else {
										if (siteVilleModified != instance.data.uSite.siteVille) {			
											const v = Villes.findOne({ville : siteVilleModified});
											if (!v) { 
												const newVille = {
													ville : siteVilleModified,
													espaces : [instance.data.uSite.siteEspace],
													quartiers : [siteNomModified]
												};
												const ancienneVille = {
													nSEspace : instance.data.uSite.siteEspace,
													aSQuartier : instance.data.uSite.siteQuartier,
													aSVille : instance.data.uSite.siteVille,
													numAE : numAE,
													numAQ : numAQ
												};
												Meteor.call('ajoutVille', newVille, ancienneVille, function(err, result){
													if (err || (result != 'sent')) {
														$('#idNotification').removeClass('notificationNON');
														$('#idNotification').addClass('notificationOUI');
														$('#idConfirmation').removeClass('confirmationNON');
														$('#idConfirmation').addClass('confirmationOUI');
										            }
												});
											}
											else {
												const newVille = {
													nSQuartier : siteNomModified,
													nSEspace : instance.data.uSite.siteEspace,
													aSQuartier : instance.data.uSite.siteQuartier,
													aSVille : instance.data.uSite.siteVille,
													numAE : numAE,
													numAQ : numAQ,
													numEQV : numEQV
												};									
												Meteor.call('majVille', v, newVille, function(err, result){
													if (err || (result != 'sent')) {
														$('#idNotification').removeClass('notificationNON');
														$('#idNotification').addClass('notificationOUI');
														$('#idConfirmation').removeClass('confirmationNON');
														$('#idConfirmation').addClass('confirmationOUI');
										            }
												});
											}
										}
										else {
											const v = Villes.findOne({ville : siteVilleModified});
											const newVille = {
												nSQuartier : siteNomModified,
												nSEspace : instance.data.uSite.siteEspace,
												aSQuartier : instance.data.uSite.siteQuartier,
												aSVille : instance.data.uSite.siteVille,
												numAE : numAE,
												numAQ : numAQ,
												numEQV : numEQV
											};									
											Meteor.call('majVille', v, newVille, function(err, result){
												if (err || (result != 'sent')) {
													$('#idNotification').removeClass('notificationNON');
													$('#idNotification').addClass('notificationOUI');
													$('#idConfirmation').removeClass('confirmationNON');
													$('#idConfirmation').addClass('confirmationOUI');
									            }
											});
										}
										Modal.hide();
									}
								});
							},
							'click #idConfirmSupp' : function(event, instance){
								event.preventDefault();
								const dataSite = instance.data.uSite;
								const nomQuartier = dataSite.siteQuartier;
								const nomEspace = dataSite.siteEspace;
								const nomVille = dataSite.siteVille;
								const vil = Villes.findOne({ville : nomVille}); 
								const numQuartiers = Sites.find({siteVille : nomVille, siteQuartier : nomQuartier}).count();	
								const numEsp = Sites.find({siteVille : nomVille, siteEspace : nomEspace}).count();
								Meteor.call('suppLeSite', {id : dataSite._id}, function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');
										$('#idConfirmation').removeClass('confirmationNON');
										$('#idConfirmation').addClass('confirmationOUI');
						            }
									else {
										Meteor.call('suppLesPromosDuSite', { idSite : dataSite._id }, 
											function(err, result){
												if (err || (result != 'OK')) {
													$('#idNotification').removeClass('notificationNON');
													$('#idNotification').addClass('notificationOUI');
													$('#idConfirmation').removeClass('confirmationNON');
													$('#idConfirmation').addClass('confirmationOUI');
									            }
												else {
													Meteor.call('suppVilleSite', 
														{ 
															numQuartiers : numQuartiers, 
															numEsp : numEsp,
															id : vil._id,
															nomQuartier : nomQuartier,
															nomEspace : nomEspace,
															ville : nomVille
														}, 
														function(err, result){
															if (err || (result != 'OK')) {
																$('#idNotification').removeClass('notificationNON');
																$('#idNotification').addClass('notificationOUI');
																$('#idConfirmation').removeClass('confirmationNON');
																$('#idConfirmation').addClass('confirmationOUI');
												            }
															else { 
																if (dataSite.siteUser !== undefined) {
																	Meteor.call('supprimerUser',  {id : dataSite.siteUser, profileUser : 'client'}, function(err, result){
																	 	if (err) { Modal.hide(); }
																	});
																}
																if (dataSite.siteUserTwo !== undefined) {
																	Meteor.call('supprimerUser',  {id : dataSite.siteUserTwo, profileUser : 'client'}, function(err, result){
																	 	if (err) { Modal.hide(); }
																	});																	
																}
																Router.go('/authentification/sites');
															}
														}
													);
												}
											}
										);
									}
								});				
								Modal.hide();
							},
							'click #idConfirmBlock' : function(event, instance){			
								event.preventDefault();
								const dte = new Date();
								const siteDte = laDate(dte);
								Meteor.call('modifBlockSite', { id : instance.data.uSite._id, siteB : 'OUI', dte : siteDte }, function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');
										$('#idConfirmation').removeClass('confirmationNON');
										$('#idConfirmation').addClass('confirmationOUI');
									}
									else { Modal.hide(); }
								});
							},
							'click #idConfirmDeblock' : function(event, instance){					
								event.preventDefault();
								const dte = new Date();
								const siteDte = laDate(dte);
								Meteor.call('modifBlockSite', { id : instance.data.uSite._id, siteB : 'NON', dte : siteDte }, function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('notificationNON');
										$('#idNotification').addClass('notificationOUI');
										$('#idConfirmation').removeClass('confirmationNON');
										$('#idConfirmation').addClass('confirmationOUI');
									}
									else { Modal.hide(); }
								});
							},
							'change [name="selectTypePromo"]' : function(event, instance){
								event.preventDefault();
								let typPromo = $( event.target ).find( 'option:selected' ).val();
								$('#idSelectRayonPromo').val('--');
								if (typPromo == '--') {
									$('#idRayonPromo').addClass('non');
									$('#idDefinitionPromo').addClass('non');
									$('#idValidationPromo').addClass('non');
								}
								else {
									$('#idRayonPromo').removeClass('non');
									$('#idRayonPromo').addClass('oui');

									$('#idDefinitionPromo').addClass('non');
									$('#idValidationPromo').addClass('non');

									if (typPromo == 'dernierMarche') {
										$('#idSelectRayonPromoBazar').removeClass('oui');
										$('#idSelectRayonPromoBazar').addClass('non');
									}
									else {
										$('#idSelectRayonPromoBazar').removeClass('non');
										$('#idSelectRayonPromoBazar').addClass('oui');
									}
								}
								$('#idModalModifSite').animate({
									scrollTop : 0
								}, 300);
							},
							'change [name="selectRayonPromo"]' : function(event, instance){
								event.preventDefault();
								let typPromo = $( event.target ).find( 'option:selected' ).val();
								if (typPromo == '--') {
									$('#idDefinitionPromo').addClass('non');
									$('#idValidationPromo').addClass('non');
								}
								else {
									$('#idDefinitionPromo').removeClass('non');
									$('#idDefinitionPromo').addClass('oui');

									$('#idValidationPromo').removeClass('non');
									$('#idValidationPromo').addClass('oui');
								}
								const hauteurDevice = window.innerHeight;
								if (hauteurDevice < 560) {
									$('#idModalModifSite').animate({
										scrollTop : 430
									}, 300);
								}
								else if (hauteurDevice >= 560 && hauteurDevice < 635) {
									$('#idModalModifSite').animate({
										scrollTop : 520
									}, 300);
								}
								else if (hauteurDevice >= 635 && hauteurDevice < 1024) {
									$('#idModalModifSite').animate({
										scrollTop : 350
									}, 300);
								}
							},
							'submit .js-ajout-promotion' : function(event, instance){ 
								event.preventDefault();
								$('#idSelectTypePromo').remove('error');
								$('#idSelectRayonPromo').remove('error');
								$('#idNomProduit').remove('error');
								//$('#idQuantiteProduit').remove('error');
								$('#idPrixProduit').remove('error');
								// $('#idExpProduit').remove('error'); 
								$('#idRemisePromotion').remove('error');
								$('#idExpPromotion').remove('error');
								$('#idDetailPromotion').remove('error');

								var typePromo = $('#idSelectTypePromo').val();
								var rayonPromo = $('#idSelectRayonPromo').val(); 

								if ( !lesTypesDePromo.includes(typePromo) ){
									$('#idSelectTypePromo').addClass('error');
								}
								if ( !lesRayonsDePromo.includes(rayonPromo) ) {
									$('#idSelectRayonPromo').addClass('error');
								}
								else {
									var nomProduit = $('#idNomProduit').val();
									var identifiantPromo = instance.data.uSite.siteEspace+"_"+instance.data.uSite.siteQuartier+"_"+nomProduit;
									nomProduit = nomProduit.toUpperCase();
									identifiantPromo = identifiantPromo.toUpperCase();
									//const qteProduit = $('#idQuantiteProduit').val();

									var tofProduit = Session.get('objImg'); 
									const laTof = ImagesPromo.findOne({_id : tofProduit});
									const urlTof = laTof.urlImage;

									const prixProduit = parseInt($('#idPrixProduit').val());
									// const expirationProduit = $('#idExpProduit').val();
									const remisePromotion = parseInt($('#idRemisePromotion').val());
									const expirationPromotion = $('#idExpPromotion').val();
									const detailPromotion = $('#idDetailPromotion').val();
									const promoPrix = parseInt(prixProduit-(prixProduit*remisePromotion/100));
									// const dteExpProduit = new Date(expirationProduit);
									const dteExpPromo = new Date(expirationPromotion);
									const dte = new Date();	
								    const siteDte = laDate(dte);
									if (dteExpPromo.getTime() + 82800000 >= dte.getTime()) { // dteExpPromo.getTime() - dte.getTime()) > 86400000
										// const leSiteP = Sites.findOne({_id: instance.data.uSite._id});
										const newPromo = {
											idPromotion : identifiantPromo,
											idSitePromo : instance.data.uSite._id,
											typeDePromo : typePromo,
											rayonDePromo : rayonPromo,
											produitNom : nomProduit,
											//produitQte : qteProduit,
											idTofPromo : tofProduit,
											produitTof : urlTof,
											produitPrix : prixProduit,
											prixPromo : promoPrix,
											// produitExpiration : dteExpProduit,
											// produitExp : laDate(dteExpProduit),
											promoRemise : remisePromotion,
											promoExpiration : dteExpPromo,
											promoExpirationTime : dteExpPromo.getTime(),
											promoDateExp : laDate(dteExpPromo),
											promoDetail : detailPromotion,
											promoDateCreation : siteDte
										}
										Meteor.call('creationPromo', newPromo, function(err, result){
											if (err) {
												$('#idSelectTypePromo').addClass('error');
												$('#idSelectRayonPromo').addClass('error');
												$('#idNomProduit').addClass('error');
												//$('#idQuantiteProduit').addClass('error');
												$('#idPrixProduit').addClass('error');
												// $('#idExpProduit').addClass('error'); 
												Session.set('objImg', '');
												$('#idRemisePromotion').addClass('error');
												$('#idExpPromotion').addClass('error');
												$('#idDetailPromotion').addClass('error');	
											}
											else {
												if (result == 'sent') {
													$('#idSelectTypePromo').val('--');
													$('#idSelectRayonPromo').val('--');
													$('#idNomProduit').val('');
													//$('#idQuantiteProduit').val('');
													$('#idPrixProduit').val('');
													// $('#idExpProduit').val(''); 
													Session.set('objImg', '');
													$('#idRemisePromotion').val('');
													$('#idExpPromotion').val('');
													$('#idDetailPromotion').val('');
													$('#idConfirmation').removeClass('confirmationOUI');
													$('#idConfirmation').addClass('confirmationNON');
													$('#tmplteModalModifSite').modal('hide');

													Meteor.call('ajoutPromoSite', {id : instance.data.uSite._id, newPromo : newPromo}, function(err, result){
														if (err || (result != 'OK')) {
															$('#idNotification').removeClass('notificationNON');
															$('#idNotification').addClass('notificationOUI');
														}
														else { 
															// if (leSiteP.siteInizio == 'SI') {
															// 	Meteor.call('modifBlockSite', { id : leSiteP._id, siteB : 'NON', dte : siteDte, sI : 'NO' }, function(err, result){
															// 		if (err || (result != 'OK')) {
															// 			$('#idNotification').removeClass('notificationNON');
															// 			$('#idNotification').addClass('notificationOUI');
															// 		}
															// 	});
															// }
															Modal.hide(); 
														}
													});
												}
												else {
													const rlength = result.length;
													for (var i = 0; i < rlength; i++) {
														switch (result[i].name){
															case 'typeDePromo' : $('#idSelectTypePromo').addClass('error'); break;
															case 'rayonDePromo' : 
																$('#idSelectRayonPromo').addClass('error');									
																break;
															case 'produitNom' : 
																$('#idNomProduit').addClass('error'); 
																const nomP = $('#idNomProduit').val();
																$('#idNomProduit').val(''); 
																document.getElementById('idNomProduit').setAttribute('placeholder', nomP);
																break;
															// case 'produitQte' : 
															// 	$('#idQuantiteProduit').addClass('error'); 
															// 	const qteP = $('#idQuantiteProduit').val();
															// 	$('#idQuantiteProduit').val(''); 
															// 	document.getElementById('idQuantiteProduit').setAttribute('placeholder', qteP);
															// 	break;
															case 'produitPrix' : 
																$('#idPrixProduit').addClass('error'); 
																const pP = $('#idPrixProduit').val();
																$('#idPrixProduit').val(''); 
																document.getElementById('idPrixProduit').setAttribute('placeholder', pP);
																break;
															// case 'produitExpiration' : 
															// 	$('#idExpProduit').addClass('error'); 
															// 	const expP = $('#idExpProduit').val();
															// 	$('#idExpProduit').val(''); 
															// 	document.getElementById('idExpProduit').setAttribute('placeholder', expP);
															// 	break;
															case 'promoRemise' : 
																$('#idRemisePromotion').addClass('error'); 
																const remPro = $('#idRemisePromotion').val();
																$('#idRemisePromotion').val(''); 
																document.getElementById('idRemisePromotion').setAttribute('placeholder', remPro);
																break;
															case 'promoExpiration' : 
																$('#idExpPromotion').addClass('error');
																const expPromo = $('#idExpPromotion').val();
																$('#idExpPromotion').val(''); 
																document.getElementById('idExpPromotion').setAttribute('placeholder', expPromo); 
																break;
															case 'promoDetail' : 
																$('#idDetailPromotion').addClass('error'); 
																const detailPromo = $('#idDetailPromotion').val();
																$('#idDetailPromotion').val(''); 
																document.getElementById('idDetailPromotion').setAttribute('placeholder', detailPromo);
																break;										
															default :
																$('#idSelectTypePromo').addClass('error');
																$('#idSelectRayonPromo').addClass('error');
																$('#idNomProduit').addClass('error');
																//$('#idQuantiteProduit').addClass('error');
																$('#idPrixProduit').addClass('error');
																// $('#idExpProduit').addClass('error'); 
																$('#idRemisePromotion').addClass('error');
																$('#idExpPromotion').addClass('error');
																$('#idDetailPromotion').addClass('error'); 
														}
													}
												}
											}								
										});
									}
									else { $('#idExpPromotion').addClass('error'); }
								}
								$('#idConfirmation').removeClass('confirmationNON');
								$('#idConfirmation').addClass('confirmationOUI');
							},
						});

					Template.tmplteChaquePromo.events({
						'click .js-modif-promotion' : function(event, instance){
							event.preventDefault();
							Session.set('lSitePromo',instance.data.promo.idSitePromo);
							Modal.show('tmplteModalModifPromotion', instance.data);
						}
					});	
							Template.tmplteModalModifPromotion.onCreated(function(){
								this.subscribe('toutesLesPromos_SiteDetailSub', Session.get('lSitePromo'));
								this.subscribe('lesImagesSub');
							});
							Template.tmplteModalModifPromotion.events({
								'click .js-btn-modifier' : function(event, instance){
									event.preventDefault();
									var produitNomModified = $('#idModifNomProduit').val();
									produitNomModified = produitNomModified.toUpperCase();

									const nbrePromo = Sites.find({'sitePromos.idPromotion' : instance.data.promo.idPromotion}).count();
									const nbrePdt = Sites.find({'sitePromos.produitNom' : produitNomModified}).count();

									if (produitNomModified == instance.data.promo.produitNom) {

										const prixProduitModified = parseInt($('#idModifPrixProduit').val());
										const remisePromoModified = parseInt($('#idModifRemisePromotion').val());
										const detailPromoModified = $('#idModifDetailPromotion').val();
										//const qteProduitModified = $('#idModifQuantiteProduit').val();						
										// const expirationProduitModified = $('#idModifExpirationProduit').val();
										const validitePromoModified = $('#idModifExpPromotion').val();

										if (prixProduitModified == instance.data.promo.produitPrix && 
											remisePromoModified == instance.data.promo.promoRemise &&
											detailPromoModified == instance.data.promo.promoDetail &&
											//qteProduitModified == instance.data.promo.produitQuantite &&
											// expirationProduitModified == instance.data.promo.produitExpiration &&
											validitePromoModified == instance.data.promo.promoExpiration) {
											$('#idNotificationExistPromo').addClass('notificationExistNON');
										
											$('#idNotifPromo').removeClass('notificationNON');
											$('#idNotifPromo').addClass('notificationOUI');

											$('#idModalModifPromotion').animate({
												scrollTop : 0
											}, 0);
										}
										else {
											$('#idNotifPromo').removeClass('notificationOUI');
											$('#idNotifPromo').addClass('notificationNON');

											$('#idNotificationExistPromo').removeClass('notificationExistOUI');
											$('#idNotificationExistPromo').addClass('notificationExistNON');

											$('#idConfirmationPromo').removeClass('confirmationNON');
											$('#idConfirmationPromo').addClass('confirmationOUI');
											
											$('#idConfirmModifPromo').removeClass('non');
											$('#idConfirmModifPromo').addClass('oui');

											$('#idConfirmModifImage').removeClass('oui');
											$('#idConfirmModifImage').addClass('non');

											$('#idPromoUploadModifTof').removeClass('oui');
											$('#idPromoUploadModifTof').addClass('non');

											$('#idConfirmSuppPromo').removeClass('oui');
											$('#idConfirmSuppPromo').addClass('non');

											$('#idConfirmAnnulPromo').removeClass('non');
											$('#idConfirmAnnulPromo').addClass('oui');

											$('#idConfirmAnnul').removeClass('non');
											$('#idConfirmAnnul').addClass('oui');

											$('#idModalModifPromotion').animate({
												scrollTop : 0
											}, 0);
										}						
									}
									else if ((nbrePromo == 0) ||
											((produitNomModified != instance.data.promo.produitNom) && (nbrePdt > 0)))
									{	 
										$('#idNotificationExistPromo').addClass('notificationExistNON');

										$('#idNotifPromo').removeClass('notificationNON');
										$('#idNotifPromo').addClass('notificationOUI');

										$('#idModalModifPromotion').animate({
											scrollTop : 0
										}, 0);
									}						
									else {
										$('#idNotifPromo').removeClass('notificationOUI');
										$('#idNotifPromo').addClass('notificationNON');

										$('#idNotificationExistPromo').removeClass('notificationExistOUI');
										$('#idNotificationExistPromo').addClass('notificationExistNON');

										$('#idConfirmationPromo').removeClass('confirmationNON');
										$('#idConfirmationPromo').addClass('confirmationOUI');
											
										$('#idConfirmModifPromo').removeClass('non');
										$('#idConfirmModifPromo').addClass('oui');

										$('#idConfirmModifImage').removeClass('oui');
										$('#idConfirmModifImage').addClass('non');

										$('#idPromoUploadModifTof').removeClass('oui');
										$('#idPromoUploadModifTof').addClass('non');

										$('#idConfirmSuppPromo').removeClass('oui');
										$('#idConfirmSuppPromo').addClass('non');

										$('#idConfirmAnnulPromo').removeClass('non');
										$('#idConfirmAnnulPromo').addClass('oui');

										$('#idConfirmAnnul').removeClass('non');
										$('#idConfirmAnnul').addClass('oui');

										$('#idModalModifPromotion').animate({
											scrollTop : 0
										}, 0);
									}
								},
								'click .js-btn-modifImage' : function(event, instance){
									event.preventDefault();
									$('#idNotifPromo').removeClass('notificationOUI');
									$('#idNotifPromo').addClass('notificationNON');

									$('#idNotificationExistPromo').removeClass('notificationExistOUI');
									$('#idNotificationExistPromo').addClass('notificationExistNON');

									$('#idConfirmationPromo').removeClass('confirmationNON');
									$('#idConfirmationPromo').addClass('confirmationOUI');
											
									$('#idConfirmModifPromo').removeClass('oui');
									$('#idConfirmModifPromo').addClass('non');

									$('#idConfirmModifImage').removeClass('non');
									$('#idConfirmModifImage').addClass('oui');

									$('#idPromoUploadModifTof').removeClass('oui');
									$('#idPromoUploadModifTof').addClass('non');

									$('#idConfirmSuppPromo').removeClass('oui');
									$('#idConfirmSuppPromo').addClass('non');
									
									$('#idConfirmAnnulPromo').removeClass('non');
									$('#idConfirmAnnulPromo').addClass('oui');
									
									$('#idConfirmAnnul').removeClass('non');
									$('#idConfirmAnnul').addClass('oui');
									
									$('#idModalModifPromotion').animate({
										scrollTop : 0
									}, 0);
								},
								'click .js-btn-supprimer' : function(event, instance){
									event.preventDefault();
									var produitNomModified = $('#idModifNomProduit').val();
									produitNomModified = produitNomModified.toUpperCase();

									const prixProduitModified = parseInt($('#idModifPrixProduit').val());
									const remisePromoModified = parseInt($('#idModifRemisePromotion').val());
									const detailPromoModified = $('#idModifDetailPromotion').val();

									if (produitNomModified == instance.data.promo.produitNom &&
										prixProduitModified == instance.data.promo.produitPrix &&
										remisePromoModified == instance.data.promo.promoRemise &&
										detailPromoModified == instance.data.promo.promoDetail) {
										$('#idConfirmationPromo').removeClass('confirmationNON');
										$('#idConfirmationPromo').addClass('confirmationOUI');

										$('#idConfirmModifPromo').removeClass('oui');
										$('#idConfirmModifPromo').addClass('non');

										$('#idConfirmModifImage').removeClass('oui');
										$('#idConfirmModifImage').addClass('non');

										$('#idConfirmSuppPromo').removeClass('non');
										$('#idConfirmSuppPromo').addClass('oui');

										$('#idConfirmAnnulPromo').removeClass('non');
										$('#idConfirmAnnulPromo').addClass('oui');

										$('#idConfirmAnnul').removeClass('non');
										$('#idConfirmAnnul').addClass('oui');

										$('#idModalModifPromotion').animate({
											scrollTop : 0
										}, 0);
									}
									else {
										$('#idNotifPromo').addClass('notificationNON');

										$('#idNotificationExistPromo').removeClass('notificationExistNON');
										$('#idNotificationExistPromo').addClass('notificationExistOUI');

										$('#idModalModifPromotion').animate({
											scrollTop : 0
										}, 0);
									}
								},
								'click #idConfirmAnnulPromo' : function(event, instance){
									event.preventDefault();
									$('#idConfirmationPromo').removeClass('confirmationOUI');
									$('#idConfirmationPromo').addClass('confirmationNON');
								},
								'click #idConfirmAnnul' : function(event, instance){
									event.preventDefault();
									$('#idPromoUploadModifTof').removeClass('oui');
									$('#idPromoUploadModifTof').addClass('non');
									$('#idConfirmationPromo').removeClass('confirmationOUI');
									$('#idConfirmationPromo').addClass('confirmationNON');
								},
								'click #idConfirmModifPromo' : function(event, instance){
									event.preventDefault();
									var produitNomModified = $('#idModifNomProduit').val();
									produitNomModified = produitNomModified.toUpperCase();
									//const qteProduitModified = $('#idModifQuantiteProduit').val();
									var prixProduitModified = $('#idModifPrixProduit').val();
									// const expirationProduitModified = $('#idModifExpirationProduit').val();
									var remisePromoModified = $('#idModifRemisePromotion').val();
									const validitePromoModified = $('#idModifExpPromotion').val();
									const promoExp = new Date(validitePromoModified);
									const dte = new Date();

									const detailPromoModified = $('#idModifDetailPromotion').val();

									const leSitePromos = Sites.findOne({_id : instance.data.promo.idSitePromo});
									var instanceDePromotions = Promotions.findOne({idPromotion : instance.data.promo.idPromotion});
									var laPromotion = leSitePromos.sitePromos.find(element => element.idPromotion == instance.data.promo.idPromotion);

									if ( $('#idSelectModifRayonPromo').val() != '--') {	
										laPromotion.rayonDePromo = $('#idSelectModifRayonPromo').val();
										instanceDePromotions.rayonDePromo = $('#idSelectModifRayonPromo').val();						
									}
									if ((produitNomModified != instance.data.promo.produitNom) &&
										(produitNomModified != '')) {
										laPromotion.produitNom = produitNomModified;
										instanceDePromotions.produitNom = produitNomModified;						
									}
									// if ((qteProduitModified != instance.data.promo.produitQte) &&
									// 	(qteProduitModified != '')) {
									// 	laPromotion.produitQte = qteProduitModified;
									// 	instanceDePromotions.produitQte = qteProduitModified;
									// }
									// if ((expirationProduitModified != instance.data.promo.produitExpiration) &&
									// 	(expirationProduitModified != '')) {
									// 	const pdtDteExp = new Date(expirationProduitModified);
									// 	laPromotion.produitExpiration = pdtDteExp;
									// 	laPromotion.produitExp = laDate(pdtDteExp);
									// 	instanceDePromotions.produitExpiration = pdtDteExp;
									// 	instanceDePromotions.produitExp = laDate(pdtDteExp);
									// }			
									if ((validitePromoModified != instance.data.promo.promoExpiration) &&
										(validitePromoModified != '') && (promoExp.getTime() + 82800000 >= dte.getTime())) {
										const promoDteExp = laDate(promoExp);
										laPromotion.promoExpiration = promoExp;
										laPromotion.promoExpirationTime = promoExp.getTime();
										laPromotion.promoDateExp = promoDteExp;
										instanceDePromotions.promoExpiration = promoExp;
										instanceDePromotions.promoExpirationTime = promoExp.getTime();
										instanceDePromotions.promoDateExp = promoDteExp;
									}
									if ((detailPromoModified != instance.data.promo.promoDetail) &&
										(detailPromoModified != '')) {
										laPromotion.promoDetail = detailPromoModified;
										instanceDePromotions.promoDetail = detailPromoModified;
									}
									if ((prixProduitModified != instance.data.promo.produitPrix) && 
										(remisePromoModified != instance.data.promo.promoRemise) &&
										(prixProduitModified != '') &&
										(remisePromoModified != '')) {
										prixProduitModified = parseInt(prixProduitModified);
										remisePromoModified = parseInt(remisePromoModified);
										const prixPR = prixProduitModified-(prixProduitModified*remisePromoModified/100);
										laPromotion.promoRemise = remisePromoModified;						
										laPromotion.produitPrix = prixProduitModified;
										laPromotion.prixPromo = prixPR;
										instanceDePromotions.produitPrix = prixProduitModified;
										instanceDePromotions.promoRemise = remisePromoModified;
										instanceDePromotions.prixPromo = prixPR;
									}
									else {
										if ((prixProduitModified != instance.data.promo.produitPrix) &&
											(prixProduitModified != '')) {
											prixProduitModified = parseInt(prixProduitModified);
											laPromotion.produitPrix = prixProduitModified;
											instanceDePromotions.produitPrix = prixProduitModified;
											const prixRemProd = prixProduitModified-(prixProduitModified*laPromotion.promoRemise/100);
											laPromotion.prixPromo = prixRemProd;
											instanceDePromotions.prixPromo = prixRemProd;							
										}
										else if ((remisePromoModified != instance.data.promo.promoRemise) &&
											(remisePromoModified != '')) {
											remisePromoModified = parseInt(remisePromoModified);
											laPromotion.promoRemise = remisePromoModified;
											instanceDePromotions.promoRemise = remisePromoModified;
											const prixProdRem = laPromotion.prixProduit-(laPromotion.prixProduit*remisePromoModified/100);
											laPromotion.prixPromo = prixProdRem;
											instanceDePromotions.prixPromo = prixProdRem;						
										}
									}
									const promoDteModif = laDate(new Date());
									laPromotion.promoDateModification = promoDteModif;
									instanceDePromotions.promoDateModification = promoDteModif;

									Meteor.call('modifPromo', instanceDePromotions, function(err, result){
										if (err || (result != 'OK')) {
											$('#idNotifPromo').removeClass('notificationNON');
											$('#idNotifPromo').addClass('notificationOUI');
											$('#idConfirmationPromo').removeClass('confirmationOUI');
											$('#idConfirmationPromo').addClass('confirmationNON');
										}
										else {
											Meteor.call('modifPromoSite', 
												{
													idSite : instance.data.promo.idSitePromo,
													idPromo : instance.data.promo.idPromotion,
													laPromo : laPromotion 
												}, 
												function(err, result){
													if (err || (result != 'OK')) {
														$('#idNotifPromo').removeClass('notificationNON');
														$('#idNotifPromo').addClass('notificationOUI');
														$('#idConfirmationPromo').removeClass('confirmationOUI');
														$('#idConfirmationPromo').addClass('confirmationNON');
													}
													else { Modal.hide(); }
												}
											);							
										}
									});
								},
								'click #idConfirmModifImage' : function(event, instance){
									event.preventDefault();					
									$('#idConfirmModifImage').removeClass('oui');
									$('#idConfirmModifImage').addClass('non');

									$('#idConfirmAnnulPromo').removeClass('oui');
									$('#idConfirmAnnulPromo').addClass('non');

									$('#idPromoUploadModifTof').removeClass('non');
									$('#idPromoUploadModifTof').addClass('oui');					
								},
								'click #idModifImagePromo' : function(event, instance){
									event.preventDefault();
									var tofProduitModified = Session.get('objImg');

									var idPromoModified = instance.data.promo.idPromotion;
									var laPromotion;

									var leSitePromos = Sites.findOne({_id : instance.data.promo.idSitePromo});
									const instanceDePromotions = Promotions.findOne({idPromotion : idPromoModified});
									const laTofModif = ImagesPromo.findOne({_id : tofProduitModified});
									const numPromos = leSitePromos.sitePromos.length;					
									for (var i = 0; i < numPromos; i++) {
										if (leSitePromos.sitePromos[i].idPromotion == instance.data.promo.idPromotion) { 
											laPromotion = leSitePromos.sitePromos[i];
											break;
										} 
									}
									laPromotion.idTofPromo = tofProduitModified;
									laPromotion.produitTof = laTofModif.urlImage;   
									laPromotion.promoDateModification = laDate(new Date());

									Meteor.call('modifPromoSite', 
										{
											idSite : instance.data.promo.idSitePromo,
											idPromo : instance.data.promo.idPromotion,
											laPromo : laPromotion 
										}, 
										function(err, result){
											if (err || (result != 'OK')) {
												$('#idNotifPromo').removeClass('notificationNON');
												$('#idNotifPromo').addClass('notificationOUI');
												$('#idConfirmationPromo').removeClass('confirmationOUI');
												$('#idConfirmationPromo').addClass('confirmationNON');
											}
											else {
												Meteor.call('modifTofDePromo', 
													{
														id : instanceDePromotions._id, 
														idTof : tofProduitModified,
														produitTof : laTofModif.urlImage
													}, 
													function(err, result){
														if (err || (result != 'OK')) {
															$('#idNotifPromo').removeClass('notificationNON');
															$('#idNotifPromo').addClass('notificationOUI');
															$('#idConfirmationPromo').removeClass('confirmationOUI');
															$('#idConfirmationPromo').addClass('confirmationNON');
														}
														else { Modal.hide(); }
													}
												);
											}
										}
									);		
								},
								'click #idConfirmSuppPromo' : function(event, instance){
									event.preventDefault();	
									const dataPromo = instance.data.promo;
									const laPromoASupprimer = Promotions.findOne({idPromotion : dataPromo.idPromotion});
									const leSite = Sites.findOne({_id : dataPromo.idSitePromo });					
									// if (leSite.sitePromos && leSite.sitePromos.length == 1) {					
									// 	const vil = Villes.findOne({ville : leSite.siteVille}); 
									// 	const numQuartiers = Sites.find({siteQuartier : leSite.siteQuartier, siteVille : leSite.siteVille}).count();
									// 	const numEsp = Sites.find({siteEspace : leSite.siteEspace, siteVille : leSite.siteVille}).count();

									// 	Meteor.call('modifBlockSite', { id : leSite._id, siteB : 'OUI', dte : laDate(new Date()) }, function(err, result){
									// 		if (err || (result != 'OK')) {
									// 			$('#idNotifPromo').removeClass('notificationNON');
									// 			$('#idNotifPromo').addClass('notificationOUI');
									// 			$('#idConfirmationPromo').removeClass('confirmationOUI');
									// 			$('#idConfirmationPromo').addClass('confirmationNON');
									// 		}
									// 		else {
									// 			Meteor.call('suppPromoSite', {idSite : dataPromo.idSitePromo, idPromoSite : dataPromo.idPromotion}, function(err, result){
									// 				if (err || (result != 'OK')) {
									// 					$('#idNotifPromo').removeClass('notificationNON');
									// 					$('#idNotifPromo').addClass('notificationOUI');
									// 					$('#idConfirmationPromo').removeClass('confirmationOUI');
									// 					$('#idConfirmationPromo').addClass('confirmationNON');
									// 				}
									// 				else {
									// 					Meteor.call('suppPromo', {id : laPromoASupprimer._id}, function(err, result){
									// 						if (err || (result != 'OK')) {
									// 							$('#idNotifPromo').removeClass('notificationNON');
									// 							$('#idNotifPromo').addClass('notificationOUI');
									// 							$('#idConfirmationPromo').removeClass('confirmationOUI');
									// 							$('#idConfirmationPromo').addClass('confirmationNON');
									// 			            }
									// 						else { Modal.hide(); }
									// 					});
									// 				}
									// 			});
									// 		}
									// 	});
									// }
									// else {
									// 	Meteor.call('suppPromoSite', {idSite : dataPromo.idSitePromo, idPromoSite : dataPromo.idPromotion}, function(err, result){
									// 		if (err || (result != 'OK')) {
									// 			$('#idNotifPromo').removeClass('notificationNON');
									// 			$('#idNotifPromo').addClass('notificationOUI');
									// 			$('#idConfirmationPromo').removeClass('confirmationOUI');
									// 			$('#idConfirmationPromo').addClass('confirmationNON');
									// 		}
									// 		else {
									// 			Meteor.call('suppPromo', {id : laPromoASupprimer._id}, function(err, result){
									// 				if (err || (result != 'OK')) {
									// 					$('#idNotifPromo').removeClass('notificationNON');
									// 					$('#idNotifPromo').addClass('notificationOUI');
									// 					$('#idConfirmationPromo').removeClass('confirmationOUI');
									// 					$('#idConfirmationPromo').addClass('confirmationNON');
									// 	            }
									// 				else { Modal.hide(); }
									// 			});
									// 		}
									// 	});
									// }
									if (leSite.sitePromos) {					
										Meteor.call('suppPromoSite', {idSite : dataPromo.idSitePromo, idPromoSite : dataPromo.idPromotion, dte : laDate(new Date())}, function(err, result){
											if (err || (result != 'OK')) {
												$('#idNotifPromo').removeClass('notificationNON');
												$('#idNotifPromo').addClass('notificationOUI');
												$('#idConfirmationPromo').removeClass('confirmationOUI');
												$('#idConfirmationPromo').addClass('confirmationNON');
											}
											else {
												Meteor.call('suppPromo', {id : laPromoASupprimer._id}, function(err, result){
													if (err || (result != 'OK')) {
														$('#idNotifPromo').removeClass('notificationNON');
														$('#idNotifPromo').addClass('notificationOUI');
														$('#idConfirmationPromo').removeClass('confirmationOUI');
														$('#idConfirmationPromo').addClass('confirmationNON');
										            }
													else { Modal.hide(); }
												});
											}
										});
									}
								}
							});


Template.tmplteUsers.onCreated(function(){
	this.subscribe('utilisateurData');
});
Template.tmplteUsers.helpers({
	lAutres : function(){
		return Meteor.users.find({profile : { $nin: ['user','userApp','client'] }}).fetch();
	},
	lUtilisateurs : function(){
		return Meteor.users.find({profile : { $in: ['user','userApp'] }}).fetch();
	}
});

Template.tmplteMySpace.onCreated(function(){
	this.subscribe('mySite');
	this.subscribe('mySiteTwo');
});
Template.tmplteMySpace.helpers({
	uSite : function(){
		const monEspace = Sites.findOne({siteUser : Meteor.userId()});
		const monEspaceTwo = Sites.findOne({siteUserTwo : Meteor.userId()}); 
		if ((monEspace === undefined) && (monEspaceTwo === undefined)) { return false; }
		else if (monEspace !== undefined) {
			Session.set('monEspaceId', monEspace._id); 
			return monEspace;
		}
		else {
			Session.set('monEspaceId', monEspaceTwo._id); 
			return monEspaceTwo;
		}	 
	},
	dMOffres : function(){
		var leSiteDesOffres = '';
		var dmarcheOffres = [];
		var dMOEpiSalee = [];
		var dMOEpiSucree = [];
		var dMOProdFrais = [];
		var dMOFruitsLegumes = [];
		var dMOBouchPoissVol = [];
		var dMOBoissVinLiq = [];
		var dMOBoulPatisserie = [];
		var dMOFastFood = [];

		var id = Session.get('monEspaceId');
		if (id !== undefined) { 
			leSiteDesOffres = Sites.findOne({_id : id}); 
			const lesOffres = leSiteDesOffres.sitePromos;
		    if ((lesOffres !== undefined) && (lesOffres.length > 0)) {
				lesOffres.forEach(function(transaction){ 
					if (transaction.typeDePromo == 'dernierMarche'){ dmarcheOffres.push(transaction); }    
			    });
				dmarcheOffres.forEach(function(transaction){ 
					if (transaction.rayonDePromo == 'epicerieSalee'){ dMOEpiSalee.push(transaction); }
					else if (transaction.rayonDePromo == 'epicerieSucree'){ dMOEpiSucree.push(transaction); }
					else if (transaction.rayonDePromo == 'produitsFrais'){ dMOProdFrais.push(transaction); }
					else if (transaction.rayonDePromo == 'fruitsLegumes'){ dMOFruitsLegumes.push(transaction); }
					else if (transaction.rayonDePromo == 'bouchPoissVol'){ dMOBouchPoissVol.push(transaction); }
					else if (transaction.rayonDePromo == 'boissVinLiq'){ dMOBoissVinLiq.push(transaction); }
					else if (transaction.rayonDePromo == 'boulPatisserie'){ dMOBoulPatisserie.push(transaction); }
					else if (transaction.rayonDePromo == 'fastFood'){ dMOFastFood.push(transaction); }
			    });
			}
		    var qteDMO = { qte : {}, num : 0, qteDMOBool : false };
		    var qteDMOEpiSalee = dMOEpiSalee.length;
		    var qteDMOEpiSucree = dMOEpiSucree.length;
		    var qteDMOProdFrais = dMOProdFrais.length;
		    var qteDMOFruitsLegumes = dMOFruitsLegumes.length;
			var qteDMOBouchPoissVol = dMOBouchPoissVol.length;
		    var qteDMOBoissVinLiq = dMOBoissVinLiq.length;
			var qteDMOBoulPatisserie = dMOBoulPatisserie.length;
		    var qteDMOFastFood = dMOFastFood.length;
		    if (qteDMOEpiSalee > 0){ qteDMO.qte.dMESal = qteDMOEpiSalee; qteDMO.num++; }  
			if (qteDMOEpiSucree > 0){ qteDMO.qte.dMESuc = qteDMOEpiSucree; qteDMO.num++; }  
			if (qteDMOProdFrais > 0){ qteDMO.qte.dMPF = qteDMOProdFrais; qteDMO.num++; }  
			if (qteDMOFruitsLegumes > 0){ qteDMO.qte.dMFL = qteDMOFruitsLegumes; qteDMO.num++; }  
			if (qteDMOBouchPoissVol > 0){ qteDMO.qte.dMBPV = qteDMOBouchPoissVol; qteDMO.num++; }
			if (qteDMOBoissVinLiq > 0){ qteDMO.qte.dMBVL = qteDMOBoissVinLiq; qteDMO.num++; } 
			if (qteDMOBoulPatisserie > 0){ qteDMO.qte.dMBP = qteDMOBoulPatisserie; qteDMO.num++; } 
			if (qteDMOFastFood > 0){ qteDMO.qte.dMFF = qteDMOFastFood; qteDMO.num++; } 
			if (qteDMO.num > 0){ qteDMO.qteDMOBool = true; }

		    Session.set('dernierMarcheOffEpiSalee', dMOEpiSalee);
		    Session.set('dernierMarcheOffEpiSucree', dMOEpiSucree);
		    Session.set('dernierMarcheOffProdFrais', dMOProdFrais);
		    Session.set('dernierMarcheOffFruitsLegumes', dMOFruitsLegumes);
		    Session.set('dernierMarcheOffBouchPoissVol', dMOBouchPoissVol);
		    Session.set('dernierMarcheOffBoissVinLiq', dMOBoissVinLiq);
		    Session.set('dernierMarcheOffBoulPatisserie', dMOBoulPatisserie);
		    Session.set('dernierMarcheOffFastFood', dMOFastFood);
	    	return qteDMO; 
	    } 
	},
	pOffres : function(){
		var leSiteDesOffres = '';
		var promotionsOffres = [];
		var pOEpiSalee = [];
		var pOEpiSucree = [];
		var pOProdFrais = [];
		var pOFruitsLegumes = [];
		var pOBouchPoissVol = [];
		var pOBoissVinLiq = [];
		var pOBoulPatisserie = [];
		var pOFastFood = [];
		var pOBazar = [];

		var id = Session.get('monEspaceId');
		if (id !== undefined) {
			leSiteDesOffres = Sites.findOne({_id : id});
			const lesOffres = leSiteDesOffres.sitePromos;
		    if ((lesOffres !== undefined) && (lesOffres.length > 0)) {
				lesOffres.forEach(function(transaction){ 
					if (transaction.typeDePromo == 'promotion'){ promotionsOffres.push(transaction); }    
			    });
				promotionsOffres.forEach(function(transaction){ 
					if (transaction.rayonDePromo == 'epicerieSalee'){ pOEpiSalee.push(transaction); }
					else if (transaction.rayonDePromo == 'epicerieSucree'){ pOEpiSucree.push(transaction); }
					else if (transaction.rayonDePromo == 'produitsFrais'){ pOProdFrais.push(transaction); }
					else if (transaction.rayonDePromo == 'fruitsLegumes'){ pOFruitsLegumes.push(transaction); }
					else if (transaction.rayonDePromo == 'bouchPoissVol'){ pOBouchPoissVol.push(transaction); }  
					else if (transaction.rayonDePromo == 'boissVinLiq'){ pOBoissVinLiq.push(transaction); }
					else if (transaction.rayonDePromo == 'boulPatisserie'){ pOBoulPatisserie.push(transaction); }
					else if (transaction.rayonDePromo == 'fastFood'){ pOFastFood.push(transaction); }
					else if (transaction.rayonDePromo == 'bazar'){ pOBazar.push(transaction); }
			    });
			}
			var qtePO = { qte : {}, num : 0, qtePOBool : false };
		    var qtePOEpiSalee = pOEpiSalee.length;
		    var qtePOEpiSucree = pOEpiSucree.length;
		    var qtePOProdFrais = pOProdFrais.length;
		    var qtePOFruitsLegumes = pOFruitsLegumes.length;
			var qtePOBouchPoissVol = pOBouchPoissVol.length;
		    var qtePOBoissVinLiq = pOBoissVinLiq.length;
			var qtePOBoulPatisserie = pOBoulPatisserie.length;
		    var qtePOFastFood = pOFastFood.length;
			var qtePOBazar = pOBazar.length;
		    if (qtePOEpiSalee > 0){ qtePO.qte.pESal = qtePOEpiSalee; qtePO.num++; }  
			if (qtePOEpiSucree > 0){ qtePO.qte.pESuc = qtePOEpiSucree; qtePO.num++; }  
			if (qtePOProdFrais > 0){ qtePO.qte.pPF = qtePOProdFrais; qtePO.num++; }  
			if (qtePOFruitsLegumes > 0){ qtePO.qte.pFL = qtePOFruitsLegumes; qtePO.num++; }
			if (qtePOBouchPoissVol > 0){ qtePO.qte.pBPV = qtePOBouchPoissVol; qtePO.num++; }  
			if (qtePOBoissVinLiq > 0){ qtePO.qte.pBVL = qtePOBoissVinLiq; qtePO.num++; }
			if (qtePOBoulPatisserie > 0){ qtePO.qte.pBP = qtePOBoulPatisserie; qtePO.num++; }  
			if (qtePOFastFood > 0){ qtePO.qte.pFF = qtePOFastFood; qtePO.num++; } 
			if (qtePOBazar > 0){ qtePO.qte.pB = qtePOBazar; qtePO.num++; }
			if (qtePO.num > 0){ qtePO.qtePOBool = true; }
		    Session.set('promotionOffEpiSalee', pOEpiSalee);
		    Session.set('promotionOffEpiSucree', pOEpiSucree);
		    Session.set('promotionOffProdFrais', pOProdFrais);
		    Session.set('promotionOffFruitsLegumes', pOFruitsLegumes);
			Session.set('promotionOffBouchPoissVol', pOBouchPoissVol);
		    Session.set('promotionOffBoissVinLiq', pOBoissVinLiq);
			Session.set('promotionOffBoulPatisserie', pOBoulPatisserie);
		    Session.set('promotionOffFastFood', pOFastFood);
			Session.set('promotionOffBazar', pOBazar);	
	    	return qtePO;
	    }
	},
	dMOffresEpicerieSalee : function(){ 
		let DMESalee = Session.get('dernierMarcheOffEpiSalee');
		if (ecranWidth){
			let offreDMESalee = document.getElementById('idCarouselDMESalee'); 
		    if (offreDMESalee !== null) {
		    	let nbreDMESalee = DMESalee.length;
		    	let numoffreDMESalee = 320 * nbreDMESalee;
			    offreDMESalee.style.width = numoffreDMESalee + 'px';
			    offreDMESalee.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMESalee.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMESaleePrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMESalee > 2) { 
			    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMESaleeNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		} 
		return DMESalee !== undefined ? DMESalee : false;
	},
	dMOffresEpicerieSucree : function(){ 
		let DMESucree = Session.get('dernierMarcheOffEpiSucree');
		if (ecranWidth) {
			let offreDMESucree = document.getElementById('idCarouselDMESucree');
			if (offreDMESucree !== null) {
				let nbreDMESucree = DMESucree.length;
		    	let numoffreDMESucree = 320 * nbreDMESucree;
			    offreDMESucree.style.width = numoffreDMESucree + 'px';
			    offreDMESucree.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMESucree.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMESucreePrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMESucree > 2) { 
			    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMESucreeNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMESucree !== undefined ? DMESucree : false;
	},
	dMOffresProduitsFrais : function(){ 
		let DMPFrais = Session.get('dernierMarcheOffProdFrais');
		if (ecranWidth){
			let offreDMPFrais = document.getElementById('idCarouselDMPFrais');
			if (offreDMPFrais !== null) {
				let nbreDMPFrais = DMPFrais.length;
		    	let numoffreDMPFrais = 320 * nbreDMPFrais;
			    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
			    offreDMPFrais.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMPFrais.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMPFraisPrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMPFrais > 2) { 
			    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMPFraisNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMPFrais !== undefined ? DMPFrais : false;
	},
	dMOffresFruitsLegumes : function(){ 
		let DMFLegumes = Session.get('dernierMarcheOffFruitsLegumes');
		if (ecranWidth){
			let offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
			if (offreDMFLegumes !== null) {
				let nbreDMFLegumes = DMFLegumes.length;
		    	let numoffreDMFLegumes = 320 * nbreDMFLegumes;
			    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
			    offreDMFLegumes.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMFLegumes.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMFLegumesPrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMFLegumes > 2) { 
			    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMFLegumesNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMFLegumes !== undefined ? DMFLegumes : false;
	},
	dMOffresBoucheriePoissVol : function(){ 
		let DMBPoissVol = Session.get('dernierMarcheOffBouchPoissVol');
		if (ecranWidth){
			let offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
			if (offreDMBPoissVol !== null) {
				let nbreDMBPoissVol = DMBPoissVol.length;
		    	let numoffreDMBPoissVol = 320 * nbreDMBPoissVol;
			    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
			    offreDMBPoissVol.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMBPoissVol.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMBPoissVolPrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMBPoissVol > 2) { 
			    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMBPoissVolNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMBPoissVol !== undefined ? DMBPoissVol : false;
	},
	dMOffresBoissonVinLiq : function(){ 
		let DMBVinLiq = Session.get('dernierMarcheOffBoissVinLiq');
		if (ecranWidth){
			let offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
			if (offreDMBVinLiq !== null) {
				let nbreDMBVinLiq = DMBVinLiq.length;
		    	let numoffreDMBVinLiq = 320 * nbreDMBVinLiq;
			    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
			    offreDMBVinLiq.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMBVinLiq.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMBVinLiqPrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMBVinLiq > 2) { 
			    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMBVinLiqNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMBVinLiq !== undefined ? DMBVinLiq : false;
	},
	dMOffresBoulangeriePatisserie : function(){ 
		let DMBPatisserie = Session.get('dernierMarcheOffBoulPatisserie');
		if (ecranWidth){
			let offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
			if (offreDMBPatisserie !== null) {
				let nbreDMBPatisserie = DMBPatisserie.length;
		    	let numoffreDMBPatisserie = 320 * nbreDMBPatisserie;
			    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
			    offreDMBPatisserie.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMBPatisserie.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMBPatisseriePrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMBPatisserie > 2) { 
			    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMBPatisserieNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMBPatisserie !== undefined ? DMBPatisserie : false;
	},
	dMOffresFastFood : function(){ 
		let DMFFood = Session.get('dernierMarcheOffFastFood');
		if (ecranWidth){
			let offreDMFFood = document.getElementById('idCarouselDMFFood');
			if (offreDMFFood !== null) {
				let nbreDMFFood = DMFFood.length;
		    	let numoffreDMFFood = 320 * nbreDMFFood;
			    offreDMFFood.style.width = numoffreDMFFood + 'px';
			    offreDMFFood.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offreDMFFood.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idDMFFoodPrev').classList.add('myCarousel__prev-hidden');
			    if (nbreDMFFood > 2) { 
			    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idDMFFoodNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return DMFFood !== undefined ? DMFFood : false;
	},
	pOffresEpicerieSalee : function(){ 
		let PESalee = Session.get('promotionOffEpiSalee');
		if (ecranWidth){
			let offrePESalee = document.getElementById('idCarouselPESalee');
			if (offrePESalee !== null) {
				let nbrePESalee = PESalee.length;
		    	let numoffrePESalee = 320 * nbrePESalee;
			    offrePESalee.style.width = numoffrePESalee + 'px';
			    offrePESalee.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePESalee.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPESaleePrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePESalee > 2) { 
			    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPESaleeNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PESalee !== undefined ? PESalee : false;
	},
	pOffresEpicerieSucree : function(){ 	
		let PESucree = Session.get('promotionOffEpiSucree');
		if (ecranWidth){
			let offrePESucree = document.getElementById('idCarouselPESucree');
			if (offrePESucree !== null) {
				let nbrePESucree = PESucree.length;
		    	let numoffrePESucree = 320 * nbrePESucree;
			    offrePESucree.style.width = numoffrePESucree + 'px';
			    offrePESucree.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePESucree.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPESucreePrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePESucree > 2) { 
			    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPESucreeNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PESucree !== undefined ? PESucree : false;
	},
	pOffresProduitsFrais : function(){ 
		let PPFrais = Session.get('promotionOffProdFrais');
		if (ecranWidth){
			let offrePPFrais = document.getElementById('idCarouselPPFrais');
			if (offrePPFrais !== null) {
				let nbrePPFrais = PPFrais.length;
		    	let numoffrePPFrais = 320 * nbrePPFrais;
			    offrePPFrais.style.width = numoffrePPFrais + 'px';
			    offrePPFrais.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePPFrais.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPPFraisPrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePPFrais > 2) { 
			    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPPFraisNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PPFrais !== undefined ? PPFrais : false;
	},
	pOffresFruitsLegumes : function(){ 
		let PFLegumes = Session.get('promotionOffFruitsLegumes');
		if (ecranWidth){
			let offrePFLegumes = document.getElementById('idCarouselPFLegumes');
			if (offrePFLegumes !== null) {
				let nbrePFLegumes = PFLegumes.length;
		    	let numoffrePFLegumes = 320 * nbrePFLegumes;
			    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
			    offrePFLegumes.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePFLegumes.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPFLegumesPrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePFLegumes > 2) { 
			    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPFLegumesNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PFLegumes !== undefined ? PFLegumes : false;
	},
	pOffresBoucheriePoissVol : function(){ 	
		let PBPoissVol = Session.get('promotionOffBouchPoissVol');
		if (ecranWidth){
			let offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');
			if (offrePBPoissVol !== null) {
				let nbrePBPoissVol = PBPoissVol.length;
		    	let numoffrePBPoissVol = 320 * nbrePBPoissVol;
			    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
			    offrePBPoissVol.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePBPoissVol.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPBPoissVolPrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePBPoissVol > 2) { 
			    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPBPoissVolNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PBPoissVol !== undefined ? PBPoissVol : false;
	},
	pOffresBoissonVinLiq : function(){ 
		let PBVinLiq = Session.get('promotionOffBoissVinLiq');
		if (ecranWidth){
			let offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
			if (offrePBVinLiq !== null) {
				let nbrePBVinLiq = PBVinLiq.length;
		    	let numoffrePBVinLiq = 320 * nbrePBVinLiq;
			    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
			    offrePBVinLiq.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePBVinLiq.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPBVinLiqPrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePBVinLiq > 2) { 
			    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPBVinLiqNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PBVinLiq !== undefined ? PBVinLiq : false;
	},
	pOffresBoulangeriePatisserie : function(){ 
		let PBPatisserie = Session.get('promotionOffBoulPatisserie');
		if (ecranWidth){
			let offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
			if (offrePBPatisserie !== null) {
				let nbrePBPatisserie = PBPatisserie.length;
		    	let numoffrePBPatisserie = 320 * nbrePBPatisserie;
			    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
			    offrePBPatisserie.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePBPatisserie.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPBPatisseriePrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePBPatisserie > 2) { 
			    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPBPatisserieNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PBPatisserie !== undefined ? PBPatisserie : false;
	},
	pOffresFastFood : function(){ 
		let PFFood = Session.get('promotionOffFastFood');
		if (ecranWidth){
			let offrePFFood = document.getElementById('idCarouselPFFood');
			if (offrePFFood !== null) {
				let nbrePFFood = PFFood.length;
		    	let numoffrePFFood = 320 * nbrePFFood;
			    offrePFFood.style.width = numoffrePFFood + 'px';
			    offrePFFood.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePFFood.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPFFoodPrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePFFood > 2) { 
			    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPFFoodNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PFFood !== undefined ? PFFood : false;
	},
	pOffresBazar : function(){ 
		let PBazar = Session.get('promotionOffBazar');
		if (ecranWidth){
			let offrePBazar = document.getElementById('idCarouselPBazar');
			if (offrePBazar !== null) {
				let nbrePBazar = PBazar.length;
		    	let numoffrePBazar = 320 * nbrePBazar;
			    offrePBazar.style.width = numoffrePBazar + 'px';
			    offrePBazar.setAttribute('tabindex', '0');
			    let translateX = 0;
			    offrePBazar.style.transform = 'translate3d(' + translateX + 'px,0,0)';
			    document.getElementById('idPBazarPrev').classList.add('myCarousel__prev-hidden');
			    if (nbrePBazar > 2) { 
			    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
			    }
			    else {
			    	document.getElementById('idPBazarNext').classList.add('myCarousel__next-hidden');
			    }
		    }
		}
		return PBazar !== undefined ? PBazar : false;
	}
});

Template.tmplteCreationSite.onCreated(function(){
	this.subscribe('tousLesEspaces_EspacesDispSub');
	this.subscribe('tousLesSites_EspacesDispSub');
	this.subscribe('toutesLesVillesSub');
});
Template.tmplteCreationSite.helpers({
	lEspaces : function(){ return Espaces.find({}, {sort : {espaceNom : 1}}); }
});

Template.tmplteEspaces.onCreated(function(){
	this.subscribe('tousLesEspacesSub');
});
Template.tmplteEspaces.helpers({
	lEspaces : function(){ return Espaces.find({}, {sort : {espaceNom : 1}}); }
});

Template.tmplteOffres.onCreated(function(){
	this.subscribe('lesVillesSub');
	this.autorun(() => {
		this.subscribe('lesEspacesSub', Session.get('villePromoChoisie'), Session.get('quartierPromoChoisie'));
	});
});
Template.tmplteOffres.helpers({
	lVilles : function(){ return Villes.find({}, {sort : {ville : 1}}); },
	lQuartiers : function(){
		const vil = Session.get('villePromoChoisie');
		if (vil === undefined || vil == '' || vil == '--') { return false; }
		else {
			const laVille = Villes.findOne({ville : vil});
			return laVille.quartiers.sort();
		} 
	},
	lEspaces : function(){ return Sites.find({siteVille : Session.get('villePromoChoisie'), siteQuartier : Session.get('quartierPromoChoisie')}, {sort : {siteEspace : 1}}); },
	leSite : function(){ return Sites.findOne({siteEspace : Session.get('espacePromoChoisie'), 
								siteVille : Session.get('villePromoChoisie'), 
								siteQuartier : Session.get('quartierPromoChoisie')}); 
	}
});
		Template.tmplteOffresSites.onCreated(function(){
			this.subscribe('leSiteSub', Session.get('siteOffres'));
		});
		Template.tmplteOffresSites.helpers({
			dMOffres : function(){
				var leSiteDesOffres = '';
				var dmarcheOffres = [];
				var dMOEpiSalee = [];
				var dMOEpiSucree = [];
				var dMOProdFrais = [];
				var dMOFruitsLegumes = [];
				var dMOBouchPoissVol = [];
				var dMOBoissVinLiq = [];
				var dMOBoulPatisserie = [];
				var dMOFastFood = [];

				var qteDMO = { qte : {}, num : 0, qteDMOBool : false };

				var id = Session.get('siteOffres');
				if (id !== undefined) { 
					leSiteDesOffres = Sites.findOne({_id : id}); 
					const lesOffres = leSiteDesOffres.sitePromos;
					if ((lesOffres !== undefined) && (lesOffres.length > 0)) {
						lesOffres.forEach(function(transaction){ 
							if (transaction.typeDePromo == 'dernierMarche'){ dmarcheOffres.push(transaction); }    
					    });
						dmarcheOffres.forEach(function(transaction){ 
							if (transaction.rayonDePromo == 'epicerieSalee'){ dMOEpiSalee.push(transaction); }
							else if (transaction.rayonDePromo == 'epicerieSucree'){ dMOEpiSucree.push(transaction); }
							else if (transaction.rayonDePromo == 'produitsFrais'){ dMOProdFrais.push(transaction); }
							else if (transaction.rayonDePromo == 'fruitsLegumes'){ dMOFruitsLegumes.push(transaction); }
							else if (transaction.rayonDePromo == 'bouchPoissVol'){ dMOBouchPoissVol.push(transaction); }
							else if (transaction.rayonDePromo == 'boissVinLiq'){ dMOBoissVinLiq.push(transaction); }
							else if (transaction.rayonDePromo == 'boulPatisserie'){ dMOBoulPatisserie.push(transaction); }
							else if (transaction.rayonDePromo == 'fastFood'){ dMOFastFood.push(transaction); }
					    });
					}
				    var qteDMOEpiSalee = dMOEpiSalee.length;
				    var qteDMOEpiSucree = dMOEpiSucree.length;
				    var qteDMOProdFrais = dMOProdFrais.length;
				    var qteDMOFruitsLegumes = dMOFruitsLegumes.length;
					var qteDMOBouchPoissVol = dMOBouchPoissVol.length;
				    var qteDMOBoissVinLiq = dMOBoissVinLiq.length;
					var qteDMOBoulPatisserie = dMOBoulPatisserie.length;
				    var qteDMOFastFood = dMOFastFood.length;
				    if (qteDMOEpiSalee > 0){ qteDMO.qte.dMESal = qteDMOEpiSalee; qteDMO.num++; }  
					if (qteDMOEpiSucree > 0){ qteDMO.qte.dMESuc = qteDMOEpiSucree; qteDMO.num++; }  
					if (qteDMOProdFrais > 0){ qteDMO.qte.dMPF = qteDMOProdFrais; qteDMO.num++; }  
					if (qteDMOFruitsLegumes > 0){ qteDMO.qte.dMFL = qteDMOFruitsLegumes; qteDMO.num++; }  
					if (qteDMOBouchPoissVol > 0){ qteDMO.qte.dMBPV = qteDMOBouchPoissVol; qteDMO.num++; }
					if (qteDMOBoissVinLiq > 0){ qteDMO.qte.dMBVL = qteDMOBoissVinLiq; qteDMO.num++; } 
					if (qteDMOBoulPatisserie > 0){ qteDMO.qte.dMBP = qteDMOBoulPatisserie; qteDMO.num++; } 
					if (qteDMOFastFood > 0){ qteDMO.qte.dMFF = qteDMOFastFood; qteDMO.num++; } 
					if (qteDMO.num > 0){ qteDMO.qteDMOBool = true; }

				    Session.set('dernierMarcheOffEpiSalee', dMOEpiSalee);
				    Session.set('dernierMarcheOffEpiSucree', dMOEpiSucree);
				    Session.set('dernierMarcheOffProdFrais', dMOProdFrais);
				    Session.set('dernierMarcheOffFruitsLegumes', dMOFruitsLegumes);
				    Session.set('dernierMarcheOffBouchPoissVol', dMOBouchPoissVol);
				    Session.set('dernierMarcheOffBoissVinLiq', dMOBoissVinLiq);
				    Session.set('dernierMarcheOffBoulPatisserie', dMOBoulPatisserie);
				    Session.set('dernierMarcheOffFastFood', dMOFastFood); 
			    } 
			    return qteDMO;
			},
			pOffres : function(){
				var leSiteDesOffres = '';
				var promotionsOffres = [];
				var pOEpiSalee = [];
				var pOEpiSucree = [];
				var pOProdFrais = [];
				var pOFruitsLegumes = [];
				var pOBouchPoissVol = [];
				var pOBoissVinLiq = [];
				var pOBoulPatisserie = [];
				var pOFastFood = [];
				var pOBazar = [];

				var qtePO = { qte : {}, num : 0, qtePOBool : false };

				var id = Session.get('siteOffres');
				if (id !== undefined) {
					leSiteDesOffres = Sites.findOne({_id : id});
					const lesOffres = leSiteDesOffres.sitePromos;
					if ((lesOffres !== undefined) && (lesOffres.length > 0)) {
						lesOffres.forEach(function(transaction){ 
							if (transaction.typeDePromo == 'promotion'){ promotionsOffres.push(transaction); }    
					    });
						promotionsOffres.forEach(function(transaction){ 
							if (transaction.rayonDePromo == 'epicerieSalee'){ pOEpiSalee.push(transaction); }
							else if (transaction.rayonDePromo == 'epicerieSucree'){ pOEpiSucree.push(transaction); }
							else if (transaction.rayonDePromo == 'produitsFrais'){ pOProdFrais.push(transaction); }
							else if (transaction.rayonDePromo == 'fruitsLegumes'){ pOFruitsLegumes.push(transaction); }
							else if (transaction.rayonDePromo == 'bouchPoissVol'){ pOBouchPoissVol.push(transaction); }  
							else if (transaction.rayonDePromo == 'boissVinLiq'){ pOBoissVinLiq.push(transaction); }
							else if (transaction.rayonDePromo == 'boulPatisserie'){ pOBoulPatisserie.push(transaction); }
							else if (transaction.rayonDePromo == 'fastFood'){ pOFastFood.push(transaction); }
							else if (transaction.rayonDePromo == 'bazar'){ pOBazar.push(transaction); }
					    });
					}
				    var qtePOEpiSalee = pOEpiSalee.length;
				    var qtePOEpiSucree = pOEpiSucree.length;
				    var qtePOProdFrais = pOProdFrais.length;
				    var qtePOFruitsLegumes = pOFruitsLegumes.length;
					var qtePOBouchPoissVol = pOBouchPoissVol.length;
				    var qtePOBoissVinLiq = pOBoissVinLiq.length;
					var qtePOBoulPatisserie = pOBoulPatisserie.length;
				    var qtePOFastFood = pOFastFood.length;
					var qtePOBazar = pOBazar.length;
				    if (qtePOEpiSalee > 0){ qtePO.qte.pESal = qtePOEpiSalee; qtePO.num++; }  
					if (qtePOEpiSucree > 0){ qtePO.qte.pESuc = qtePOEpiSucree; qtePO.num++; }  
					if (qtePOProdFrais > 0){ qtePO.qte.pPF = qtePOProdFrais; qtePO.num++; }  
					if (qtePOFruitsLegumes > 0){ qtePO.qte.pFL = qtePOFruitsLegumes; qtePO.num++; }
					if (qtePOBouchPoissVol > 0){ qtePO.qte.pBPV = qtePOBouchPoissVol; qtePO.num++; }  
					if (qtePOBoissVinLiq > 0){ qtePO.qte.pBVL = qtePOBoissVinLiq; qtePO.num++; }
					if (qtePOBoulPatisserie > 0){ qtePO.qte.pBP = qtePOBoulPatisserie; qtePO.num++; }  
					if (qtePOFastFood > 0){ qtePO.qte.pFF = qtePOFastFood; qtePO.num++; } 
					if (qtePOBazar > 0){ qtePO.qte.pB = qtePOBazar; qtePO.num++; }
					if (qtePO.num > 0){ qtePO.qtePOBool = true; }
				    Session.set('promotionOffEpiSalee', pOEpiSalee);
				    Session.set('promotionOffEpiSucree', pOEpiSucree);
				    Session.set('promotionOffProdFrais', pOProdFrais);
				    Session.set('promotionOffFruitsLegumes', pOFruitsLegumes);
					Session.set('promotionOffBouchPoissVol', pOBouchPoissVol);
				    Session.set('promotionOffBoissVinLiq', pOBoissVinLiq);
					Session.set('promotionOffBoulPatisserie', pOBoulPatisserie);
				    Session.set('promotionOffFastFood', pOFastFood);
					Session.set('promotionOffBazar', pOBazar);	
			    }
			    return qtePO;
			},
			dMOffresEpicerieSalee : function(){ 
				let DMESalee = Session.get('dernierMarcheOffEpiSalee');
				if (ecranWidth){
					let offreDMESalee = document.getElementById('idCarouselDMESalee'); 
				    if (offreDMESalee !== null) {
				    	let nbreDMESalee = DMESalee.length;
				    	let numoffreDMESalee = 320 * nbreDMESalee;
					    offreDMESalee.style.width = numoffreDMESalee + 'px';
					    offreDMESalee.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMESalee.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMESaleePrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMESalee > 2) { 
					    	document.getElementById('idDMESaleeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMESaleeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				} 
				return DMESalee !== undefined ? DMESalee : false;
			},
			dMOffresEpicerieSucree : function(){ 
				let DMESucree = Session.get('dernierMarcheOffEpiSucree');
				if (ecranWidth) {
					let offreDMESucree = document.getElementById('idCarouselDMESucree');
					if (offreDMESucree !== null) {
						let nbreDMESucree = DMESucree.length;
				    	let numoffreDMESucree = 320 * nbreDMESucree;
					    offreDMESucree.style.width = numoffreDMESucree + 'px';
					    offreDMESucree.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMESucree.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMESucreePrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMESucree > 2) { 
					    	document.getElementById('idDMESucreeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMESucreeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMESucree !== undefined ? DMESucree : false;
			},
			dMOffresProduitsFrais : function(){ 
				let DMPFrais = Session.get('dernierMarcheOffProdFrais');
				if (ecranWidth){
					let offreDMPFrais = document.getElementById('idCarouselDMPFrais');
					if (offreDMPFrais !== null) {
						let nbreDMPFrais = DMPFrais.length;
				    	let numoffreDMPFrais = 320 * nbreDMPFrais;
					    offreDMPFrais.style.width = numoffreDMPFrais + 'px';
					    offreDMPFrais.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMPFrais.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMPFraisPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMPFrais > 2) { 
					    	document.getElementById('idDMPFraisNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMPFraisNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMPFrais !== undefined ? DMPFrais : false; 
			},
			dMOffresFruitsLegumes : function(){ 
				let DMFLegumes = Session.get('dernierMarcheOffFruitsLegumes');
				if (ecranWidth){
					let offreDMFLegumes = document.getElementById('idCarouselDMFLegumes');
					if (offreDMFLegumes !== null) {
						let nbreDMFLegumes = DMFLegumes.length;
				    	let numoffreDMFLegumes = 320 * nbreDMFLegumes;
					    offreDMFLegumes.style.width = numoffreDMFLegumes + 'px';
					    offreDMFLegumes.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMFLegumes.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMFLegumesPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMFLegumes > 2) { 
					    	document.getElementById('idDMFLegumesNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMFLegumesNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMFLegumes !== undefined ? DMFLegumes : false; 
			},
			dMOffresBoucheriePoissVol : function(){ 
				let DMBPoissVol = Session.get('dernierMarcheOffBouchPoissVol');
				if (ecranWidth){
					let offreDMBPoissVol = document.getElementById('idCarouselDMBPoissVol');
					if (offreDMBPoissVol !== null) {
						let nbreDMBPoissVol = DMBPoissVol.length;
				    	let numoffreDMBPoissVol = 320 * nbreDMBPoissVol;
					    offreDMBPoissVol.style.width = numoffreDMBPoissVol + 'px';
					    offreDMBPoissVol.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMBPoissVol.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMBPoissVolPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMBPoissVol > 2) { 
					    	document.getElementById('idDMBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMBPoissVolNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMBPoissVol !== undefined ? DMBPoissVol : false;
			},
			dMOffresBoissonVinLiq : function(){ 
				let DMBVinLiq = Session.get('dernierMarcheOffBoissVinLiq');
				if (ecranWidth){
					let offreDMBVinLiq = document.getElementById('idCarouselDMBVinLiq');
					if (offreDMBVinLiq !== null) {
						let nbreDMBVinLiq = DMBVinLiq.length;
				    	let numoffreDMBVinLiq = 320 * nbreDMBVinLiq;
					    offreDMBVinLiq.style.width = numoffreDMBVinLiq + 'px';
					    offreDMBVinLiq.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMBVinLiq.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMBVinLiqPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMBVinLiq > 2) { 
					    	document.getElementById('idDMBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMBVinLiqNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMBVinLiq !== undefined ? DMBVinLiq : false;
			},
			dMOffresBoulangeriePatisserie : function(){ 
				let DMBPatisserie = Session.get('dernierMarcheOffBoulPatisserie');
				if (ecranWidth){
					let offreDMBPatisserie = document.getElementById('idCarouselDMBPatisserie');
					if (offreDMBPatisserie !== null) {
						let nbreDMBPatisserie = DMBPatisserie.length;
				    	let numoffreDMBPatisserie = 320 * nbreDMBPatisserie;
					    offreDMBPatisserie.style.width = numoffreDMBPatisserie + 'px';
					    offreDMBPatisserie.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMBPatisserie.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMBPatisseriePrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMBPatisserie > 2) { 
					    	document.getElementById('idDMBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMBPatisserieNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMBPatisserie !== undefined ? DMBPatisserie : false;
			},
			dMOffresFastFood : function(){ 
				let DMFFood = Session.get('dernierMarcheOffFastFood');
				if (ecranWidth){
					let offreDMFFood = document.getElementById('idCarouselDMFFood');
					if (offreDMFFood !== null) {
						let nbreDMFFood = DMFFood.length;
				    	let numoffreDMFFood = 320 * nbreDMFFood;
					    offreDMFFood.style.width = numoffreDMFFood + 'px';
					    offreDMFFood.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offreDMFFood.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idDMFFoodPrev').classList.add('myCarousel__prev-hidden');
					    if (nbreDMFFood > 2) { 
					    	document.getElementById('idDMFFoodNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idDMFFoodNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return DMFFood !== undefined ? DMFFood : false; 
			},
			pOffresEpicerieSalee : function(){ 
				let PESalee = Session.get('promotionOffEpiSalee');
				if (ecranWidth){
					let offrePESalee = document.getElementById('idCarouselPESalee');
					if (offrePESalee !== null) {
						let nbrePESalee = PESalee.length;
				    	let numoffrePESalee = 320 * nbrePESalee;
					    offrePESalee.style.width = numoffrePESalee + 'px';
					    offrePESalee.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePESalee.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPESaleePrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePESalee > 2) { 
					    	document.getElementById('idPESaleeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPESaleeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PESalee !== undefined ? PESalee : false;
			},
			pOffresEpicerieSucree : function(){ 	
				let PESucree = Session.get('promotionOffEpiSucree');
				if (ecranWidth){
					let offrePESucree = document.getElementById('idCarouselPESucree');
					if (offrePESucree !== null) {
						let nbrePESucree = PESucree.length;
				    	let numoffrePESucree = 320 * nbrePESucree;
					    offrePESucree.style.width = numoffrePESucree + 'px';
					    offrePESucree.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePESucree.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPESucreePrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePESucree > 2) { 
					    	document.getElementById('idPESucreeNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPESucreeNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PESucree !== undefined ? PESucree : false; 
			},
			pOffresProduitsFrais : function(){ 
				let PPFrais = Session.get('promotionOffProdFrais');
				if (ecranWidth){
					let offrePPFrais = document.getElementById('idCarouselPPFrais');
					if (offrePPFrais !== null) {
						let nbrePPFrais = PPFrais.length;
				    	let numoffrePPFrais = 320 * nbrePPFrais;
					    offrePPFrais.style.width = numoffrePPFrais + 'px';
					    offrePPFrais.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePPFrais.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPPFraisPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePPFrais > 2) { 
					    	document.getElementById('idPPFraisNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPPFraisNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PPFrais !== undefined ? PPFrais : false; 
			},
			pOffresFruitsLegumes : function(){ 
				let PFLegumes = Session.get('promotionOffFruitsLegumes');
				if (ecranWidth){
					let offrePFLegumes = document.getElementById('idCarouselPFLegumes');
					if (offrePFLegumes !== null) {
						let nbrePFLegumes = PFLegumes.length;
				    	let numoffrePFLegumes = 320 * nbrePFLegumes;
					    offrePFLegumes.style.width = numoffrePFLegumes + 'px';
					    offrePFLegumes.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePFLegumes.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPFLegumesPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePFLegumes > 2) { 
					    	document.getElementById('idPFLegumesNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPFLegumesNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PFLegumes !== undefined ? PFLegumes : false;
			},
			pOffresBoucheriePoissVol : function(){ 	
				let PBPoissVol = Session.get('promotionOffBouchPoissVol');
				if (ecranWidth){
					let offrePBPoissVol = document.getElementById('idCarouselPBPoissVol');
					if (offrePBPoissVol !== null) {
						let nbrePBPoissVol = PBPoissVol.length;
				    	let numoffrePBPoissVol = 320 * nbrePBPoissVol;
					    offrePBPoissVol.style.width = numoffrePBPoissVol + 'px';
					    offrePBPoissVol.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBPoissVol.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBPoissVolPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBPoissVol > 2) { 
					    	document.getElementById('idPBPoissVolNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBPoissVolNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBPoissVol !== undefined ? PBPoissVol : false;
			},
			pOffresBoissonVinLiq : function(){ 
				let PBVinLiq = Session.get('promotionOffBoissVinLiq');
				if (ecranWidth){
					let offrePBVinLiq = document.getElementById('idCarouselPBVinLiq');
					if (offrePBVinLiq !== null) {
						let nbrePBVinLiq = PBVinLiq.length;
				    	let numoffrePBVinLiq = 320 * nbrePBVinLiq;
					    offrePBVinLiq.style.width = numoffrePBVinLiq + 'px';
					    offrePBVinLiq.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBVinLiq.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBVinLiqPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBVinLiq > 2) { 
					    	document.getElementById('idPBVinLiqNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBVinLiqNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBVinLiq !== undefined ? PBVinLiq : false;
			},
			pOffresBoulangeriePatisserie : function(){ 
				let PBPatisserie = Session.get('promotionOffBoulPatisserie');
				if (ecranWidth){
					let offrePBPatisserie = document.getElementById('idCarouselPBPatisserie');
					if (offrePBPatisserie !== null) {
						let nbrePBPatisserie = PBPatisserie.length;
				    	let numoffrePBPatisserie = 320 * nbrePBPatisserie;
					    offrePBPatisserie.style.width = numoffrePBPatisserie + 'px';
					    offrePBPatisserie.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBPatisserie.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBPatisseriePrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBPatisserie > 2) { 
					    	document.getElementById('idPBPatisserieNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBPatisserieNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBPatisserie !== undefined ? PBPatisserie : false;
			},
			pOffresFastFood : function(){ 
				let PFFood = Session.get('promotionOffFastFood');
				if (ecranWidth){
					let offrePFFood = document.getElementById('idCarouselPFFood');
					if (offrePFFood !== null) {
						let nbrePFFood = PFFood.length;
				    	let numoffrePFFood = 320 * nbrePFFood;
					    offrePFFood.style.width = numoffrePFFood + 'px';
					    offrePFFood.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePFFood.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPFFoodPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePFFood > 2) { 
					    	document.getElementById('idPFFoodNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPFFoodNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PFFood !== undefined ? PFFood : false; 
			},
			pOffresBazar : function(){ 
				let PBazar = Session.get('promotionOffBazar');
				if (ecranWidth){
					let offrePBazar = document.getElementById('idCarouselPBazar');
					if (offrePBazar !== null) {
						let nbrePBazar = PBazar.length;
				    	let numoffrePBazar = 320 * nbrePBazar;
					    offrePBazar.style.width = numoffrePBazar + 'px';
					    offrePBazar.setAttribute('tabindex', '0');
					    let translateX = 0;
					    offrePBazar.style.transform = 'translate3d(' + translateX + 'px,0,0)';
					    document.getElementById('idPBazarPrev').classList.add('myCarousel__prev-hidden');
					    if (nbrePBazar > 2) { 
					    	document.getElementById('idPBazarNext').classList.remove('myCarousel__next-hidden'); 
					    }
					    else {
					    	document.getElementById('idPBazarNext').classList.add('myCarousel__next-hidden');
					    }
				    }
				}
				return PBazar !== undefined ? PBazar : false;
			}
		});

Template.carousel.onCreated(function(){
	this.subscribe('meilleuresPromosSub');
});
Template.carousel.helpers({
	lesMeilleuresPromos : function(){ return Promotions.find(); }
});
