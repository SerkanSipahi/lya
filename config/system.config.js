System.config({
    baseURL : './', 
    map: {
        assert: 'node_modules/rtts_assert/es6/src/rtts_assert',
        text:   'node_modules/system-text/text'
    },
    traceurOptions : {
        types: true,
    },
    namespaces : {
        lyadom : '$',
    },
});