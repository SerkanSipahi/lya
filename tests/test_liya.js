
var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    createElement = document.createElement.bind(document),
    setUpHTMLFixture = function(){
        var $container = createElement('div'),
            $body = $('body');

        $container.id = 'fixtureContainer';
        $body.appendChild($container);
    },
    teardownHTMLFixture = function(){
        var $element = $('#fixtureContainer');
        $element.parentNode.removeChild($element);
    };

describe('Testing bcUtils', function() {

    var exp = '-([a-z])',
        utils = liya.utils;

    it('toCamelCaseByRegex', function() {
        expect('color').toBe(utils.toCamelCaseByRegex(exp, 'color'));
        expect('backgroundColor').toBe(utils.toCamelCaseByRegex(exp, 'background-color'));
        expect('borderLeftWidth').toBe(utils.toCamelCaseByRegex(exp, 'border-left-width'));
    });

    it('objectCollectionToCamelCase', function() {
        var objectCollection = Object.keys(utils.objectCollectionToCamelCase(exp, {
            'color' : 'blue',
            'background-color' : 'red',
            'border-left-width' : '1px'
        }));
        expect(objectCollection).toContain('color');
        expect(objectCollection).toContain('backgroundColor');
        expect(objectCollection).toContain('borderLeftWidth');
    });

});

describe('liya.css', function(){

    var css = liya.css;

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

describe('liya.css on real DOM', function(){

    var css = liya.css,
        $testInlineStyle = {},
        $testWithoutInlineStyle = {};

    beforeEach(function(){
        setUpHTMLFixture();
        $('#fixtureContainer').innerHTML =
            '<div id="test-inline-style" style="height:999px;background-color:yellow;border-left-width:222px;"></div>'+
            '<div id="test-without-inline-style"></div>';

        var style = createElement('style');
        style.id='test-fixture-style';
        style.setAttribute('type', 'text/css');
        var styleSheedRule =
            '#test-without-inline-style { '+
                'height: 666px; '+
                'background-color: red; '+
                'border-style: solid; ' +
                'border-left-width: 22px; '+
                'border-top-width: 15px; '+
                ' }';
        $('head').appendChild(style);
        $('#test-fixture-style').sheet.insertRule(styleSheedRule, 0);

        $testInlineStyle = $('#test-inline-style'),
        $testWithoutInlineStyle = $('#test-without-inline-style');


    });
    afterEach(function(){
        /*
        teardownHTMLFixture();
        var $element = $('#test-fixture-style');
        $element.parentNode.removeChild($element);
        */
    });

    it('liya.css read', function() {
        expect('999px').toBe($testInlineStyle.css('height'));
        expect('yellow').toBe($testInlineStyle.css('background-color'));
        expect('222px').toBe($testInlineStyle.css('border-left-width'));

        expect('666px').toBe($testWithoutInlineStyle.css('height'));
        expect('#ff0000').toBe($testWithoutInlineStyle.css('background-color'));
        expect('solid').toBe($testWithoutInlineStyle.css('border-left-style'));
        expect('22px').toBe($testWithoutInlineStyle.css('border-left-width'));
        expect('15px').toBe($testWithoutInlineStyle.css('border-top-width'));
    });

    it('liya.css read+callback', function() {
        expect('height').toBe($testInlineStyle.css('height', function(arg){
            return arg;
        }));
        expect('999px').toBe($testInlineStyle.css('height', function(arg){

        }));
        expect('222px').toBe($testInlineStyle.css('height', function(arg){
            return '222px';
        }));

        //****************************************************************************

        expect('border-left-style').toBe($testWithoutInlineStyle.css('border-left-style', function(arg){
            return arg;
        }));
        expect('solid').toBe($testWithoutInlineStyle.css('border-left-style', function(arg){

        }));
        expect('dotted').toBe($testWithoutInlineStyle.css('border-left-style', function(arg){
            return 'dotted';
        }));
    });

    it('liya.css write_as_string', function() {
        // except this object

        var $element = createElement('div');
        $element.id = 'test-write-as-string';
        $('#fixtureContainer').appendChild($element);

        expect($element).toBe($element.css('height', '333px'));
        expect('333px').toBe($element.css('height'));

        expect($element).toBe($element.css('background-color', '#ff0000'));
        expect('#ff0000').toBe($element.css('background-color'));

        expect($element).toBe($element.css('list-style-type', 'decimal'));
        expect('decimal').toBe($element.css('list-style-type'));

    });

});
