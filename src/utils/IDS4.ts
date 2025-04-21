export const oidcConfig = {
  authority: "https://upravbot.ru/IDS4",
  client_id: "mvc",
  redirect_uri: "https://localhost:5002/",
  response_type: "code",
  scope: "api1 openid profile offline_access", 
  client_secret: "secret",
  //monitorSession: true,
  post_logout_redirect_uri: "https://localhost:5002/signout-callback-oidc",
  loadUserInfo: true,
  onSigninCallback() {
    // You must provide an implementation of onSigninCallback to oidcConfig to remove the payload
    // from the URL upon successful login.
    // Otherwise if you refresh the page and the payload is still there, signinSilent - which handles renewing your token - won't work.

    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
