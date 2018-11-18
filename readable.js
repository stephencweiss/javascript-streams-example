const {Readable} = require('stream')
const chalk = require('chalk')

/* ------------------------------- Overview -------------------------------  |
|  Use Javascript streams to create a new readable stream                    |
|  Output the stream to standard out for visibility                          |
|  For learning purposes, we use chalk to see transformations.               |
|___________________________________________________________________________*/

const inStream = new Readable({
  read(size) {
    let newChar = String.fromCharCode(this.currentCharCode++)
    console.log(chalk.green('\n The letter from the stream is -->', newChar))
    this.push(newChar);
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
})

inStream.currentCharCode = 65;
inStream.pipe(process.stdout)
