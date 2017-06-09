const bs = require("browser-sync").create()
const fs = require('fs-extra')
const pdc = require('pdc')







bs.watch('src/*.*', function (event, file) {
  fs.readFile(file, 'utf-8', (err, contents) => {
    if (err) throw err
    if (contents.length !== 0) {
      pdc(contents, 'markdown', 'html', ['-H', 'style.css'], function (err, result) {
        if (err) throw err;


        fs.writeFile('app/index.html', result, (err) => {
          if (err) throw err;
          bs.reload('*.html')
        })

      })
    }


  })
})


// ['--standalone', '-H', 'style.css']// start server 
bs.init({
  server: './app'
});