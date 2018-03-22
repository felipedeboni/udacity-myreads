import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BOOKSHELVES } from '../utils/constants';

class Book extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      isMoving: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showLoading = () => {
    this.setState({ isMoving: true });
  };

  hideLoading = () => {
    if (this._isMounted) {
      this.setState({ isMoving: false });
    }
  };

  moveToShelf(book, value) {
    this.showLoading();

    this.props
      .onMoveToShelf(book, value)
      .then(this.hideLoading)
      .catch(this.hideLoading);
  }

  render() {
    const { book, width, height, hideNone } = this.props;
    const authors = book.authors || [];
    const image =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : '';

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: width,
              height: height,
              backgroundImage: `url(${image})`
            }}
          />
          <div
            className={`book-shelf-changer ${this.state.isMoving &&
              'book-shelf-changer--loading'}`}
          >
            <select
              value={book.shelf}
              onChange={e => this.moveToShelf(book, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              {BOOKSHELVES.map(bookshelf => (
                <option key={bookshelf.id} value={bookshelf.id}>
                  {bookshelf.title}
                </option>
              ))}
              {!hideNone && <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

Book.defaultProps = {
  hideNone: false,
  width: 128,
  height: 192
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  hideNone: PropTypes.bool,
  onMoveToShelf: PropTypes.func
};

export default Book;
