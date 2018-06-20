let validForm = true;
let captchaFilled = false;

let validateForm = () => {
  console.log("Test");
  const name = $("#name").val();
  const email = $("#email").val();
  const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailtitle = $("#email-title").val();
  const emailbody = $("#body").val();
  try {
      if(name === ""){
        validForm = false;
      }
       if(!(emailregex.test(email))){
         console.log(email);
        validForm = false;
      }
      if(emailtitle === ""){
        validForm = false;
      }
      if(emailbody === ""){
        validForm = false;
      }
    }
  catch(e){
    console.log(e);
    validForm = false;
    }

  if(validForm && captchaFilled) {
    console.log("Form filled out successfully");
    return true;
  }
  else {
    alert("Looks like you didn't complete the form correctly...");
    console.log(validForm);
    console.log(captchaFilled);
    validForm = true;
      return false;
    }
}

var correctCaptcha = function(response) {
    captchaFilled = true;
}
