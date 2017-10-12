var auth = WeDeploy.auth('auth-mychatapp.wedeploy.io');
var data = WeDeploy.data('data-mychatapp.wedeploy.io');


/* Redirect if user is signed in */

if (auth.currentUser) {document.location.href = '../chat/index.html';}


/* Create User Method */

var create = document.querySelector('.create');
var button = document.querySelector('button');

function userCreate() {
	auth.createUser({
		name: create.name.value,
		email: create.email.value,
		password: create.password.value,
		color: 'color-' + Math.floor(Math.random() * 19)
	})
	.then(function() {
		button.disabled = true;
		button.innerText = 'Loading...';

		auth
			.signInWithEmailAndPassword(create.email.value, create.password.value)
			.then(function() {
				document.location.href = '../chat/index.html';
			})
			.catch(function(err) {
				alert('Sign-in failed.');
				console.log(err)
			});
	})
	.catch(function(err) {
		button.disabled = false;
		button.innerText = 'Create Account';
		alert('Sign-up failed.');
		console.log(err);
	})
};