
var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    createElement = document.createElement.bind(document),
    isTypeof = liya.utils.isTypeof,
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
        utils = new liya.utils();

    it('toCamelCaseByRegex', function() {
        expect('color').toBe(utils.camelCase(exp, 'color'));
        expect('backgroundColor').toBe(utils.camelCase(exp, 'background-color'));
        expect('borderLeftWidth').toBe(utils.camelCase(exp, 'border-left-width'));
    });

    it('camelCaseObject', function() {
        var objectCollection = Object.keys(utils.camelCase(exp, {
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

    var css = new liya.css(new liya.utils());

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

    var $testInlineStyle = {},
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

    it('liya.css write_as_string_with_callback', function() {
        // except this object

        var $element = createElement('div');
        $element.id = 'test-write-as-string-with-callback';
        $('#fixtureContainer').appendChild($element);

        expect($element).toBe($element.css('height', '222px', function(attr, value){}));
        expect('222px').toBe($element.css('height'));

        expect($element).toBe($element.css('height', '444px', function(attr, value){
            return true;
        }));
        expect('222px').toBe($element.css('height'));

        expect($element).toBe($element.css('height', '444px', function(attr, value){
            return false;
        }));
        expect('444px').toBe($element.css('height'));

    });

    it('liya.css write_as_object', function() {

        var $element = createElement('div');
        $element.id = 'test-write-as-object';
        $('#fixtureContainer').appendChild($element);
        var $testWriteAsObject = $('#test-write-as-object');

        expect($testWriteAsObject).toBe($testWriteAsObject.css({
            'width' : '200px',
            'height' : '300px',
            'background-color' : 'blue',
            'color' : 'blue',
            'border' : '1px solid red',
            'list-style-type' : 'square'
        }));
        expect('200px').toBe($testWriteAsObject.css('width'));
        expect('300px').toBe($testWriteAsObject.css('height'));
        // > probleme im firefox desktop&mobile
        //expect('blue').toBe($testWriteAsObject.css('background-color'));
        expect('1px solid red').toBe($testWriteAsObject.css('border'));
        // > probleme im firefox desktop&mobile
        //expect('square').toBe($element.css('list-style-type'));

    });

    it('liya.css write_as_object_with_callback', function() {

        var $element = createElement('div');
        $element.id = 'test-write-as-object-with-callback';
        $('#fixtureContainer').appendChild($element);

        expect($element).toBe($element.css({
            'width' : '200px',
            'height' : '300px',
            'color' : 'blue',
            'border' : '1px solid red'
        }, function(){
            // > console.log('foo');
        }));
        expect('200px').toBe($element.css('width'));
        expect('300px').toBe($element.css('height'));
        expect('blue').toBe($element.css('color'));
        expect('1px solid red').toBe($element.css('border'));

    });

});

describe('liya.each on DOM/Array', function(){

    var aRes, $res, innerHtml = '',
        $container = createElement('div'),
        $body = $('body'),
        array = [22,44,456,2,98,32];

    $container.id = 'fixtureContainerEach';
    $body.appendChild($container);

    for(var i= 0; i < 100; i++){
        innerHtml += '<div class="foo-for-each">this is('+i+')</div>';
    }
    $('#fixtureContainerEach').html(innerHtml);

    aRes = array.each(function(k, v){
        expect(array).toContain(array[k]);
    });

    $res = $$('#fixtureContainerEach *').each(function(key, value){
        this.css('border', key+'px solid green');
    });
    $res.css('font-weight', 'bold');

    $res = document.querySelectorAll('#fixtureContainerEach *').css({
       'list-style-type' : 'square',
        'font-family' : 'verdana'
    });

    // > console.log($res);

});
