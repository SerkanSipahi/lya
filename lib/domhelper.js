
/**
 * 
 * @author Serkan Sipahi
 * @email serkan.sipahi@yahoo.de
 * @license MIT license
 * 
 */

import extendedPrototype from 'lyadom/lib/extendedPrototype';
import polyfill from 'lyadom/lib/polyfill';
import * as _ from 'lyadom/lib/shorthand';

/**
 * [query description]
 * @return {[type]} [description]
 */
export const query = function(
        query : Selector
    ) : List<HTMLElement> {

        return document.querySelectorAll(query);
};

/**
 * [query description]
 * @return {[type]} [description]
 */
export const find = function(
        node  : HTMLElement,
        query : Selector
    ) : List<HTMLElement> {

        return node.querySelectorAll(query);
};

/**
 * [each description]
 * @param  {[type]} list HTMLCollection [description]
 * @param  {[type]} NodeList [description]
 * @param  {[type]} callback [description]
 * @return {[type]}          [description]
 */
export const each = function(
        nodes    : List<HTMLElement>, 
        callback : Function
    ) : List<HTMLElement> {

        for (var i = 0, len = nodes.length; i < len; i++) {
            callback.call(nodes[i], i, nodes[i]);
        }
        if(nodes._$hookcontainer){
            nodes = rebuildFromHookContainer(nodes._$hookcontainer);
            delete nodes._$hookcontainer;
        }
        return nodes;
};

/**
 * [each description]
 * @param  {[type]} [description]
 * @param  {[type]} [description]
 * @return {[type]} [description]
 */
export const map = function(
        nodes    : List<HTMLElement>, 
        callback : Function
    ) : List<HTMLElement> {

        for (var i = 0, container = [], len = nodes.length; i < len; i++) {
            let list: NodeList = callback.call(null, i, nodes[i]);
            container.push(list);
        }
        return container;
};

/**
 * [removeClass description]
 * @param  {[type]} [description]
 * @param  {[type]} [description]
 * @return {[type]} [description]
 */
export const removeClass = function(
        node : HTMLElement,
        className : String
    ) : HTMLElement {

        if(node.classList.contains(className)){
            node.classList.remove(className);
        }
        return node;
};

/**
 * [toNodeList description]
 * @param  {[type]} [description]
 * @return {[type]} [description]
 */
export const toNodeList = function(list : List<NodeList>){

    var hookContainer : Array = [],
        docFragment = document.createDocumentFragment(),
        hookNode, type, node;

    for (var i = 0, iLen = list.length; i < iLen; i++) {
        for (var x = 0, xLen = list[i].length; x < xLen; x++) { 
            node = list[i][x]; 
            hookNode = node.previousSibling;
            type = 1;
            if(!hookNode){
                hookNode = node.nextSibling;
                type = 2;
                if(!hookNode){
                    hookNode = node.parentNode;
                    type = 3;
                }
            }
            hookContainer.push([node, hookNode, type]);
            docFragment.appendChild(node);
        }
    }
    return [ docFragment.childNodes, hookContainer ];
};

/**
 * [rebuildFromHookContainer description]
 * @param  {[type]} hookContainer [description]
 * @return {[type]}               [description]
 */
export const rebuildFromHookContainer = function(hookcontainer){
    for(let [DOMNode, hookNode, type] of hookcontainer){
        let parentElement = hookNode.parentElement;
        DOMNode.classList.add("__lyadom__");
        switch(type) {
            case 1:
                parentElement.insertBefore(DOMNode, hookNode.nextSibling);
                break;
            case 2:
                parentElement.insertBefore(DOMNode, hookNode);
                break;
            case 3:
                parentElement.appendChild(DOMNode);
                break;
        }
    }
    return each(document.querySelectorAll(".__lyadom__"), (_, domnode) => {
        removeClass(domnode, '__lyadom__');
    })
}

/**
 * [description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @param  {[type]} arg3 [description]
 * @return {[type]}      [description]
 */
export const css = function(
        node : HTMLElement, 
        arg1 : string, 
        arg2 : any,
        arg3 : Function
    ) : HTMLElement {
    /*
    let command = {
        styleExpression : '-([a-z])',
        rgbToHex : utility.rgbToHex,
        isTypeof : utility.isTypeof,
        toCamelCase : utility.toCamelCase,
    };
    */
    this.init(node, args);

}.$inject({init : css$$init});

const css$$io = {
    'rs'   : 'read',
    'rs+c' : 'read_with_callback',
    'ws'   : 'write_as_string',
    'ws+c' : 'write_as_string_with_callback',
    'wo'   : 'write_as_object',
    'wo+c' : 'write_as_object_with_callback',
}

/**
 * [css$$init description]
 * @return {[type]} [description]
 */
