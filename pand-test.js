
const fs = require('fs')
const pdc = require('pdc')
fs.readFile('src/3.md', 'utf-8', ['-H style.css'],[], (err, contents) => {
pdc(contents, 'markdown', 'html', function(err, result) {
  if (err) throw err;
 
  fs.writeFile('app/index.html', result)
  
});
})
