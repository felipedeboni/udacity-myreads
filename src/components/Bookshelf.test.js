import React from 'react';
import Bookshelf from './Bookshelf';
import { shallow } from 'enzyme';

const books = [
  {
    id: 'IOejDAAAQBAJ',
    shelf: 'currentlyReading'
  },
  {
    id: 'sJf1vQAACAAJ',
    shelf: 'currentlyReading'
  },
  {
    id: 'xlp6NE2NWecC',
    shelf: 'wantToRead'
  }
];

it('renders without crashing', () => {
  const wrapper = shallow(
    <Bookshelf
      id="currentlyReading"
      title="Currently Reading"
      books={books}
      onMoveToShelf={jest.fn()}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('should only show his books', () => {
  const wrapper = shallow(
    <Bookshelf
      id="currentlyReading"
      title="Currently Reading"
      books={books}
      onMoveToShelf={jest.fn()}
    />
  );
  expect(wrapper.find('Book').length).toBe(2);
});
