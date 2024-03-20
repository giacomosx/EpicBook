const param = new URLSearchParams(window.location.search);
const asin = param.get('asin');

const getBook = async () => {
    let url = 'https://striveschool-api.herokuapp.com/books/';
    try {
        const response = await fetch(url + asin);
        const data = await response.json();
        return data

    } catch (error) {
        console.log(error);

        document.querySelector('.book-name').innerHTML = 'Somthing Wrong!';
        document.querySelector('.details-results').innerHTML =/*HTML*/ `
                <div class="justify-content-center h-100 w-100 align-items-center text-secondary py-5">
                    <h5>Ops...I'm Sorry!</h5>
                    <p>No details found for asin code: ${asin}</p>
                </div>
                `;
    }
}


getBook().then(res => showDetails(res))

getBooks()
    .then(res => {
        res.filter(book => book.price > 10).forEach(bookFiltered => createMiniatureCards(bookFiltered, '.collection-results'))
        res.filter(book => book.price < 5).forEach(bookFiltered => createMiniatureCards(bookFiltered, '.offers-results'))
    })


const showDetails = (book) => {

    const {asin, title, img, category, price} = book;

    document.querySelector('.book-name').innerHTML = `${title}`;

    document.querySelector('.details-results').innerHTML = /* HTML */ `
    <div class="row row-gap-3 ">
        <div class="col-12 col-md-4">
            <img src="${img}" alt="" class="rounded-2 w-100 h-100 object-fit-cover ">
        </div>
        <div class="col-12 col-md-8">
            <h3 class="my-2 p-0 h4">Details:</h3>
            <ul class="list-group">
                <li class="list-group-item fw-bold d-flex justify-content-between ">
                    Category: <span class="text-secondary fw-normal">${category}</span>
                </li>
                <li class="list-group-item fw-bold d-flex justify-content-between ">
                    Price: <span class="text-secondary fw-normal">${price}&nbsp;$</span>
                </li>
                <li class="list-group-item fw-bold d-flex justify-content-between ">
                    Asin code: <span class="text-secondary fw-normal small">${asin}</span>
                </li>
            </ul>
        </div>
    </div>

    `

}