(function(){

    'use strict';

    window.liya = {
        utils : {
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
            //FIXME: ändern in camalBase, expression kann optinal übergeben werden
            //FIXME: auch ein object als value kann übergeben werden
            toCamelCaseByRegex : function(expression, value){

                var matches, matchAll = liya.utils.matchAll;

                if((matches = matchAll(new RegExp(expression, 'g'), value))){
                    for(var i=0,length=matches.length;i<length;i++){
                        value = value.replace(matches[i][0], matches[i][1].toUpperCase());
                    }
                }
                return value;
            },
            objectCollectionToCamelCase : function(expression, object){

                var tmpCssObject={}, camelCase = liya.utils.toCamelCaseByRegex;
                for(var attr in object) {
                    if(!object.hasOwnProperty(attr)){ continue; }
                    tmpCssObject[camelCase(expression, attr)] = object[attr];
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
    Object.defineProperty(Object.prototype, 'each', {
        value: function(callback) {
	    var isTypeof = liya.utils.isTypeof;
            if(isTypeof('object', this) && isTypeof('function', callback)) {
                for(var item in this){
                    if(!this.hasOwnProperty(item)) { continue; }
                    callback.call(this, item, this[item]);
                }
            }
        }
    });
    Array.prototype.get =
    NodeList.prototype.get =
    HTMLCollection.prototype.get = function(index){
        return this[index];
    };

    Array.prototype.css =
    NodeList.prototype.css =
    HTMLCollection.prototype.css = function(){
        for(var i=0,length=this.length;i<length;i++){
            this[i].css.apply(this[i], arguments);
        }
        //FIXME: collect this object in array and return it!
    };

    liya.supports = {

    };
    liya.css = {
        styleRegexExpression : '-([a-z])',
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

        initialize : function($this, args){

            var css = liya.css, res;

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
            } else if(css.is(args, css.re)){
                // > re=read empty, attribute löschen --> test schreiben
            } else if(css.is(args, css.ra)){
                // > multi attribute lesen --> test schreiben
            }

            return res;
        },
        getStyle : function($this, arg){

            var result,
                computedStyle = window.getComputedStyle,
                rgbToHex = liya.utils.rgbToHex,
                expression = liya.css.styleRegexExpression,
                camelCase = liya.utils.toCamelCaseByRegex;

            result = $this.style[camelCase(expression, arg)] || computedStyle($this).getPropertyValue(arg);
            //return /rgb\((\d+), (\d+), (\d+)\)/ig.test(result) ? rgbToHex(result) : result;
        },
        writeCssObject : function($this, cssObject){
            for(var attr in cssObject){
                if(!cssObject.hasOwnProperty(attr)){ continue; }
                $this.style[attr] = cssObject[attr];
            }
        },
        is : function(args, expression){

            var isTypeof = liya.utils.isTypeof,
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
                getStyle = liya.css.getStyle,
                writeCssObject = liya.css.writeCssObject,
                utils = liya.utils,
                result = $this,
                camelCase = utils.toCamelCaseByRegex,
                expression = liya.css.styleRegexExpression,
                attr = camelCase(expression, arg1);

            switch (operation) {
                case o.rs:
                    result = getStyle($this, arg1);
                    break;
                case o['rs+c']:
                    result = arg2.call($this, arg1) || getStyle($this, arg1);
                    break;
                case o.ws:
                    $this.style[attr] = arg2;
                    break;
                case o['ws+c']:
                    !arg3.call($this, arg1, arg2) ? $this.style[attr] = arg2 : null;
                    break;
                case o.wo:
                    writeCssObject($this, arg1);
                    break;
                case o['wo+c']:
                    //document.write("Mangoes and papayas are $2.79 a pound.<br>");
                    break;
            }

            return result;
        }
    };
    HTMLElement.prototype.css = function(){
        return liya.css.initialize(this, arguments);
    };
    HTMLElement.prototype.remove = function(){
        this.parentNode.removeChild(this);
    };
    NodeList.prototype.remove =
    HTMLCollection.prototype.remove = function(){
        this.each(function(){ this.remove(); });
    };
    HTMLElement.prototype.find = function(selector){
        return this.querySelectorAll(selector);
    };

}());
