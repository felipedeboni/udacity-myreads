import React from 'react';
import Book from './Book';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

const simpleBook = {
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
  id: 'IOejDAAAQBAJ',
  shelf: 'currentlyReading'
};

it('renders without crashing', () => {
  const test = <Book book={simpleBook} />;

  expect(shallow(test)).toMatchSnapshot();
});

it('renders with default width and height', () => {
  const test = <Book book={simpleBook} />;
  const wrapper = shallow(test);
  expect(wrapper.find('.book-cover').html()).toEqual(
    expect.stringContaining('width:128px;height:192px;')
  );
});

it('renders with custom width and height', () => {
  const test = <Book book={simpleBook} width={100} height={100} />;
  const wrapper = shallow(test);
  expect(wrapper.find('.book-cover').html()).toEqual(
    expect.stringContaining('width:100px;height:100px;')
  );
});

it('renders moveTo none option', () => {
  const test = <Book book={simpleBook} />;
  const wrapper = shallow(test);
  expect(wrapper.find('.book-shelf-changer option[value="none"]').length).toBe(
    2
  );
});

it('does not render moveTo none', () => {
  const test = <Book book={simpleBook} hideNone={true} />;
  const wrapper = shallow(test);
  expect(wrapper.find('.book-shelf-changer option[value="none"]').length).toBe(
    1
  );
});

it('should show loading and hide loading', () => {
  const test = mount(<Book book={simpleBook} />);
  test.instance().showLoading();
  test.update();
  expect(
    test.find('.book-shelf-changer').hasClass('book-shelf-changer--loading')
  ).toBe(true);
  test.instance().hideLoading();
  test.update();
  expect(
    test.find('.book-shelf-changer').hasClass('book-shelf-changer--loading')
  ).toBe(false);
});

it('should properly set _isMounted', () => {
  const test = mount(<Book book={simpleBook} />);
  expect(test.instance()._isMounted).toBe(true);
  test.instance().componentWillUnmount();
  expect(test.instance()._isMounted).toBe(false);
});

it('should call onMoveToShelf when select value change', () => {
  const onMoveToShelf = jest.fn().mockImplementation(() => Promise.resolve());
  const test = mount(<Book book={simpleBook} onMoveToShelf={onMoveToShelf} />);
  test.find('select').simulate('change');
  expect(onMoveToShelf).toHaveBeenCalled();
});
