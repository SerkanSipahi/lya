
var $ = document.querySelectorAll.bind(document),
    createElement = document.createElement.bind(document),
    setUpHTMLFixture = function(){
        var $container = createElement('div'),
            $body = $('body')[0];

        $container.id = 'fixtureContainer';
        $body.appendChild($container);
    };

describe('A suite is just a function', function() {

    it('and so is a spec', function() {
        expect(true).toBe(true);
    });
});

describe('A sute if we want to test dom', function(){

    beforeEach(function() {
        setUpHTMLFixture();
    });

    it('if we need from loaded dom', function() {
        console.log($('#fixtureContainer').length);
        expect(true).toBe(true);
    });
});