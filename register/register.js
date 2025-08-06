function register(event){
    event.preventDefault()
    

    var registerform = document.getElementById("register")
    var user = registerform.elements["user"].value
    var pass = registerform.elements["password"].value
    let v = 1;
    let k = 0;


    if(user == "" || pass == ""){
        alert('you need to enter both username and password')
    }else if(checkNum(pass)!= true || pass.length<8 || checkLetter(pass)!=true){
        alert('input a valid password (at least one number, at least one upper and lowercase letter, >8 characters.)')
    }else if(checkLetter(pass)==true){
        registerform.submit()
    }
}
    function checkNum(str){
    let nums = ['0','1','2','3','4','5','6','7','8','9']
    for(let i = 0; i<nums.length; i++){
        if(str.includes([i])){
            return true;
        }
    }
}

    function checkLetter(str){
    if (str!== str.toUpperCase() && str!== str.toLowerCase()){
        return true
    }
}
