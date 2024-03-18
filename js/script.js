let items = JSON.parse(localStorage.getItem('cart-items')) !== null ? JSON.parse(localStorage.getItem('cart-items')) : [];
const allBooks = [];

window.onload = () => {
    document.querySelector('#clearCart').addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    })

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
        console.log(error)
    
    } finally {
        hideSpinner();
        showResults();
        items.length > 0 ?  cart(items) : emptyCart();
    }
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.add('d-none')
}

const showResults = () => {
    document.querySelector('.results-section').classList.remove('d-none');
}

const createMainCards = (book, section) => {
    let {img, title, price} = book;

    const popularResults = document.querySelector(section);

    const col = document.createElement('div');
    section !== '.search-results' ? col.classList.add('col', 'swiper-slide') : col.classList.add('col') ;
    
    const card = document.createElement('div');
    card.classList.add('card', 'pt-3', 'px-3', 'border-0', 'rounded-4', 'main-card');

    const badgeCard = document.createElement('span');
    badgeCard.classList.add('badge-card');

    items.forEach(item => {
        if (item.title === title ) {
            badgeCard.classList.add('active');
        } 
    })

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

    const buttonCard = document.createElement('button');
    buttonCard.classList.add('btn','bg--red','text-white', 'px-2', 'rounded-pill', 'searchbar__button');

    buttonCard.addEventListener('click', () => {
        addItemToCart(title, price);
    })
    
    const spanPrice = document.createElement('span');
    spanPrice.classList.add('small', 'ps-2', 'p-0')
    spanPrice.innerHTML = price + ' $';
    
    const cartIcon = document.createElement('span');
    cartIcon.innerHTML = `<ion-icon name="cart-outline"></ion-icon>`;

    buttonCard.append(cartIcon, spanPrice)
    cardText.append(buttonCard);
    cardBody.append(titleCard, cardText);
    card.append(badgeCard, imgCard, cardBody);
    col.append(card);
    popularResults.append(col);
}

const createMiniatureCards = (book, section) => {
    let {img, title, price } = book;

    const results = document.querySelector(section);

    const col = document.createElement('div');
    col.classList.add('col', 'py-3', 'swiper-slide');
    
    const card = document.createElement('div');
    card.classList.add('card', 'flex-row', 'card--white', 'border-0', 'p-0');
    
    const badgeCard = document.createElement('span');
    badgeCard.classList.add('badge-card', 'badge-card--miniature');

    items.forEach(item => {
        if (item.title === title ) {
            badgeCard.classList.add('active');
        } 
    })
    
    const row = document.createElement('div');
    row.classList.add('row', 'align-items-center');
    
    const col4 = document.createElement('div');
    col4.classList.add('col-4');
    
    const miniatureContainer = document.createElement('div');
    miniatureContainer.classList.add('miniature__container');
    
    const miniature = document.createElement('div');
    miniature.classList.add('miniature');
    miniature.innerHTML = `<img src="${img}" alt="" class="object-fit-cover w-100 h-100 card-img">`;

    
    const col8 = document.createElement('div');
    col8.classList.add('col-8');
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'p-0', 'ps-2');
    
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = `<h5 class="small  ">${title}</h5>`
    
    const cardText = document.createElement('div');
    cardText.classList.add('card-text', 'd-flex', 'justify-content-start');
    
    
    const buttonCard = document.createElement('button');
    buttonCard.classList.add('btn','bg--red','text-white', 'px-2', 'rounded-pill', 'searchbar__button');
    
    buttonCard.addEventListener('click', () => {
        addItemToCart(title, price);
    })
    
    const spanPrice = document.createElement('span');
    spanPrice.classList.add('small', 'ps-2', 'p-0')
    spanPrice.innerHTML = price + ' $';
    
    const cartIcon = document.createElement('span');
    cartIcon.innerHTML = `<ion-icon name="cart-outline"></ion-icon>`;
    
    
    results.append(col)
    col.append(card)
    card.append(badgeCard, row);
    row.append(col4, col8);
    col4.append(miniatureContainer);
    miniatureContainer.append(miniature);
    col8.append(cardBody);
    cardBody.append(cardTitle, cardText);
    cardText.append(buttonCard);
    buttonCard.append(cartIcon, spanPrice)
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

const removeItem = (book) => {
    items = items.filter(item => item.title !== book);

    localStorage.setItem('cart-items', JSON.stringify(items));
    location.reload();
}

const createCartItem = (item) => {
    const itemsList = document.querySelector('.cart__items-list');
    
    const liElement = document.createElement('li');
    liElement.classList.add('cart__item', 'list-group-item', 'ps-2', 'small', 'd-flex', 'align-items-center', 'flex-row')
    
    liElement.innerHTML = /* HTML */ `
            <button type="button" class="btn-close me-1" onclick="removeItem('${item.title}')"></button>        
            <a href="#" class="title text-secondary text-decoration-none text-truncate me-2 w-100 ">${item.title}</a>
            <span class="rounded-pill p-2 bg--orange price-item">${item.price}&nbsp;$</span>
    `;
    itemsList.append(liElement)
}

const cart = (items) => {
    document.querySelector('.cart__fully').classList.remove('d-none');
    
    items.forEach(item => createCartItem(item))

    totalCart = items.reduce((partial, items) => items.price + partial, 0)

    document.querySelector('#totalItems').innerHTML = `${items.length}`
    document.querySelector('.total-price__item').innerHTML = `${totalCart.toFixed(2)} $`
}

const emptyCart = () => {
    document.querySelector('.cart__empty').classList.remove('d-none');
}

const searchItems = (form) => {
    let query = document.querySelector(form).value.toLowerCase();

    if(query.length >= 3) {
        let results = allBooks.filter(book => book.title.toLowerCase().includes(query) );
        document.querySelector('.search-results').innerHTML = '';
        
        if (results.length > 0) {
            document.querySelector('.search-section').classList.remove('d-none')
            results.forEach(result => createMainCards(result, '.search-results'))
        } 
    
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
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 5
        },
        1440: {
          slidesPerView: 6
        },
        1720: {
          slidesPerView: 8
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


