(function(){

    'use strict';

    // > namespaces
    window.liya = {};

    // > write tests
    window.bcUtils = {
        // > http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139
        rgbToHex : function(r, g, b) {
            var match = null;
            // > if we pass like this: 'rgb(255, 255, 255)'
            if(typeof(r)==='string' && (match = /rgb\((\d+), (\d+), (\d+)\)/ig.exec(r))){
                r=~~match[1], g=~~match[2], b=~~match[3];
            }
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        isTypeof : function(type, object){
            return {}.toString.call(object).toLowerCase() === '[object '+type+']'.toLowerCase();
        },
        toCamelCaseByRegex : function(expression, value){

            var matches;

            if((matches = this.matchAll(new RegExp(expression, 'g'), value))){
                for(var i=0,length=matches.length;i<length;i++){
                    value = value.replace(matches[i][0], matches[i][1].toUpperCase());
                }
            }
            return value;
        },
        objectCollectionToCamelCase : function(expression, object){

            var tmpCssObject={};
            for(var attr in object) {
                if(!object.hasOwnProperty(attr)){ continue; }
                tmpCssObject[this.toCamelCaseByRegex(expression, attr)] = object[attr];
            }
            return tmpCssObject;
        },
        matchAll : function(pattern, data, slice_start, slice_end){

            var matches = [], match;
            while ((match = pattern.exec(data))) {
                matches.push(match);
            }
            return matches;
        }
    };

    // > global error handling
    window.onerror = function errorHandler(message, url, line){
        console.log('onerror', arguments);
    };
    // > for loop
    Window.prototype.for = function(callback){

        if (this === void 0 || this === null) { throw new TypeError(); }
        var t = Object(this),
            len = t.length >>> 0;

        if (typeof callback !== 'function') { throw new TypeError(); }
        for (var i = 0; i < len; i++){
            if (i in t){
                callback.call(t[i], i, t[i]);
            }
        }
    };

    // > each loop
    Array.prototype.each =
    NodeList.prototype.each =
    HTMLCollection.prototype.each = function(callback){
        Window.prototype.for.call(this, callback);
    };
    Object.prototype.each = function(callback){
        for(var item in this){
            if(!this.hasOwnProperty(item)) { continue; }
            callback.call(this, item, this[item]);
        }
    };

    // > get(index)
    Array.prototype.get =
    NodeList.prototype.get =
    HTMLCollection.prototype.get = function(index){
        return this[index];
    };

    // > css helper
    Array.prototype.css =
    NodeList.prototype.css =
    HTMLCollection.prototype.css = function(){
        for(var i=0,length=this.length;i<length;i++){
            this[i].css.apply(this[i], arguments);
        }
        //FIXME: collect this object in array and return it!
    };

    liya.cssHelperMethods = {
        /*
         * r=read, w=write c=callback, o=object,
         * s=string, +=and
         **/
        'rs'   : 'read',
        'rs+c' : 'read_with_callback',
        'ws'   : 'write_as_string',
        'ws+c' : 'write_as_string_with_callback',
        'wo'   : 'write_as_object',
        'wo+c' : 'write_as_object_with_callback',

        writeCssObject : function(cssObject){
            for(var attr in cssObject){
                if(!cssObject.hasOwnProperty(attr)){ continue; }
                self.style[attr] = cssObject[attr];
            }
        },
        is : function(args, expression){

            var isTypeof = bcUtils.isTypeof,
                tmpExpression = '';

            // > read operation
            if(args.length < 2){
                tmpExpression = this.rs;
            } else if(isTypeof('string', args[0]) && isTypeof('function', args[1])){
                tmpExpression = this['rs+c'];
            }

            // > write operations
            if(isTypeof('string', args[0]) && isTypeof('string', args[1]) && !args[2]){
                tmpExpression = this.ws;
            } else if(isTypeof('string', args[0]) && isTypeof('string', args[1]) && isTypeof('function', args[2])){
                tmpExpression = this['ws+c'];
            } else if(isTypeof('object', args[0]) && !args[1]){
                tmpExpression = this.wo;
            } else if(isTypeof('object', args[0]) && isTypeof('function', args[1]) ){
                tmpExpression = this['wo+c'];
            }

            return (tmpExpression === expression);
        },
        do : function($this, operation, arg1, arg2, arg3){

            var o = this,
                result = $this,
                computedStyle = window.getComputedStyle,
                toCamelCaseByRegex = bcUtils.toCamelCaseByRegex.bind(bcUtils),
                rgbToHex = bcUtils.rgbToHex,
                styleAttr, expression = '-([a-z])';

            styleAttr = toCamelCaseByRegex(expression, arg1);

            switch (operation) {
                case o.rs:
                    result = $this.style[styleAttr] || computedStyle($this).getPropertyValue(arg1);
                    result = /rgb\((\d+), (\d+), (\d+)\)/ig.test(result) ? rgbToHex(result) : result;
                    break;
                case o['rs+c']:
                    //document.write("Apples are $0.32 a pound.<br>");
                    break;
                case o.ws:
                    //document.write("Bananas are $0.48 a pound.<br>");
                    break;
                case o['ws+c']:
                    //document.write("Cherries are $3.00 a pound.<br>");
                    break;
                case o.wo:
                    //document.write("Mangoes and papayas are $2.79 a pound.<br>");
                    break;
                case o['wo+c']:
                    //document.write("Mangoes and papayas are $2.79 a pound.<br>");
                    break;
            }

            return result;
        }
    };
    HTMLElement.prototype.css = function(){

        var css      = liya.cssHelperMethods,
            $this    = this,
            args     = arguments,
            res      = null;

        if(css.is(args, css.rs)){
            res = css.do($this, css.rs, args[0]);
        } else if(css.is(args, css['rs+c'])){
            res = css.do($this, css['rs+c'], args[0], args[1]);
        } else if(css.is(args, css.ws)){
            res = css.do($this, css.ws, args[0], args[1]);
        } else if(css.is(args, css['ws+c'])){
            res = css.do($this, css['ws+c'], args[0], args[1], args[2]);
        } else if(css.is(args, css.wo)){
            res = css.do($this, css.wo, args[0]);
        } else if(css.is(args, css['wo+c'])){
            res = css.do($this, css['wo+c'], args[0], args[1]);
        }

        return res;
    };

    // > Remove Element from DomTree
    HTMLElement.prototype.remove = function(){
        this.parentNode.removeChild(this);
    };
    NodeList.prototype.remove =
    HTMLCollection.prototype.remove = function(){
        this.each(function(){ this.remove(); });
    };

    // > find children of Element
    HTMLElement.prototype.find = function(selector){
        return this.querySelectorAll(selector);
    };

}());