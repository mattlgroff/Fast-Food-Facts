$(document).ready(function(){
  $("#signup").on("click", function(){
    event.PreventDefault();

    let signupObj = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    }

    signup(signupObj);
  })
});

function signup(obj){
  $.ajax({
    type: "POST",
    url: "/signup",
    data: obj,
    dataType: "json",
    success: function(response) {
      console.log("Signed up!");
    }
  });
}