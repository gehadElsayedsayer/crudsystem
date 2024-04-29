var pNameInp=document.getElementById("pname"),
 pCategoryInp=document.getElementById("pcategory"),
 pPriceInp=document.getElementById("pprice"),
 pDesrptionInp=document.getElementById("pdescription"),
 tbody=document.getElementById("tbody"),
 searchInp=document.getElementById("searchInp"),
 addBtn=document.querySelector(".btn-info");


if(localStorage.getItem('allproducts')==null){
    var productsList=[];
}
else{
    var productsList=JSON.parse(localStorage.getItem('allproducts')) ;
}
displayProduct();
 function addProduct(){
 var product={
     productName: pNameInp.value,
     productCat: pCategoryInp.value,
     productPrice: pPriceInp.value,
     productDesc: pDesrptionInp.value,
 };
 productsList.push(product);
 localStorage.setItem('allproducts',JSON.stringify(productsList));
 displayProduct();
 clearform();
 console.log(product);
 console.log(productsList);
 }
 function clearform(){
    pNameInp.value="";
    pCategoryInp.value="";
     pPriceInp.value="";
     pDesrptionInp.value="";

 }
 function displayProduct(){
     var trs= '';

     for(var i=0;i<productsList.length;i++){
         trs+=`<tr>
      
         <td>${i}</td>
         <td>${productsList[i].productName}</td>
         <td>${productsList[i].productCat}</td>
         <td>${productsList[i].productPrice}</td>
         <td>${productsList[i].productDesc}</td>
         <td><button onclick="retriveProduct(${i})" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
         <td><button onClick="deleteProduct(${i})" class="btn btn-danger"><i class="fas fa-trash"></i></button></td>
       </tr>`
     }
     console.log(trs);
     tbody.innerHTML=trs;
 }
 function search(){
        
        var trs="";
       
         for(var i=0;i<productsList.length;i++){
            
             if (productsList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())){
           
                trs+=`<tr>   
                <td>${i}</td>
                
                <td>${productsList[i].productName.replace(searchInp.value, `<span style="background-color:yellow">${searchInp.value}</span>`)}</td>
                <td>${productsList[i].productCat}</td>
                <td>${productsList[i].productPrice}</td>
                <td>${productsList[i].productDesc}</td>
                <td><button class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
                <td><button  class="btn btn-danger"><i class="fas fa-trash"></i></button></td>
              </tr>`
             }
           
        }
      
 
tbody.innerHTML=trs;
 }

 
function deleteProduct(ind){
     productsList.splice(ind,1);
     localStorage.setItem('allproducts',JSON.stringify(productsList));
     displayProduct();

 }
 function retriveProduct(ind){
    pNameInp.value=productsList[ind].productName;
    pCategoryInp.value=productsList[ind].productCat;
     pPriceInp.value=productsList[ind].productPrice;
     pDesrptionInp.value=productsList[ind].productDesc;
     addBtn.innerHTML='update product';
     addBtn.onclick=function(){
        productsList[ind].productName=pNameInp.value;
        productsList[ind].productCat=pCategoryInp.value;
        productsList[ind].productPrice=pPriceInp.value;
        productsList[ind].productDesc=pDesrptionInp.value;
        displayProduct();
        localStorage.setItem('allproducts',JSON.stringify(productsList));
        addBtn.innerHTML='add product';
        addBtn.onclick=addProduct;
     }
 }