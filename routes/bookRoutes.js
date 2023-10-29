const { createNewBook, 
    getAllBooks,
    getBookDetails,
    updateBookDetails,
    removeBook, 
    updateBookById,
    getBookById,
    addNewBook,
    deleteBookById} = require('../handlers/bookHandlers');
  
  const bookRoutes = [
    {
        method: 'POST',
        path: '/library/books',
        handler: addNewBook,
    },
    {
        method: 'GET',
        path: '/library/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/library/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/library/books/{bookId}',
        handler: updateBookById,
    },
    {
        method: 'DELETE',
        path: '/library/books/{bookId}',
        handler: deleteBookById,
    },
  ];
  
module.exports = bookRoutes;
