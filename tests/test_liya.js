
var $ = document.querySelectorAll.bind(document),
    createElement = document.createElement.bind(document),
    setUpHTMLFixture = function(){
        var $container = createElement('div'),
            $body = $('body')[0];

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

describe('A sute if we want to test dom', function(){

    beforeEach(function() {
        setUpHTMLFixture();
    });

    it('if we need from loaded dom', function() {
        //console.log($('#fixtureContainer').length);
        expect(true).toBe(true);
    });
});