const API_URL = 'http://localhost:3000/products';

const PRODUCTS_LIMIT = 12;

const productsContainer = document.getElementById('products-card__container');
const filterInput = document.getElementById('search-input');
const searchButton = document.querySelector('.property-form__button');
const filterSelect = document.getElementById('filter-select');
const viewAllButton = document.getElementById('view-all__button');

const slider = document.getElementById('slider')
const paginationContainer = document.createElement('div');
paginationContainer.classList.add('pagination-buttons');
productsContainer.appendChild(paginationContainer);


let products = [];
let initialProducts = [];
let allProducts = [];
let currentCategory = '';
let currentPage = 1;
let totalPages = 1;


function createPaginationButtons() {
    paginationContainer.innerHTML = ''; // Clear existing buttons

    // Create Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('pagination-button');
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayCategoryProducts(currentCategory);
        });
        paginationContainer.appendChild(prevButton);
    }

    // Create Next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('pagination-button');
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayCategoryProducts(currentCategory);
        });
        paginationContainer.appendChild(nextButton);
    }
}


function displayCategoryProducts(category) {
    currentCategory = category;
    currentPage = 1; // Reset to first page
    const categoryProducts = filteredProducts.filter(product => product.place === category);

    totalPages = Math.ceil(categoryProducts.length / CARDS_PER_PAGE);
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const end = start + CARDS_PER_PAGE;
    const productsToDisplay = categoryProducts.slice(start, end);

    displayProducts(productsToDisplay);
    createPaginationButtons(); // Create pagination buttons for the category
}




function displayAllProducts() {
    currentPage = 1; // Reset to first page
    const productsToDisplay = allProducts.slice(0, PRODUCTS_LIMIT);
    displayProducts(productsToDisplay);
    viewAllButton.style.display = 'none'; // Hide the button after showing all products
}

// Функция для фильтрации продуктов по названию
function filterProducts() {
    const filteredText = filterInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(filteredText)
    );
    displayProducts(filteredProducts);
    createPaginationButtons(); // Update pagination after filtering
}


function applyFilterAndSort() {
    const selectedFilter = filterSelect.value;
    let filteredProducts = [...allProducts]; // Use all products for filtering

    // Function to parse price string to a number
    const parsePrice = priceString => {
        return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
    };

    // Filter and sort products based on the selected filter
    switch (selectedFilter) {
        case 'Lidc':
        case 'Manchester':
        case 'Liverpool':
            filteredProducts = filteredProducts.filter(product => product.place === selectedFilter);
            break;
        case 'PriceUp':
            filteredProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
            break;
        case 'PriceDown':
            filteredProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
            break;
        default:
            // No filter applied, show all products
            break;
    }

    // Display the filtered and sorted products
    displayProducts(filteredProducts);
}


viewAllButton.addEventListener('click', () => {
    displayProducts(allProducts); // Display all products
    viewAllButton.style.display = 'none'; // Hide the button after showing all products
});

// Add event listener for the select element
filterSelect.addEventListener('change', applyFilterAndSort);





filterInput.addEventListener('input', filterProducts);

// searchButton.addEventListener('click', function() {
//     filterProducts();
// });


function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    if (productsToDisplay.length === 0) {
        productsContainer.appendChild(noProductsMessage);
    } else {
        productsToDisplay.forEach(product => {
            const card = createCard(product);
            productsContainer.appendChild(card);
        });
    }
}




const noProductsMessage = document.createElement('h2');
noProductsMessage.classList.add('noProductsMessage');
noProductsMessage.textContent = 'Товары не найдены';
productsContainer.appendChild(noProductsMessage);

