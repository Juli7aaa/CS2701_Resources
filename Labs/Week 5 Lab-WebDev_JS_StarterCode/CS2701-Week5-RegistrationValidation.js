//Let's define some variables to represent the form data
//At the beginning, the form is empty, and therefore, not valid

//Data to send
var formData = {
    username: "",
    email: "",
    password: "",
    buyer: false,
    seller: false
}

//This data will be read but not be sent as part of the form submission
var formValid= false;
var repPassword="";
var tosCheckBox=false;


//Function to read the form
function readForm(){
   formData.username = document.getElementById("name").value.trim();
   formData.email = document.getElementById("email").value.trim();
   formData.password = document.getElementById("password").value.trim();
   repPassword = document.getElementById("repPassword").value.trim();

    //Read the buyer and seller checkboxes 
    formData.buyer = document.getElementById("buyer").checked;
    formData.seller = document.getElementById("seller").checked;

    tosCheckBox = document.getElementById("tos").checked;

}

//Function to validate the form
function validateForm() {
    formValid = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Validate that all required fields are filled
    if (formData.username === "" || formData.email === "" ||
        formData.password === "" || repPassword === "") {
        alert("Please fill in all the required fields.");
        return;
    }

    // Verify that the email address is in a valid format
    if (!mailformat.test(formData.email)) {
        alert("You have entered an invalid email address!");
        return;
    }

    // Perform password strength and matching checks
    if (formData.password.length < 8) {
        alert("Your password must be at least 8 characters long.");
        return;
    }
    if (!/[0-9]/.test(formData.password) || !/[A-Za-z]/.test(formData.password)) {
        alert("Your password must contain at least one letter and one number.");
        return;
    }
    if (formData.password !== repPassword) {
        alert("Your passwords do not match.");
        return;
    }

    // Validate that the required checkboxes are selected
    if (!formData.buyer && !formData.seller) {
        alert("Please choose if you want to buy, sell, or both.");
        return;
    }
    if (!tosCheckBox) {
        alert("You must agree to the Terms of Service.");
        return;
    }

    // If every check passes, the form is valid
    formValid = true;
}

//Function to write the Registration success on the page
function createNewParagraph(content){
    var text = document.createTextNode(content);
    var paragraph = document.createElement("p");
    paragraph.appendChild(text);
    paragraph.style = "white-space: pre;"
    paragraph.id = "hiddenParagraph";

    var element = document.getElementById("hiddenSection");
    var existingParagraph = document.getElementById("hiddenParagraph")
    element.replaceChild(paragraph, existingParagraph);
}

//Function  to submit the form, this should be called by the Register button
//on click
function submitForm(){
    readForm();
    validateForm();
    if (formValid){
        var formText = formData.username +" registered as:\n";
        formText += formData.buyer?"buyer\n":"";
        formText += formData.seller?"seller":"";

        console.log(formText);
        createNewParagraph(formText);
    }
}