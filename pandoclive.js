const bs = require("browser-sync").create()
const fs = require('fs-extra')
const pdc = require('pdc')







bs.watch('src/*.*', function (event, file) {
  setTimeout(() => {
    const contents= fs.readFile(file, 'utf-8')

  contents.then(value => {
    console.log(value.length)
    pdc(value, 'markdown', 'html', ['-H', 'style.css'], function (err, result) {
          if (err) throw err;
          fs.writeFile('app/index.html', result).then(value => bs.reload()).catch(err => console.log(err))
    })
  })
},200)
})


// ['--standalone', '-H', 'style.css']// start server 
bs.init({
  server: './app'
}); 

