function login(event){
    event.preventDefault();
    loginform = document.getElementById("login");
    let user = loginform.elements["user"].value;
    let pass = loginform.elements["pass"].value;

    if(user == "" || pass==""){
        alert('you need to enter both username and password')
    }else{
        loginform.submit();
    }
}