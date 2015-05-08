
var path = require("path");
var args = process.argv.slice(2).map(function(value){
        return !!JSON.parse(String(value).toLowerCase());
    }),
    Builder = require('systemjs-builder'),
    builder = new Builder({
      paths : {
          'lyadom/lib/*' : './lib/*.js',
      },
      map: {
          assert: 'node_modules/rtts_assert/es6/src/rtts_assert',
      },
      traceurOptions : {
          types: true,
          typeAssertions: true,
          typeAssertionModule: 'node_modules/rtts_assert/es6/rtts_assert',
      },
  })

builder
  .build('lyadom', 'build/lyadom.js', { sourceMaps: true })
  .then(function() {
      console.log('Build complete');
  })
  .catch(function(err) {
      console.log('Build error');
      console.log(err);
  });