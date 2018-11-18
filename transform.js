const {Readable, Transform} = require('stream')
const chalk = require('chalk')

/* ------------------------------- Overview -------------------------------  |
|  Use Javascript Streams to create a new readable stream of letters         |
|  Transform that stream multiple times converting a string to an            |
|  array to an object back to a string                                       |
|  Print the stream to standard out                                          |
|  For learning purposes, we use chalk to see transformations.               |
|___________________________________________________________________________*/

// Create a stream of letters A --> Z (one letter at a time)
const sampleStream = new Readable({
  read() {
    let newStreamValue = String.fromCharCode(this.currentCharCode++).trim();
    console.log(chalk.green(`The newStreamValue is -->`), newStreamValue)
    this.push(newStreamValue);
    if (sampleStream.currentCharCode > stopLimit){
      this.push(null);
    }
  },
  end() {},
})

// Create an array out of the chunk (a single letter)
const commaSplitter = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    let newArray = chunk.toString().trim().split('')
    console.log(chalk.blue(`The new array is --> `), newArray)
    this.push(newArray);
    callback();
  }
});

// Transform the array into an object with the character code, e.g., {A : 60}...{Z : 90}
const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const obj = {};
    for (let i = 0; i < chunk.length; i += 2) {
      obj[chunk[i]] = chunk[i].toString().charCodeAt();
    }
    console.log(chalk.red(`The new object is --> `), obj);
    console.log(chalk.red(`The object's type is --> `), typeof obj);
    this.push(obj);
    callback();
  }
})

// Convert Object to String 
// This step is necessary in order to print out to stdout
// If your stream does not end in producing a string, you will receive the following error:
// TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be one of type string or Buffer. Received type object
const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) +'\n');
    callback();
  }
})

// ----- EXAMPLE ----- //
sampleStream.currentCharCode = 65
stopLimit = 90;
sampleStream
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout)
