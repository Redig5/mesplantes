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
	    	const nPlantes = ImagesPlantes.find().count();
	    	if (nPlantes > 0) {
	    		var existeTof = ImagesPlantes.findOne({name : e.currentTarget.files[0].name});
	    		if (existeTof){
	    			Session.set('objImg', existeTof._id);
	    			alert('Image déjà présente');
	    			if (existeTof.uploaded !== 'OUI') {
	    				$('#inserTof').removeClass('non');
	   				    $('#inserTof').addClass('oui');
	   				    $('#idNewPlante').removeClass('oui');
   				    	$('#idNewPlante').addClass('non');
	    			}
	    		}
	    		else {
	    			const upload = ImagesPlantes.insert({
	        			file: e.currentTarget.files[0],
	        			streams: 'dynamic',
	        			chunkSize: 'dynamic'
	     	 		}, true);
	        		if (upload) { 
	        			Session.set('objImg', upload.config.fileId);      
	          			alert('Image "' + upload.file.name + '" téléchargée');
	          			$('#inserTof').removeClass('non');
	   				    $('#inserTof').addClass('oui');
	   				    $('#idNewPlante').removeClass('oui');
   				    	$('#idNewPlante').addClass('non');
	        		}
	        		else { alert('Erreur survenue durant le téléchargement'); }
	        	}
	    	}
	    	else {
	      		const upload = ImagesPlantes.insert({
	        		file: e.currentTarget.files[0],
	        		streams: 'dynamic',
	        		chunkSize: 'dynamic'
	     	 	}, true);
	      		if (upload) { 
        			Session.set('objImg', upload.config.fileId);      
          			alert('Image "' + upload.file.name + '" téléchargée');
          			$('#inserTof').removeClass('non');
   				    $('#inserTof').addClass('oui');
   				    $('#idNewPlante').removeClass('oui');
   				    $('#idNewPlante').addClass('non');
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
	  		Meteor.call('majImagePlante', image, function(err, result){
	  			if (err || (result !== 'OK')){ 
	  				$('#idImageError').removeClass('non');
   					$('#idImageError').addClass('oui');
	  			}
	  			else {
	  				$('#idImageError').removeClass('oui');
   					$('#idImageError').addClass('non');
	  			}
	  		});
	    }, true);
   		$('#inserTof').removeClass('oui');
   		$('#inserTof').addClass('non');
   		$('#idNewPlante').removeClass('non');
   		$('#idNewPlante').addClass('oui');
    }
});
Template.uploadForm.helpers({
    currentUpload() { return Template.instance().currentUpload.get(); }
});

Template.tmplteLogOut.events({
	'click #idLogout' : function(event, instance){
		Meteor.logout();
	}
});

