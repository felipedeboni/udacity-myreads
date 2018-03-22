import React from 'react';
import { Route } from 'react-router-dom';
import update from 'immutability-helper';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      if (books) this.setState({ books });
    });
  }

  moveToShelf = (book, shelf) => {
    return new Promise((resolve, reject) => {
      BooksAPI.update(book, shelf)
        .then(res => {
          this._moveBook(res, book, shelf);
          resolve();
        })
        .catch(reject);
    });
  };

  _findBookIndex = bookId => this.state.books.findIndex(_ => _.id === bookId);

  _moveBook = (shelves, book, shelf) => {
    if (book.shelf === 'none' && shelves[shelf].includes(book.id)) {
      // adding
      this._addBookToShelf(book, shelf);
    } else if (shelf === 'none' && !shelves[book.shelf].includes(book.id)) {
      // removing
      this._removeBookFromShelf(book, shelf);
    } else {
      // updating
      this._moveBookToShelf(book, shelf);
    }
  };

  _addBookToShelf = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.concat([book])
    }));
  };

  _moveBookToShelf = (book, shelf) => {
    const index = this._findBookIndex(book.id);
    this.setState(state => ({
      books: update(state.books, { [index]: { $merge: { shelf: shelf } } })
    }));
  };

  _removeBookFromShelf = (book, shelf) => {
    this.setState(state => ({
      books: state.books.filter(_ => _.id !== book.id)
    }));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              books={this.state.books}
              onMoveToShelf={this.moveToShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              myBooks={this.state.books}
              onMoveToShelf={this.moveToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
