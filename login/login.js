function login(event){
    event.preventDefault();
    loginform = document.getElementById("login");
    let user = loginform.elements["user"].value;
    let pass = loginform.elements["password"].value;

    if(user == "" || pass==""){
        alert('You need to enter both username and password')
    }else{
        loginform.submit();
    }
}