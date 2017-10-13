/**
 * WeDeploy Endpoints
 */

var auth = WeDeploy.auth('auth-mychatapp.wedeploy.io');

/**
 * Redirect (if current user exists)
 */

if (auth.currentUser) {document.location.href = './chat.html';}


/**
 * Sign In
 */

var login = document.querySelector('.login');

function signIn() {
	auth.signInWithEmailAndPassword(login.email.value, login.password.value)
		.then(function() {
			login.submit.disabled = true;
			login.submit.innerText = 'Loading...';
			document.location.href = './chat.html';
		})
		.catch(function() {
			login.submit.disabled = false;
			login.submit.innerText = 'Sign In';
			alert('Sign-in failed.');
		});
}