var fakeInventory = [
    {
        "ID": 1,
        "Image": "prodFluxCapacitor.jpg",
        "Name": "Flux Capacitor",
        "Desc": "Gotta get back in time!  The flux capacitor, which consists of a rectangular-shaped compartment with three flashing Geissler-style tubes arranged in a 'Y' configuration, is described by Doctor Emmett Brown as 'what makes time travel possible.' The device is the core component of his time machine.",
        "PriceEach": 1985.99
    }, 
    {
        "ID": 2,
        "Image": "prodPortalGun.jpg",
        "Name": "Portal Gun",
        "Desc": "The Portal Gun is a gadget that allows the user to travel between different universes. The Gun was likely created by Rick Sanchez, although it is unknown which Rick, from which universe created it.  If there is any truth to C-137's fabricated origin story, then he may not be the original inventor.",
        "PriceEach": 75.50
    }, 
    {
        "ID": 3,
        "Image": "prodDilithiumCrystals.jpg",
        "Name": "Dilithium Crystals",
        "Desc": "Dilithium is a hypersonic series element, mostly occurring as crystalline mineral. It is used to control the power of the warp drive systems of many starships by regulating the matter/antimatter reaction in a ship's warp core. It controls the amount of power generated in the reaction chamber, channeling the energy released by mutual annihilation into a stream of electro-plasma.",
        "PriceEach": 348.49
    }, 
    {
        "ID": 4,
        "Image": "prodFTLJumpdriveKey.jpg",
        "Name": "Colonial FTL Jumpdrive Key",
        "Desc": "The FTL drive makes interstellar travel possible for ships of the Colonial Fleet, and essentially enable the 'jump drive' systems to 'fold' space, reducing the distance between any two points by creating a wormhole through space that links them together.  The technology is tightly controlled and cannot be operated without the use of a key.",
        "PriceEach": 75.50
    }, 
    {
        "ID": 5,
        "Image": "prodKyberCrystal.jpg",
        "Name": "Kyber Crystals",
        "Desc": "A kyber crystal, simply known as a kyber, also called a lightsaber crystal, the living crystal and known in ancient times as a kaiburr crystal, are rare, Force-attuned crystals that grew in nature and are found on scattered planets across the galaxy. They are used by the Jedi and the Sith in the construction of their lightsabers.",
        "PriceEach": 19.95
    }

];


$(document).ready(function () {
    DrawAllInventoryItems();

    UpdateCartIcon();

    DrawCartItems();
});


///////////////////////////////////////////////
//
// Draw Inventory and Shopping Cart Functions
//

function DrawAllInventoryItems() {
    let thisTemplate = $("#ProductTemplate").html();

    let allProducts = "";

    for (let i = 0; i < fakeInventory.length; i++) {
        let tempOut = thisTemplate;
        tempOut = tempOut.replaceAll("{{Name}}", fakeInventory[i].Name);
        tempOut = tempOut.replaceAll("{{Image}}", fakeInventory[i].Image);
        tempOut = tempOut.replaceAll("{{Desc}}", fakeInventory[i].Desc);
        tempOut = tempOut.replaceAll("{{PriceEach}}", fakeInventory[i].PriceEach.toFixed(2));

        allProducts += tempOut;
    }

    $("#Products").html(allProducts);
}

