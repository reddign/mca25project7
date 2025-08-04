function register(event){
    event.preventDefault()
    

    var registerform = document.getElementById("register")
    var victim = registerform.elements["user"].value
    var key = registerform.elements["password"].value
    var email = registerform.elements["email"].value
    let v = 1;
    let k = 0;
    let e = 0;


    if(victim=="" || key==""){
        alert("Fill them in.")
    }if(email.length >=9){
      console.log("valid")
      e = 1;
    }else {
        console.log("Your email is too short")
    }if(email.includes('@')){
        console.log("valid")
        e = 1;
    }else {
        console.log("Your email needs an @")
    }if(email.includes('.')){
        console.log("valid")
        e = 1;
    }else{
        console.log("Your email needs a period")
    }if(key.length >=8){
      console.log("valid")
      k = 1;
    }if(key.includes('1','2','3','4','5','6','7','8','9',)){
        console.log("valid")
        k = 1;
    }else{
        console.log("Your password is too weak, add a number.")
    }if(key.includes('.')){
        console.log("valid");
        k = 1;
    }else{
        console.log("Your password needs a period")
    }

    if (k == 1 && v == 1 && e == 1){
        registerform.submit();
    }

}