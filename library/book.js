// to store new instances of Book
const myLibrary = [];

class Book {
    constructor(_title, _author, _pages, _read) {
        this.title = _title;
        this.author = _author;
        this.pages = _pages;
        this.read = _read;
    }

    info = () => {
        console.log(`${this.title}, by ${this.author}, ${this.pages}, ${this.read}`)
    }
}

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet");
// const harryPotter = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "223 pages", "read");
// const dune = new Book("Dune", "Frank Herbert", "412 pages", "read");
// const foundation = new Book("Foundation", "Isaac Asimov", "255 pages", "not read yet");
// const braveNewWorld = new Book("Brave New World", "Aldous Huxley", "311 pages", "read");

// myLibrary.push(theHobbit, harryPotter, dune, foundation, braveNewWorld);

function getBookPropertiesLength(book) {
    let count = 0;
    for (let key in book) {
        if (book.hasOwnProperty(key) && typeof book[key] !== 'function') {
            count++;
        }
    }
    return count;
}

let tableColumns = getBookPropertiesLength(Book);
let tableRows = myLibrary.length;

function createTable() {
    const tbl = document.createElement("table");
    tbl.id = 'myTable';
    const tblBody = document.createElement("tbody");
    tblBody.id = 'myTableBody';

    for (let i = 0; i < tableRows; i++) {
        const row = document.createElement('tr');
        const book = myLibrary[i];
        const properties = ["title", "author", "pages", "read"];
        
        for (let j = 0; j < tableColumns; j++) {
            const cell = document.createElement('td');
            cell.textContent = book[properties[j]];
            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    return tbl;
}

const tableContainer = document.getElementById('table-container');
const dynamicTable = createTable();
tableContainer.appendChild(dynamicTable);

function addNewBookToTable() {
    const tbl = document.getElementById('myTable');
    const tblBody = document.getElementById('myTableBody');
    const row = document.createElement('tr');
    const book = myLibrary[myLibrary.length - 1];
    const properties = ["title", "author", "pages", "read"];

    for (let j = 0; j <= (properties.length + 1); j++){
        const cell = document.createElement('td');
        if (j < properties.length) {
            cell.textContent = book[properties[j]];
        } else if (j == properties.length) {
            const status = document.createElement('button');
            status.innerText = "Change status";
            status.className = "changeStatus";
            cell.appendChild(status);
        } else {
            const btn = document.createElement('button');
            btn.innerText = "Delete";
            btn.id = "deleteBookButton";
            cell.appendChild(btn);
        }

        row.appendChild(cell);
    }
    
    tblBody.appendChild(row);
    
}



function toggleTableVisibility() {
    console.log('Toggling table visibility'); // Dodaj logowanie
    if (tableContainer.classList.contains('hidden')) {
        console.log('Removing hidden class'); // Logowanie usunięcia klasy
        tableContainer.classList.remove('hidden');
    } else {
        console.log('Adding hidden class'); // Logowanie dodania klasy
        tableContainer.classList.add('hidden');
    }
}

toggleTableVisibility();

// dialog 
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('.new-book');
const closeButton = document.querySelector('#closeButton');

// show the dialog
showButton.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    dialog.close();
})

// fetch data from form and add it to myLibrary
document.getElementById('AddBookForm').addEventListener('submit', function(event){
    event.preventDefault();

    var formData = new FormData(event.target);

    
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let read = formData.get('read') ? 'Read' : 'Not read yet';

    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    console.log(myLibrary);

    dialog.close();
    event.target.reset();

    addNewBookToTable();
    addDeleteButton();
    addStatusButton();

})


function addDeleteButton() {
    document.querySelectorAll('#deleteBookButton').forEach(button => {
        button.removeEventListener('click', deleteBook); // Usuń stary listener
        button.addEventListener('click', deleteBook); // Dodaj nowy listener
    });
}

function deleteBook() {
    this.closest('tr').remove();
}

function addStatusButton() {
    document.querySelectorAll('.changeStatus').forEach(button => {
        button.removeEventListener('click', changeStatus); // Usuń stary listener
        button.addEventListener('click', changeStatus); // Dodaj nowy listener
    });
}

function changeStatus() {
    const row = this.closest('tr');
    const readCell = row.cells[3];
    if (readCell.textContent == 'Read') {
        readCell.textContent = 'Not read yet';
    } else {
        readCell.textContent = 'Read';
    }
}
