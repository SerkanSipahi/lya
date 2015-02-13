var liya = {utils:{}},
    toString = {}.toString;

liya.utils = function(){
    var instance = this; liya.utils = function(){ return instance; };
};
liya.utils.prototype = {
    rgbToHex : function(r, g, b) {
        var match = null;
        if(typeof(r)==='string' && (match = /rgb\((\d+), (\d+), (\d+)\)/ig.exec(r))){
            r=~~match[1], g=~~match[2], b=~~match[3];
        }
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    isTypeof : function(type, object){
        return toString.call(object).toLowerCase() === '[object '+type+']'.toLowerCase();
    },
    camelCase : function(expression, value){

        var matches  = null;

        if(this.isTypeof('object', value)){
            return this.camelCaseObject(expression, value);
        }

        if((matches = this.matchAll(new RegExp(expression, 'g'), value))){
            for(var i=0,length=matches.length;i<length;i++){
                value = value.replace(matches[i][0], matches[i][1].toUpperCase());
            }
        }
        return value;
    },
    camelCaseObject : function(expression, object){

        var tmpCssObject={};
        for(var attr in object) {
            if(!object.hasOwnProperty(attr)){ continue; }
            tmpCssObject[this.camelCase(expression, attr)] = object[attr];
        }
        return tmpCssObject;
    },
    matchAll : function(pattern, data, slice_start, slice_end){

        var matches = [], match;
        while ((match = pattern.exec(data))) {
            matches.push(match);
        }
        return matches;
    },
    size : function(object){
        return this.isTypeof('object', object) ? Object.keys(object).length : object.length;
    }
};
liya.eachObject = function(object, callback){
    var container = [];
    for(var item in object){
        if(!object.hasOwnProperty(item)){ continue; }
        callback.call(object[item], item, object[item]);
        container.push(object[item]);
    }
    return container;
};
liya.each = function(object, callback, $context){

    // > TODO: $conetxt = context dom object

    if (object === void 0 || object === null) { throw new TypeError(); }

    var t = object,
        len = t.length,
        container = [];

    if (typeof callback !== 'function') { throw new TypeError(); }
    for (var i = 0; i < len; i++){
        if (i in t){
            // > TODO: - wenn t[i]=number dann in parseInt(t[i].toString(), 10)
            // >       - bei float(/\./.test(t[i].toString()))=parseFloat
            // >       - bei string einfach t[i].toString()
            callback.call(t[i], i, t[i]); container.push(t[i]);
        }
    }
    return container;
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
    this.isTypeof = utils.isTypeof;
    this.camelCase = utils.camelCase.bind(utils);

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

        result = $this.style[self.camelCase(self.styleRegexExpression, arg)] || win.getComputedStyle($this).getPropertyValue(arg);
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