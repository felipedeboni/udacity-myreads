import React from 'react';
import SearchPage from './SearchPage';
import { shallow } from 'enzyme';

const results = [
  {
    title: 'React',
    subtitle: 'Die praktische Einführung in React, React Router und Redux',
    authors: ['Nils Hartmann', 'Oliver Zeigermann'],
    publisher: 'dpunkt.verlag',
    publishedDate: '2016-07-07',
    description:
      'React ist ein JavaScript-Framework zur Entwicklung von Benutzeroberflächen sowohl im Browser als auch auf Mobilgeräten. Entwickelt und eingesetzt von Facebook ist es mittlerweile als Open-Source-Projekt verfügbar und hat sich bereits im Einsatz bei diversen namhaften Websites, wie z. B. Airbnb und Netflix, bewährt. Dieses Buch stellt Ihnen die Konzepte von React, React Router und Redux anhand eines durchgehenden Beispiels vor. Sie lernen, wie Sie mit React wiederverwendbare UI-Komponenten entwickeln und wie Sie auf Basis der einzelnen Komponenten ganze Anwendungen zusammenbauen. Unter anderem werden folgende Themen behandelt: - Entwickeln und Testen eigener React-Komponenten auf Basis des JavaScript-Standards ECMAScript 2015 (ES6) - Routing mit dem React Router - Das Architektur-Modell Flux und wie damit komplette Anwendungen umgesetzt werden (am Beispiel des Redux-Frameworks) - Serverseitiges Rendern von React-Komponenten und -Anwendungen - Anbindung eines REST-Backends Die im Buch eingesetzten Sprachfeatures aus ES6 werden in einem eigenen Kapitel vorgestellt, sodass zum Verständnis des Buches Kenntnisse von ES5 ausreichen. Nach der Lektüre des Buches werden Sie in der Lage sein, eigene Projekte mit React umzusetzen.',
    industryIdentifiers: [
      {
        type: 'ISBN_13',
        identifier: '9783864919640'
      },
      {
        type: 'ISBN_10',
        identifier: '3864919649'
      }
    ],
    readingModes: {
      text: true,
      image: false
    },
    pageCount: 342,
    printType: 'BOOK',
    categories: ['Computers'],
    maturityRating: 'NOT_MATURE',
    allowAnonLogging: true,
    contentVersion: '1.4.3.0.preview.2',
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false
    },
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    language: 'de',
    previewLink:
      'http://books.google.com/books?id=IOejDAAAQBAJ&dq=redux+react&hl=&cd=15&source=gbs_api',
    infoLink:
      'http://books.google.com/books?id=IOejDAAAQBAJ&dq=redux+react&hl=&source=gbs_api',
    canonicalVolumeLink:
      'https://books.google.com/books/about/React.html?hl=&id=IOejDAAAQBAJ',
    id: 'IOejDAAAQBAJ'
  }
];

it('renders without crashing', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  expect(wrapper).toMatchSnapshot();
});

it('should include a link to the homepage', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  expect(wrapper.find('Link[to="/"]').exists()).toBe(true);
});

it('should not be possible to remove book from shelf', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  wrapper.setState({ results });
  expect(wrapper.find('Book[hideNone=true]').exists()).toBe(true);
});

it('clear should clear all results', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  wrapper.setState({ results });
  wrapper.instance().clear();
  wrapper.update();
  expect(wrapper.find('Book').length).toBe(0);
});

it('update query should call search when query is valid', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  const inst = wrapper.instance();
  const searchFn = jest.fn();

  inst.search = searchFn;
  inst.updateQuery('android');
  expect(searchFn).toHaveBeenCalled();
});

it('update query should call clear when query is invalid', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  const inst = wrapper.instance();
  const clearFn = jest.fn();

  inst.clear = clearFn;
  inst.updateQuery(' ');
  expect(clearFn).toHaveBeenCalled();
});

it('search input should call update query when changed', () => {
  const wrapper = shallow(
    <SearchPage myBooks={[]} onMoveToShelf={jest.fn()} />
  );

  const inst = wrapper.instance();
  const updateQueryFn = jest.fn();

  inst.updateQuery = updateQueryFn;
  wrapper.find('.search-books-input-wrapper input').simulate('change', {
    target: {
      value: 'android'
    }
  });

  expect(updateQueryFn).toHaveBeenCalled();
});
