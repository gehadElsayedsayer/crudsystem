// عناصر الإدخال
const pNameInp = document.getElementById("pname"),
      pCategoryInp = document.getElementById("pcategory"),
      pPriceInp = document.getElementById("pprice"),
      pDesrptionInp = document.getElementById("pdescription"),
      tbody = document.getElementById("tbody"),
      searchInp = document.getElementById("searchInp"),
      addBtn = document.querySelector(".btn-info");

// البيانات
let productsList = JSON.parse(localStorage.getItem('allproducts')) || [];

displayProduct();

// إضافة منتج جديد
function addProduct() {
  const product = {
    productName: pNameInp.value.trim(),
    productCat: pCategoryInp.value.trim(),
    productPrice: pPriceInp.value.trim(),
    productDesc: pDesrptionInp.value.trim(),
  };

  productsList.push(product);
  localStorage.setItem('allproducts', JSON.stringify(productsList));
  displayProduct();
  clearForm();
}

// تنظيف النموذج
function clearForm() {
  pNameInp.value = "";
  pCategoryInp.value = "";
  pPriceInp.value = "";
  pDesrptionInp.value = "";
}

// عرض المنتجات
function displayProduct() {
  tbody.innerHTML = productsList.map((product, i) => `
    <tr>
      <td>${i}</td>
      <td>${product.productName}</td>
      <td>${product.productCat}</td>
      <td>${product.productPrice}</td>
      <td>${product.productDesc}</td>
      <td><button onclick="retrieveProduct(${i})" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fas fa-trash"></i></button></td>
    </tr>
  `).join('');
}

// بحث في المنتجات
function search() {
  const query = searchInp.value.toLowerCase();
  tbody.innerHTML = productsList
    .map((product, i) => {
      if (product.productName.toLowerCase().includes(query)) {
        const highlightedName = product.productName.replace(
          new RegExp(query, "gi"),
          match => `<span style="background-color:yellow">${match}</span>`
        );
        return `
          <tr>
            <td>${i}</td>
            <td>${highlightedName}</td>
            <td>${product.productCat}</td>
            <td>${product.productPrice}</td>
            <td>${product.productDesc}</td>
            <td><button onclick="retrieveProduct(${i})" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fas fa-trash"></i></button></td>
          </tr>
        `;
      }
      return "";
    })
    .join('');
}

// حذف منتج
function deleteProduct(index) {
  const confirmDelete = confirm("Do you want to delete this?");

  if (confirmDelete) {
    productsList.splice(index, 1); // حذف المنتج
    localStorage.setItem('allproducts', JSON.stringify(productsList)); // تحديث التخزين
    displayProduct(); // تحديث العرض
  }
}

// تعديل منتج
function retrieveProduct(index) {
  const product = productsList[index];
  pNameInp.value = product.productName;
  pCategoryInp.value = product.productCat;
  pPriceInp.value = product.productPrice;
  pDesrptionInp.value = product.productDesc;

  addBtn.textContent = "Update Product";

  addBtn.onclick = function () {
    productsList[index] = {
      productName: pNameInp.value.trim(),
      productCat: pCategoryInp.value.trim(),
      productPrice: pPriceInp.value.trim(),
      productDesc: pDesrptionInp.value.trim(),
    };
    localStorage.setItem('allproducts', JSON.stringify(productsList));
    displayProduct();
    clearForm();
    addBtn.textContent = "Add Product";
    addBtn.onclick = addProduct;
  };
}
