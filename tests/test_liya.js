
var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    createElement = document.createElement.bind(document),
    setUpHTMLFixture = function(){
        var $container = createElement('div'),
            $body = $('body');

        $container.id = 'fixtureContainer';
        $body.appendChild($container);
    };

describe('Testing bcUtils', function() {

    var exp = '-([a-z])';

    it('toCamelCaseByRegex', function() {
        expect('color').toBe(bcUtils.toCamelCaseByRegex(exp, 'color'));
        expect('backgroundColor').toBe(bcUtils.toCamelCaseByRegex(exp, 'background-color'));
        expect('borderLeftWidth').toBe(bcUtils.toCamelCaseByRegex(exp, 'border-left-width'));
    });

    it('objectCollectionToCamelCase', function() {
        var objectCollection = Object.keys(bcUtils.objectCollectionToCamelCase(exp, {
            'color' : 'blue',
            'background-color' : 'red',
            'border-left-width' : '1px'
        }));
        expect(objectCollection).toContain('color');
        expect(objectCollection).toContain('backgroundColor');
        expect(objectCollection).toContain('borderLeftWidth'); 
    });

});

describe('liya.cssHelperMethods', function(){

    var css = liya.cssHelperMethods;

    it('liya.cssHelperMethods.is', function() {
        // > read
        expect(true).toBe(css.is(['background-color'], 'read'));
        // > read + callback
        expect(true).toBe(css.is(['background-color', function(){}], 'read_with_callback'));
        // > write as string
        expect(true).toBe(css.is(['background-color', 'blue'], 'write_as_string'));
        // > write as string + callback
        expect(true).toBe(css.is(['background-color', 'blue', function(){}], 'write_as_string_with_callback'));
        // > write as object
        expect(true).toBe(css.is([{'background-color' : 'blue'}], 'write_as_object'));
        // > write as object + callback
        expect(true).toBe(css.is([{'background-color' : 'blue'}, function(){}], 'write_as_object_with_callback'));
    });
});