const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

console.log('It works!');

// YOUR CODE HERE

const isMultiples = (value, multiplier) => {
    return value % multiplier === 0;
};

const writeToFile = (data) => {
    fs.appendFile("./info.txt", data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


// Tasks 01

function printNumbersAndWords() {
    console.log("..........Stating Task 01..........", "\n");

    for (let i = 1; i <= 100; i++) {
        console.log(`${i}: ${getRandomWordSync()}`);
    }

    console.log("..........End of Task 01..........", "\n");
}

//Tasks 02

function fizzBuzz() {
    console.log("..........Stating Task 02..........", "\n");

    for (let index = 1; index <= 100; index++) {
        var tempWord = "";
        if (isMultiples(index, 3) && isMultiples(index, 5)) {
            tempWord = "FizzBuzz";
        } else if (isMultiples(index, 3)) {
            tempWord = "Fizz";
        } else if (isMultiples(index, 5)) {
            tempWord = "Buzz";
        } else {
            tempWord = getRandomWordSync();
        }
        console.log(`${index}: ${tempWord}`);
    }

    console.log("..........End of Task 02..........", "\n");
}

//Tasks 03

async function asyncFzzBuzz() {

    console.log("..........Stating Task 03..........", "\n");

    const textList = [];

    for (let index = 1; index <= 100; index++) {
        let j = new Promise(async (res, rej) => {
            var tempWord = "";
            if (isMultiples(index, 3) && isMultiples(index, 5)) {
                tempWord = "FizzBuzz";
            } else if (isMultiples(index, 3)) {
                tempWord = "Fizz";
            } else if (isMultiples(index, 5)) {
                tempWord = "Buzz";
            } else {
                tempWord = await getRandomWord({ slow: true });
            }
            res(`${index}: ${tempWord}`);
        });
        textList.push(j);
    }

    await Promise.all(textList).then((results) => {
        for (let text of results) {
            console.log(text);
        }
    });

    console.log("..........End of Task 03..........", "\n");
}

//Tasks 04

async function asyncFzzBuzzWithError() {

    console.log("..........Stating Task 04..........", "\n");

    const textList = [];

    for (let index = 1; index <= 100; index++) {
        let j = new Promise(async (res, rej) => {
            var tempWord = "";
            if (isMultiples(index, 3) && isMultiples(index, 5)) {
                tempWord = "FizzBuzz";
            } else if (isMultiples(index, 3)) {
                tempWord = "Fizz";
            } else if (isMultiples(index, 5)) {
                tempWord = "Buzz";
            } else {
                try {
                    tempWord = await getRandomWord({ slow: true, withErrors: true });
                } catch (error) {
                    tempWord = "It shouldn't break anything!";
                }
            }
            res(`${index}: ${tempWord}`);
        });
        textList.push(j);
    }

    await Promise.all(textList).then((results) => {
        for (let text of results) {
            console.log(text);
        }
        let information = results.join('\n');
        // Task 05, Writing information to the info.txt file in the root 
        writeToFile(information);
    });

    console.log("..........End of Task 04..........", "\n");
}


const main = async () => {
    printNumbersAndWords();
    fizzBuzz();
    await asyncFzzBuzz();
    await asyncFzzBuzzWithError();
};

main();