Template.tmplteAjoutPlante.events({
	'submit .js-new-plante' : function(event, instance){
		event.preventDefault();

		var nomPlante = $('#idNomPlante').val().trim();
		nomPlante = nomPlante.toUpperCase();
		var especePlante = $('#idEspecePlante').val().trim();
		especePlante = especePlante.toUpperCase();
		var tofPlante = Session.get('objImg'); 
		const frequenceArrosagePlante = parseInt($('#idFrequenceArrosagePlante').val().trim());
		const qteEauArrosage = parseInt($('#idQteEauArrosage').val().trim());
		const dateAchatPlante = $('#idDateAchatPlante').val();
		var dteAchatPlante = new Date(dateAchatPlante);
		const dte = new Date();	
		const dateCreation = laDate(dte);
		if (
			nomPlante &&
			especePlante &&
			nomPlante &&
			frequenceArrosagePlante &&
			qteEauArrosage &&
			tofPlante &&
			dteAchatPlante.getTime() < dte.getTime()
			) {
			const laTof = ImagesPlantes.findOne({_id : tofPlante});
			const urlTof = laTof.urlImage;
			const newPlante = {
				nomPlante : nomPlante,
				especePlante : especePlante,
				frequenceArrosagePlante : frequenceArrosagePlante,
				qteEauArrosage : qteEauArrosage,
				idTofPlante : tofPlante,
				urlTofPlante : urlTof,
				dateAchatPlante : new Date(dateAchatPlante),
				dateAchatPlanteTime : dteAchatPlante.getTime(),
				dateAchat : laDate(dteAchatPlante),
				dateCreationPlante : dte,
				dateCreationPlanteTime : dte.getTime(),
				dateCreation : dateCreation,
				dateDernierArrosagePlante : dte,
				dateDernierArrosageTime : 0,
				dateDernierArrosage : dateCreation,

				planteOwner : Meteor.userId()
			}
			Session.set('newPlante', newPlante);
			$('#idModalAjoutPlante').modal('show');
		}
		else {
			if(!nomPlante){
				$('#idNomPlante').addClass('error'); 
				document.getElementById('idNomPlante').setAttribute('placeholder', 'Entrer un nom');
			}
			else { $('#idNomPlante').removeClass('error'); }

			if(!especePlante) {
				$('#idEspecePlante').addClass('error');	
				document.getElementById('idEspecePlante').setAttribute('placeholder', "Entrer l'espèce de la plante");
			}
			else { $('#idEspecePlante').removeClass('error'); }

			if(!frequenceArrosagePlante){
				$('#idFrequenceArrosagePlante').addClass('error'); 
				document.getElementById('idFrequenceArrosagePlante').setAttribute('placeholder', "Fréquence d'arrosage (jours)");
			}
			else { $('#idFrequenceArrosagePlante').removeClass('error'); }

			if(!qteEauArrosage){
				$('#idQteEauArrosage').addClass('error'); 
				document.getElementById('idQteEauArrosage').setAttribute('placeholder', "Quantité d'eau d'arrosage (cl)");
			}
			else { $('#idQteEauArrosage').removeClass('error'); }

			if(!tofPlante){
				$('#idPromoUploadTof').addClass('error');
				alert("Veuillez vérifier l'image de la plante");
			}
			else { $('#idPromoUploadTof').removeClass('error'); }

			if(dteAchatPlante.getTime() >= dte.getTime()){
				$('#idDateAchatPlante').addClass('error');
				alert("Veuillez vérifier la date d'achat de la plante SVP");
			}	
			else { $('#idDateAchatPlante').removeClass('error'); }	
		}
	},
	'click .js-new-plante-confirm' : function(event, instance){
		event.preventDefault();
		let newPlante = Session.get('newPlante');
		Meteor.call('creationPlante', newPlante, function(err, result){
			if (err) {
				Session.set('objImg', '');
				$('#idNomPlante').addClass('error');
				document.getElementById('idNomPlante').setAttribute('placeholder', $('#idNomPlante').val());
				$('#idEspecePlante').addClass('error');
				document.getElementById('idEspecePlante').setAttribute('placeholder', $('#idEspecePlante').val());
				$('#idFrequenceArrosagePlante').addClass('error');
				document.getElementById('idFrequenceArrosagePlante').setAttribute('placeholder', $('#idFrequenceArrosagePlante').val());
				$('#idQteEauArrosage').addClass('error');
				document.getElementById('idQteEauArrosage').setAttribute('placeholder', $('#idQteEauArrosage').val());
				$("#idDateAchatPlante").addClass('error');
				document.getElementById('idDateAchatPlante').setAttribute('placeholder', $('#idDateAchatPlante').val());
			}
			else {
				if (result === 'sent') {
					$('#idNomPlante').val('');
					$('#idEspecePlante').val('');
					$('#idFrequenceArrosagePlante').val('');
					$('#idQteEauArrosage').val('');
					$('#idDateAchatPlante').val('');
					Session.set('objImg', '');
					alert('Plante créée avec succès'); 
				}
				else {
					const rlength = result.length;
					for (var i = 0; i < rlength; i++) {
						switch (result[i].name){
							case 'nomPlante' : 
								$('#idNomPlante').addClass('error'); 
								$('#idNomPlante').val(''); 
								document.getElementById('idNomPlante').setAttribute('placeholder', $('#idNomPlante').val());
								break;
							case 'especePlante' : 
								$('#idEspecePlante').addClass('error');	
								$('#idEspecePlante').val(''); 
								document.getElementById('idEspecePlante').setAttribute('placeholder', $('#idEspecePlante').val());
								break;
							case 'frequenceArrosagePlante' : 
								$('#idFrequenceArrosagePlante').addClass('error'); 
								$('#idFrequenceArrosagePlante').val(''); 
								document.getElementById('idFrequenceArrosagePlante').setAttribute('placeholder', $('#idFrequenceArrosagePlante').val());
								break;
							case 'qteEauArrosage' : 
								$('#idQteEauArrosage').addClass('error');
								$('#idQteEauArrosage').val(''); 
								document.getElementById('idQteEauArrosage').setAttribute('placeholder', $('#idQteEauArrosage').val());
								break;
							case 'dateAchatPlante' : 
								$('#idDateAchatPlante').addClass('error');
								$('#idDateAchatPlante').val(''); 
								document.getElementById('idDateAchatPlante').setAttribute('placeholder', $('#idDateAchatPlante').val());
								break;										
							default :
								$('#idNomPlante').addClass('error');
								$('#idEspecePlante').addClass('error');
								$('#idFrequenceArrosagePlante').addClass('error');
								$('#idQteEauArrosage').addClass('error');
								$('#idDateAchatPlante').addClass('error');
						}
					}
				}
			}								
		});
		$('#idModalAjoutPlante').modal('hide');
	},
});

