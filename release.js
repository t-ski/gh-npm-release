const { execSync } = require("child_process");
const exec = (cmd) => console.log([
    cmd,
    execSync(cmd).toString(),
    "–".repeat(5)
].join("\n"));

const PACKAGE = require(require("path").resolve("package.json"));


module.exports.Type = {
    MAJOR: 0,
    MINOR: 1,
    PATCH: 2
};

module.exports.release = function(type) {   // : Type
    // BUMP
    const semver = PACKAGE.version
    .split(/\./g)
    .slice(0, 3)
    .map(p => parseInt(p));
    semver[type] += 1;
    for(let i = type + 1; i <= 2; i++) semver[i] = 0;
    const version = semver.join(".");
    const tag = `v${version}`;
    
    exec(`npm version ${version}`);
    exec("npm publish --access public");
    exec("git push");
    
    // GH RELEASE
    exec([
        (process.platform == "darwin")
        ? "open"
        : ((process.platform == "win32")
            ? "start"
            : "xdg-open"),
        `'${
            PACKAGE.repository.url
            .match(/https:\/\/github\.com\/.+/)[0]
            .replace(/\.git$/, "")
        }/releases/new?tag=${tag}&title=${tag}'`
    ].join(" "));
}
