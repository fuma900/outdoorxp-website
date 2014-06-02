var user = {};
var header = {};
var loggedIn = false;
var username = null;

function init() {
  header = {
    app_id : "3wJvlKuzhCx3AR874cdD2kpOU9UQHkUSLcRHOaUV", // <-- enter your Application Id here
    rest_key : "28bvgcs9qBIZtaRXwHRmfnzFORthaK0izz0393Ur" // <--enter your REST API Key here
  };
  if ($.cookie('sessionToken')){
    header.session_token = $.cookie('sessionToken');
  }
  $.parse.init(header);
  checkUser();
  (loggedIn)?me():{};
}

function login() {
  u = $('#username').val();
  p = $('#password').val();
  $.parse.login(u, p, function(r){
    user = r;
    $.cookie('sessionToken', r.sessionToken, { expires: 1, path: '/' });
    $.cookie('username', r.username, { expires: 1, path: '/' });
    location.replace('/');
  });
}

function checkUser() {
    if ($.cookie('sessionToken')){
      loggedIn = true;
      username = $.cookie('username');
    } else if (!$.cookie('sessionToken') && loggedIn === true){
      loggedIn = false;
      username = null;
      logout();
    } else {
      loggedIn = false;
      username = null;
    }
}

function me() {
  $.parse.me(function(r){
    // console.log(r);
    user = r;
  }, function(e){
    user = {};
    loggedIn = false;
  });
}

function logout() {
  $.removeCookie('sessionToken', { path: '/' });
  $.removeCookie('username', { path: '/' });
  location.replace('/');
}
init();
