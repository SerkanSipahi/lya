
/**
 * 
 * @author Serkan Sipahi
 * @email serkan.sipahi@yahoo.de
 * @license MIT license
 * 
 */

import * as dom from './lib/domhelper';

/**
 * [ns description]
 * @type {String}
 */
var ns = System.namespaces.lyadom;

/**
 * [get description]
 * @type {[type]}
 */
NodeList.prototype[`${ns}each`] =
HTMLCollection.prototype[`${ns}each`] = function(...args) {
    return dom.each(this, ...args);
}

/**
 * [get description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}get`] = function(...args){
    return dom.get(this, ...args);  
};

/**
 * [addClass description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}addClass`] = function(...args){
    return dom.addClass(this, ...args);
};
NodeList.prototype[`${ns}addClass`] =
HTMLCollection.prototype[`${ns}addClass`] = function(...args){
    return dom.each(this, (_, domnode) => {
        dom.addClass(domnode, ...args);
    });
};

/**
 * [removeClass description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}removeClass`] = function(...args){
    return dom.removeClass(this, ...args);
};
NodeList.prototype[`${ns}removeClass`] =
HTMLCollection.prototype[`${ns}removeClass`] = function(...args){
    return dom.each(this, (_, domnode) => {
        dom.removeClass(domnode, ...args);
    });
};

/**
 * [css description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}css`] = function(...args){
    return dom.css(this, ...args);
};
NodeList.prototype[`${ns}css`] =
HTMLCollection.prototype[`${ns}css`] = function(...args){
    return dom.each(this, (_, domnode) => {
        dom.css(domnode, ...args);
    });
};

/**
 * [remove description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}remove`] = function(...args){
    return dom.remove(this, ...args);
};
NodeList.prototype[`${ns}remove`] =
HTMLCollection.prototype[`${ns}remove`] = function(...args){
    return dom.each(this, (_, domnode) => {
        dom.remove(domnode, ...args);
    });
};

/**
 * [find description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}find`] = function(...args){
    return dom.find(this, ...args);
};
NodeList.prototype[`${ns}find`] =
HTMLCollection.prototype[`${ns}find`] = function(...args){
    return dom.map(this, (_, domnode) => {
        return dom.find(domnode, ...args);
    });
};

/**
 * [html description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}html`] = function(){

};
NodeList.prototype[`${ns}html`] =
HTMLCollection.prototype[`${ns}html`] = function(){

};

/**
 * [text description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}text`] = function(text){

};
NodeList.prototype[`${ns}text`] =
HTMLCollection.prototype[`${ns}text`] = function(){

};

/**
 * [attr description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}attr`] = function(key, value){

};
NodeList.prototype[`${ns}attr`] =
HTMLCollection.prototype[`${ns}attr`] = function(){

};

/**
 * [addClass description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}addClass`] = function(key, value){

};
NodeList.prototype[`${ns}addClass`] =
HTMLCollection.prototype[`${ns}addClass`] = function(){

};

/**
 * [description]
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
HTMLElement.prototype[`${ns}before`] = function(key, value){

};
NodeList.prototype[`${ns}before`] =
HTMLCollection.prototype[`${ns}before`] = function(){

};

/**
 * [description]
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
HTMLElement.prototype[`${ns}after`] = function(key, value){

};
NodeList.prototype[`${ns}after`] =
HTMLCollection.prototype[`${ns}after`] = function(){

};

/**
 * [closest description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}closest`] = function(key, value){

};
NodeList.prototype[`${ns}closest`] =
HTMLCollection.prototype[`${ns}closest`] = function(){

};

/**
 * [on description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}on`] = function(key, value){

};
NodeList.prototype[`${ns}on`] =
HTMLCollection.prototype[`${ns}on`] = function(){

};

/**
 * [off description]
 * @type {[type]}
 */
HTMLElement.prototype[`${ns}off`] = function(key, value){

};
NodeList.prototype[`${ns}off`] =
HTMLCollection.prototype[`${ns}off`] = function(){

};

export default dom.query;
