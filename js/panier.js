window.onload = function () {

  var removeCartItemButtons = document.getElementsByClassName('btn-danger remove-btn');
  var productRows = document.getElementsByClassName('products');
  var priceElements = document.getElementsByClassName('prices');
  //var total = document.getElementById("total");
  var quantityElements = document.getElementsByClassName('qt-product');
  var totalElement = document.getElementById("total");
  let subTotalElement = document.getElementById("subtotal");
  let cartContent = document.getElementById("cart-content");
  const checkoutButton = document.getElementById("checkout-btn");
  const clearCartButton = document.getElementById("clear-btn");
  const errorMessageElements = document.getElementsByClassName('error-message');
  const formCoords = document.getElementById("form-coords");
  const resetButton = document.getElementById('btn_reset');
  //empêcher que quantité arrive en dessous de 1 (event sur qt?)

  console.log(getLSContent("products"), getSSContent("userInfo"));



  function setLSContent(lsContent, key = "products") {
    localStorage.setItem(key, JSON.stringify(lsContent));
  }

  function getLSContent(key = "products") {
    // get contents from local storage.
    // if nothing is there, create an empty array
    const lsContent = JSON.parse(localStorage.getItem(key)) || [];
    return lsContent;
  }

  function setSSContent(ssContent, key = "userInfo") {
    sessionStorage.setItem(key, JSON.stringify(ssContent));
  }

  function getSSContent(key = "userInfo") {
    const ssContent = JSON.parse(sessionStorage.getItem(key)) || [];
    return ssContent;
  }

  /* Récupérer produits du lsContent et les afficher dans le panier */

  function displayProducts() {
    let lsContent = getLSContent();
    let productsTextCode = "";
    console.log("lsContent", lsContent !== null && (localStorage.getItem("products") != null));
    if (lsContent !== null && (localStorage.getItem("products") != null)) {
      for (let product of lsContent) {
        productsTextCode += `
          <tr class="products">
          <td><img src="${product.image}" alt="${product.name
          }"></td>
          <td class="name-product">
            ${product.name}
          </td>
          <td><span class="prices">${product.price}</span>€</td>
          <td><input type="number" class="qt-product" min="1" style="width:20px" value=${product.quantity} /></td>
          <td><button class="btn-danger remove-btn" data-id="${product.id}">Retirer</button></td>          
          </tr>
        `;
      }
      // add markup to DOM
      cartContent.querySelector("tbody").innerHTML += productsTextCode;
    }
    else {
      // if no content is in local storage, alert user
      productsTextCode = "Votre panier est vide.";
      cartContent.innerText = productsTextCode;
    }



  }

  function clearCart(e) {
    e.preventDefault();
    const tBody = cartContent.querySelector('tbody');
    if (tBody != null) {
      tBody.innerText = "";
      localStorage.clear();
      displayProducts();
    } 
  }


  //Affichage total
  function updateCartTotal() {
    const deliveryElement = document.getElementById("delivery");
    var productsContainer = document.getElementById(''); //pour acceder aux parents et child si besoin ds un event
    // var productRows = document.getElementsByClassName('products');
    // var priceElements = document.getElementsByClassName('prices');
    // var quantityElements = document.getElementsByClassName('qt-product');
    // var totalElement = document.getElementById("total");
    let subTotal = 0;
    for (var i = 0; i < productRows.length; i++) {
      var price = parseFloat(priceElements[i].innerText.replace('€', ''));    //remplacer par formatPrice si il marche
      price = parseFloat(priceElements[i].innerText.replace(',', '.'));
      var quantity = parseInt(quantityElements[i].value);
      subTotal += parseFloat(price * quantity);
    }
    ////Soustotal
    subTotal = parseFloat(subTotal.toFixed(2));
    subTotalElement.innerText = subTotal + '€';
    ////Livraison
    let delivery = parseFloat(formatPrice(deliveryElement));
    deliveryElement.innerText = delivery + '€';

    let total = subTotal + delivery;
    totalElement.innerText = total.toFixed(2) + '€';

  }

  function formatPrice(priceElement) { //prend un node en paramètre
    let formattedPrice = parseFloat(priceElement.innerText.replace('€', ''));
    formattedPrice = parseFloat(priceElement.innerText.replace(',', '.'));
    return formattedPrice.toFixed(2);   //retourne un string qui est un nombre à 2 dixièmes
  }

  //Retirer produit du panier
  function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    let productId = buttonClicked.getAttribute('data-id');

    removeProduct(productId);
    updateCartTotal();
  }

  function removeProduct(productId) {
    // remove product from cart (and from local storage)

    // retrieve list of products from LS
    const lsContent = getLSContent();

    // get the index of the product item to remove
    // inside the local storage content array
    let productIndex;
    lsContent.forEach(function (product, i) {
      if (product.id === productId) {
        productIndex = i;
      }
    });

    // modify the items in local storage array
    // to remove the selected product item

    lsContent.splice(productIndex, 1);
    // update local storage content
    setLSContent(lsContent);

  }

  //Effacer/Reset Informations enregistrées par l'utilisateur
  function resetSavedUserInfo(e) {
    errorMessageElements[0].style.display = "none";
    errorMessageElements.innerText = "";
    let ssContent = getSSContent();
    let isEmpty = (ssContent["userInfo"]);
    console.log(ssContent["userInfo"], sessionStorage.getItem("userInfo"));
    if (!(ssContent["userInfo"] !== undefined) && !(sessionStorage.getItem("userInfo") != null)) {
      e.preventDefault();
      return false;
    }
    else {  // si storage contient infos
      sessionStorage.removeItem("userInfo");
      errorMessageElements[0].style.display = "inline-block";
      errorMessageElements[0].innerText = "Vos coordonnées ont été supprimées.";
    }
  }

  function saveClientInfo(e) {
    e.preventDefault();
    errorMessageElements[0].style.display = "none";
    errorMessageElements[0].innerText = "";
    
    const inputElements = formCoords.querySelectorAll("input");
    errorMessageElements[0].style.display = "none";

    //Si informations déjà enregistrées
    let ssContent = getSSContent("userInfo");
    if ((ssContent["userInfo"] !== null) && (sessionStorage.getItem("userInfo") != null)) {
      errorMessageElements[0].innerText = "Informations déjà enregistrées. Cliquer sur Reset pour les effacer.";
      errorMessageElements[0].style.display = 'inline-block';
      return false;
    }

    //Enregistrement des informations
    let isEmpty;
    let userInfoArray = [];

    //Dans SortirAPau, utiliser le script pour contrôle des coordonnées __________________________ A Faire
    //
    for (let i = 0; i < inputElements.length; i++) {
      if (inputElements[i].value == "") {
        isEmpty = true;
        errorMessageElements.display = "inline-block";
        console.log("La coordonnée d'index " + i + " ; valeur : inputElements[i]+" + " est fausse");
        break;
      }
      else {
        isEmpty = false;
        //Enregistrer coordonnées
        userInfoArray.push(inputElements[i].value);
      }
    }

    if (!isEmpty) {
      let userInfo = {
        prenom: inputElements[0].value,
        nom: inputElements[1].value,
        adresse: inputElements[2].value,
        ville: inputElements[3].value,
        departement: inputElements[4].value,
        telephone: inputElements[5].value,
        mail: inputElements[6].value,
      };
      errorMessageElements[0].style.display = 'inline-block';
      errorMessageElements[0].innerText = "Vos coordonnées sont enregistrées";
      setSSContent(userInfo, "userInfo");
      console.log(getSSContent("userInfo"));
    }
    else {
      errorMessageElements[0].style.display = 'inline-block';
      errorMessageElements[0].innerText = "*Veuillez entrer vos coordonnées.";

    }

    //Vider le form
    /*inputElements.forEach(function (element, i) {
      element.value = "";
    });*/
  }


  //A Appeler quand clic sur Paiement (après e.preventDefault)
  function saveFinalCart(e) {
    if (sessionStorage.getItem("userInfo") == null) {
      alert("Veuillez entrer vos coordonnées d'expédition");
      return false;
    }
    e.preventDefault;
    let lsContent = getLSContent();
    for (let i = 0; i < productRows.length; i++) {
      const productRow = productRows[i];
      const btnRemove = productRow.querySelector('.btn-danger.remove-btn');
      const productRowId = btnRemove.getAttribute('data-id');
      const productRowQuantity = productRow.querySelector('.qt-product').value;
      const productRowImage = productRow.getElementsByTagName('img')[0].src;
      const productRowName = productRow.querySelector('.name-product').textContent;
      const productRowPrice = productRow.querySelector('.prices').textContent;

      //Actualiser page si quantité < 1
      if (productRowQuantity < 1) {
        //actualiser 
        location.reload();
      }

      //Update du localStorage avec les bonnes valeurs de quantité pour la page suivante (Paiements)
      lsContent.forEach((product, i) => {
        console.log(product.id, productRowId, i);
        if (productRowId === product.id) {
          if (productRowQuantity !== product.quantity) {
            //on enleve l'ancienne entrée lsContent avec mauvaise quantité
            lsContent.splice(i, 1);
            //on met une nouvelle entrée du même produit
            lsContent.push({
              id: productRowId,
              image: productRowImage,
              name: productRowName,
              price: productRowPrice,
              quantity: productRowQuantity
            });
            // update local storage content avec la nouvelle entree avec bonne quantité
            setLSContent(lsContent);
          }
        }
      });
    }
    //Insérer TotalPanier dans LSContent 
    let lsContent2 = getLSContent("total");
    const cartTotal = parseFloat(totalElement.innerText);
    setLSContent(cartTotal, "total");

    //Refresh panier avec panier final (a supprimer quand le lien du bouton ira a Paiements)
    cartContent.querySelector('tbody').innerHTML = "";
    displayProducts();
    
    //Redirection vers Paiement , puis Paiement ----------------------------------- A FAIIIIIIIIIIIIIIIIIIIIIIIIRE
    window.location.href = "./paiement.html";

  }


  function negativeQuantityBlocker(e) {
    e.preventDefault;
    if (e.target.value <= 1) {
      e.target.value = 1;
      alert('Pas de quantités négatives (afficher en haut du cart en *');
    }
    //ou onchange si value <= 1 mettre value à 1
  }

  /******** EVENEMENTS / ETC. *********************************************************/
  //Declenche problème : plus aucun évènement ne fonctionne ; a corriger
  // Page load:

  if (document.readyState !== 'loading') {
    displayProducts();
    updateCartTotal();
  }

  checkoutButton.addEventListener('click', saveFinalCart);
  clearCartButton.addEventListener('click', clearCart);
  formCoords.addEventListener('submit', saveClientInfo);
  resetButton.addEventListener('click', resetSavedUserInfo);


  //Retirer produit du panier et update total
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];  //creer var button pour chq bouton
    button.addEventListener('click', removeCartItem);
  }

  //Changement de quantités et update total
  for (let i = 0; i < quantityElements.length; i++) {
    let quantity = quantityElements[i];
    quantity.addEventListener('change', updateCartTotal);
  }

  for (let i = 0; i < quantityElements.length; i++) {
    let quantityElement = quantityElements[i];
    quantityElement.addEventListener('blur', negativeQuantityBlocker);
  }


}




