// const booksCollection = new Bookshelf();

/* DOM CONSTANTS */
const sectionWrapper = document.querySelector('.section-wrapper');
const dateNow = document.querySelector('.now');
const bookTitle = document.querySelector('.book-title-in');
  const bookAuthor = document.querySelector('.book-author-in');

/* PRINT DATE AND TIME BELOW HEADER */
const date = new Date();

/* Format date to match design MMMM DD YYYY, h:mm:ss am */
const dateFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};

dateNow.textContent = `${date.toLocaleDateString('en-US', dateFormatOptions).replace(',', '').replace(' at', ',')}`;
/* ========================================= */

function clearSection(section) {
  if (section.hasChildNodes()) {
    section.removeChild(section.firstChild);
  }
}

/* MAIN RENDERS */

function renderBooksList() {

}

function renderAddBook() {
  clearSection(sectionWrapper);

  sectionWrapper.innerHTML = `<div class="booksInput-container">
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
}
// function renderContctInfo()

/* SECTIONS FOR NAVIGATION */

renderAddBook();