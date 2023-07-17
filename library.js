let myLibrary = [];

// object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// pre-populate some books for testing purposes
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "No");
let book2 = new Book("1984", "George Orwell", 336, "Yes");
let book3 = new Book("To Kill A Mockingbird", "Harper Lee", 281, "Yes");
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

// reference open form button and add function to it
const formBtn = document.getElementById('formBtn');
formBtn.addEventListener('click', openBookForm);

function openBookForm() {
    // reference form and add .visible class
    let bookForm = document.getElementById('bookForm');
    bookForm.classList.add('visible');
}

// reference add book button and add function to it
const addBook = document.getElementById('addBtn');
addBook.addEventListener('click', addBookToLibrary);

function addBookToLibrary(event) {

    // prevent form trying to submit to server
    // make sure event is added to addBookToLibrary(<HERE>)
    event.preventDefault(); 

    // get book details from form input fields
    let title = document.getElementById('inputBook').value;
    let author = document.getElementById('inputAuthor').value;
    let pages = document.getElementById('inputPages').value;
    let read = document.getElementById('inputRead').value;

    // use details to create book using object constructor
    let newBook = new Book(title, author, pages, read);

    // add book to array
    myLibrary.push(newBook);

    // update screen to show new books
    renderBooks();

    // hide book form - reference form and remove .visible class
    let bookForm = document.getElementById('bookForm');
    bookForm.classList.remove('visible');

    console.table(myLibrary);

}

function renderBooks() {

    // reference bookshelf and clear it
    let bookshelf = document.querySelector('.bookshelf');
    bookshelf.innerHTML = "";

    for (i = 0; i < myLibrary.length; i++) {
        // create new div with class of bookCard
        let bookCard = document.createElement('div');
        bookCard.setAttribute('class', 'bookCard');
        // add book details in
        bookCard.innerHTML = `<p>${myLibrary[i].title}</p><p>${myLibrary[i].author}</p><p>${myLibrary[i].pages} Pages</p><p>Read? ${myLibrary[i].read}`;

        // add div to bookshelf
        bookshelf.appendChild(bookCard);
    }
}

renderBooks();