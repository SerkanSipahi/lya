
/**
 * @author Serkan Sipahi
 * @email serkan.sipahi@yahoo.de
 * @license MIT license
 *
 * 
 */
import utils from 'helper/utils';
import dom from 'helper/dom';

/**
 * [description]
 * @param  {String} query [description]
 * @return {[type]}       [description]
 */
window.$lyadom = (query = '') => dom.query.bind(dom); 
if(!window.$) {
    window.$ = (query = '') => dom.query.bind(dom);
}

/**
 * [description]
 * @param  {[type]} lyadom [description]
 * @return {[type]}        [description]
 */
var $lyadomEnv => (namespace, dom) {

    /**
     * Namespace
     * @type {String}
     */
    var ns = namespace;

    /**
     * [utils]
     * @type {[type]}
     */
    var rgbToHex = utils.rgbToHex,
        isTypeof = utils.isTypeof,
        camelCase = utils.camelCase,
        matchAll = utils.matchAll,
        size = utils.size;

    /**
     * [dom]
     * @type {[type]}
     */
    var query = dom.query.bind(dom),
        map = dom.map.bind(dom),
        css = dom.css.bind(dom),
        find = dom.find.bind(dom),
        html = dom.html.bind(dom),
        text = dom.text.bind(dom);


    NodeList.prototype[`${ns}each`] =
    HTMLCollection.prototype[`${ns}each`] = function(...args) {
        return each(this, ...args);
    }

    /**
     * [get description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}get`] = function(...args){
        return get(this, ...args);  
    };

    /**
     * [css description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}css`] = function(...args){
        return css(this, ...args);
    };
    NodeList.prototype[`${ns}css`] =
    HTMLCollection.prototype[`${ns}css`] = function(...args){
        return each(this, (_, domnode) => {
            css(domnode, ...args);
        });
    };

    /**
     * [remove description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}remove`] = function(...args){
        return remove(this, ...args);
    };
    NodeList.prototype[`${ns}remove`] =
    HTMLCollection.prototype[`${ns}remove`] = function(...args){
        return each((_, domnode) => {
            remove(domnode, ...args);
        });
    };

    /**
     * [find description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}find`] = function(...args){
        return find(this, ...args);
    };
    NodeList.prototype[`${ns}find`] =
    HTMLCollection.prototype[`${ns}find`] = function(...args){
        return each((_, domnode) => {
            find(domnode, ...args);
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
     * [removeClass description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}removeClass`] = function(key, value){

    };
    NodeList.prototype[`${ns}removeClass`] =
    HTMLCollection.prototype[`${ns}removeClass`] = function(){

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
};

export default $lyadomEnv('$', dom);
