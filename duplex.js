const {Duplex} = require('stream')
const chalk = require('chalk')

/* ------------------------------- Overview -------------------------------  |
|  Use Javascript streams to create a new Duplex stream                      |
|  The use case is very simple, but we create a new stream                   |
|  Then consume that stream with the same stream                             |
|  Finally, we output the stream to standard out                             |
|  For learning purposes, we use chalk to see transformations.               |
|___________________________________________________________________________*/

const inOutStream = new Duplex ({
  write (chunk, encoding, callback) {
    console.log(chalk.green(`\nWriting a chunk --> `), chunk.toString());
    callback();
  },
  read () {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inOutStream.currentCharCode = 65;
inOutStream
  .pipe(inOutStream)
  .pipe(process.stdout)
