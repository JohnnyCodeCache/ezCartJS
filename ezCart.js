var ezCart = (function () {
    'use strict';

    var _defaultSettings = {
        CartName: "ezTestCart",
        StorageMethod: "session"
    };

    ///////////////////////////////////////////////
    //
    // Public Function
    //

    function AddToCart(name, priceEach, qty) {
        let result = "";

        if ((name===null) || (name === "")) {
            result += "Sorry, item name cannot be blank.\n";
            return result;
        }

        // check inputs
        if (qty === undefined) {
            qty = 1;
        }
        if (isNaN(priceEach)) {
            priceEach = 0;
        }
        if ((priceEach===undefined) || (priceEach < 0)) {
            priceEach = 0;
        }

        //create item to add to cart
        let thisCartItem = {};
        thisCartItem.Name = name;
        thisCartItem.PriceEach = priceEach;
        thisCartItem.Qty = qty;

        let thisCart = _readCart();
        if (thisCart === null) {
            // shopping cart doesn't exist, make a new one
            let thisNewCart = [];
            thisNewCart.push(thisCartItem);

            _writeCart(thisNewCart);
            result += "Cart created. New item added.\n";
        } else {
            // shopping cart exists, see if item is in it
            let foundIndex = thisCart.findIndex(x => x.Name === thisCartItem.Name);

            if (foundIndex === -1) {
                // item is NOT in cart, add it and write
                thisCart.push(thisCartItem);
                _writeCart(thisCart);
                result += "New item added to cart.\n";
            } else {
                //item IS in cart, update quantity and write it
                let currentQty = thisCart[foundIndex].Qty;

                let newQty = currentQty + qty;

                // we dont ever want to have negative items in cart
                if (newQty < 0) {
                    newQty = 0;
                }
                thisCart[foundIndex].Qty = newQty;
                _writeCart(thisCart);
                result += "Quantity updated in cart.\n";
            }
        }

        return result;
         
    }// END function AddToCart

    function UpdateItemQty(name, qty) {
        let result = "";
        
        // check inputs
        if ((name === null) || (name === "")) {
            result += "Sorry, item name cannot be blank.\n";
            return result;
        }
        
        if ((qty === undefined) || isNaN(qty) || qty===null) {
            result += "Sorry, quantity must have a value.\n";
            return result;
        }

        let thisCart = _readCart();
        if (thisCart === null) {
            result += "No action taken. Cart doesn't exist.\n";
            return result;
        }

        let foundIndex = thisCart.findIndex(x => x.Name === name);

        if (foundIndex === -1) {
            result += "No action taken. Cart exists but item wasn't found.\n";
        } else {
            if (qty === 0) {
                thisCart.splice(foundIndex, 1);
                _writeCart(thisCart);
                result += "Item deleted from cart.\n";
            } else {
                thisCart[foundIndex].Qty = qty;
                _writeCart(thisCart);
                result += "Quantity updated in cart.\n";
            }

        }
        return result;
    }

    function RemoveItemFromCart(name) {
        let result = "";
        let thisCart = _readCart();

        if (thisCart === null) {
            result += "No action taken. Cart doesn't exist.\n";
        } else {
            let foundIndex = thisCart.findIndex(x => x.Name === name);
            if (foundIndex === -1) {
                result += "No action taken. Cart exists but item wasn't found.\n";
            } else {
                thisCart.splice(foundIndex, 1);
                _writeCart(thisCart);
                result += "Success!\n";
            }
        }

        return result;

    }// END function RemoveItemFromCart

    function GetCart() {
        let thisCart = _readCart();
        return thisCart;
    }

    function CartTotalPrice() {
        let thisCart = _readCart(); 
        let cartTotal = 0;

        if (thisCart !== null) {
            thisCart.forEach((e) => {
                let thisSubtotal = e.PriceEach * e.Qty;
                cartTotal += thisSubtotal;
            });
        }

        return cartTotal;
    }

    function TotalNumItemsInCart() {
        let thisCart = _readCart();
        let cartItemsTotal = 0;

        if (thisCart !== null) {
            thisCart.forEach((e) => {
                cartItemsTotal += e.Qty;
            });
        }

        return cartItemsTotal;
    }

    function CartItemsList() {
        let thisCart = _readCart();
        let itemsListOut = [];

        if (thisCart !== null) {
            thisCart.forEach((e) => {
                itemsListOut.push(e.Name);
            });
        }

        return itemsListOut;
    }

    function DeleteCart() {
        let result = "";
        if (_defaultSettings.StorageMethod === "local") {
            localStorage.clear();
            result += "Local storage cleared.\n";
        }
        if (_defaultSettings.StorageMethod === "session") {
            sessionStorage.clear();
            result += "Session storage cleared.\n";
        }
        result += "Cart deleted.\n";
        return result;
    }

    //
    ///////////////////////////////////////////////

    ///////////////////////////////////////////////
    //
    // Private Functions
    //

    function _readCart() {
        let cartOut = {}; 
        if (_defaultSettings.StorageMethod === "local") {
            cartOut = JSON.parse(localStorage.getItem(_defaultSettings.CartName));
        }
        if (_defaultSettings.StorageMethod === "session") {
            cartOut = JSON.parse(sessionStorage.getItem(_defaultSettings.CartName));
        }
        return cartOut;
    }

    function _writeCart(cartIn) {
        let cartInString = JSON.stringify(cartIn);

        if (_defaultSettings.StorageMethod === "local") {
            localStorage.setItem(_defaultSettings.CartName, cartInString);
        }
        if (_defaultSettings.StorageMethod === "session") {
            sessionStorage.setItem(_defaultSettings.CartName, cartInString);
        }
    }

    //
    ///////////////////////////////////////////////

    return {
        AddToCart: AddToCart,
        UpdateItemQty: UpdateItemQty,
        RemoveItemFromCart: RemoveItemFromCart,
        GetCart: GetCart,
        CartTotalPrice: CartTotalPrice,
        TotalNumItemsInCart: TotalNumItemsInCart,
        CartItemsList: CartItemsList,
        DeleteCart: DeleteCart
    };
}());

