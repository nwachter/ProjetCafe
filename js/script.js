  var formOrganiser = document.getElementById('form_organiser');
  var sorIntitule = document.getElementById('sor_intitule');
  var sorLieu = document.getElementById('sor_lieu');
  var sorDate = document.getElementById('sor_date');
  var sorHeure = document.getElementById('sor_heure');
  var sorResume = document.getElementById('sor_resume');
  var btnSubmitSortie = document.getElementById('btn_submitSortie');


  var regexIntitule = /[A-Za-z0-9-_\'.,":@&!?\(\)=%$*;+ ]{8,80}/;
  var regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  var regexResume = /[A-Za-z0-9-_\'.,":@&!?\(\)=%$*,;+ ]{10,2000}/;

  var messageInfo = document.getElementsByClassName('p_info')[0];
  var errorIntitule = document.getElementById('error_intitule');
  var errorLieu = document.getElementById('error_lieu');
  var errorDate = document.getElementById('error_date');
  var errorHeure = document.getElementById('error_heure');
  var errorResume = document.getElementById('error_resume');
  let isValid = true;

  function calculateTotal(prices) {
    // calculate the total price in the cart
    return prices.reduce(function(prev, next) {
      return prev + next;
    }, 0);
  }

window.onload = function() {


 

  sorResume.addEventListener('change', function(event) {
    if(!regexResume.test(sorResume.value)) {
      sorResume.classList.add('invalidInput');
      disableSubmit(true);
      errorResume.innerText = "";
      errorResume.innerText += "Résumé de la sortie trop court ou contenant des caractères invalides";
    }
    else {
      sorResume.classList.remove('invalidInput');
      disableSubmit(false);
      errorResume.innerText = "";
    }

  });

  btnSubmitSortie.addEventListener('click', function(event) {

    if(!regexIntitule.test(sorIntitule.value) || !regexResume.test(sorResume.value) || !regexHeure.test(sorHeure.value) || !regexDate.test(sorDate.value)) {
      event.preventDefault();
    }
    else {
      return true;
    }

  });        

}


function validateForm() {
    let utilPseudo = document.getElementById("util_pseudo");
    let utilPassword = document.getElementById("util_password");
    let utilConfirm = document.getElementById("util_confirm");
    let utilEmail = document.getElementById("util_email");
    let utilPrenom = document.getElementById("util_prenom");
    let utilNom = document.getElementById("util_nom");
    let utilTelephone = document.getElementById("util_telephone");
    let utilNaissance = document.getElementById("util_naissance");
    let utilCivilite = document.querySelectorAll('input[name="util_civilite"]');    

    var regexPseudo = new RegExp('[A-Za-z0-9]{3,16}');
    var regexTelephone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    var regexPassword = new RegExp('[A-Za-z0-9-_!\?\.\$@]{8,20}');
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regexPrenom = new RegExp('[A-Za-z0-9]{3,16}');
    var regexNom = new RegExp('[A-Za-z0-9]{3,16}');


    const btn = document.querySelector('#btn');  
    let pInfo = document.getElementById("p_info");
    isValid = true;

    pInfo.innerHTML = "";

    if (utilPseudo.value == "") {
        pInfo.innerHTML += utilPseudo.value;
        pInfo.innerHTML += "Veuillez entrer un pseudo. <br>";
        isValid = false;
    }
    else if (!regexPseudo.test(utilPseudo.value)) {
      pInfo.innerHTML += "Pseudo invalide <br>";
      isValid = false;
    }
    //Mot de passe
    if (utilPassword.value == "") {
      pInfo.innerHTML += "Veuillez entrer un mot de passe. <br>";
      isValid = false;
    }
    else if (!regexPassword.test(utilPassword.value)) {
      pInfo.innerHTML += "Mot de passe invalide. <br>";
      isValid = false;
    }
    //Confirmation mot de passe
    if (utilConfirm.value == "") {
      pInfo.innerHTML += "Veuillez entrer la confirmation du mot de passe. <br>";
      isValid = false;
    } 
    else if (utilPassword.value != utilConfirm.value) {
      pInfo.innerHTML += "La confirmation ne correspond pas au mot de passe. <br>";
      isValid = false;
    }  
    //Email

    if (utilEmail.value == "") {
        pInfo.innerHTML += utilEmail.value;
        pInfo.innerHTML += "Veuillez entrer une adresse email. <br>";
        isValid = false;
    }
    else if (!utilEmail.value.match(regexEmail)) {
      pInfo.innerHTML += "Email invalide <br>";
      isValid = false;
    } 
    //Prenom
    if (utilPrenom.value == "") {
        pInfo.innerHTML += utilPrenom.value;
        pInfo.innerHTML += "Veuillez entrer un prénom. <br>";
        isValid = false;
    }
    else if (!regexPrenom.test(utilPrenom.value)) {
      pInfo.innerHTML += "Prénom invalide <br>";
      isValid = false;
    }    

    //Nom
    if (utilNom.value == "") {
        pInfo.innerHTML += utilNom.value;
        pInfo.innerHTML += "Veuillez entrer un nom. <br>";
        isValid = false;
    }
    else if (!regexNom.test(utilNom.value)) {
      pInfo.innerHTML += "Nom invalide <br>";
      isValid = false;
    }     
    //Telephone
    if (utilTelephone.value == "") {
        pInfo.innerHTML += utilTelephone.value;
        pInfo.innerHTML += "Veuillez entrer un numéro de téléphone. <br>";
        isValid = false;
    }
    else if (!regexTelephone.test(utilTelephone.value)) {
      pInfo.innerHTML += "Numéro de téléphone invalide <br>";
      isValid = false;
    }

    //Date naissance
    if (utilNaissance.value == "") {
        pInfo.innerHTML += utilNaissance.value;
        pInfo.innerHTML += "Veuillez entrer une date de naissance. <br>";
        isValid = false;
    }


    //Civilite
    let selectedCivilite;
    let isChecked = false;
    for (const radioButton of utilCivilite) {
      if (radioButton.checked) {
        isChecked = true;
        selectedCivilite = radioButton.value;
        break;
        }
      }
    if (!isChecked) {
      pInfo.innerHTML += "Veuillez sélectionner une civilite. <br>";
      isValid = false;
    }
    else {
      window.alert(selectedCivilite);
    }       

    if(!isValid) {
      return false;
    }
    else {
      return true;
    }



}


function validateSortie() {
  isValid = true;

      //Intitule
    if (sorIntitule.value == "" || !regexIntitule.test(sorIntitule.value) ) {
        isValid = false;
    }

    //Lieu
    if (sorLieu.value == "") {
        isValid = false;
    }

    //Date

    if (sorDate.value == "" || !regexDate.test(sorDate.value)) {
        isValid = false;
    }

    //Heure
    if (sorHeure.value == "" || !regexHeure.test(sorHeure.value)) {
        isValid = false;
    }

    //Resume
    if (sorResume.value == "" || !regexResume.test(sorResume.value)) {
        isValid = false;
    }


    if(!isValid) {
      messageInfo.innerText = "Certains champs sont invalides.";
    return false;
    }
    else {
     messageInfo.innerText = "";  
    return true;
    }
   
  
}

function disableSubmit(disabled) {
  console.log(btnSubmitSortie);
  if (disabled) {
    btnSubmitSortie      
      .setAttribute("disabled", true);
  } else {
    btnSubmitSortie
      .removeAttribute("disabled");
  }
}

