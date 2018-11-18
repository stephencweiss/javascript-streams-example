A simple tutorial to examine and practice with Javascript streams.

This repo will go through three examples:
1. Use of a readable stream and printing it to standard out.
2. Use of transform streams to manipulate a string into arrays, objects, and back again.
3. Use of Duplex to create a simple In/Out stream

Note: These examples work through printing and manipulating the alphabet, which begins at 65 (A) and ends with 90 (Z). 
A === String.fromCharCode(65)
Z === String.fromCharCode(90)

The line to remember:
> readableSrc.pipe(writableDest)

These examples come from Samer Buna's great article  [*Node.js Streams: Everything you need to know*](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)

