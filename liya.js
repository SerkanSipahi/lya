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

    var isTypeof = liya.utils.isTypeof;

    // > global error handling
    /*
    window.onerror = function errorHandler(message, url, line){
        console.log('onerror', arguments);
    };
    */

    liya.each = function(object, callback, $context){

        // > TODO: $conetxt = context dom object

        if (object === void 0 || object === null) { throw new TypeError(); }

        var t = Object(object),
            len = t.length >>> 0,
            container = [],
            tmpContainer = null,
            tmpElement = document.createElement('div');

        if (typeof callback !== 'function') { throw new TypeError(); }
        for (var i = 0; i < len; i++){
            if (i in t){

                // > TODO: - wenn t[i]=number dann in parseInt(t[i].toString(), 10)
                // >       - bei float(/\./.test(t[i].toString()))=parseFloat
                // >       - bei string einfach t[i].toString()

                callback.call(t[i], i, t[i]);
                if(isTypeof('array', t)){
                    container.push(t[i]);
                } else if(isTypeof('nodelist', t) || isTypeof('htmlcollection', t)){
                    tmpElement.appendChild(t[i]);
                }
            }
        }

        if(!container.length){
            tmpContainer = tmpElement.querySelectorAll('*'); tmpElement = null;
        } else {
            tmpContainer = container;
        }

        return tmpContainer;
    };
    /*
    Array.prototype.each =
    NodeList.prototype.each =
    HTMLCollection.prototype.each = function(callback){
        return liya.each(this, callback);
    };
    */
    /*
    // >  FIXME: Funkioniert nicht !!
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
    */
    Array.prototype.get =
    NodeList.prototype.get =
    HTMLCollection.prototype.get = function(index){
        return this[index];
    };

    liya.css = function(utils){

        var instance = this;

        /*
         * r=read, w=write c=callback, o=object,
         * s=string, +=and
         **/
        this.io         = [];
        this.io.rs      = 'read',
        this.io['rs+c'] = 'read_with_callback',
        this.io.ws      = 'write_as_string',
        this.io['ws+c'] = 'write_as_string_with_callback',
        this.io.wo      = 'write_as_object',
        this.io['wo+c'] = 'write_as_object_with_callback';

        this.styleRegexExpression = '-([a-z])';
        this.rgbToHex = utils.rgbToHex;
        this.camelCase = utils.toCamelCaseByRegex;
        this.isTypeof = utils.isTypeof;

        liya.css = function(){ return instance; };

    };
    liya.css.prototype = {
        initialize : function($this, args){

            var self = this, io = self.io, res;

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

            return res;

        },
        getStyle : function($this, arg){

            var result, self = this;

            result = $this.style[self.camelCase(self.styleRegexExpression, arg)] || window.getComputedStyle($this).getPropertyValue(arg);
            return /rgb\((\d+), (\d+), (\d+)\)/ig.test(result) ? self.rgbToHex(result) : result;
        },
        writeCssObject : function($this, cssObject){

            for(var attr in cssObject){
                if(!cssObject.hasOwnProperty(attr)){ continue; }
                $this.style[attr] = cssObject[attr];
            }

        },
        is : function(args, expression){

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
        exec : function($this, operation, arg1, arg2, arg3){

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

    HTMLElement.prototype.css = function(){
        return (new liya.css(liya.utils)).initialize(this, arguments);
    };
    Array.prototype.css =
    NodeList.prototype.css =
    HTMLCollection.prototype.css = function(){
        return this.each(function(){ this.css.apply(this, arguments); });
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
    HTMLElement.prototype.html = function(html){
        this.innerHTML = html;
    };

}());