function DrawCartItems() {
    let thisCart = ezCart.GetCart();
    if (thisCart === null) {
        let emptyCart = "<div id='emptyCart'>Sorry your cart is empty.</div>";
        $("#Cart__AllItems").html(emptyCart);
        return;
    }

    let cartTemplate = $("#CartItemTemplate").html();
    let allItems = "";

    for (let i = 0; i < thisCart.length; i++) {
        let tempOut = cartTemplate;
        tempOut = tempOut.replaceAll("{{Name}}", thisCart[i].Name);

        tempOut = tempOut.replaceAll("{{Qty}}", "<div data-isedit='false' data-name='" + thisCart[i].Name + "' onclick='CartQTYOpenEdit(this)'>" + thisCart[i].Qty + "</div>");

        let thisPrice = thisCart[i].PriceEach * thisCart[i].Qty;
        tempOut = tempOut.replaceAll("{{PriceEach}}", "$" + thisPrice.toFixed(2));

        let thisBGcolor = "";
        if (i % 2 === 0) {
            thisBGcolor = "BGRowHighlight";
        }
        tempOut = tempOut.replaceAll("{{bgcolor}}", thisBGcolor);

        allItems += tempOut;
    }

    let header = cartTemplate;
    header = header.replaceAll("{{Name}}", "Name");
    header = header.replaceAll("{{Qty}}", "Qty");
    header = header.replaceAll("{{PriceEach}}", "Price");
    header = header.replaceAll("{{bgcolor}}", "CartItemsHeader");

    allItems = header + allItems;

    $("#Cart__AllItems").html(allItems);

}


///////////////////////////////////////////////
//
// Change Cart Inventory Functions
//

function CartDemoAdd(name = "", priceEach = 0, qty = 1) {
    var msg = ezCart.AddToCart(name, priceEach, 1);
    alert(msg);

    UpdateCartIcon();
    DrawCartItems();
}

function CartQTYOpenEdit(qtyEl) {

    if (qtyEl.getAttribute("data-isedit") === 'false') {
        qtyEl.setAttribute("data-isedit", 'true'); 
        let origQTY = qtyEl.innerHTML;

        let editBox = $("#CartItemQTYEditorTemplate").html();
        editBox = editBox.replaceAll("{{Name}}", qtyEl.getAttribute("data-name"));
        editBox = editBox.replaceAll("{{Qty}}", origQTY);

        qtyEl.innerHTML = editBox;

        document.getElementById("QtyEditor").focus();
    }

}

function CartQTYCloseEdit(qtyEditor) {
    let origValue = parseInt(qtyEditor.getAttribute("data-origvalue"));
    let newValue = parseInt(qtyEditor.value);
    let name = qtyEditor.getAttribute("data-name");
    let parent = document.getElementById(qtyEditor.id).parentNode;

    //let out = "The CartQTY was blurred. \r\n";
    //out += "origValue=" + origValue + "\r\n";
    //out += "newValue=" + newValue + "\r\n";
    //out += "name=" + name + "\r\n";
    //out += "parent=" + parent.outerHTML + "\r\n";
    //alert(out);

    if ((newValue === origValue) || isNaN(newValue)) {
        parent.setAttribute("data-isedit", 'false'); 
        parent.innerHTML = origValue;
    }

    if (newValue !== origValue) {
        //We actually update the cart 
        let msg = ezCart.UpdateItemQty(name, newValue);
        alert(msg);
        UpdateCartIcon();
        DrawCartItems();
    }

}



///////////////////////////////////////////////
//
// Update Cart Icon and Show/Hide Shopping Cart
//

function UpdateCartIcon() {
    var numOfItems = ezCart.TotalNumItemsInCart();
    $("#CartItemsNumber").html(numOfItems);

    var cartTotal = ezCart.CartTotalPrice();
    $("#CartItemsCost").html("$" + cartTotal.toFixed(2));

    if (numOfItems > 0) {
        $("#ViewCartButtonBlock").removeClass("hidden");
    } else {
        $("#ViewCartButtonBlock").addClass("hidden");
        HideCart();
    }
}


function HideCart() {
    $("#Cart").addClass("hidden");
}

function ShowCart() {
    DrawCartItems();
    $("#Cart").removeClass("hidden");
}

function DeleteCart() {
    let yesNo = confirm("Are you sure you want to delete your cart?\r\n");
    if (yesNo) {
        let msg = ezCart.DeleteCart();
        alert(msg);
        UpdateCartIcon();
        DrawCartItems();
    }
}


///////////////////////////////////////////////
//
// Library Functions
//

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) === "string") ? str2.replace(/\$/g, "$$$$") : str2);
};