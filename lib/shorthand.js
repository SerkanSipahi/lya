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

export var foo = 'Hello World';