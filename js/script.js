let items = JSON.parse(localStorage.getItem('cart-items')) !== null ? JSON.parse(localStorage.getItem('cart-items')) : [];
const allBooks = [];

window.onload = () => {
    document.querySelector('#clearCart').addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    })

    items.length > 0 ?  cart(items) : '';

    searchFormControls();

    getBooks()
    .then(res => {
        res.forEach(book => {
            createMainCards(book, '.popular-results');
            allBooks.push(book);
        })
        res.filter(book => book.price > 10).forEach(bookFiltered => createMiniatureCards(bookFiltered, '.collection-results'))
        res.filter(book => book.price < 5).forEach(bookFiltered => createMiniatureCards(bookFiltered, '.offers-results'))
    })
}

const getBooks = async () => {
    let url = 'https://striveschool-api.herokuapp.com/books';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data

    } catch (error) {
        console.log(error);
    } finally {
        hideSpinner();
        showResults();
    }
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.add('d-none')
}

const showResults = () => {
    document.querySelector('.results-section').classList.remove('d-none');
}

const createMainCards = (book, section) => {
    let {img, title, price } = book;

    console.log(section);
    const popularResults = document.querySelector(section);
    console.log(popularResults);

    const col = document.createElement('div');
    section !== '.search-results' ? col.classList.add('col', 'swiper-slide') : col.classList.add('col') ;
    console.log(col);
    
    const card = document.createElement('div');
    card.classList.add('card', 'pt-3', 'px-3', 'border-0', 'rounded-4', 'main-card');

    const imgCard = document.createElement('img');
    imgCard.classList.add('object-fit-cover', 'w-100', 'h-100', 'card-img');
    imgCard.src = img;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'px-0', 'text-center');

    const titleCard = document.createElement('h3');
    titleCard.classList.add('card-title', 'roboto--regular', 'h6', 'text-truncate')
    titleCard.innerHTML = title;

    const cardText = document.createElement('div');
    cardText.classList.add('card-text', 'd-flex', 'justify-content-center');

    cardText.innerHTML = /* HTML */`
        <a href="#" class="bg--red text-white px-2 rounded-pill  searchbar__button text-center text-decoration-none " role="button" onclick="addItemToCart('${title}', ${price})">
            <ion-icon name="cart-outline"></ion-icon><span class="small ps-2 p-0">${price} $</span>
        </a>
    `

    cardBody.append(titleCard, cardText);
    card.append(imgCard, cardBody);
    col.append(card);
    popularResults.append(col);
}

const createMiniatureCards = (book, section) => {
    let {img, title, price } = book;

    const results = document.querySelector(section);

    const card = document.createElement('div');
    card.classList.add('col', 'py-3', 'swiper-slide');

    card.innerHTML = /* HTML */ `
        <div class="card flex-row card--white border-0  p-0 ">
            <div class="row align-items-center ">
                <div class="col-4">
                    <div class="miniature__container ">
                        <div class="miniature">
                            <img src="${img}" alt="" class="object-fit-cover w-100 h-100 card-img">
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="card-body p-0 ps-2">
                        <div class="card-title">
                            <h5 class="small  ">${title}</h5>
                        </div>
                        <div class="card-text d-flex justify-content-start">
                            <a href="#" class="bg--red text-white px-3 rounded-pill  searchbar__button text-center text-decoration-none " role="button" onclick="addItemToCart('${title}', ${price})">
                                <ion-icon name="cart-outline"></ion-icon><span class="small ps-2 p-0">${price}&nbsp;$</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    results.append(card)
}

const addItemToCart = (title, price) => {
    let book = {
        title: title,
        price: price
    }
    
    items.push(book);
    localStorage.setItem('cart-items', JSON.stringify(items));
    location.reload();
}

const createCartItem = (item) => {
    const itemsList = document.querySelector('.cart__items-list');
    
    const liElement = document.createElement('li');
    liElement.classList.add('cart__item', 'list-group-item', 'ps-2', 'small', 'd-flex', 'flex-wrap', 'justify-content-between', 'align-items-center')
    
    liElement.innerHTML = /* HTML */ `
    <a href="#" class="title text-secondary text-decoration-none text-truncate">${item.title}</a>
    <span class="rounded-pill p-2 bg--orange">${item.price}&nbsp;$</span>
    `;
    itemsList.append(liElement)
}

const cart = (items) => {
    document.querySelector('.cart__fully').classList.remove('d-none');
    document.querySelector('.cart__empty').classList.add('d-none');
    
    items.forEach(item => createCartItem(item))

    totalCart = items.reduce((partial, items) => items.price + partial, 0)

    document.querySelector('.total-price__item').innerHTML = `${totalCart.toFixed(2)} $`
}

const searchItems = (form) => {
    let query = document.querySelector(form).value.toLowerCase();

    if(query.length >= 3) {
        let results = allBooks.filter(book => book.title.toLowerCase().includes(query) );
        document.querySelector('.search-results').innerHTML = '';
        document.querySelector('.search-section').classList.remove('d-none')
        results.forEach(result => createMainCards(result, '.search-results'))
        console.log(results);
    } else {
        document.querySelector('.search-section').classList.add('d-none');
        document.querySelector('.search-results').innerHTML = '';
    }

}

const searchItemsRealTime = (form) => {
    let query = document.querySelector(form).value.toLowerCase();
    
    if(query.length >= 3) {
        let results = allBooks.filter(book => book.title.toLowerCase().includes(query) );
        document.querySelector('.search-results').innerHTML = '';
        document.querySelector('.search-section').classList.remove('d-none')
        results.forEach(result => createMainCards(result, '.search-results'))
        console.log(results);
    } else {
        document.querySelector('.search-section').classList.add('d-none');
        document.querySelector('.search-results').innerHTML = '';
    }

}

const searchFormControls = () => {
    document.querySelector('.searchbar__button--mobile').addEventListener('click', () => {
        searchItems('.searchbar__input--mobile');
    })
    document.querySelector('.searchbar__button--desktop').addEventListener('click', () => {
        searchItems('.searchbar__input--desktop');
    })
    document.querySelector('.searchbar__input--mobile').addEventListener('input', () => {
        searchItemsRealTime('.searchbar__input--mobile')
    })
    document.querySelector('.searchbar__input--desktop').addEventListener('input', () => {
        searchItemsRealTime('.searchbar__input--desktop')
    })
}


//Carousels
const swiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 6
        }
    },
    spaceBetween: 20,
    grabCursor: true,
  });

  const swiperCollection = new Swiper('#swiperCollection', {
    spaceBetween: 5,
    grabCursor: true,
  });

  const swiperOffers = new Swiper('#swiperOffers', {
    spaceBetween: 5,
    grabCursor: true,
  });


