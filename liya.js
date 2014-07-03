(function(){

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
        objectCollectionToCamelCaseByRegex : function(cssObject){
            var tmpCssObject={}, tmpAttr;
            for(var attr in cssObject) {
                tmpCssObject[this.toCamelCaseByRegex(attr)] = cssObject[attr];
            }
            return tmpCssObject;
        },
        toCamelCaseByRegex : function(attr, expression){
            // > !(!!window.chrome)) auslagern zur funktion
            if((capital = /-([a-z])/g.exec(attr)) && !(!!window.chrome)){
                attr = attr.replace(capital[0], capital[1].toUpperCase());
            }
            return attr;
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
    };
    HTMLElement.prototype._css = {
        writeCssObject : function(cssObject){
            for(var attr in cssObject){
                self.style[attr] = cssObject[attr];
            }
        },
        is : function(arg, expression){

            var tmpExpression;

            // > write operation
            if(bcUtils.isTypeof('string', args[0]) && bcUtils.isTypeof('string', args[1]) && !args[2]){

            } else if(bcUtils.isTypeof('object', args[0]) && bcUtils.isTypeof('undefined', args[1])){

            } else if(args[0] && args[1] && args[2]){

            } else if(bcUtils.isTypeof('object', args[0]) && bcUtils.isTypeof('function', args[1])){

            // > read operation
            } else if(bcUtils.isTypeof('string', args[0]) && !args[1] && !args[2]){

            }

            return (tmpExpression === expression);
        }
    };
    HTMLElement.prototype.css = function(){

        var self     = this,
            args     = arguments,
            res      = null,
            style    = null,
            tmpObj   = {},
            writeCSS = function(self, cssObject){
                for(var attr in cssObject){
                    self.style[attr] = cssObject[attr];
                }
            },
            stylesheetRuleToCamelCase = function(attr){
                if((capital = /-([a-z])/g.exec(attr)) && !(!!window.chrome)){
                    attr = attr.replace(capital[0], capital[1].toUpperCase());
                }
                return attr;
            },
            objectCollectionToCamelCase = function(cssObject){
                var tmpCssObject={}, tmpAttr;
                for(var attr in cssObject) {
                    tmpCssObject[stylesheetRuleToCamelCase(attr)] = cssObject[attr];
                }
                return tmpCssObject;
            };

        if(this._css.is(args, 'read')){

        } else if(this._css.is(args, 'read_with_callback')){

        } else if(this._css.is(args, 'write_as_string')){

        } else if(this._css.is(args, 'write_as_string_with_callback')){

        } else if(this._css.is(args, 'write_as_object')){

        } else if(this._css.is(args, 'write_as_object_with_callback')){

        }

        // > write operations
        if(bcUtils.isTypeof('string', args[0]) && bcUtils.isTypeof('string', args[1]) && !args[2]){
            tmpObj[args[0]] = args[1];
            writeCSS(self, objectCollectionToCamelCase(tmpObj));
        } else if(bcUtils.isTypeof('object', args[0]) && bcUtils.isTypeof('undefined', args[1])){
            writeCSS(self, objectCollectionToCamelCase(args[0]));
        } else if(args[0] && args[1] && args[2]){
            args[2].call(self, args[0], args[0]);
        } else if(bcUtils.isTypeof('object', args[0]) && bcUtils.isTypeof('function', args[1])){
            args[1].call(self, args[0]);
        }

        // > read operations
        if(bcUtils.isTypeof('string', args[0]) && !args[1] && !args[2]){
            style = self.style[stylesheetRuleToCamelCase(args[0])];
            if(style!==''){
                res = self.style[args[0]];
            }
            else if(style===''){
                res = window.getComputedStyle(self).getPropertyValue(
                    stylesheetRuleToCamelCase(args[0])
                );
            }
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