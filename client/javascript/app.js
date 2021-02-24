var lesTypesDePromo = ['dernierMarche', 'promotion'];
var lesRayonsDePromo = ['epicerieSalee', 'epicerieSucree', 'produitsFrais', 'fruitsLegumes', 'bouchPoissVol', 'boissVinLiq', 'boulPatisserie', 'fastFood', 'bazar'];

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
	    				$('#idTypePromo').removeClass('choixNon');
	   					$('#idTypePromo').addClass('choixOui');
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
		    "folder": "dMarche",
		  	"resource_type": "image",
		  	"type": "upload",
		  	"use_filename": true,
		  	"unique_filename": true
		  },
	  	function(err, res) {
	  		const image = { idImg : img, rUrl : res.url };
	  		Meteor.call('majImagePromo', image, function(err, result){
	  			if (err || (result != 'OK')){ $('#idTypePromo').addClass('error'); }
	  		});
	    }, true);
	    $('#inserTof').removeClass('oui');
   		$('#inserTof').addClass('non');
   		$('#idTypePromo').removeClass('choixNon');
   		$('#idTypePromo').addClass('choixOui');
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
		Session.set('villePromoChoisie', vPromo);
		const chx = vPromo;
		if (chx == '--') {
			$('#idChoixQuartier').addClass('choixNon');
			$('#idChoixSurface').addClass('choixNon');
			$('#idValidationRecherche').addClass('choixNon');
		}
		else {
			$('#idChoixQuartier').removeClass('choixNon');
			$('#idChoixQuartier').addClass('choixOui');

			$('#idChoixSurface').addClass('choixNon');
			$('#idValidationRecherche').addClass('choixNon');
		}
	},
	'change [name="selectQuartierPromo"]' : function(event, instance){
		event.preventDefault();
		let qPromo = $( event.target ).find( 'option:selected' ).val(); 
		Session.set('quartierPromoChoisie', qPromo);
		const chx = qPromo;
		if (chx == '--') {
			$('#idChoixSurface').addClass('choixNon');
			$('#idValidationRecherche').addClass('choixNon');
		}
		else {
			$('#idChoixSurface').removeClass('choixNon');
			$('#idChoixSurface').addClass('choixOui');
			$('#idValidationRecherche').addClass('choixNon');
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
		Session.set('espacePromoChoisie', espPromo);
		const chx = espPromo;
		if (chx == '--') { $('#idValidationRecherche').addClass('choixNon'); }
		else {
			$('#idValidationRecherche').removeClass('choixNon');
			$('#idValidationRecherche').addClass('choixOui');
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
					var si = Sites.findOne({_id: ec.id});
					const n = parseFloat(Session.get('laNote'));
					var newNote = {
						mailClient : mail,
						noteClient : n,
						dateNote : new Date()
					}
					if (si.siteNote !== undefined && si.siteNote > 0 ) {
						Meteor.call('noteSite', { id : ec.id, mail : mail}, function(err, result){
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
								      	if (rep.is_smtp_valid.value === false) {
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
									      	const nouvelleNote = { id : ec.id, laNObj : newNote, laN : n, leMail : mail, nExists : 'OUI' };
									      	Meteor.call('ajoutNote', nouvelleNote, function(err, result){
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
					      	if (rep.is_smtp_valid.value === false) {
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
						      	const nouvelleNote = { id : ec.id, laNObj : newNote, laN : n, leMail : mail, nExists : 'NON' };
						      	Meteor.call('ajoutNote', nouvelleNote, function(err, result){
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
				var s = Session.get('leS');
	            const nN = Session.get('newN');
	            const id = Session.get('lId');
	            const m = Session.get('leM');
	            const n = parseFloat(Session.get('laNote'));
				const nouvelleNote = { id : id, laNObj : nN, laN : n, leMail : m, nExists : 'OUI' };
		      	Meteor.call('modifNote', nouvelleNote, function(err, result){
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
				var s = Session.get('leS');
	            const nN = Session.get('newN');
	            const id = Session.get('lId');
	            const m = Session.get('leM');
	            const n = parseFloat(Session.get('laNote'));
				const nouvelleNote = { id : id, laNObj : nN, laN : n, leMail : m, nExists : 'OUI' };
		      	Meteor.call('modifNote', nouvelleNote, function(err, result){
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
		const mC = Session.get('mContact');
		const oC = Session.get('objContact');
		const msgC = Session.get('msgContact');
		const m = { mC : mC, oC : oC, msgC : msgC } 
		Meteor.call('sendEmail', m, function(err, result){
			if (err) {
				$('#idInputContactEmail').addClass('error');
				$('#idObjetContact').addClass('error');
				$('#idMessageContact').addClass('error');
				$("#idConfirmEnvoiMail").removeClass('oui');
				$("#idConfirmEnvoiMail").addClass('non');
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

					$("#idConfirmEnvoiMail").removeClass('oui');
					$("#idConfirmEnvoiMail").addClass('non');
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
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
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
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
	'change [name="selectEspace"]' : function(event, instance){
		event.preventDefault();
		let espChoisi = $( event.target ).find( 'option:selected' ).val(); 
		Session.set('espaceChoisi', espChoisi);
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
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
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
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
	},
	'click #login-buttons-logout' : function(event, instance){
		event.preventDefault();
		Meteor.logout();
	},
	'submit .js-new-espace' : function(event, instance){
		event.preventDefault();
		var newEspaceNom = $('#idNomEspace').val();
		newEspaceNom = newEspaceNom.toUpperCase();
		var nbreEspace = Espaces.find({espaceNom : newEspaceNom}).count();
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
		Template.tmplteChaqueEspace.events({
			'click .js-modif-espace' : function(event, instance){
				event.preventDefault();
				Modal.show('tmplteModalModifEspace', instance.data);
			}
		});
		
		Template.tmplteModalModifEspace.onCreated(function(){
			this.subscribe('tousLesEspacesSub');
			this.subscribe('tousLesSitesSub');
			this.subscribe('toutesLesVillesesSub');
			this.subscribe('toutesLesPromosSub');
			this.subscribe('lesImagesSub');
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

						$('#idConfirmSupp').addClass('confirmSuppNON');
						$('#idConfirmBlock').addClass('confirmBlockNON');
						$('#idConfirmDeblock').addClass('confirmDeblockNON');

						$('#idConfirmModif').removeClass('confirmModifNON');
						$('#idConfirmModif').addClass('confirmModifOUI');
						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');
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

						$('#idConfirmSupp').addClass('confirmSuppNON');
						$('#idConfirmBlock').addClass('confirmBlockNON');
						$('#idConfirmDeblock').addClass('confirmDeblockNON');

						$('#idConfirmModif').removeClass('confirmModifNON');
						$('#idConfirmModif').addClass('confirmModifOUI');
						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');
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

					$('#idConfirmModif').addClass('confirmModifNON');
					$('#idConfirmBlock').addClass('confirmBlockNON');
					$('#idConfirmDeblock').addClass('confirmDeblockNON');

					$('#idConfirmSupp').removeClass('confirmSuppNON');
					$('#idConfirmSupp').addClass('confirmSuppOUI');
					$('#idConfirmAnnul').removeClass('confirmAnnulNON');
					$('#idConfirmAnnul').addClass('confirmAnnulOUI');
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

					$('#idConfirmModif').addClass('confirmModifNON');
					$('#idConfirmSupp').addClass('confirmSuppNON');

					if (esp.espaceBlocked == 'NON') {
						$('#idConfirmDeblock').addClass('confirmDeblockNON');
						$('#idConfirmBlock').removeClass('confirmBlockNON');
						$('#idConfirmBlock').addClass('confirmBlockOUI');
					}
					else {
						$('#idConfirmBlock').addClass('confirmBlockNON'); 
						$('#idConfirmDeblock').removeClass('confirmDeblockNON');
						$('#idConfirmDeblock').addClass('confirmDeblockOUI');
					}
					$('#idConfirmAnnul').removeClass('confirmAnnulNON');
					$('#idConfirmAnnul').addClass('confirmAnnulOUI');
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
						var lesIdSites = Sites.find({siteEspace : instance.data.espace.espaceNom}).fetch();
						if (lesIdSites.length > 0) {
							Meteor.call('modifNomEspSite', 
								{
									lesIdSites : lesIdSites, 
									espaceNomModified : espaceNomModified, 
									espaceDteModif : espaceDteModif
								}, 
								function(err, result){
									if (err || (result != 'OK')) {
										$('#idNotification').removeClass('NON');
										$('#idNotification').addClass('OUI');
									}
									else { 
										if (Villes.find({espaces : instance.data.espace.espaceNom}).count() > 0) {
											Meteor.call('modifNomEspVille', 
												{
													aEsp : instance.data.espace.espaceNom,
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
				Meteor.call('suppEspace', {id : instance.data.espace._id}, function(err, result){
					if (err || (result != 'OK')) {
						$('#idNotification').removeClass('notificationNON');
						$('#idNotification').addClass('notificationOUI');
						$('#idConfirmation').removeClass('confirmationNON');
						$('#idConfirmation').addClass('confirmationOUI');
					}
					else {
						var lesIdSites = Sites.find({siteEspace : instance.data.espace.espaceNom}).fetch();
						if (lesIdSites.length > 0) {
							var espV = [];
							var lesIdSitesPromos = [];
							lesIdSites.forEach(function(transaction){
								lesIdSitesPromos.push(transaction._id);
								const eltEsp = {
									vil : transaction.siteVille,
									esp : transaction.siteEspace,
									qtier : transaction.siteQuartier
								} 
								espV.push(eltEsp);								
							});
							Meteor.call('suppEspVille', { espV : espV }, function(err, result){
								if (err || (result != 'OK')) {
									$('#idNotification').removeClass('notificationNON');
									$('#idNotification').addClass('notificationOUI');
									$('#idConfirmation').removeClass('confirmationNON');
									$('#idConfirmation').addClass('confirmationOUI');
								}
								else {
									Meteor.call('suppSite', { lesIdSites : lesIdSites }, function(err, result){
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
        					  "</div>";
        var eft = document.getElementById('login-dropdown-list');
        prt.insertBefore(loginName, eft);
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
			siteNote : 0,
			siteVotants : [],
			siteLesNotes : [],
			siteDateCreation : siteDteCrea,
			siteBlocked : 'OUI'
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
		Template.tmplteChaqueSite.events({
			'click .js-modif-site' : function(event, instance){
				event.preventDefault();
				Modal.show('tmplteModalModifSite', instance.data);
			}
		});

			Template.tmplteModalModifSite.onCreated(function(){
				this.subscribe('tousLesEspacesSub');
				this.subscribe('tousLesSitesSub');
				this.subscribe('toutesLesVillesesSub');
				this.subscribe('toutesLesPromosSub');
				this.subscribe('lesImagesSub');
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

							$('#idConfirmSupp').addClass('confirmSuppNON');
							$('#idConfirmBlock').addClass('confirmBlockNON');
							$('#idConfirmDeblock').addClass('confirmDeblockNON');
							$('#idConfirmPromotion').addClass('confirmPromotionNON');

							$('#idConfirmModif').removeClass('confirmModifNON');
							$('#idConfirmModif').addClass('confirmModifOUI');
							$('#idConfirmAnnul').removeClass('confirmAnnulNON');
							$('#idConfirmAnnul').addClass('confirmAnnulOUI');

							$('#idModalModifSite').animate({
								scrollTop : 0
							}, 0);
						}
					}
					else {
						var siteVilleModified = $('#idModifVilleSite').val();
						siteVilleModified = siteVilleModified.toUpperCase();

						const siteContactModified = $('#idModifContactSite').val();
						const siteMailModified = $('#idModifMailSite').val();

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
							siteMailModified == instance.data.uSite.siteMail &&

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

							$('#idConfirmSupp').addClass('confirmSuppNON');
							$('#idConfirmBlock').addClass('confirmBlockNON');
							$('#idConfirmDeblock').addClass('confirmDeblockNON');
							$('#idConfirmPromotion').addClass('confirmPromotionNON');

							$('#idConfirmModif').removeClass('confirmModifNON');
							$('#idConfirmModif').addClass('confirmModifOUI');
							$('#idConfirmAnnul').removeClass('confirmAnnulNON');
							$('#idConfirmAnnul').addClass('confirmAnnulOUI');

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
					const siteMailModified = $('#idModifMailSite').val();

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
						siteMailModified == instance.data.uSite.siteMail &&

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

						$('#idConfirmModif').addClass('confirmModifNON');
						$('#idConfirmBlock').addClass('confirmBlockNON');
						$('#idConfirmDeblock').addClass('confirmDeblockNON');
						$('#idConfirmPromotion').addClass('confirmPromotionNON');

						$('#idConfirmSupp').removeClass('confirmSuppNON');
						$('#idConfirmSupp').addClass('confirmSuppOUI');
						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');

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
					const siteMailModified = $('#idModifMailSite').val();

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
						siteMailModified == instance.data.uSite.siteMail &&

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

						$('#idConfirmModif').addClass('confirmModifNON');
						$('#idConfirmSupp').addClass('confirmSuppNON');
						$('#idConfirmPromotion').addClass('confirmPromotionNON');

						if (uSt.siteBlocked == 'NON') {
							$('#idConfirmDeblock').addClass('confirmDeblockNON');

							$('#idConfirmBlock').removeClass('confirmBlockNON');
							$('#idConfirmBlock').addClass('confirmBlockOUI');
						}
						else {
							$('#idConfirmBlock').addClass('confirmBlockNON');

							$('#idConfirmDeblock').removeClass('confirmDeblockNON');
							$('#idConfirmDeblock').addClass('confirmDeblockOUI');
						}
						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');

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
					const siteMail = $('#idModifMailSite').val();

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
						siteMail == instance.data.uSite.siteMail &&
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

						$('#idConfirmModif').addClass('confirmModifNON');
						$('#idConfirmSupp').addClass('confirmSuppNON');
						$('#idConfirmBlock').addClass('confirmBlockNON');
						$('#idConfirmDeblock').addClass('confirmDeblockNON');

						$('#idConfirmPromotion').removeClass('confirmPromotionNON');
						$('#idConfirmPromotion').addClass('confirmPromotionOUI');
						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');

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
					const siteMailModified = $('#idModifMailSite').val();

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
					if (siteMailModified != instance.data.uSite.siteMail) {
						siteModif.push({ nom : 'siteMail', siteMail : siteMailModified });
					}
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
					var dataSite = instance.data.uSite;
					var nomQuartier = dataSite.siteQuartier;
					var nomEspace = dataSite.siteEspace;
					var vil = Villes.findOne({ville : dataSite.siteVille}); 
					const numQuartiers = Sites.find({siteVille : dataSite.siteVille, siteQuartier : nomQuartier}).count();	
					const numEsp = Sites.find({siteVille : dataSite.siteVille, siteEspace : dataSite.siteEspace}).count();
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
												ville : dataSite.siteVille
											}, 
											function(err, result){
												if (err || (result != 'OK')) {
													$('#idNotification').removeClass('notificationNON');
													$('#idNotification').addClass('notificationOUI');
													$('#idConfirmation').removeClass('confirmationNON');
													$('#idConfirmation').addClass('confirmationOUI');
									            }
												else { Router.go('/authentification/sites'); }
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
						$('#idRayonPromo').addClass('choixNon');
						$('#idDefinitionPromo').addClass('choixNon');
						$('#idValidationPromo').addClass('choixNon');
					}
					else {
						$('#idRayonPromo').removeClass('choixNon');
						$('#idRayonPromo').addClass('choixOui');

						$('#idDefinitionPromo').addClass('choixNon');
						$('#idValidationPromo').addClass('choixNon');

						if (typPromo == 'dernierMarche') {
							$('#idSelectRayonPromoBazar').removeClass('choixOui');
							$('#idSelectRayonPromoBazar').addClass('choixNon');
						}
						else {
							$('#idSelectRayonPromoBazar').removeClass('choixNon');
							$('#idSelectRayonPromoBazar').addClass('choixOui');
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
						$('#idDefinitionPromo').addClass('choixNon');
						$('#idValidationPromo').addClass('choixNon');
					}
					else {
						$('#idDefinitionPromo').removeClass('choixNon');
						$('#idDefinitionPromo').addClass('choixOui');

						$('#idValidationPromo').removeClass('choixNon');
						$('#idValidationPromo').addClass('choixOui');
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
					$('#idQuantiteProduit').remove('error');
					$('#idPrixProduit').remove('error');
					$('#idExpProduit').remove('error'); 
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
						const qteProduit = $('#idQuantiteProduit').val();

						var tofProduit = Session.get('objImg'); 
						const laTof = ImagesPromo.findOne({_id : tofProduit});
						const urlTof = laTof.urlImage;

						const prixProduit = parseInt($('#idPrixProduit').val());
						const expirationProduit = $('#idExpProduit').val();
						const remisePromotion = parseInt($('#idRemisePromotion').val());
						const expirationPromotion = $('#idExpPromotion').val();
						const detailPromotion = $('#idDetailPromotion').val();
						const promoPrix = parseInt(prixProduit-(prixProduit*remisePromotion/100));
						const dteExpProduit = new Date(expirationProduit);
						var dteExpPromo = new Date(expirationPromotion);
						const dte = new Date();	
						if ((dteExpPromo.getTime() - dte.getTime()) > 86400000) {
							const promoDteCrea = laDate(dte);
							dteExpPromo = laDate(dteExpPromo);
							var newPromo = {
								idPromotion : identifiantPromo,
								idSitePromo : instance.data.uSite._id,
								typeDePromo : typePromo,
								rayonDePromo : rayonPromo,
								produitNom : nomProduit,
								produitQte : qteProduit,
								idTofPromo : tofProduit,
								produitTof : urlTof,
								produitPrix : prixProduit,
								prixPromo : promoPrix,
								produitExpiration : dteExpProduit,
								promoRemise : remisePromotion,
								promoExpiration : new Date(expirationPromotion),
								promoDateExp : dteExpPromo,
								promoDetail : detailPromotion,
								promoDateCreation : promoDteCrea
							}
							Meteor.call('creationPromo', newPromo, function(err, result){
								if (err) {
									$('#idSelectTypePromo').addClass('error');
									$('#idSelectRayonPromo').addClass('error');
									$('#idNomProduit').addClass('error');
									$('#idQuantiteProduit').addClass('error');
									$('#idPrixProduit').addClass('error');
									$('#idExpProduit').addClass('error'); 
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
										$('#idQuantiteProduit').val('');
										$('#idPrixProduit').val('');
										$('#idExpProduit').val(''); 
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
												Modal.hide(); 
												if (window.innerWidth >= 992) { window.location.reload(); }
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
												case 'produitQte' : 
													$('#idQuantiteProduit').addClass('error'); 
													const qteP = $('#idQuantiteProduit').val();
													$('#idQuantiteProduit').val(''); 
													document.getElementById('idQuantiteProduit').setAttribute('placeholder', qteP);
													break;
												case 'produitPrix' : 
													$('#idPrixProduit').addClass('error'); 
													const pP = $('#idPrixProduit').val();
													$('#idPrixProduit').val(''); 
													document.getElementById('idPrixProduit').setAttribute('placeholder', pP);
													break;
												case 'produitExpiration' : 
													$('#idExpProduit').addClass('error'); 
													const expP = $('#idExpProduit').val();
													$('#idExpProduit').val(''); 
													document.getElementById('idExpProduit').setAttribute('placeholder', expP);
													break;
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
													$('#idQuantiteProduit').addClass('error');
													$('#idPrixProduit').addClass('error');
													$('#idExpProduit').addClass('error'); 
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
					Modal.show('tmplteModalModifPromotion', instance.data);
				}
			});

			
			Template.tmplteModalModifPromotion.onCreated(function(){
				this.subscribe('tousLesEspacesSub');
				this.subscribe('tousLesSitesSub');
				this.subscribe('toutesLesVillesesSub');
				this.subscribe('toutesLesPromosSub');
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
						const qteProduitModified = $('#idModifQuantiteProduit').val();						
						const expirationProduitModified = $('#idModifExpirationProduit').val();
						const validitePromoModified = $('#idModifExpPromotion').val();

						if (prixProduitModified == instance.data.promo.produitPrix && 
							remisePromoModified == instance.data.promo.promoRemise &&
							detailPromoModified == instance.data.promo.promoDetail &&
							qteProduitModified == instance.data.promo.produitQuantite &&
							expirationProduitModified == instance.data.promo.produitExpiration &&
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

							
							$('#idConfirmModifPromo').removeClass('confirmModifNON');
							$('#idConfirmModifPromo').addClass('confirmModifOUI');

							$('#idConfirmModifImage').removeClass('confirmModifImageOUI');
							$('#idConfirmModifImage').addClass('confirmModifImageNON');

							$('#idPromoUploadModifTof').removeClass('promoUploadModifTofOUI');
							$('#idPromoUploadModifTof').addClass('promoUploadModifTofNON');

							$('#idConfirmSuppPromo').removeClass('confirmSuppOUI');
							$('#idConfirmSuppPromo').addClass('confirmSuppNON');

							$('#idConfirmAnnulPromo').removeClass('confirmAnnulNON');
							$('#idConfirmAnnulPromo').addClass('confirmAnnulOUI');

							$('#idConfirmAnnul').removeClass('confirmAnnulNON');
							$('#idConfirmAnnul').addClass('confirmAnnulOUI');

							$('#idModalModifPromotion').animate({
								scrollTop : 0
							}, 0);
						}						
					}
					else if ((nbrePromo == 0) ||
							((produitNomModified != instance.data.promo.produitNom) && (nbrePdt > 0)))
					{	 
						$('#idNotificationExistPromo').addClass('notificationExistPromoNON');

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

							
						$('#idConfirmModifPromo').removeClass('confirmModifNON');
						$('#idConfirmModifPromo').addClass('confirmModifOUI');

						$('#idConfirmModifImage').removeClass('confirmModifImageOUI');
						$('#idConfirmModifImage').addClass('confirmModifImageNON');

						$('#idPromoUploadModifTof').removeClass('promoUploadModifTofOUI');
						$('#idPromoUploadModifTof').addClass('promoUploadModifTofNON');

						$('#idConfirmSuppPromo').removeClass('confirmSuppOUI');
						$('#idConfirmSuppPromo').addClass('confirmSuppNON');

						$('#idConfirmAnnulPromo').removeClass('confirmAnnulNON');
						$('#idConfirmAnnulPromo').addClass('confirmAnnulOUI');

						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');

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
							
					$('#idConfirmModifPromo').removeClass('confirmModifOUI');
					$('#idConfirmModifPromo').addClass('confirmModifNON');

					$('#idConfirmModifImage').removeClass('confirmModifImageNON');
					$('#idConfirmModifImage').addClass('confirmModifImageOUI');

					$('#idPromoUploadModifTof').removeClass('promoUploadModifTofOUI');
					$('#idPromoUploadModifTof').addClass('promoUploadModifTofNON');

					$('#idConfirmSuppPromo').removeClass('confirmSuppOUI');
					$('#idConfirmSuppPromo').addClass('confirmSuppNON');
					
					$('#idConfirmAnnulPromo').removeClass('confirmAnnulNON');
					$('#idConfirmAnnulPromo').addClass('confirmAnnulOUI');
					
					$('#idConfirmAnnul').removeClass('confirmAnnulNON');
					$('#idConfirmAnnul').addClass('confirmAnnulOUI');
					
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

						$('#idConfirmModifPromo').removeClass('confirmModifOUI');
						$('#idConfirmModifPromo').addClass('confirmModifNON');

						$('#idConfirmModifImage').removeClass('confirmModifImageOUI');
						$('#idConfirmModifImage').addClass('confirmModifImageNON');

						$('#idConfirmSuppPromo').removeClass('confirmSuppNON');
						$('#idConfirmSuppPromo').addClass('confirmSuppOUI');

						$('#idConfirmAnnulPromo').removeClass('confirmAnnulNON');
						$('#idConfirmAnnulPromo').addClass('confirmAnnulOUI');

						$('#idConfirmAnnul').removeClass('confirmAnnulNON');
						$('#idConfirmAnnul').addClass('confirmAnnulOUI');

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
					$('#idConfirmationPromo').removeClass('confirmationOUI');
					$('#idConfirmationPromo').addClass('confirmationNON');
				},
				'click #idConfirmModifPromo' : function(event, instance){
					event.preventDefault();
					var produitNomModified = $('#idModifNomProduit').val();
					produitNomModified = produitNomModified.toUpperCase();
					const qteProduitModified = $('#idModifQuantiteProduit').val();
					var prixProduitModified = $('#idModifPrixProduit').val();
					const expirationProduitModified = $('#idModifExpirationProduit').val();
					var remisePromoModified = $('#idModifRemisePromotion').val();
					const validitePromoModified = $('#idModifExpPromotion').val();
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
					if ((qteProduitModified != instance.data.promo.produitQte) &&
						(qteProduitModified != '')) {
						laPromotion.produitQte = qteProduitModified;
						instanceDePromotions.produitQte = qteProduitModified;
					}
					if ((expirationProduitModified != instance.data.promo.produitExpiration) &&
						(expirationProduitModified != '')) {
						const pdtDteExp = new Date(expirationProduitModified);
						laPromotion.produitExpiration = pdtDteExp;
						instanceDePromotions.produitExpiration = pdtDteExp;
					}			
					if ((validitePromoModified != instance.data.promo.promoExpiration) &&
						(validitePromoModified != '')) {
						const promoExp = new Date(validitePromoModified);
						const promoDteExp = laDate(promoExp);
						laPromotion.promoExpiration = promoExp;
						laPromotion.promoDateExp = promoDteExp;
						instanceDePromotions.promoExpiration = promoExp;
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
					$('#idConfirmModifImage').removeClass('confirmModifImageOUI');
					$('#idConfirmModifImage').addClass('confirmModifImageNON');

					$('#idConfirmAnnulPromo').removeClass('confirmAnnulOUI');
					$('#idConfirmAnnulPromo').addClass('confirmAnnulNON');

					$('#idPromoUploadModifTof').removeClass('promoUploadModifTofNON');
					$('#idPromoUploadModifTof').addClass('promoUploadModifTofOUI');					
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
					if (leSite.sitePromos && leSite.sitePromos.length == 1) {					
						const vil = Villes.findOne({ville : leSite.siteVille}); 
						const numQuartiers = Sites.find({siteQuartier : leSite.siteQuartier, siteVille : leSite.siteVille}).count();
						const numEsp = Sites.find({siteEspace : leSite.siteEspace, siteVille : leSite.siteVille}).count();

						Meteor.call('modifBlockSite', { id : leSite._id, siteB : 'OUI', dte : laDate(new Date()) }, function(err, result){
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
					else {
						Meteor.call('suppPromoSite', {idSite : dataPromo.idSitePromo, idPromoSite : dataPromo.idPromotion}, function(err, result){
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



Template.tmplteSites.onCreated(function(){
	this.subscribe('tousLesSitesSub');
	this.subscribe('tousLesEspacesSub');
});
Template.tmplteSites.helpers({
	lEspaces : function(){
		var lesEsp = [""];
		var lesEspaces = Espaces.find({}, {sort : {espaceNom : 1}}).fetch();
		return lesEsp.concat(lesEspaces);
	},
	lSites : function(){ return Sites.find({siteEspace : Session.get('espaceChoisi')}, {sort : {siteVille : 1, siteQuartier : 1}}); }
});


Template.tmplteSitesDetail.onCreated(function(){
	this.subscribe('tousLesSitesSub');
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
	dMOffresEpicerieSalee : function(){ return Session.get('dernierMarcheOffEpiSalee'); },
	dMOffresEpicerieSucree : function(){ return Session.get('dernierMarcheOffEpiSucree'); },
	dMOffresProduitsFrais : function(){ return Session.get('dernierMarcheOffProdFrais'); },
	dMOffresFruitsLegumes : function(){ return Session.get('dernierMarcheOffFruitsLegumes'); },
	dMOffresBoucheriePoissVol : function(){ return Session.get('dernierMarcheOffBouchPoissVol'); },
	dMOffresBoissonVinLiq : function(){ return Session.get('dernierMarcheOffBoissVinLiq'); },
	dMOffresBoulangeriePatisserie : function(){ return Session.get('dernierMarcheOffBoulPatisserie'); },
	dMOffresFastFood : function(){ return Session.get('dernierMarcheOffFastFood'); },
	pOffresEpicerieSalee : function(){ return Session.get('promotionOffEpiSalee'); },
	pOffresEpicerieSucree : function(){ return Session.get('promotionOffEpiSucree'); },
	pOffresProduitsFrais : function(){ return Session.get('promotionOffProdFrais'); },
	pOffresFruitsLegumes : function(){ return Session.get('promotionOffFruitsLegumes'); },
	pOffresBoucheriePoissVol : function(){ return Session.get('promotionOffBouchPoissVol'); },
	pOffresBoissonVinLiq : function(){ return Session.get('promotionOffBoissVinLiq'); },
	pOffresBoulangeriePatisserie : function(){ return Session.get('promotionOffBoulPatisserie'); },
	pOffresFastFood : function(){ return Session.get('promotionOffFastFood'); },
	pOffresBazar : function(){ return Session.get('promotionOffBazar'); }
});


Template.tmplteCreationSite.onCreated(function(){
	this.subscribe('tousLesEspacesSub');
	this.subscribe('tousLesSitesSub');
	this.subscribe('toutesLesVillesesSub');
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
		if (vil === undefined) { return false; }
		else {
			const laVille = Villes.findOne({ville : vil});
			return laVille.quartiers.sort();
		}
	},
	lEspaces : function(){ return Sites.find({}, {sort : {siteEspace : 1}}); },
	leSite : function(){ return Sites.findOne({siteEspace : Session.get('espacePromoChoisie')}); }
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

		var id = Session.get('siteOffres');
		if (id !== undefined) { 
			leSiteDesOffres = Sites.findOne({_id : id}); 
			const lesOffres = leSiteDesOffres.sitePromos;
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
	dMOffresEpicerieSalee : function(){ return Session.get('dernierMarcheOffEpiSalee'); },
	dMOffresEpicerieSucree : function(){ return Session.get('dernierMarcheOffEpiSucree'); },
	dMOffresProduitsFrais : function(){ return Session.get('dernierMarcheOffProdFrais'); },
	dMOffresFruitsLegumes : function(){ return Session.get('dernierMarcheOffFruitsLegumes'); },
	dMOffresBoucheriePoissVol : function(){ return Session.get('dernierMarcheOffBouchPoissVol'); },
	dMOffresBoissonVinLiq : function(){ return Session.get('dernierMarcheOffBoissVinLiq'); },
	dMOffresBoulangeriePatisserie : function(){ return Session.get('dernierMarcheOffBoulPatisserie'); },
	dMOffresFastFood : function(){ return Session.get('dernierMarcheOffFastFood'); },
	pOffresEpicerieSalee : function(){ return Session.get('promotionOffEpiSalee'); },
	pOffresEpicerieSucree : function(){ return Session.get('promotionOffEpiSucree'); },
	pOffresProduitsFrais : function(){ return Session.get('promotionOffProdFrais'); },
	pOffresFruitsLegumes : function(){ return Session.get('promotionOffFruitsLegumes'); },
	pOffresBoucheriePoissVol : function(){ return Session.get('promotionOffBouchPoissVol'); },
	pOffresBoissonVinLiq : function(){ return Session.get('promotionOffBoissVinLiq'); },
	pOffresBoulangeriePatisserie : function(){ return Session.get('promotionOffBoulPatisserie'); },
	pOffresFastFood : function(){ return Session.get('promotionOffFastFood'); },
	pOffresBazar : function(){ return Session.get('promotionOffBazar'); }
});


Template.carousel.onCreated(function(){
	this.subscribe('meilleuresPromosSub');
});
Template.carousel.helpers({
	lesMeilleuresPromos : function(){ return Promotions.find({}, {sort : {promoRemise : -1}}); }
});
