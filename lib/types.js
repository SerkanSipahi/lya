import { assert } from 'assert';
 
var _selector = assert.define('Selector', (...args) => {
    console.log('_selector', args);
    assert('Hello World', 'name').is(assert.string);
});

var _list = assert.define('List', (...args) => {
    console.log('_list', args);
    assert('Hello World', 'name').is(assert.string);
});

export var Selector = _selector;
export var List     = _list;
