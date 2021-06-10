window.onload = function() {

    function add(a, b){
        var result = a + b;
    
    }

    window.console.log('hhfdh')

    console.log(add(2, 5))

    var productButton = document.getElementsByClassName("product-btn");
    var itemsAdded = document.getElementById("cart-count");
    var count = 0;
    var productName = document.getElementsByClassName("product-name");
    var productPrice = document.getElementsByClassName("product-price");
    var tableBody = document.querySelector("table").getElementsByTagName("tbody")[0];

    products = []
    
    class Item {
        constructor(index, id, name, price) {
            this.index = index;
            this.id = id;
            this.name = name;
            this.price = price;
        };
    }

    function allItems(index, id, name, price) {
        for (var i in products) {
            if (products[i].name === name) {
                products[i].index += index;
                return;
            }
        }
        var item = new Item(index, id, name, price)
        products.push(item)

    }
    allItems(1, "p1", "Samsung TV", 500000);
    allItems(2, "p2", "Pixel 4a", 25000);
    allItems(3, "p3", "PS 5", 300000);
    allItems(4, "p4", "MacBook Air", 800000);
    allItems(5, "p5", "Apple Watch", 9500);
    allItems(6, "p6", "Air Pods", 7500);

    

    

    //    products = [  
    //         {
    //             index: 1,
    //             id: 'p1',
    //             name: 'Samsung TV',
    //             price: 500000
    //         },
    //         {
    //             index: 2,
    //             id: 'p2',
    //             name: 'Pixel 4a',
    //             price: 250000
    //         },
    //         {
    //             index: 3,
    //             id: 'p3',
    //             name: 'PS 5',
    //             price: 300000
    //         },
    //         {
    //             index: 4,
    //             id: 'p4',
    //             name: 'MacBook Air',
    //             price: 800000
    //         },
    //         {
    //             index: 5,
    //             id: 'p5',
    //             name: 'Apple Watch',
    //             price: 95000
    //         },
    //         {
    //             index: 6,
    //             id: 'p6',
    //             name: 'Air Pods',
    //             price: 75000
    //         }
    // ]


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    
    // TRANSACTION BOX
    var transactionBox = document.getElementById('transaction-box');
    var continueButton = document.getElementById('continue-btn');
    var checkoutButton = document.getElementById('checkout-btn');
    var cartButton = document.querySelector(".cart-btn");
    var bodyOverlay = document.getElementById("dark")

    function boxAppear() {
        transactionBox.style.display = "block";
        bodyOverlay.style.display = "block";
    }

    function boxDisppear() {
        transactionBox.style.display = "none";
        bodyOverlay.style.display = "none";
    }


    cartButton.onclick = boxAppear;
    
    checkoutButton.onclick = checkout;

    continueButton.onclick = boxDisppear;

    bodyOverlay.onclick = boxDisppear;

    //TRANSACTION FORM VALIDATION
    var nameInput = document.getElementById("name");
    var nameError = document.getElementById("name-error");
    var emailInput = document.getElementById("email");
    var emailError = document.getElementById("email-error");
    var phoneInput = document.getElementById("phone");
    var phoneError = document.getElementById("phone-error");


    function nameValidation() {
        if (nameInput.value == "") {
            nameInput.style.borderColor = "red";
            nameError.innerHTML = "Please enter your name";
        }else{
            nameInput.style.borderColor = "green";
            nameError.innerHTML = "";
        };
    };

    function emailValidation() {
        if (emailInput.value == "") {
            emailInput.style.borderColor = "red";
            emailError.innerHTML = "Please enter your email";
        }else if (typeof emailInput.value == "string" && !emailInput.value.includes("@")) {
            emailInput.style.borderColor = "red";
            emailError.innerHTML = "Invalid email";
        }else{
            emailInput.style.borderColor = "green";
            emailError.innerHTML = "";
        }
    } 
    function phoneValidation() {
        if (phoneInput.value == "") {
            phoneInput.style.borderColor = "red";
            phoneError.innerHTML = "Please enter your telephone number";
        }else if (isNaN(phoneInput.value)) {
            phoneInput.style.borderColor = "red";
            phoneError.innerHTML = "Telephone number must be numbers";
        }else if (phoneInput.value.toString().length < 11) {
            phoneInput.style.borderColor = "red";
            phoneError.innerHTML = "Telephone number must not be less than 11 characters";
        }else{
            phoneInput.style.borderColor = "green";
            phoneError.innerHTML = "";
        }
            
    };

    nameInput.onblur = nameValidation;
    emailInput.onblur = emailValidation;
    phoneInput.onblur = phoneValidation;

    // CART UPDATE
    function updateTransaction(product, id) {

        var itemName = product.querySelector(".product-name");
        // var itemName = product.querySelector(".item-name");
        var itemPrice = product.querySelector(".item-price");


        var row = tableBody.insertRow();
        var sn = row.insertCell(0);
        var name = row.insertCell(1);
        var price = row.insertCell(2);
        var quantity = row.insertCell(3);
        var remove = row.insertCell(4);
        
        row.id = id;

        name.innerHTML = itemName.innerHTML;

        price.innerHTML = itemPrice.innerHTML;

        var itemQuantity = 1;

        
    
        quantity.innerHTML =    `<button class="quantity-btn" id="decrease">-</button>
        <span>${itemQuantity}</span>
        <button class="quantity-btn" id="increase">+</button>`;
        
        

        remove.innerHTML = `<button class="remove-btn">Remove</button>`;

        var incrementButton = row.querySelector("#increase");
        var decrementButton = row.querySelector("#decrease");

        
        var initialPrice = price.innerHTML.replace("<span>₦</span>", "").replace(/,/g, "");

        incrementButton.onclick = function() {
            itemQuantity++;
            quantity.querySelector("span").innerHTML = itemQuantity;
            
            price.innerHTML = "<span>&#8358;</span>" + numberWithCommas(initialPrice * itemQuantity);

            updateTotal();

        }


        decrementButton.onclick = function() {
            itemQuantity > 1 ? itemQuantity-- : alert('You cannot have less than 1 item. if you wish to remove the item, click Remove');
            quantity.querySelector("span").innerHTML = itemQuantity;

            price.innerHTML = "<span>&#8358;</span>" + numberWithCommas(initialPrice * itemQuantity);

            updateTotal();
        }

        function updateSerialNumber() {
            var cartItems = document.querySelectorAll("#transaction-box tbody tr");
            cartItems.forEach(function(cartItem, index) {
                cartItem.querySelector('td').innerHTML = index + 1;
                index++;
            });
        }
        
        updateSerialNumber();

        function updateTotal() {
            var cartItems = document.querySelectorAll("#transaction-box tbody tr");
            var prices = 0;
            cartItems.forEach(function(cartItem, index) {
                var price = cartItem.querySelector('td:nth-of-type(3)').innerHTML.replace("<span>₦</span>", "").replace(/,/g, "");;
                prices += parseInt(price);
            });
            
            document.querySelector("#transaction-box span.total").innerHTML = numberWithCommas(prices);
        }

        updateTotal();

        remove.onclick = function() {
            row.remove();
            product.querySelector(".product-btn").click();

            updateSerialNumber();

            updateTotal();

        }
    }

    //REFRESH
    function refresh() {
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        
        nameInput.style.borderColor = "#000";
        emailInput.style.borderColor = "#000";
        phoneInput.style.borderColor = "#000";

        count = 0;
        totalPrice = 0;

        var row = tableBody.deleteRow(0);
    }
    

    // SUMMARY TABLE
    var summaryBox = document.getElementById("summary-box");
    var summaryButton = document.getElementById("summary-btn");

    summaryButton.onclick = summaryBoxDisppear;

    function summaryBoxAppear() {
        summaryBox.style.display = "block";
        bodyOverlay.style.display = "block";
    }

    function summaryBoxDisppear() {
        summaryBox.style.display = "none";
        bodyOverlay.style.display = "none";
        refresh();
    }
    
    function summary(product, id) {

        var itemName = product.querySelector(".product-name");
        // var itemName = product.querySelector(".item-name");
        var summaryTableBody = document.querySelector("#summary-table tbody");

        var row = summaryTableBody.insertRow();
        var sn = row.insertCell(0);
        var name = row.insertCell(1);
        var quantity = row.insertCell(2);
        
        row.id = id;

        name.innerHTML = itemName.innerHTML;


        var itemQuantity = quantity.innerHTML;

        quantity.innerHTML = itemQuantity;

        function updateSerialNumber() {
            var cartItems = document.querySelectorAll("#summary-box tbody tr");
            cartItems.forEach(function(cartItem, index) {
                cartItem.querySelector('td').innerHTML = index + 1;
                index++;
            });
        }
        
        updateSerialNumber();
    }

    
    function checkout() {
        var summaryNote = document.getElementById("summary-note");
        var userName = nameInput.value;
        // userName.style.color = "#ff7a00";

        summaryNote.innerHTML = "Thank You " + nameInput.value + ", Your Order Has Been Received";

        var total = document.getElementById("total");
        var totalPrice = total.innerHTML.replace("<span>₦</span>", "").replace(/,/g, "");
        var totalPrice = parseInt(totalPrice); 
        
        boxDisppear();
        payWithPaystack();  
        
    }
    

    //   SHOP
    for(i in productButton) {

        productButton[i].addEventListener('click', function() {

            var product = this.closest(".product");
            var id = product.id;

            if(this.innerHTML  == "ADD TO CART") {
                this.innerHTML = "REMOVE FROM CART";
                this.style.backgroundColor = "#ffe9d6";

                count++;
                itemsAdded.innerHTML = count;
                
                updateTransaction(product, id);

                summary(product, id);

            } else {
                this.innerHTML = "ADD TO CART";
                this.style.backgroundColor = "#ff9a3d";

                count--;
                itemsAdded.innerHTML = count;
                

                document.querySelector("tr#" + id).remove();
            }

        });

    }



    // PAYSTACK INTEGRATION
    function payWithPaystack(e) {
        var total = document.getElementById("total");
        var totalPrice = total.innerHTML.replace("<span>₦</span>", "").replace(/,/g, "");
        var totalPrice = parseInt(totalPrice); 

        let handler = PaystackPop.setup({
          key: 'pk_test_23dc94c9fa3da560e520e75a803618845f1e4cec', // Replace with your public key
          email: document.getElementById("email").value,
          amount: totalPrice * 100,
          ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          // label: "Optional string that replaces customer email"
          onClose: function(){
            alert('Window closed.');
          },
          callback: function(response){
            summaryBoxAppear();
          }
        });
        handler.openIframe();
      }


    
}