// Функция для создания карточки продукта
function createCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Картинка продукта
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.classList.add('card-image');

    // Контейнер с информацией о продукте
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-card__info');

    // Верхняя секция: заголовок и иконка сердца
    const productTop = document.createElement('div');
    productTop.classList.add('product-card__top');

    const title = document.createElement('h2');
    title.classList.add('product-card__title');
    title.textContent = product.title;

    const heartIcon = document.createElement('img');
    heartIcon.src = '/images/heart.png';
    heartIcon.alt = 'Favorite';
    heartIcon.classList.add('heartIcon-image');

    productTop.appendChild(title);
    productTop.appendChild(heartIcon);

    // Нижняя секция: локация, детали, цена и кнопка
    const productBottom = document.createElement('div');
    productBottom.classList.add('product-card__bottom');

    const productPlace = document.createElement('div');
    productPlace.classList.add('product-card__place');

    const placeIcon = document.createElement('img');
    placeIcon.src = '/images/place.png';
    placeIcon.alt = 'Location';

    const placeText = document.createElement('span');
    placeText.textContent = product.place;

    productPlace.appendChild(placeIcon);
    productPlace.appendChild(placeText);

    const homeDetails = document.createElement('div');
    homeDetails.classList.add('product-card__home');

    const bedroom = document.createElement('div');
    bedroom.classList.add('product-card_apart');
    const bedroomIcon = document.createElement('img');
    bedroomIcon.classList.add('apart-image');
    bedroomIcon.src = '/images/bedroom.png';
    bedroomIcon.alt = 'Bedroom';
    const bedroomText = document.createElement('span');
    bedroomText.textContent = product.bedroom;
    bedroom.appendChild(bedroomIcon);
    bedroom.appendChild(bedroomText);

    const kitchen = document.createElement('div');
    kitchen.classList.add('product-card_apart');
    const kitchenIcon = document.createElement('img');
    kitchenIcon.classList.add('apart-image');
    kitchenIcon.src = '/images/spoon.png';
    kitchenIcon.alt = 'Kitchen';
    const kitchenText = document.createElement('span');
    kitchenText.textContent = product.kitchen;
    kitchen.appendChild(kitchenIcon);
    kitchen.appendChild(kitchenText);

    const bathroom = document.createElement('div');
    bathroom.classList.add('product-card_apart');
    const bathroomIcon = document.createElement('img');
    bathroomIcon.classList.add('apart-image');
    bathroomIcon.src = '/images/bathroom.png';
    bathroomIcon.alt = 'Bathroom';
    const bathroomText = document.createElement('span');
    bathroomText.textContent = product.bathroom;
    bathroom.appendChild(bathroomIcon);
    bathroom.appendChild(bathroomText);

    homeDetails.appendChild(bedroom);
    homeDetails.appendChild(kitchen);
    homeDetails.appendChild(bathroom);

    const descBottom = document.createElement('div');
    descBottom.classList.add('product-card__desc-bottom');

    const price = document.createElement('span');
    price.textContent = product.price;
    price.classList.add('card-price');

    const detailsButton = document.createElement('button');
    detailsButton.type = 'button';
    detailsButton.classList.add('product-card__desc-button');
    detailsButton.textContent = 'View Details';

    descBottom.appendChild(price);
    descBottom.appendChild(detailsButton);

    productBottom.appendChild(productPlace);
    productBottom.appendChild(homeDetails);
    productBottom.appendChild(descBottom);

    productInfo.appendChild(productTop);
    productInfo.appendChild(productBottom);

    card.appendChild(img);
    card.appendChild(productInfo);

    return card;
}

// Функция для получения и отображения продуктов
function fetchProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            products = data;
            initialProducts = products.slice(0, PRODUCTS_LIMIT);
            allProducts = products; // Store all products for "View All"
            displayProducts(initialProducts);

            // Show "View All" button if there are more products than the limit
            if (products.length > PRODUCTS_LIMIT) {
                viewAllButton.style.display = 'block';
            } else {
                viewAllButton.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Вызов функции для получения продуктов
fetchProducts();



document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('section');//все секции
    const navLinks = document.querySelectorAll('.header-navigation__link');


    function setActiveLinks() {
        let index = sections.length//все секции  = индексу

        while (--index && window.scrollY + 50 < sections[index].offsetTop) { }

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    window.addEventListener('scroll', setActiveLinks);
    setActiveLinks()
})





