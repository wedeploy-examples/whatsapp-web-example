var auth = WeDeploy.auth('auth-mychatapp.wedeploy.io');


/* Redirect if user is signed in */

if (auth.currentUser) {document.location.href = '/chat/';}


/* Create User Method */

var login = document.querySelector('.login');

function signIn() {
	auth.signInWithEmailAndPassword(login.email.value, login.password.value)
		.then(function() {
			login.reset();
			document.location.href = '/chat/';
		})
		.catch(function(err) {
			alert('Sign-in failed.');
			signIn.reset();
			console.log(err);
		});
}