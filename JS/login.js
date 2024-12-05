let arrUsers = JSON.parse(localStorage.getItem("users"));

document.getElementById('signUp').addEventListener("click", signUp);
document.getElementById('Login').addEventListener("click", logIn);

window.onload = function () { //ברירת מחדל בטעינת הדף
    document.getElementById("register-form").style.display = 'none';
    const logIn = document.getElementById("log");
    const signUp = document.getElementById("sign");
    logIn.addEventListener("click", () => { hidesTheLoginForm("Login-form", "register-form") });
    signUp.addEventListener("click", () => { hidesTheLoginForm("register-form", "Login-form") });
}

function hidesTheLoginForm(form1, form2) { //פונקציה שמסתירה
    document.getElementById(form1).style.display = 'inline';
    document.getElementById(form2).style.display = 'none';
    document.getElementById("signUpMassage").innerText = "";
    document.getElementById("logInMassage").innerText = "";
}

function logIn(event) { //פונקציה של לוגין
    event.preventDefault();
    let emailLogin = document.getElementById("emaillogin").value;
    let passwordLogin = document.getElementById("passwordlogin").value;
    if (arrUsers.find(element => element.email == emailLogin && element.password === passwordLogin)) {
        window.location.href = 'HTML/game.html';
        return;
    }
    if (arrUsers.find(element => element.email == emailLogin && element.password !== passwordLogin))
        document.getElementById("logInMassage").innerText = `Hi ${arrUsers.find(element => element.email).username} your password is not correct`;
    else
        document.getElementById("logInMassage").innerText = 'User does not exist. Please sign up';
    let newuser = {
        username: nameSignUp,
        email: emailSignUp,
        password: passwordSignUp
    };
}

function signUp(event) { //פונקציה של סיין אפ
    event.preventDefault();
    let nameSignUp = document.getElementById("namesignup").value;
    let emailSignUp = document.getElementById("emailsignup").value;
    let passwordSignUp = document.getElementById("passwordsignup").value;

    let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailSignUp);

    let newuser = {
        username: nameSignUp,
        email: emailSignUp,
        password: passwordSignUp
    };

    if (arrUsers === null)
        arrUsers = [];
    if (validation(nameSignUp, emailSignUp, passwordSignUp, emailValid, arrUsers)) {
        arrUsers.push(newuser);
        localStorage.setItem("users", JSON.stringify(arrUsers));
        window.location.href = 'HTML/game.html';
    }

}

function validation(nameSignUp, emailSignUp, passwordSignUp, emailValid, arrUsers) {
    if (nameSignUp === "" || emailSignUp === "" || passwordSignUp === "") {
        document.getElementById("signUpMassage").innerText = "Please enter your details";
        return false;
    }
    if (!emailValid) {
        document.getElementById("signUpMassage").innerText = "Email is invalid";
        return false;
    }
    if (arrUsers.find(element => element.email === emailSignUp)) {
        document.getElementById("signUpMassage").innerText = "A user with the same email already exists";
        return false;
    }
    return true;
}
//------------------------------
// function currentUser() {
//     let cUser = JSON.stringify(newUser);
//     localStorage.setItem("users", cUser);
// }



