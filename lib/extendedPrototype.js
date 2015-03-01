
/**
 * [native function injector]
 * @type {[type]}
 */
Function.prototype.$inject = function(arg = '') {
  
    var isTypeof = (type, object) => {
        return {}.toString.call(object).toLowerCase() === '[object '+type+']'.toLowerCase();    
    };

    if(!isTypeof('object', arg) && !isTypeof('function', arg)) {
        throw "passed argument is not object or function";
    }

    // > if function find the name( Function.name ) of the function ! 
    // > anonymous function is not possible!
    
    return this.bind(isTypeof('function', arg) ? new arg() : arg);
};

export default '$inject';