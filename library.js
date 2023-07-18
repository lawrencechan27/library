// create empty library array
let myLibrary = [];

// object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// pre-populate some books for testing purposes
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let book2 = new Book("1984", "George Orwell", 336, true);
let book3 = new Book("To Kill A Mockingbird", "Harper Lee", 281, true);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

// reference open form button and add function to it
const formBtn = document.getElementById('formBtn');
formBtn.addEventListener('click', openBookForm);

// function to unhide form div as a popup
function openBookForm() {
    // reference form and add .visible class
    let bookForm = document.getElementById('bookForm');
    bookForm.classList.add('visible');
}

// reference add book button and add function to it
const addBook = document.getElementById('addBtn');
addBook.addEventListener('click', addBookToLibrary);

// function to add book to array
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
}
// render book function
function renderBooks() {
    // reference bookshelf and clear it
    let bookshelf = document.querySelector('.bookshelf');
    bookshelf.innerHTML = "";
    for (i = 0; i < myLibrary.length; i++) {
        // create new div with class of bookCard
        let bookCard = document.createElement('div');
        bookCard.setAttribute('class', 'bookCard');
        // give div data attribute that matches the id in array (for removal purposes)
        bookCard.setAttribute('data-bookid', i);
        // add book details in
        bookCard.innerHTML = `<p>${myLibrary[i].title}</p><p>${myLibrary[i].author}</p><p>${myLibrary[i].pages} Pages</p><p>Read? ${myLibrary[i].read}</p><button class="removeBtn">Remove</button><button class="readBtn">Read</button>`;
        // add div to bookshelf
        bookshelf.appendChild(bookCard);
    }
    // below needs to be run after every render, otherwise new renders won't have listeners/functions attached to them
    // select ALL instances of .removeBtn using querySelectorAll
    const removeBtns = document.querySelectorAll('.removeBtn');
    // assign function to all instances using forEach
    removeBtns.forEach(function (removeBtn) {
        removeBtn.addEventListener('click', removeBook);
    });
    // select all instances of .readBtn using querySelectorAll
    const readBtns = document.querySelectorAll('.readBtn');
    // assign functions to all instances using forEach
    readBtns.forEach(function(readBtn){
        readBtn.addEventListener('click', toggleRead);
    });
}

// call render function for page init
renderBooks();

// remove book function
function removeBook(event) {
    // define parent of target
    let parentDiv = event.target.parentNode;
    // get id from div's data-attribute
    let bookId = parentDiv.getAttribute('data-bookid');
    // remove book from myLibrary array using the index number (which shold match bookId data attribute)
    myLibrary.splice(bookId, 1);
    // update renders
    renderBooks();
}

// toggle read function
function toggleRead(event) {
    // define parent of target
    let parentDiv = event.target.parentNode;
    // get id from div's data-attribute
    let bookId = parentDiv.getAttribute('data-bookid');
    // remove book from myLibrary array using the index number (which shold match bookId data attribute)
    myLibrary[bookId].read = !myLibrary[bookId].read;
    // update renders
    renderBooks();
}