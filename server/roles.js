Meteor.startup(function() {
	Accounts.config({
		loginExpirationInDays: 0.1
	});
	if(Meteor.users.find().count() < 1) {
		var id = Accounts.createUser({
			email:'fctchewou@yahoo.fr',
			password:'dernierMarche05Compte1.fr'		
		});

	//	Roles.addUsersToRoles(id,'admin');
	}
});