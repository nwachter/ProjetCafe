window.onload = function () {

  var removeCartItemButtons = document.getElementsByClassName('btn-danger remove-btn');
  var productRows = document.getElementsByClassName('products');
  var priceElements = document.getElementsByClassName('prices');
  //var total = document.getElementById("total");
  var quantityElements = document.getElementsByClassName('qt-product');
  var totalElement = document.getElementById("total");
  let cartContent = document.getElementById("cart-content");
  const checkoutButton = document.getElementById("checkout-btn");
  //empêcher que quantité arrive en dessous de 1 (event sur qt?)

  console.log(getLSContent());

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
    if (lsContent !== null) {
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
      price = parseFloat(priceElements[i].innerText.replace(',', '.'));
      var quantity = parseInt(quantityElements[i].value);
      total += parseFloat(price * quantity);
    }
    totalElement.innerText = total.toFixed(2) + '€';

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

  //A Appeler quand clic sur Paiement (après e.preventDefault)
  function saveFinalCart(e) {
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

      console.log(productRowImage);


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

    //Insérer TotalPanier dans LSContent ou similaire-___________________________________________!!!!!!!!!!!!!!!!!SUITE

    //Refresh panier avec panier final (a supprimer quand le lien du bouton ira a Paiements)
    cartContent.querySelector('tbody').innerHTML = "";
    displayProducts();
    console.log(lsContent);
  }

  function negativeQuantityBlocker(e) {
    e.preventDefault;
    if(e.target.value <= 1) {
      e.target.value = 1;
      alert('Pas de quantités négatives (afficher en haut du cart en *');
    }
    //ou onchange si value <= 1 mettre value à 1
  }

  /* Evenements */
  //Declenche problème : plus aucun évènement ne fonctionne ; a corriger

  // Page load:

  if (document.readyState !== 'loading') {
    displayProducts();
    updateCartTotal();
  }

  checkoutButton.addEventListener('click', saveFinalCart);
 


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

  for (let i = 0 ; i< quantityElements.length ; i++) {
    let quantityElement = quantityElements[i];
    quantityElement.addEventListener('blur', negativeQuantityBlocker);
  }


}




