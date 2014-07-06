
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

    it('toCamelCaseByRegex', function() {
        var exp = '-([a-z])';
        expect('color').toBe(bcUtils.toCamelCaseByRegex(exp, 'color'));
        expect('backgroundColor').toBe(bcUtils.toCamelCaseByRegex(exp, 'background-color'));
        expect('borderLeftWidth').toBe(bcUtils.toCamelCaseByRegex(exp, 'border-left-width'));
    });
});

describe('liya.cssHelperMethods', function(){

    var css = liya.cssHelperMethods;

    beforeEach(function() {
        setUpHTMLFixture();
    });

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