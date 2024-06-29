const { execSync } = require("child_process");
const exec = (cmd) => console.log([
    cmd,
    execSync(cmd).toString(),
    "–".repeat(5)
].join("\n"));

const PACKAGE = require(require("path").resolve("package.json"));


module.exports = function(type) {   // 0: major, 1: minor, 2: patch
    // BUMP
    const semver = PACKAGE.version
    .split(/\./g)
    .slice(0, 3)
    .map(p => parseInt(p));
    semver[type] += 1;
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