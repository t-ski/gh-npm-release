#!/usr/bin/env node


process.on("uncaughtException",
    err => console.error(`\x1b[31m${err.message}\x1b[31m`));


const Type = {
    MAJOR: 0,
    MINOR: 1,
    PATCH: 2
};

let type;
switch(process.argv.slice(2)[0]) {
    case "-p":
    case "--patch":
        type = Type.PATCH;
        break;
    case "-m":
    case "--minor":
        type = Type.MINOR;
        break;
    case "-M":
    case "--major":
        type = Type.MAJOR;
        break;
}
if(!type) throw new SyntaxError("Unknown release type (-p | -m | -M)")


require("./release.js")(type);
console.log(`\x1b[32m${tag} successfully released.\x1b[0m`);