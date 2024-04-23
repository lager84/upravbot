export const oidcConfig = {
    authority: "https://upravbot.ru/IDS4",
    client_id: "mvc",
    redirect_uri:  "https://localhost:5001/signin-oidc",
    response_type: "code",
    scope: "api1 openid profile",
    client_secret:"secret",
   // monitorSession: true,
    post_logout_redirect_uri:"https://localhost:5001/signout-callback-oidc",
    loadUserInfo: true
   
  };
  