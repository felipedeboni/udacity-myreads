import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';

class SearchPage extends Component {
  constructor() {
    super();

    this.search = debounce(400, this.search);

    this.state = {
      query: '',
      results: []
    };
  }

  updateQuery = query => {
    this.setState({ query: query });

    if (!query.trim()) {
      this.clear();
    } else {
      this.search(query);
    }
  };

  search = query => {
    // we need to check if the query is equals to the state query bc the debounce
    if (this.state.query !== query) return;

    BooksAPI.search(this.state.query, 10).then(results => {
      if (results.error) {
        return this.clear();
      }
      this.setState({ results });
    });
  };

  clear = () => {
    this.setState({
      results: []
    });
  };

  render() {
    const { myBooks, onMoveToShelf } = this.props;

    const results = this.state.results.map(book => {
      const mybook = myBooks.find(_ => _.id === book.id) || {};
      book.shelf = !!mybook.shelf ? mybook.shelf : 'none';

      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  hideNone={true}
                  onMoveToShelf={onMoveToShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onMoveToShelf: PropTypes.func.isRequired
};

export default SearchPage;
