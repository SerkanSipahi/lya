
/**
 * [$$iterator polyfill ]
 * @link http://jakearchibald.com/2014/iterators-gonna-iterate/#nodelist-iteration
 * @type {[type]}
 */

if(!NodeList.prototype[Symbol.iterator]){
    const $$iterator = Array.prototype[Symbol.iterator];
    NodeList.prototype[Symbol.iterator] = $$iterator;
    HTMLCollection.prototype[Symbol.iterator] = $$iterator;
    HTMLFormControlsCollection.prototype[Symbol.iterator] = $$iterator;
    HTMLOptionsCollection.prototype[Symbol.iterator] = $$iterator;
    // RadioNodeList.prototype[Symbol.iterator] = $$iterator;
}

export default '$polyfill';