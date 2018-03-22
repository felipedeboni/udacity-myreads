import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BOOKSHELVES } from '../utils/constants';
import Bookshelf from '../components/Bookshelf';

const HomePage = ({ books, onMoveToShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {BOOKSHELVES.map((bookshelf, index) => (
          <Bookshelf
            key={index}
            id={bookshelf.id}
            title={bookshelf.title}
            books={books}
            onMoveToShelf={onMoveToShelf}
          />
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveToShelf: PropTypes.func.isRequired
};

export default HomePage;
