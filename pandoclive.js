const bs = require("browser-sync").create()
const fs = require('fs-extra')
const pdc = require('pdc')




const filename = process.argv[2] || null


bs.watch(`src/${filename}.*`, function (event, file) {
  // as the file is saved, it is temporarily empty and the save works only when it is done twice
  // hence the timeout to make sure the file is not being written
  setTimeout(() => {
    const contents= fs.readFile(file, 'utf-8')

  contents.then(value => {
    console.log(value.length)
    pdc(value, 'markdown', 'html', ['-H', 'style.css', '--data-dir='], function (err, result) {
          if (err) throw err;
          fs.writeFile('app/index.html', result).then(value => bs.reload()).catch(err => console.log(err))
    })
  })
}, 200)
})

bs.init({
  server: './app'
}); 

