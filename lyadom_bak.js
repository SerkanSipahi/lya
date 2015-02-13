(function(win, doc){

    'use strict';

    //TODO: 1.) liya.min.js

    if(!win.LIYA){
        win.LIYA = {
            NATIVE_DOM_USEAGE : true,
            AMD_COMMONJS_SUPPORT : false
        };
    }



    var utils = new liya.utils();

    if(LIYA.NATIVE_DOM_USEAGE){

        // >>>>>>>>>>>>>>>>>> each >>>>>>>>>>>>>>>>>>>> //

        Object.prototype.loop =
        Array.prototype.loop =
        NodeList.prototype.loop =
        HTMLCollection.prototype.loop = function(callback){
            var result = null, self=this;
            if(!utils.isTypeof('object', self)){
                result = liya.each(this, callback);
            } else {
                result =  liya.eachObject(self, callback);
            }
            return result;
        };


        // >>>>>>>>>>>>>>>>>>> get >>>>>>>>>>>>>>>>>>>> //

        Array.prototype.get =
        NodeList.prototype.get =
        HTMLCollection.prototype.get = function(index){
            // > return liya.get(this, index);
            return this[index];
        };

        // >>>>>>>>>>>>>>>>>>> css >>>>>>>>>>>>>>>>>>>> //

        HTMLElement.prototype.css = function(){
            return (new liya.css(utils)).initialize(this, arguments);
        };
        Array.prototype.css =
        NodeList.prototype.css =
        HTMLCollection.prototype.css = function(){

            // > replace below; return liya.each(this, callback);

            return this.loop(function(_, domnode){
                domnode.css.apply(domnode, this.args);
            }.bind({ args:arguments }));
        };

        // >>>>>>>>>>>>>>>>>>> remove >>>>>>>>>>>>>>>>>> //

        HTMLElement.prototype.remove = function(){
            // > liya.remove(this);
            this.parentNode.removeChild(this);
        };
        NodeList.prototype.remove =
        HTMLCollection.prototype.remove = function(){

            // > replace below; return liya.each(this, callback);d

            this.loop(function(_, domnode){ domnode.remove(); });
        };

        // >>>>>>>>>>>>>>>>>>> find >>>>>>>>>>>>>>>>>>>> //

        HTMLElement.prototype.find = function(selector){
            // > liya.find(this, selector);
            return this.querySelectorAll(selector);
        };

        // >>>>>>>>>>>>>>>>>>>> html >>>>>>>>>>>>>>>>>>>> //

        HTMLElement.prototype.html = function(html){
            // > return liya.html(this, html);
            this.innerHTML = html;
        };

        // >>>>>>>>>>>>>>>>>>>> Text >>>>>>>>>>>>>>>>>>>> //

        HTMLElement.prototype.text = function(text){
            return liya.text(this, text);
        };

        // >>>>>>>>>>>>>>>>>>>> attr >>>>>>>>>>>>>>>>>>>> //

        HTMLElement.prototype.attr = function(key, value){
            return liya.attr(this, key, value);
        };
    }

    // >>>>>>>>>>>> AMD/Commonjs Support >>>>>>>>>>>>> //

    if(LIYA.AMD_COMMONJS_SUPPORT){
        if(typeof define === 'function' && define.amd) {
            define(function(require) { return liya; });
        } else if(typeof module === 'object' && module.exports){
            module.exports = liya;
        }
    } else {
        win.liya = liya;
    }

}(this, document));