
var args = process.argv.slice(2).map(function(value){
        return !!JSON.parse(String(value).toLowerCase());
    }),
    Builder = require('systemjs-builder'),
    builder = new Builder({
    baseURL: './',
    paths : {
        'lyadom/lib/*' : 'lib/*.js'
    },
    traceurOptions : {
        annotations : /*(0 in args) ||*/ false,
        types : (1 in args) || false,
        typeAssertions : /*(2 in args) ||*/ false
    }
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