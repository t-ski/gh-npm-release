#!/usr/bin/env node


const { createInterface: createReadline } = require("readline");

const release = require("./release");


process.on("uncaughtException",
    err => console.error(`\x1b[31m${err.message}\x1b[31m`));


let type;
switch(process.argv.slice(2)[0]) {
    case "-p":
    case "--patch":
        type = release.Type.PATCH;
        break;
    case "-m":
    case "--minor":
        type = release.Type.MINOR;
        break;
    case "-M":
    case "--major":
        type = release.Type.MAJOR;
        break;
}
if(type === undefined)
    throw new SyntaxError("Unknown release type (-p | -m | -M)");
const typeLabel = [ "major", "minor", "patch" ][type];


createReadline(process.stdin, process.stdout)
.question(
    `\x1b[34mAre you sure to release [\x1b[1m${typeLabel}\x1b[22m] \x1b[2m(y/n)\x1b[0m\n`,
    (answer) => {
    if(answer.trim() !== "y") {
        console.error("\x1b[31mRelease aborted.\x1b[0m");
        process.exit(1);
    }

    release.release(type);
    console.log(`\x1b[32m[\x1b[1m${typeLabel}\x1b[22m] successfully released.\x1b[0m`);
    process.exit(0);
});