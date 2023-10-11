window.onload = function () {

  var removeCartItemButtons = document.getElementsByClassName('btn-danger remove-btn');
  var productRows = document.getElementsByClassName('products');
  var priceElements = document.getElementsByClassName('prices');
  //var total = document.getElementById("total");
  var quantityElements = document.getElementsByClassName('qt-product');
  var totalElement = document.getElementById("total");
  let cartContent = document.getElementById("cart-content");
  //empêcher que quantité arrive en dessous de 1 (event sur qt?)



  //Affichage total
 // updateCartTotal();
  /*prices = priceElements.map(function (elem) {elem.innerText.replace('€', ''); parseFloat(elem.innerText)});

  priceElements.reduce(function (prev, next) {
    return prev + next;
  }, 0); */

  function setLSContent(lsContent) {
    localStorage.setItem("products", JSON.stringify(lsContent));
  }

  function getLSContent() {
    // get contents from local storage.
    // if nothing is there, create an empty array
    const lsContent = JSON.parse(localStorage.getItem("products")) || [];
    return lsContent;
  }

  /* Récupérer produits du lsContent et les afficher dans le panier */

  function displayProducts() {
    let lsContent = getLSContent();
    let productsTextCode = "";
    console.log("lscontent displayProd", lsContent);
    if (lsContent !== null) {
      for (let product of lsContent) {
        productsTextCode += `
          <tr class="products">
          <td><img src="${product.image}" alt="${product.name
          }"></td>
          <td>
            ${product.name}
          </td>
          <td><span class="prices">${product.price}</span>€</td>
          <td><input type="number" class="qt-product" style="width:20px" value=1 /></td>
          <td><button class="btn-danger remove-btn" data-id="${product.id}">Retirer</button></td>          
          </tr>
        `;
      }
    } else {
      // if no content is in local storage, alert user
      productsTextCode = "Your cart is empty.";
    }
    // add markup to DOM
    cartContent.querySelector("tbody").innerHTML += productsTextCode;

  }


  //Affichage total
  function updateCartTotal() {
    var productsContainer = document.getElementById(''); //pour acceder aux parents et child si besoin ds un event
    // var productRows = document.getElementsByClassName('products');
    // var priceElements = document.getElementsByClassName('prices');
    // var quantityElements = document.getElementsByClassName('qt-product');
    // var totalElement = document.getElementById("total");
    var total = 0;
    for (var i = 0; i < productRows.length; i++) {
      var price = parseFloat(priceElements[i].innerText.replace('€', ''));
      var quantity = parseInt(quantityElements[i].value);
      total += parseFloat(price * quantity);
    }
    totalElement.innerText = total + '€';

  }

  //Retirer produit du panier
  function removeCartItem(event) {
    var buttonClicked = event.target;
    console.log(`clické ${event.target.parentElement}`);
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }



  /* Evenements */
//Declenche problème : plus aucun évènement ne fonctionne ; a corriger

  // Page load:

  if (document.readyState !== 'loading') {
    displayProducts();
    updateCartTotal();
  } 


  /*document.addEventListener("DOMContentLoaded", function (e) {
    // display list of products in cart, if any, on page load
    alert("Test");
    displayProducts();
    updateCartTotal();

  });*/


  //Retirer produit du panier et update total
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];  //creer var button pour chq bouton
    console.log(button);
    button.addEventListener('click', removeCartItem);
  }

  //Changement de quantités et update total
  for (let i = 0; i < quantityElements.length; i++) {
    let quantity = quantityElements[i];
    quantity.addEventListener('change', updateCartTotal);
  }  



}




