const { nanoid } = require('nanoid');
const library = require('../data/library');

const addNewBook = (request, h) => {
  const {
    title,
    publicationYear,
    author,
    synopsis,
    publisher,
    totalPages,
    readPages,
    isReading,
  } = request.payload;

  if (title === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to add a book. Please provide the book title.',
    });
    response.code(400);
    return response;
  } else if (readPages > totalPages) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to add a book. readPages cannot be greater than totalPages.',
    });
    response.code(400);
    return response;
  } else {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const isFinished = totalPages === readPages;

    const newBook = {
      id,
      title,
      publicationYear,
      author,
      synopsis,
      publisher,
      totalPages,
      readPages,
      isFinished,
      isReading,
      createdAt,
      updatedAt,
    };

    library.push(newBook);

    const isSuccess = library.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Book successfully added.',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
  }

  const response = h.response({
    status: 'error',
    message: 'Failed to add the book.',
  });
  response.code(500);
  return response;
};

const getAllBooks = (request, h) => {
  const { title, isReading, isFinished } = request.query;

  if (title !== undefined) {
    const booksWithTitle = library.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: booksWithTitle.map((book) => ({
          id: book.id,
          title: book.title,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (isReading !== undefined) {
    const readingBooks = library.filter((book) => Number(book.isReading) === Number(isReading));
    const response = h.response({
      status: 'success',
      data: {
        books: readingBooks.map((book) => ({
          id: book.id,
          title: book.title,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (isFinished !== undefined) {
    const finishedBooks = library.filter((book) => book.isFinished == isFinished);
    const response = h.response({
      status: 'success',
      data: {
        books: finishedBooks.map((book) => ({
          id: book.id,
          title: book.title,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: {
        books: library.map((book) => ({
          id: book.id,
          title: book.title,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};

const getBookById = (request, h) => {
  const { id } = request.params;
  const book = library.filter((b) => b.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Book not found.',
  });
  response.code(404);
  return response;
};

const updateBookById = (request, h) => {
  const { id } = request.params;
  const {
    title,
    publicationYear,
    author,
    synopsis,
    publisher,
    totalPages,
    readPages,
    isReading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = library.findIndex((book) => book.id === id);

  if (title === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to update the book. Please provide the book title.',
    });
    response.code(400);
    return response;
  } else if (readPages > totalPages) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to update the book. readPages cannot be greater than totalPages.',
    });
    response.code(400);
    return response;
  } else if (index !== -1) {
    library[index] = {
      ...library[index],
      title,
      publicationYear,
      author,
      synopsis,
      publisher,
      totalPages,
      readPages,
      isReading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Book successfully updated.',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Failed to update the book. ID not found.',
    });
    response.code(404);
    return response;
  }
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const index = library.findIndex((book) => book.id === id);

  if (index !== -1) {
    library.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Book successfully deleted.',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to delete the book. ID not found.',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
