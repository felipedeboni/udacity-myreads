import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = ({ id, title, onMoveToShelf, books }) => {
  const booksOnShelf = books.filter(book => book.shelf === id);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnShelf.map(book => (
            <li key={book.id}>
              <Book book={book} onMoveToShelf={onMoveToShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMoveToShelf: PropTypes.func.isRequired
};

export default Bookshelf;
