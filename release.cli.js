#!/usr/bin/env node


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
if(!type) throw new SyntaxError("Unknown release type (-p | -m | -M)")


release.release(type);
console.log(`\x1b[32m${tag} successfully released.\x1b[0m`);