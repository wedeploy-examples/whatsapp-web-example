/**
 * WeDeploy Endpoints
 */

var auth = WeDeploy.auth('auth-mychatapp.wedeploy.io');
var data = WeDeploy.data('data-mychatapp.wedeploy.io');


/**
 * Redirect (if current user exists)
 */

if (auth.currentUser) {document.location.href = '../chat/index.html';}


/**
 * Create user
 */

var create = document.querySelector('.create');

function userCreate() {
	auth.createUser({
		name: create.name.value,
		email: create.email.value,
		password: create.password.value,
		color: 'color-' + Math.floor(Math.random() * 19)
	})
	.then(function() {
		create.submit.disabled = true;
		create.submit.innerText = 'Loading...';

		auth
			.signInWithEmailAndPassword(create.email.value, create.password.value)
			.then(function() {
				document.location.href = '../chat/index.html';
			})
			.catch(function() {
				alert('Sign-in failed.');
			});
	})
	.catch(function() {
		create.submit.disabled = false;
		create.submit.innerText = 'Create Account';
		alert('Sign-up failed.');
	})
};