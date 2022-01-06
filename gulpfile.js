const gulp = require('gulp');
const ts = require('gulp-typescript');
const map = require('map-stream');
const { readFileSync } = require('fs');
const path = require('path');

const tsProjects = new Map();

tsProjects.set('client', gulp.src('./src/client_scripts/index.ts') /*ts.createProject('./tsconfig.client.json')*/);
tsProjects.set('server', gulp.src('./src/server_scripts/index.ts') /*ts.createProject('./tsconfig.server.json')*/);
tsProjects.set('startup', gulp.src('./src/startup_scripts/index.ts') /*ts.createProject('./tsconfig.startup.json')*/);

const p = (relativePath) => path.join(process.cwd(), relativePath);

const defineAndRequireJs = readFileSync(p('./define-and-require.js')).toString();
const runModuleJs = (defines, entryModule) =>
    readFileSync(p('./run-module.js'))
    .toString()
    .replace(/\/\*DEFINE_MODULES_MARKER\*\//, defines)
    .replace(/\/\*ENTRY_MODULE_MARKER\*\//, entryModule)
;

const prefixToEntryModule = prefix => `'src/${prefix}_scripts/index'`;

const indent = (s) => s ? `    ${s}` : s;
const indentSource = (s) => s.split('\n').map(indent).join('\n');

const tsconfigRaw = readFileSync(p('./tsconfig.json')).toString();
console.log(tsconfigRaw);
const tsconfig = JSON.parse(tsconfigRaw);

const scripts = (prefix) =>
    tsProjects
        .get(prefix)
        //.src()
        .pipe(ts({
            ...tsconfig.compilerOptions,
            outFile: `./${prefix}_scripts/index.js`,
        }))
        .js
        .pipe(map((file, cb) => {
            const runModule = runModuleJs(indentSource(file.contents.toString()), prefixToEntryModule(prefix));
            const newContents = `${defineAndRequireJs}\n\n${runModule}\n`;
            file.contents = Buffer.from(newContents);
            cb(null, file);
        }))
        .pipe(gulp.dest('.'));

const client = () => scripts('client');
const server = () => scripts('server');
const startup = () => scripts('startup');

const build = gulp.parallel(client, server, startup);

exports.default = build;