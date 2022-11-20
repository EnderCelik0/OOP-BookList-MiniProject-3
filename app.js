function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

// ADD BOOK TO LIST
UI.prototype.addBook = (book) => {
  const list = document.getElementById('book-list');

  // create tr element
  const row = document.createElement('tr');
  // insert columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  // append row to list
  list.appendChild(row);
};

UI.prototype.deleteBook = (target) => {
  if ((target.className = 'delete')) {
    target.parentElement.parentElement.remove();
  }
};

// CLEAR FIELDS WHEN SUCCESS OR ERROR CASE
UI.prototype.clearFields = () => {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// SHOW SUCCESS OR ERROR ALERT
UI.prototype.showAlert = (message, className) => {
  // create div element
  const div = document.createElement('div');
  // add class
  div.className = `alert ${className}`;
  // add message to div
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#book-form');

  // insert div before form
  container.insertBefore(div, form);

  // delete alert after 2 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
};

// EVENT LISTENER FOR ADD BOOK
document.getElementById('book-form').addEventListener('submit', function (e) {
  // get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  // instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();
  // form validation
  if (title == '' || author == '' || isbn == '') {
    ui.showAlert('Please fill in all fields ', 'error');
    ui.clearFields();
  } else {
    ui.addBook(book);
    ui.clearFields();
    ui.showAlert('Book Added to List', 'success');
  }
  e.preventDefault();
});

// EVENT LISTENER FOR DELETE BOOK
document.getElementById('book-list').addEventListener('click', (e) => {
  // instantiate UI
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // show delete message
  ui.showAlert('Book Deleted !', 'success');
  e.preventDefault();
});
