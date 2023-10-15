window.onload = function () {
    const mainContainer = document.getElementById('main-payment');
    const userInfoContainer = document.getElementById('user-info');
    const productList = document.getElementById('product-list');

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

    //Vérification de l'existence et non-nullité des produits, (sous-total, livraison, total), et infoUtil
    //Redirection vers panier si pas d'infos
    function checkInfo() {
    
        const lsProducts = getLSContent(); const lsTotal = getLSContent("total");
        const userInfo = getSSContent();
        const productsExists = (lsProducts !== null) && (localStorage.getItem("products") != null);
        const totalExists = (lsTotal !== null) && (localStorage.getItem("total") != null);
        const userInfoExists = (userInfo !== null) && (sessionStorage.getItem("userInfo") != null);


        if (!productsExists || !totalExists || !userInfoExists) {
            mainContainer.innerHTML = "Erreur. Retour au panier...";
            alert("Erreur. Vous allez être redirigé vers le panier");
            //window.location.replace("./panier.html");
        } else if (productsExists && totalExists && userInfoExists) {
            //displayUserInfo();
            //displayProducts();
            //displayTotal();
            console.log("Informations validées", );
            return true;
        }

    }

    //Affichage des infos



    //EVENEMENTS - ETC _________________________________________________________________________________________

    if (document.readyState != 'loading') {
        console.log("Loading");
        checkInfo();            //Contient displayProducts, displayUserInfo(), displayTotal (sub, livr, total)
        
      }

      console.log(sessionStorage.getItem("userInfo") == null);

}
