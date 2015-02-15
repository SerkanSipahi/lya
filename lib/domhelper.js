
/**
 * 
 * @author Serkan Sipahi
 * @email serkan.sipahi@yahoo.de
 * @license MIT license
 * 
 */

import * as utility from 'lib/utility';

/**
 * [description]
 * @param  {[type]}   dom      [description]
 * @param  {Function} callback [description]
 * @param  {[type]}   context  [description]
 * @return {[type]}            [description]
 */
export var each = (domCollection=null, callback=null, context='') => {

    if (domCollection === void 0 || domCollection === null || typeof callback !== 'function') { 
        throw new TypeError(); 
    }

    var length = domCollection.length;

    for (let i = 0; i < length; i++){
        callback.call(dom[i], i, dom[i]); 
    }
    return domCollection;

};

/**
 * [description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @param  {[type]} arg3 [description]
 * @return {[type]}      [description]
 */
export var css = (arg1=null, arg2=null, arg3=null) => {

    let command = {
        styleExpression : '-([a-z])',
        rgbToHex : utility.rgbToHex,
        isTypeof : utility.isTypeof,
        toCamelCase : utility.toCamelCase,
        io : {
            'rs'   : 'read',
            'rs+c' : 'read_with_callback',
            'ws'   : 'write_as_string',
            'ws+c' : 'write_as_string_with_callback',
            'wo'   : 'write_as_object',
            'wo+c' : 'write_as_object_with_callback',
        },
        init(dom=null, args=null){

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

        },
        is(args=null, expression=null){

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

        },
        exec(dom=null, operation=null, arg1=null, arg2=null, arg3=null){

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
        }
    };
    command.init(dom, args);

};

/**
 * [description]
 * @param  {[type]} dom  [description]
 * @param  {[type]} prop [description]
 * @return {[type]}      [description]
 */
export var getStyle = (dom, prop) => {

    result = dom.style[utility.camelCase(self.styleRegexExpression, arg)] || win.getComputedStyle($this).getPropertyValue(arg);
    return /rgb\((\d+), (\d+), (\d+)\)/ig.test(result) ? self.rgbToHex(result) : result;

}; 

/**
 * [description]
 * @param  {[type]} dom           [description]
 * @param  {[type]} cssCollection [description]
 * @return {[type]}               [description]
 */
export var writeCssObject = (dom, cssCollection) => {

    for(let attr in cssCollection){
        dom.style[attr] = cssCollection[attr];
    }

};
