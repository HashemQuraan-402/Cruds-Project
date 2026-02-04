// 1- get total
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('create');
let temp;
let mood = 'create';

//console.log(title,price,taxes,ads,discount,total,count,category,submit);
function getTotal(){
    if(price.value != ''){
        total.style.background = 'green';
        let result = (+price.value + +taxes.value + +ads.value) -
        +discount.value;
        total.innerHTML = result;

    }else{
        total.style.background = 'rgb(214, 11, 11)';
        total.innerHTML = '';
    }
}

//////////////////////////////////////////////////////

// 2- create product

let products;
if(localStorage.Product != null){
    products = JSON.parse(localStorage.Product);
}else{
    products = [];
}

submit.onclick = _=>{
    
    let newProduct = {
        title:title.value.toUpperCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toUpperCase(),
    };
    /*
    let errors = new Array(7);
    errors[0]  = (newProduct.title == '') && (newProduct.price == '') && (newProduct.taxes == '') && (newProduct.ads == '') &&
     (newProduct.discount == '') && (newProduct.count == '') && (newProduct.category == '') ;
    errors[1] = newProduct.title.length>=2 && newProduct.title.length<=32;
    errors[2]  = newProduct.price > 0 && newProduct.price <= 100000;
    errors[3]  = (newProduct.taxes > 0) && (newProduct.taxes<=(newProduct.price/2));
    errors[4]  = (newProduct.ads > 0) && (newProduct.ads<=(newProduct.price/2));
    errors[5]  = (newProduct.discount > 0) && (newProduct.discount<=(newProduct.price/2));
    errors[6]  = (newProduct.count > 0) && (newProduct.count<=100);
    errors[7]  = (newProduct.category.length>=2) && (newProduct.category.length<=32);
    
    //if(titleNote && priceNote && taxesNote && adsNote && discountNote && countNote && categoryNote){
    let errorType = '';
    let goAhead = true;
    for(let i = 0 ; i < errors.length ; i++){
        if(errors[i]){
            switch(i){
                case 0:errorType = 'values';break;
                case 1:errorType = 'title';break;
                case 2:errorType = 'price';break;
                case 3:errorType = 'taxes';break;
                case 4:errorType = 'ads';break;
                case 5:errorType = 'discount';break;
                case 6:errorType = 'count';break;
                case 7:errorType = 'category';break;
            }
            alert('please enter a right ' + errorType);
            goAhead = false;
            break;
        }
    }
    //}
    if(goAhead){
        if(mood == 'create'){
         if(newProduct.count>1){
             for(let i=0; i<newProduct.count;i++){
                  products.push(newProduct);
                }
            }else{
                products.push(newProduct);
            }
        }else{
            products[temp] = newProduct;
            mood = 'create';
            count.style.display = "block";
            submit.innerHTML = "Create";
        }
        clearDataFromInput();
        
    }
   */
     let errors = new Array(7);
    errors[0] = (newProduct.title === "") || (newProduct.price === "") || (newProduct.taxes === "") || (newProduct.ads === "") ||
     (newProduct.count === "") || (newProduct.category === "");
    errors[1] = (newProduct.title.length >= 2 && newProduct.title.length <= 12);
    errors[2] = (newProduct.price > 0 && newProduct.price < 100000);
    errors[3] = (newProduct.taxes >= 0 && newProduct.taxes < (newProduct.price / 2));
    errors[4] = (newProduct.ads >= 0 && newProduct.ads < (newProduct.price / 2));
    errors[5] = (newProduct.count > 0 && newProduct.count < 100);
    errors[6] = (newProduct.category.length >= 2 && newProduct.category.length <= 12);

    // Check for errors and show appropriate messages
    let hasErrors = false;
    
    for (let i = 0; i < errors.length; i++) {
        if ((i === 0 && errors[i]) || (i > 0 && !errors[i])) {
            switch (i) {
                case 0:
                    alert("Please fill in all required fields");
                    break;
                case 1:
                    alert("Title should be between 2-12 characters");
                    break;
                case 2:
                    alert("Price should be positive and less than 100,000");
                    break;
                case 3:
                    alert("Taxes should be non-negative and less than half the price");
                    break;
                case 4:
                    alert("Ads should be non-negative and less than half the price");
                    break;
                case 5:
                    alert("Count should be between 1-99");
                    break;
                case 6:
                    alert("Category should be between 2-12 characters");
                    break;
            }
            hasErrors = true;
            break;
        }
    }

    if (!hasErrors) {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    products.push(newProduct);
                }
            } else {
                products.push(newProduct);
            }
        } else {
            products[temp] = newProduct;
            mood = "create";
            submit.innerHTML = "Create";
        }
        clearDataFromInput();
        localStorage.setItem("product", JSON.stringify(products));
        showProducts();
    }
    //localStorage.setItem('Product',JSON.stringify(products));
    
    //showProducts();
}

////////////////////////////////////////////////////

// 3- clear inputs

function clearDataFromInput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    getTotal();
    count.value = '';
    category.value = '';
    
}

////////////////////////////////////////////////////

// 4- read on table


function showProducts(){
    
    let table = "";
    for(let i = 0; i<products.length;i++){
        table += getTable(i);
        
    }
    document.getElementById('tbody').innerHTML = table;
    let deletebtn = document.getElementById('deleteAll');
    
    if(products.length > 0){
        deletebtn.innerHTML = `<button onclick='deleteAllFromTable()'>Delete All (${products.length})</button>`;
    }else{
        deletebtn.innerHTML = '';
    }

}
showProducts();


function getTable(i){
    return   `
                    <tr>
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button id="updateBtn" onclick = "updateItemInTable(${i})">Update</button></td>
                        <td><button id="deleteBtn" onclick="deleteFromTable(${i})">Delete</button></td>
                    </tr>        
        `;
}

////////////////////////////////////////////////////////

// 5- delete item

function deleteFromTable(i){
    products.splice(i,1);
    localStorage.Product = JSON.stringify(products);
    showProducts();
    
    
    
}

function deleteAllFromTable(){
    products.splice(0);
    localStorage.clear();
    showProducts();
}


///////////////////////////////////////////////////////////////

// 6- count ---> in create and delete parts

/////////////////////////////////////////////////////////////////

// 7- update

function updateItemInTable(i){
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    category.value = products[i].category;
    temp = i;
    getTotal();
    count.style.display = 'none';
    mood = 'update';
    submit.innerHTML = "Update";
    scroll({top:0,behavior:"smooth"});
}

///////////////////////////////////////////////////////////////////////

// 8- search

let searchMood = 'title';
function selectSearchMood(searchID){

    let search = document.getElementById('search');
    if(searchID == 'titleBtn')
        searchMood = 'title';
    else{
        searchMood = 'category';
    }
    search.focus();
    search.placeholder = 'search By ' + searchMood;
    search.value = "";
    showProducts();
}

function searchElement(value){
    let table = "";
    for(let i = 0 ; i < products.length ; i++){
        if(searchMood == 'title'){
            if(products[i].title.includes(value.toUpperCase())){
                table += getTable(i);
            }
        }else{
             if(products[i].category.includes(value.toUpperCase())){
                table += getTable(i);
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

/////////////////////////////////////////////////////////////

// 9- clear data ---> in create function