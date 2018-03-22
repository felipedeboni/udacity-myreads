import React from 'react';
import HomePage from './HomePage';
import { BOOKSHELVES } from '../utils/constants';
import { shallow } from 'enzyme';

const books = [];
it('renders without crashing', () => {
  const test = <HomePage books={books} onMoveToShelf={jest.fn()} />;

  expect(shallow(test)).toMatchSnapshot();
});

it('should have a link to the search page', () => {
  const test = shallow(<HomePage books={books} onMoveToShelf={jest.fn()} />);

  expect(test.find('Link[to="/search"]').exists()).toBe(true);
});

it('should show bookshelves', () => {
  const test = shallow(<HomePage books={books} onMoveToShelf={jest.fn()} />);

  for (let bookshelf of BOOKSHELVES) {
    expect(test.find(`Bookshelf[id="${bookshelf.id}"]`).exists()).toBe(true);
  }
});