export const css$$init = function(node=null, args=null){

    var self = this, io = self.io, result;

    if(self.is(args, io.rs)){
        res = self.exec($this, io.rs, args[0]);
    } else if(self.is(args, io['rs+c'])){
        res = self.exec($this, io['rs+c'], args[0], args[1]);
    } else if(self.is(args, io.ws)){
        res = self.exec($this, io.ws, args[0], args[1]);
    } else if(self.is(args, io['ws+c'])){
        res = self.exec($this, io['ws+c'], args[0], args[1], args[2]);
    } else if(self.is(args, io.wo)){
        res = self.exec($this, io.wo, args[0]);
    } else if(self.is(args, io['wo+c'])){
        res = self.exec($this, io['wo+c'], args[0], args[1]);
    } else if(self.exec(args, io.ra)){
        // > multi attribute lesen --> test schreiben
    }

    return result;

}.$inject({exec : css$$exec, io : css$$io});

/**
 * [css$$is description]
 * @param  {[type]} args       [description]
 * @param  {[type]} expression [description]
 * @return {[type]}            [description]
 */
export const css$$is = function(args=null, expression=null){

    var io = this.io,
        isTypeof = this.isTypeof,
        tmpExpression = '';

    // > read operation
    if(args.length < 2){
        tmpExpression = io.rs;
    } else if(isTypeof('string', args[0]) && isTypeof('function', args[1])){
        tmpExpression = io['rs+c'];
    }

    // > write operations
    if(isTypeof('string', args[0]) && isTypeof('string', args[1]) && !args[2]){
        tmpExpression = io.ws;
    } else if(isTypeof('string', args[0]) && isTypeof('string', args[1]) && isTypeof('function', args[2])){
        tmpExpression = io['ws+c'];
    } else if(isTypeof('object', args[0]) && !args[1]){
        tmpExpression = io.wo;
    } else if(isTypeof('object', args[0]) && isTypeof('function', args[1]) ){
        tmpExpression = io['wo+c'];
    }

    return (tmpExpression === expression);
};

export const css$$exec = function(dom=null, operation=null, arg1=null, arg2=null, arg3=null){

    var self = this, result = $this, io = self.io,
        attr = self.camelCase(self.styleRegexExpression, arg1);

    switch (operation) {
        case io.rs:
            result = self.getStyle($this, arg1);
            break;
        case io['rs+c']:
            result = arg2.call($this, arg1) || self.getStyle($this, arg1);
            break;
        case io.ws:
            $this.style[attr] = arg2;
            break;
        case io['ws+c']:
            !arg3.call($this, arg1, arg2) ? $this.style[attr] = arg2 : null;
            break;
        case io.wo:
            self.writeCssObject($this, arg1);
            break;
        case io['wo+c']:
            !arg2.call($this, arg1) ? self.writeCssObject($this, arg1) : null;
            break;
    }
    return result;
};

/**
 * [description]
 * @param  {[type]} node [description]
 * @param  {[type]} prop [description]
 * @return {[type]}      [description]
 */
export const getStyle = function(
        node : HTMLElement, 
        prop : string
    ) : string {

    result = node.style[utility.camelCase(self.styleRegexExpression, arg)] || win.getComputedStyle($this).getPropertyValue(arg);
    return /rgb\((\d+), (\d+), (\d+)\)/ig.test(result) ? self.rgbToHex(result) : result;

}; 

/**
 * [description]
 * @param  {[type]} node          [description]
 * @param  {[type]} cssCollection [description]
 * @return {[type]}               [description]
 */
export const setStyles = function(
        node : HTMLElement, 
        collection : Object
    ) : void {

    for(let attr of collection){
        node.style[attr] = cssCollection[attr];
    }

};

/** 
 * [isDOMNode description]
 * @param  {[type]}
 * @return {Boolean}
 */
export const isDOMNode = function(obj : any) : boolean {
    // DOM, Level2
    if ("HTMLElement" in window) {
        return (!!obj && obj instanceof HTMLElement);
    }
    // Older browsers
    return (!!obj && typeof obj === "object" && obj.nodeType === 1 && !!obj.nodeName);
};

/** 
 * [isNodeList description]
 * @param  {[type]}
 * @return {Boolean}
 */
export const isNodeList = function(list : NodeList<HTMLElement>) : boolean {
    return list instanceof NodeList;
};

/** 
 * [isHTMLCollection description]
 * @param  {[type]}
 * @return {Boolean}
 */
export const isHTMLCollection = function(list : HTMLCollection<HTMLElement>) : boolean {
    return list instanceof HTMLCollection;
};

/** 
 * [getKeys description]
 * @param  {[type]}
 * @return {Boolean}
 */
export const getKeys = function(list : any) : List<any> {
    return Object.keys(obj);
};