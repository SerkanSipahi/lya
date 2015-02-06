
$('.foo').$find('li').setAttribute('data-bar').$addClass('baz').$css('background-color', 'blue', () => Z );

getElementByTagName('com-foo')
	.$css('color', 'blue')
	.setAttribute('hello', 'world')
	.$addClass('baz')
	.$find('.nested-element')
	.$closest('.baz')
    .removeChild('.baz');