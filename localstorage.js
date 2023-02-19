/* eslint max-classes-per-file: ["error", 2] */

const addNewBookBtn = document.querySelector('#addNewbookBtn');
const addBookPopUp = document.querySelector('.addBookPopUp');
const listBtn = document.querySelector('#list');
const bookListPopUp = document.querySelector('.bookList');
const contact = document.querySelector('.contact');
const contactBtn = document.querySelector('#contact')
const inputField = document.querySelector('#inputField');
const bookContainer = document.querySelector('.bookList');
const books = JSON.parse(localStorage.getItem("bookStr")) || [];

/* add and remove books  */
const { title, author } = inputField.elements;

class Book {
    constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor(){
    this.books = books;
  }

  addBooks(title, author) {
    const idRandom = Math.floor(Math.random() * 100000);
    const bookInfo = new Book(idRandom, title.value, author.value);
    this.books.push(bookInfo);
    localStorage.setItem("bookStr", JSON.stringify(this.books));
  }

   remove(id) {
    const removedBooks = this.books.filter(book => book.id === id);
    console.log(this.book)
    if (removedBooks.length === 1) {
      this.books = this.books.filter(book => book.id !== id);
    localStorage.setItem("bookStr", JSON.stringify(this.books));
    }
   window.location.reload();
  }
}
const library = new Library();
inputField.addEventListener("submit", () => {
  library.addBooks(title, author);
});


function generateBooks(books) {
  books.forEach((book) => {
    const title = book.title[0].toUpperCase() + book.title.slice(1);
    const author = book.author[0].toUpperCase() + book.author.slice(1);
    const div = document.createElement("div");
    div.classList.add('items')
    div.innerHTML = `
        <p> "${title}" by <strong>${author}</strong></p>
        <button onclick="library.remove(${book.id})" type="button" >Remove</button>
        `;
    bookContainer.appendChild(div);
  });
}

generateBooks(books);



/* popUp appear/disappear */

const openClosePopUp = () =>{
  addNewBookBtn.addEventListener('click', () => {
      addBookPopUp.style.display = 'block';
      bookListPopUp.style.display = 'none';
      contact.style.display = 'none';
    });
listBtn.addEventListener('click',() => {
    bookListPopUp.style.display = 'flex';
    addBookPopUp.style.display = 'none';
    contact.style.display = 'none';
  })
contactBtn.addEventListener('click',()=>{
   contact.style.display='flex';
  bookListPopUp.style.display = 'none';
  addBookPopUp.style.display = 'none';
})
}
openClosePopUp();

/* for showing time and date */

function updateTime() {
        let today = new Date();
        let options = { month: 'short', day: 'numeric', year: 'numeric' };
        let date = today.toLocaleString('en-US', options);
        let time = today.toLocaleTimeString();
        document.getElementById("date-time").innerHTML = `${date} , ${time}`;
      }
      updateTime();
      setInterval(updateTime, 1000);