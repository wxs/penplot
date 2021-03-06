/*
  Scaffolds a penplot canvas and render loop and handles
  the directory listing for multiple entries.
 */

import 'babel-polyfill'; 
import insertCSS from 'insert-css';
import run from './run-entry';

function list (names) {
  insertCSS(`
    body {
      margin: 0;
    }
    div {
      margin: 20px;
      columns: 3;
    }
    a, a:hover, a:visited, a:active {
      display: block;
      font: 14px 'Helvetica', sans-serif;
      text-decoration: none;
      color: #89bbed;
      padding-bottom: 5px;
    }
    a:hover {
      color: #518cc6;
    }
  `)
  const container = document.createElement('div');
  names.forEach(name => {
    const uri = encodeURI(name);
    const a = document.createElement('a');
    a.setAttribute('href', uri);
    a.textContent = name;
    container.appendChild(a);
  });
  document.body.appendChild(container);
}

/*
  The following gets generated by our browserify transform
  to fill in the desired penplot entries.
 */
{{entry}}

/*
  Runs the current entry or provides a directory listing if necessary.
 */
const names = Object.keys(entries);
if (names.length === 1) {
  const name = names[0];
  run(name, entries[name]);
} else {
  const path = decodeURI(location.pathname)
    .replace(/[\/]+$/, '')
    .replace(/^[\/]+/, '') || '/';
  if (path === '/') {
    list(names);
  } else {
    if (path in entries) {
      run(path, entries[path]);
    } else {
      console.error('no file', path)
      console.log(entries)
    }
  }
}
