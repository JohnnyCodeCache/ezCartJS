describe("ezCart", function () {
    describe("Add to Cart Functions", function () {
        it("AddToCart should be able to add item to a cart that doesn't exist", function () {
            //expect().nothing();
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3)).toEqual("Cart created. New item added.\n");
        });

        it("AddToCart - add additional unique item to an existing cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.AddToCart("Portal Gun", 79.99, 1)).toEqual("New item added to cart.\n");
        });
        it("AddToCart - add duplicate item to existing cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Portal Gun", 79.99, 1));
            expect(ezCart.AddToCart("Portal Gun", 79.99, 1)).toEqual("Quantity updated in cart.\n");
        });
        it("AddToCart - subtract qty of items in cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Portal Gun", 79.99, 25));
            expect(ezCart.AddToCart("Portal Gun", 79.99, -4)).toEqual("Quantity updated in cart.\n");

            expect(ezCart.TotalNumItemsInCart()).toEqual(21);
        });
        it("AddToCart - subtract qty of items in cart to zero", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Portal Gun", 79.99, 25));
            expect(ezCart.AddToCart("Portal Gun", 79.99, -25)).toEqual("Quantity updated in cart.\n");

            expect(ezCart.TotalNumItemsInCart()).toEqual(0);
        });
        it("AddToCart - subtract more items than are in cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Portal Gun", 79.99, 25));
            expect(ezCart.AddToCart("Portal Gun", 79.99, -50));

            expect(ezCart.TotalNumItemsInCart()).toEqual(0);
        });

    });

    describe("Update Item Quantity Cart Functions", function () {
        it("UpdateItemQty should be able to update quantity", function () {
            //expect().nothing();
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("Flux Capacitor", 8));

            expect(ezCart.TotalNumItemsInCart()).toEqual(8);
        });

        it("UpdateItemQty should reject name = ''", function () {
            //expect().nothing();
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("", 8)).toEqual("Sorry, item name cannot be blank.\n");

        });

        it("UpdateItemQty should reject name = null", function () {
            //expect().nothing();
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty(null, 8)).toEqual("Sorry, item name cannot be blank.\n");
        });

        it("UpdateItemQty should reject cart doesn't exist", function () {
            ezCart.DeleteCart();

            expect(ezCart.UpdateItemQty("Bob Blaster", 8)).toEqual("No action taken. Cart doesn't exist.\n");
        });

        it("UpdateItemQty should reject if name not found in cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("Bob Blaster", 8)).toEqual("No action taken. Cart exists but item wasn't found.\n");
        });

        it("UpdateItemQty should reject if qty is string", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("Flux Capacitor", "sf")).toEqual("Sorry, quantity must have a value.\n");
        });

        it("UpdateItemQty should reject if qty is missing", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("Flux Capacitor")).toEqual("Sorry, quantity must have a value.\n");
        });

        it("UpdateItemQty should reject if qty = null", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("Flux Capacitor", null)).toEqual("Sorry, quantity must have a value.\n");
        });

        it("UpdateItemQty should delete item from cart if qty = 0", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.TotalNumItemsInCart()).toEqual(3);

            expect(ezCart.UpdateItemQty("Flux Capacitor", 0)).toEqual("Item deleted from cart.\n");
        });
    });


    describe("Remove From Cart Functions", function () {

        it("RemoveItemFromCart - test remove item", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Portal Gun", 79.99, 1));
            expect(ezCart.AddToCart("Portal Gun", 79.99, 1));
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));

            expect(ezCart.RemoveItemFromCart).toBeDefined();
            expect(ezCart.RemoveItemFromCart("Portal Gun")).toEqual("Success!\n");

            expect(ezCart.TotalNumItemsInCart()).toEqual(3);
        });
        it("RemoveItemFromCart - give graceful message if cart doesn't exist", function () {
            ezCart.DeleteCart();

            expect(ezCart.RemoveItemFromCart).toBeDefined();
            expect(ezCart.RemoveItemFromCart("Portal Gun")).toEqual("No action taken. Cart doesn't exist.\n");
        });
        it("RemoveItemFromCart - give graceful message if item isn't in cart", function () {
            ezCart.DeleteCart();

            expect(ezCart.AddToCart("Portal Gun", 79.99, 1));

            expect(ezCart.RemoveItemFromCart).toBeDefined();
            expect(ezCart.RemoveItemFromCart("Flux Capacitor")).toEqual("No action taken. Cart exists but item wasn't found.\n");

            expect(ezCart.TotalNumItemsInCart()).toEqual(1);
        });

    });

    describe("Other Cart Functions", function () {
        it("GetCart should return shopping cart json", function () {
            // hand build cart array with stuff in it
            let shouldEqual = []; 
            let item1 = {
                "Name": "Flux Capacitor",
                "PriceEach": 2000,
                "Qty": 6
            };
            let item2 = {
                "Name": "Portal Gun",
                "PriceEach": 80,
                "Qty": 1
            };
            shouldEqual.push(item1);
            shouldEqual.push(item2);

            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 6));
            expect(ezCart.AddToCart("Portal Gun", 80, 1));

            expect(ezCart.GetCart).toBeDefined();
            var thisCart = ezCart.GetCart();

            // use lowdash to compare arrays
            expect(_.isEqual(thisCart, shouldEqual)).toBeTruthy(); 
        });

        it("CartTotalPrice - return total money in the cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.AddToCart("Dilithium Crystals", 10.99, 10));

            // 2000*3 = 6000
            // 6000 + 109.90 = 6109.90

            expect(ezCart.CartTotalPrice()).toEqual(6109.90);
        });

        it("TotalNumItemsInCart - return number of items in cart", function () {
            ezCart.DeleteCart();
            expect(ezCart.AddToCart).toBeDefined();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.AddToCart("Dilithium Crystals", 10.99, 10));

            expect(ezCart.TotalNumItemsInCart()).toEqual(13);
        });

        it("CartItemsList - return array of names of items in cart", function () {
            let shouldEqual = ["Flux Capacitor", "Dilithium Crystals"]; 

            ezCart.DeleteCart();
            expect(ezCart.AddToCart("Flux Capacitor", 2000, 3));
            expect(ezCart.AddToCart("Dilithium Crystals", 10.99, 10));

            expect(ezCart.CartItemsList).toBeDefined();

            var thisCart = ezCart.CartItemsList(); 

            // use lowdash to compare arrays
            expect(_.isEqual(thisCart, shouldEqual)).toBeTruthy(); 
        });

        it("CartItemsList - return empty array if cart is empty", function () {
            let shouldEqual = [];

            ezCart.DeleteCart();

            expect(ezCart.CartItemsList).toBeDefined();

            var thisCart = ezCart.CartItemsList();

            // use lowdash to compare arrays
            expect(_.isEqual(thisCart, shouldEqual)).toBeTruthy();
        });


        it("RemoveItemFromCart - test remove item", function () {
            expect().nothing();
        });

    });

});