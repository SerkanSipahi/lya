System.config({
    baseURL : './',
    paths: {
        /**
         * ### Namespace ###
         */
        'lyadom/lib/*' : 'lib/*.js',
    },
    map: {
        assert: 'node_modules/rtts_assert/es6/src/rtts_assert',
    },
    traceurOptions : {
        types: true,
    },
    namespaces : {
        lyadom : '$',
    },
});