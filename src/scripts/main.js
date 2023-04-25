/* CLASSES */
class Bookshelf {
  constructor() {
    const localStg = localStorage.getItem('collection');
    if (localStg) {
      this.booksCollection = JSON.parse(localStg);
    } else {
      this.booksCollection = [];
    }
  }

  add(bookID, bookTitle, bookAuthor) {
    const book = { id: bookID, title: bookTitle, author: bookAuthor };
    this.booksCollection.push(book);
    localStorage.setItem('collection', JSON.stringify(this.booksCollection));
  }

  getAll() {
    return this.booksCollection;
  }

  remove(bookID) {
    this.booksCollection = this.booksCollection.filter((book) => book.id !== bookID);
    localStorage.setItem('collection', JSON.stringify(this.booksCollection));
  }
}

const booksCollection = new Bookshelf();

/* DOM CONSTANTS */
const bookShelfWrapper = document.querySelector('.wrapper');
const emptyInput = document.querySelector('.empty-field');

function store(dataEntry) {
  /* Save inputs to local storage */
  localStorage.setItem('dataEntry', JSON.stringify(dataEntry));
}

function renderShelf(booksCollection) {
  const booksList = booksCollection.getAll();
  bookShelfWrapper.innerHTML = `
  <ul class="shelf-container">
    ${booksList.map((book) => `
      <li class="shelf-item flex-col-st-ct dflex" id="${book.id}">
        <p class="book-title">${book.title}</p>
        <p class="book-author">${book.author}</p>
        <button type="button" class="btn btn-remove-book">Remove</button>
      </li>`).join('')}
  </ul>
  <div class="booksInput-container">
    <form class="booksInput flex-col-st-ct dflex" action="">
      <input type="text" class="book-title-in data-input" placeholder="Title" required="true">
      <input type="text" class="book-author-in data-input" placeholder="Author" required="true">
      <button class="btn btn-add-book" type="submit">Add</button>
    </form>
  </div>`;

  const bookTitle = document.querySelector('.book-title-in');
  const bookAuthor = document.querySelector('.book-author-in');

  /* Get data from local storage or initialize as empty object */
  const dataEntry = JSON.parse(localStorage.getItem('dataEntry')) ?? {};

  if (dataEntry) {
    /* Read from local storage */
    bookTitle.value = dataEntry.title || '';
    bookAuthor.value = dataEntry.author || '';
  }

  /* Write to local storage as the user types */
  bookTitle.addEventListener('input', () => {
    if (!emptyInput.classList.contains('hidden')) { emptyInput.classList.add('hidden'); }
    dataEntry.title = bookTitle.value;
    store(dataEntry);
  });

  bookAuthor.addEventListener('input', () => {
    if (!emptyInput.classList.contains('hidden')) { emptyInput.classList.add('hidden'); }
    dataEntry.author = bookAuthor.value;
    store(dataEntry);
  });
  /* ========================================= */

  document.querySelector('.booksInput').addEventListener('submit', (event) => {
    if (!bookTitle.value.trim() || !bookAuthor.value.trim()) {
      event.preventDefault();
      emptyInput.classList.remove('hidden');
    } else {
      /* Create a unique id for each book to remove with filter */
      const uid = String(Date.now().toString(32) + Math.random().toString(16)).replace('.', '');

      const { title, author } = dataEntry;
      booksCollection.add(uid, title, author);

      /* Keep author for multiple books of same writer */
      dataEntry.title = '';
      store(dataEntry);

      renderShelf(booksCollection);
    }
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