window.onload = function () {
    let quantityElements = document.getElementsByClassName('card__quantity');
    let addOneQuantityButtons = document.getElementsByClassName('plus-btn');
    let minusOneQuantityButtons = document.getElementsByClassName('minus-btn');
    let cardElements = document.getElementsByClassName('card grid');
    let addToCartButtons = document.getElementsByClassName('card__btn');
    let productsContainer = document.getElementsByClassName('grid-catalogue grid')[0];

    //console.log("LSContent", getLSContent());

    //Ajouter/Retirer quantités  ------------> A SUPPRIMER POSSIBLEMENT
    [...cardElements].forEach(function (cardElement) {

        let minusButton = cardElement.getElementsByClassName('minus-btn')[0];

        let plusButton = cardElement.getElementsByClassName('plus-btn')[0];

        minusButton.addEventListener('click', removeOneQuantity);
        plusButton.addEventListener('click', addOneQuantity);
    });

    function setLSContent(lsContent) {
        localStorage.setItem("products", JSON.stringify(lsContent));
    }

    function getLSContent() {
        // get contents from local storage.
        // if nothing is there, create an empty array
        const lsContent = JSON.parse(localStorage.getItem("products")) || [];
        return lsContent;
    }


    function saveProduct(clickedBtn) {
        // save selected product in local storage 

        // vars
        //const productId = clickedBtn.getAttribute("data-id");
        const card = clickedBtn.parentElement.parentElement;
        const cardInfo = clickedBtn.parentElement;
        const productId = clickedBtn.getAttribute("data-id");
        const prodImage = card.querySelector("img").src;
        const prodName = cardInfo.querySelector("h3").textContent;
        const prodPrice = cardInfo.querySelector(".card__price").textContent;

        let isProductInCart = false;

        // get local storage array
        const lsContent = getLSContent();

        // to avoid user adds the same course twice, check
        // the product is not in LS already before adding it
        lsContent.forEach(function (product) {
            if (product.id === productId) {
                alert("This course is already in your cart.");
                isProductInCart = true;
            }
        });

        // only if the product is not already in the cart,
        // create an object representing selected product info
        // and push it into local storage array
        if (!isProductInCart) {
            lsContent.push({
                id: productId,
                image: prodImage,
                name: prodName,
                price: prodPrice
            });

            // add product into into local storage
            setLSContent(lsContent);

            console.log(lsContent);

        }
    }





    // for (let i = 0; i < cardElements.length; i++) {
    //     let minusButton = minusOneQuantityButtons[i];
    //     //console.log(minusButton);
    //     let plusButton = addOneQuantityButtons[i];

    //     minusButton.addEventListener('click', removeOneQuantity);
    //     plusButton.addEventListener('click', addOneQuantity);
    // }


    function removeOneQuantity(event) {
        let buttonClicked = event.target;
        let quantityElement = buttonClicked.previousSibling;
        let quantity = parseInt(quantityElement.innerText);
        if (quantity == 0) {
            return false;
        }
        else {
            quantity -= 1;
            quantityElement.innerText = quantity;
        }
    }

    function addOneQuantity(event) {
        let buttonClicked = event.target;
        let quantityElement = buttonClicked.nextSibling;
        let quantity = parseInt(quantityElement.innerText);
        quantity += 1;
        quantityElement.innerText = quantity;

    }

    /* Filtres */
    /*class Product {
        constructor(id, name, price, description, quantity = 0) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.quantity = quantity;
            this.price = price;
            this.description = description;
            this.category = category;
        }

        getQuantity() {
            return this.quantity;
        }

        setQuantity(quantity) {
            this.quantity = quantity;
        }
    }

    // Classe Produits 
    products = [];

    for (let i = 0 ; i < cardElements.length ; i++) {
        const card = document.getElementsByClassName('card grid')[0];
        const cardInfo = card.querySelector('card__info');
        const cardButton = card.querySelector('add-to-cart');
        const productId = cardButton.getAttribute("data-id");
        const prodImage = card.querySelector("img").src;
        const prodName = cardInfo.querySelector("h3").textContent;
        const prodDescription = cardInfo.querySelector("card__text");
        const prodPrice = cardInfo.querySelector(".card__price").textContent;
        //const prodCategory = card.querySelector("category_indicator").getAttribute("data-category");
        // Lors de sélection de "Café en grains" ; Si categorie de l'objet = café en grains ;  Afficher produit 
        let product = new Product(productId, prodName, prodImage, prodQuantity, prodPrice, prodDescription, prodCategory);
        
        products.push(product);
    }*/


//Utiliser les objets de l'array pour personnaliser la fonction saveProduct



    //----------------------------------------------------------------------  

    /* Evenements et liaisons */
    // Save product in cart and Local Storage
    // when add to cart button is clicked
    productsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            e.preventDefault();
            const clickedBtn = e.target;
            saveProduct(clickedBtn);
        }
    });

}