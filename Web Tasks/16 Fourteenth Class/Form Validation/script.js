const validationResult = document.getElementById("validationResult");
const form = document.querySelector("#form");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const phoneNumber = document.querySelector("#phoneNumber");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log("Values :", form.elements);
    // console.log("Values :", form.elements["email"].value);

    const nameValue = fullName.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const phoneNumberValue = phoneNumber.value;
    
    if (nameValue.trim() === '' || emailValue.trim() === '' || passwordValue.trim() === '' || phoneNumberValue.trim() === '') {
        validationResult.textContent = "All Fields are Required";
        validationResult.style.color = "red";
    }
    else {
        validationResult.textContent = "Values are shown in Console"
        validationResult.style.color = "green";
        console.log(`Values are : 
            Name : ${nameValue}
            Email : ${emailValue}
            Password : ${passwordValue}
            Phone No. : ${phoneNumberValue}`
        );
    }
    
})