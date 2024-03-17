window.onload = () => {
    getBooks()
    .then(res => {
        res.forEach(book => createMainCards(book))
        res.filter(book => book.price < 5).forEach(bookFiltered => createMiniatureCard(bookFiltered, '.offers-results'))
        res.filter(book => book.price > 10).forEach(bookFiltered => createMiniatureCard(bookFiltered, '.collection-results'))
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

const createMainCards = (book) => {
    let {img, title, price } = book;

    const popularResults = document.querySelector('.popular-results');

    const col = document.createElement('div');
    col.classList.add('col', 'swiper-slide');
    
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
        <a href="#" class="bg--red text-white px-2 rounded-pill  searchbar__button text-center text-decoration-none " role="button">
            <ion-icon name="cart-outline"></ion-icon><span class="small ps-2 p-0">${price} $</span>
        </a>
    `

    cardBody.append(titleCard, cardText);
    card.append(imgCard, cardBody);
    col.append(card);
    popularResults.append(col);
}

const createMiniatureCard = (book, section) => {
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
                            <a href="#" class="bg--red text-white px-3 rounded-pill  searchbar__button text-center text-decoration-none " role="button">
                                <ion-icon name="cart-outline"></ion-icon><span class="small ps-2 p-0">${price}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    results.append(card)
}


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
    navigation: {
      nextEl: '.swiperCollection-button-next',
      prevEl: '.swiperCollection-button-prev',
    },
    breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
    },
    spaceBetween: 5,
    grabCursor: true,
  });

  const swiperOffers = new Swiper('#swiperOffers', {
    navigation: {
      nextEl: '.swiperOffers-button-next',
      prevEl: '.swiperOffers-button-prev',
    },
    breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
    },
    spaceBetween: 5,
    grabCursor: true,
  });