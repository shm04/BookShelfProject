/* CLASSES */
/* class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
} */
class Bookshelf {
  constructor() {
    this.booksCollection = [];
  }

  add(bookID, bookTitle, bookAuthor) {
    // new Book(bookID, bookTitle, bookAuthor);
    const book = {id:bookID, title:bookTitle, author:bookAuthor}
    this.booksCollection.push(book);
  }

  getAll() {
    return this.booksCollection;
  }

  remove(bookID) {
    this.booksCollection = this.booksCollection.filter((book) => book.id !== bookID);
  }
}

const booksCollection = new Bookshelf();

/* DOM CONSTANTS */
const bookShelfWrapper = document.querySelector('.wrapper');

function renderShelf(booksCollection) {
  const booksList = booksCollection.getAll();
  bookShelfWrapper.innerHTML = `
  <ul class="shelf-container">
    ${booksList.map((book) => `
      <li class="shelf-item" id="${book.id}">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <button type="button" class="btn btn-remove-book">Delete Book</button>
      </li>`).join('')}
  </ul>
  <div class="booksInput-container">
    <h3 class="book-title">Add New Book</h3>
    <form class="booksInput" action="">
      <input type="text" class="book-title-in" placeholder="Title">
      <input type="text" class="book-author-in" placeholder="Author">
      <button class="btn btn-add-book">Add Book</button>
    </form>
  </div>`;

  document.querySelector('.btn-add-book').addEventListener('click', () => {
    /* CREATE UNIQUE ID FOR EACH BOOK */
    const uid = String(Date.now().toString(32) + Math.random().toString(16)).replace('.', '');

    const title = document.querySelector('.book-title-in').value;
    const author = document.querySelector('.book-author-in').value;

    booksCollection.add(uid, title, author);
    renderShelf(booksCollection);
  });

  document.querySelectorAll('.btn-remove-book').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
      const callerBookID = event.target.parentNode.id;
      booksCollection.remove(callerBookID);
      renderShelf(booksCollection);
    });
  });
}

renderShelf(booksCollection);