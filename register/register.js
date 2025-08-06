function register(event){
    event.preventDefault()
    

    var registerform = document.getElementById("register")
    var victim = registerform.elements["user"].value
    var key = registerform.elements["password"].value
    let v = 1;
    let k = 0;


    if(victim=="" || key==""){
        alert("Fill them in.")
    }
    if(key.includes('1','2','3','4','5','6','7','8','9',)){
        console.log("valid")
        k = 1;
    }else{
        console.log("Your password is too weak, add a number.")
    }

    if (k == 1 && v == 1){
        registerform.submit();
    }

}