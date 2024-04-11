class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(book => {
            UI.addBookToUI(book);
        });
    }
    static addBookToUI(book){
        const tbody = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a onclick="deleteBook(this)">X</td>
        `
        tbody.appendChild(row);
    }
    static removeItems(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value= '';
        document.querySelector('#isbn').value= '';
    }
    static removeBook(book){
        book.remove();
    }
}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((e,index)=>{
            if(e.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded', UI.displayBooks())
document.querySelector('#button-form').addEventListener('click',(e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if(title === '' || author === '' || isbn ===''){
        alert('Nisi popunio sva polja')
    }
    else{
        let book = new Book(title, author, isbn);
        Store.addBook(book);
        UI.addBookToUI(book);
        UI.removeItems();
    }
    
});
function deleteBook(e){
    Store.removeBook(e.parentElement.previousElementSibling.textContent);
    UI.removeBook(e.parentElement.parentElement);
}
;
