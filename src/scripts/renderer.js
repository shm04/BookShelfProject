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
/* ================================================================ */

/* DOM CONSTANTS */
const sectionWrapper = document.querySelector('.section-wrapper');
const dateNow = document.querySelector('.now');

/* UTILITY */
const booksCollection = new Bookshelf();
const date = new Date();
const dataEntry = JSON.parse(localStorage.getItem('dataEntry')) ?? {};

// Format date to match design MMMM DD YYYY, h:mm:ss am //
const dateFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};
// Print the date and time //
dateNow.textContent = `${date.toLocaleDateString('en-US', dateFormatOptions).replace(',', '').replace(' at', ',')}`;

// Clear the content section //
function clearSection(section) {
  if (section.hasChildNodes()) {
    section.removeChild(section.firstChild);
  }
}

// Store the input to local storage //
function store(dataEntry) {
  localStorage.setItem('dataEntry', JSON.stringify(dataEntry));
}
/* =========================================== */

/* MAIN RENDERS */
function renderBooksList(booksCollection) {
  // Clear the section to generate the new one //
  clearSection(sectionWrapper);

  const booksList = booksCollection.getAll();
  sectionWrapper.innerHTML = `
    <div class="books-list-wrapper dflex flex-col">
      <h1 class="title">All awesome books</h1>
      <ul class="shelf-container fwn dflex flex-col">
        ${booksList.map((book) => `
          <li class="shelf-item dflex justbet fwn" id="${book.id}">
            <p class="book-title fwn">"${book.title}" by ${book.author}</p>
            <button type="button" class="btn btn-remove-book">Remove</button>
          </li>`).join('')}
      </ul>
    </div>`;

  document.querySelectorAll('.btn-remove-book').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
      const callerBookID = event.target.parentNode.id;
      booksCollection.remove(callerBookID);
      renderBooksList(booksCollection);
    });
  });
}

function renderAddBook() {
  // Clear the section to generate the new one //
  clearSection(sectionWrapper);

  sectionWrapper.innerHTML = `
  <div class="booksInput-container">
    <h1 class="title">Add a new book</h1>
    <form class="booksInput flex-col-ct dflex fwn" action="">
      <label for="title" class="dflex form__lbl flex-col">Title:
        <input id="title" type="text" class="book-title-in data-input" placeholder="Title" required="true">
      </label>
      <label for="author" class="dflex form__lbl flex-col">Author:
        <input id="author" type="text" class="book-author-in data-input" placeholder="Author" required="true">
        <button class="btn btn-add-book" type="submit">Add</button>
      </label>
    </form>
  </div>

  <span class="empty-field hidden"> Title and Author can't be empty space!</span>`;

  const bookTitle = document.querySelector('.book-title-in');
  const bookAuthor = document.querySelector('.book-author-in');
  const emptyInput = document.querySelector('.empty-field');

  // Read from local storage //
  if (dataEntry) {
    bookTitle.value = dataEntry.title || '';
    bookAuthor.value = dataEntry.author || '';
  }

  // Write to local storage as the user types //
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
    }
  });
}

function renderContctInfo() {
  // Clear the section to generate the new one //
  clearSection(sectionWrapper);

  sectionWrapper.innerHTML = `
    <div class="contact-wrapper dflex flex-col">
      <h1 class="title">Contact Information</h1>
      <p>Do have any questions or just want to say "Hello"?<br>You can reach out to us!</p>
      <ul>
        <li>Our e-mail <a href="mailto:myemail@domain.com">myemail@domain.com</li>
        <li>Our Phone number: +1-123-832-2525</li>
        <li>Our address: Solar st. Planet 3rd, Via Lactea, Universe.</li>
      </ul>
    </div>
    `;
}
/* ======================================================================== */

/* SECTIONS FOR NAVIGATION */
renderBooksList(booksCollection);

document.querySelectorAll('.nav-link').forEach((navLink) => {
  navLink.firstChild.addEventListener('click', (event) => {
    const eTarget = event.target.id;
    switch (eTarget) {
      case 'list':
        renderBooksList(booksCollection);
        break;
      case 'add':
        renderAddBook();
        break;
      case 'contact':
        renderContctInfo();
        break;
      default:
        renderBooksList(booksCollection);
    }
  });
});