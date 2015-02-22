
var args = process.argv.slice(2).map(function(value){
        return !!JSON.parse(String(value).toLowerCase());
    }),
    Builder = require('systemjs-builder'),
    builder = new Builder({
    traceurOptions : {
        annotations : (0 in args) || false,
        types : (1 in args) || false,
        typeAssertions : (2 in args) || false
    },
    baseURL: './',
    paths : {
        'lyadom/lib/*' : 'lib/*.js'
    }
})

builder
  .build('lyadom', 'build/lyadom.js')
  .then(function() {
      console.log('Build complete');
  })
  .catch(function(err) {
      console.log('Build error');
      console.log(err);
  });