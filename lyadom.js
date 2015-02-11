
/**
 * @author Serkan Sipahi
 * @email serkan.sipahi@yahoo.de
 * @license MIT license
 *
 * 
 */
import dom from 'helper/dom';

/**
 * [description]
 * @param  {String} query [description]
 * @return {[type]}       [description]
 */
window.$lyadom = (query = '') => dom.query; 
if(!window.$) {
    window.$ = (query = '') => dom.query;
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
    var $rgbToHex = utils.rgbToHex,
        $isTypeof = utils.isTypeof,
        $camelCase = utils.camelCase,
        $matchAll = utils.matchAll,
        $size = utils.size;

    /**
     * [dom]
     * @type {[type]}
     */
    var $query = dom.query,
        $css = dom.css,
        $find = dom.find,
        $each = dom.each,
        $html = dom.html,
        $text = dom.text;

    /**
     * [get description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}get`] = function(){
        
    };
    NodeList.prototype[`${ns}get`] =
    HTMLCollection.prototype[`${ns}get`] = function(index){

    };

    /**
     * [css description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}css`] = function(){
        
    };
    NodeList.prototype[`${ns}css`] =
    HTMLCollection.prototype[`${ns}css`] = function(){
        
    };

    /**
     * [remove description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}remove`] = function(){

    };
    NodeList.prototype[`${ns}remove`] =
    HTMLCollection.prototype[`${ns}remove`] = function(){

    };

    /**
     * [find description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}find`] = function(selector = ''){

    };
    NodeList.prototype[`${ns}find`] =
    HTMLCollection.prototype[`${ns}find`] = function(){

    };

    /**
     * [html description]
     * @type {[type]}
     */
    HTMLElement.prototype[`${ns}html`] = function(html = ''){

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