Template.tmplteChaquePlante.events({
	'click .js-modif-plante' : function(event, instance){
		event.preventDefault();
		Modal.show('tmplteModalChaquePlante', instance.data);
	}
});	

Template.tmplteModalChaquePlante.events({
	'click .js-btn-modifier' : function(event, instance){
		event.preventDefault();
		alert('Pas possible de modifier pour le moment !');
	},
	'click .js-btn-supprimer' : function(event, instance){
		event.preventDefault();
		alert('Pas possible de supprimer pour le moment !');
	},
	'click .js-btn-arroser' : function(event, instance){
		event.preventDefault();
		const dte = new Date();	
		const dateArrosage = laDate(dte);
		const newArrosage = {
			idPlante : instance.data.plante._id,
			nomPlante : instance.data.plante.nomPlante,
			especePlante : instance.data.plante.especePlante,
			dateArrosagePlante : dte,
			dateArrosageTime : dte.getTime(),
			dateArrosage : dateArrosage,
			planteOwner : Meteor.userId()
		}
		Meteor.call('arrosage', newArrosage, function(err, result){
			if (err || result !== 'OK') { alert('Une erreur est survenue, veuillez réessayer'); }
			else { 
				Meteor.call('modifPlante', newArrosage, function(err, result){
					if (err || result !== 'OK') { alert('Une erreur est survenue, veuillez réessayer'); }
					else { 
						alert('Arrosage noté avec succès'); 
						$('#idModalChaquePlante').modal('hide');
					}
				});
			}
		});
	},
	'click .js-btn-historiqArrosage' : function(event, instance){
		event.preventDefault();
		$('#idDivArrosages').removeClass('non');
		$('#idDivArrosages').addClass('oui');
		Session.set('idPlante', instance.data.plante._id);
		$('#idModalChaquePlante').animate({
			scrollTop : 0
		}, 0);
	},
});

Template.tmplteMesPlantes.helpers({
	lesPlantes : function(){ return Plantes.find({planteOwner : Meteor.userId()}, {sort : {nomPlante : 1}}); },
	qtePlantes : function(){ return Plantes.find({planteOwner : Meteor.userId()}).count(); },
});

Template.tmplteModalChaquePlante.helpers({
	lesArrosages : function(){ return Arrosages.find({idPlante : Session.get('idPlante')}); }
});

Template.tmplteMesArrosages.helpers({
	lesArrosages : function(){ return Arrosages.find({planteOwner : Meteor.userId()}, {sort : {dateArrosageTime : -1}}); }
});

