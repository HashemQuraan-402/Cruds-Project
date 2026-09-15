const STORAGE_KEY = 'products';

const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('create');

let products = loadProducts();
let selectedIndex = null;
let mode = 'create';
let searchMode = 'title';

function loadProducts() {
    const savedData =
        localStorage.getItem(STORAGE_KEY) ??
        localStorage.getItem('product') ??
        localStorage.getItem('Product');

    if (!savedData) {
        return [];
    }

    try {
        const parsedData = JSON.parse(savedData);
        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        console.warn('Stored product data could not be read.', error);
        return [];
    }
}

function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    localStorage.removeItem('product');
    localStorage.removeItem('Product');
}

function getTotal() {
    if (price.value.trim() === '') {
        total.style.background = 'rgb(214, 11, 11)';
        total.textContent = '';
        return 0;
    }

    const calculatedTotal =
        Number(price.value) +
        Number(taxes.value || 0) +
        Number(ads.value || 0) -
        Number(discount.value || 0);

    total.style.background = calculatedTotal >= 0 ? 'green' : 'rgb(214, 11, 11)';
    total.textContent = Number(calculatedTotal.toFixed(2));
    return calculatedTotal;
}

function readProductFromForm() {
    return {
        title: title.value.trim().toUpperCase(),
        price: Number(price.value),
        taxes: Number(taxes.value || 0),
        ads: Number(ads.value || 0),
        discount: Number(discount.value || 0),
        total: Number(getTotal().toFixed(2)),
        category: category.value.trim().toUpperCase()
    };
}

function validateProduct(product, quantity, isCreateMode) {
    if (product.title.length < 2 || product.title.length > 32) {
        return 'Title must contain between 2 and 32 characters.';
    }

    if (!Number.isFinite(product.price) || product.price <= 0 || product.price > 100000) {
        return 'Price must be greater than 0 and no more than 100,000.';
    }

    if (!Number.isFinite(product.taxes) || product.taxes < 0 || product.taxes > product.price / 2) {
        return 'Taxes must be non-negative and no more than half the price.';
    }

    if (!Number.isFinite(product.ads) || product.ads < 0 || product.ads > product.price / 2) {
        return 'Advertising cost must be non-negative and no more than half the price.';
    }

    if (!Number.isFinite(product.discount) || product.discount < 0) {
        return 'Discount must be a non-negative number.';
    }

    if (product.total < 0) {
        return 'Discount cannot make the total price negative.';
    }

    if (isCreateMode && (!Number.isInteger(quantity) || quantity < 1 || quantity > 99)) {
        return 'Count must be a whole number between 1 and 99.';
    }

    if (product.category.length < 2 || product.category.length > 32) {
        return 'Category must contain between 2 and 32 characters.';
    }

    return '';
}

submit.addEventListener('click', () => {
    const product = readProductFromForm();
    const quantity = Number(count.value);
    const isCreateMode = mode === 'create';
    const validationMessage = validateProduct(product, quantity, isCreateMode);

    if (validationMessage) {
        window.alert(validationMessage);
        return;
    }

    if (isCreateMode) {
        for (let index = 0; index < quantity; index += 1) {
            products.push({ ...product });
        }
    } else {
        products[selectedIndex] = product;
        mode = 'create';
        selectedIndex = null;
        count.style.display = 'block';
        submit.textContent = 'Create';
    }

    saveProducts();
    clearForm();
    showProducts();
});

function clearForm() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    getTotal();
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function getProductRow(product, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(product.title)}</td>
            <td>${escapeHtml(product.price)}</td>
            <td>${escapeHtml(product.taxes)}</td>
            <td>${escapeHtml(product.ads)}</td>
            <td>${escapeHtml(product.discount)}</td>
            <td>${escapeHtml(product.total)}</td>
            <td>${escapeHtml(product.category)}</td>
            <td><button class="update-button" onclick="updateItemInTable(${index})">Update</button></td>
            <td><button class="delete-button" onclick="deleteFromTable(${index})">Delete</button></td>
        </tr>`;
}

function showProducts(list = allProductsWithIndices()) {
    document.getElementById('tbody').innerHTML = list
        .map(({ product, index }) => getProductRow(product, index))
        .join('');

    const deleteAllContainer = document.getElementById('deleteAll');
    deleteAllContainer.innerHTML = products.length
        ? `<button onclick="deleteAllFromTable()">Delete All (${products.length})</button>`
        : '';
}

function allProductsWithIndices() {
    return products.map((product, index) => ({ product, index }));
}

function deleteFromTable(index) {
    products.splice(index, 1);
    saveProducts();
    showProducts(allProductsWithIndices());
}

function deleteAllFromTable() {
    products = [];
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('product');
    localStorage.removeItem('Product');
    showProducts(allProductsWithIndices());
}

function updateItemInTable(index) {
    const product = products[index];
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    category.value = product.category;
    count.value = '1';

    selectedIndex = index;
    mode = 'update';
    count.style.display = 'none';
    submit.textContent = 'Update';
    getTotal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectSearchMood(buttonId) {
    searchMode = buttonId === 'titleBtn' ? 'title' : 'category';
    const searchInput = document.getElementById('search');
    searchInput.placeholder = `Search by ${searchMode}`;
    searchInput.value = '';
    searchInput.focus();
    showProducts(allProductsWithIndices());
}

function searchElement(value) {
    const query = value.trim().toUpperCase();
    const filteredProducts = allProductsWithIndices().filter(({ product }) =>
        String(product[searchMode]).toUpperCase().includes(query)
    );

    showProducts(filteredProducts);
}

showProducts(allProductsWithIndices());