const reviews = [
    `<div class="rewiews-card">
        <div class="rewiews-block">
          <div class="rewiews-top">
            <div class="rewiews-person__info">
              <img src="/images/usone.png" alt="usone" class="usone">
              <div class="person-desc">
                <p class="person__name">Justin Lee</p>
                <span class="person__work">Products Designer at Ito</span>
              </div>
            </div>
            <img src="/images/quote.png" alt="quote" class="quotes">
          </div>
          <div class="rewiews-bottom">
            <p class="rewiews-bottom-info">A good real estate agent doesn’t disappear once the closing IN signed...</p>
          </div>
        </div>
      </div>`,
    `<div class="rewiews-card">
        <div class="rewiews-block">
          <div class="rewiews-top">
            <div class="rewiews-person__info">
              <img src="/images/useTwo.png" alt="usone" class="usone">
              <div class="person-desc">
                <p class="person__name">Angel Cathe</p>
                <span class="person__work">Products Designer at Ito</span>
              </div>
            </div>
            <img src="/images/quote.png" alt="quote" class="quotes">
          </div>
          <div class="rewiews-bottom">
            <p class="rewiews-bottom-info">A good real estate agent doesn’t disappear once the closing IN signed...</p>
          </div>
        </div>
      </div>`
  ];
  
  function moveSlider(index) {
    const slider = document.getElementById('slider');
  
    // Clear the slider content
    slider.innerHTML = '';
  
    // Add the selected review
    slider.innerHTML += reviews[index];
  
    // Add the next review for cyclic slider functionality
    slider.innerHTML += reviews[(index + 1) % reviews.length];
  
    // Update the active dot
    const dots = document.querySelectorAll('.dots-slider');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('dots-slider__active');
      } else {
        dot.classList.remove('dots-slider__active');
      }
    });
  }



  document.addEventListener("DOMContentLoaded", function() {
    // Получаем все вкладки
    const tabs = document.querySelectorAll(".bottom-order");
  
    // Выпадающие списки для изменения содержимого
    const locationSelect = document.getElementById("locationSelect");
    const propertySelect = document.getElementById("propertySelect");
    const priceSelect = document.getElementById("priceSelect");
    const dropdowns = document.querySelectorAll(".location-title");
  
    // Данные для каждой вкладки
    const tabData = {
      buy: {
        location: ["Dhaka", "Lidc", "Mayami"],
        propertyType: ["Duplex", "Apartment", "Villa"],
        price: ["$4000-$8000", "$1000-$3000", "$500,000-$1,000,000"]
      },
      rent: {
        location: ["New York", "Dhaka", "London"],
        propertyType: ["Studio", "Apartment", "Penthouse"],
        price: ["$1000-$3000", "$500-$1000", "$2000-$4000"]
      },
      sell: {
        location: ["Los Angeles", "Miami", "Toronto"],
        propertyType: ["Villa", "Townhouse", "Condo"],
        price: ["$500,000-$1,000,000", "$250,000-$500,000", "$1,000,000-$2,000,000"]
      }
    };

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", function() {
          const header = this.previousElementSibling;
          // Toggle the class on the location-header to animate the arrow icon
          header.classList.toggle("active");
        });
      });
  
    // Обработчик клика по вкладкам
    tabs.forEach(tab => {
      tab.addEventListener("click", function() {
        // Убираем класс активной вкладки
        document.querySelector(".bottom-order__active").classList.remove("bottom-order__active");
  
        // Добавляем класс активной вкладке
        tab.classList.add("bottom-order__active");
  
        // Получаем название вкладки
        const tabName = tab.getAttribute("data-tab");
  
        // Обновляем выпадающие списки в зависимости от выбранной вкладки
        updateSelect(locationSelect, tabData[tabName].location);
        updateSelect(propertySelect, tabData[tabName].propertyType);
        updateSelect(priceSelect, tabData[tabName].price);
      });
    });
  
    // Функция для обновления содержимого select
    function updateSelect(selectElement, optionsArray) {
      selectElement.innerHTML = "";
      optionsArray.forEach(optionValue => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        selectElement.appendChild(option);
      });
    }
  });