/**
 * Auth Endpoints
 */

const auth = WeDeploy.auth('auth-mychatapp.wedeploy.io');
const currentUser = WeDeploy.auth('auth-mychatapp.wedeploy.io').currentUser;

/**
 * Data Endpoints
 */

const data = WeDeploy.data('data-mychatapp.wedeploy.io');
const data_endpoint = 'data-mychatapp.wedeploy.io';