/**
 * DOM Components references
 */
import {TaskExecutor} from "https://unpkg.com/yajsapi";

const code_textbox = document.getElementById('code');
const runtime_text = document.getElementById('runtime')
const sandbox_text = document.getElementById('sandbox')
const yagna_appkeytext = document.getElementById('appid');

const run_sandbox = document.getElementById('run')
const download_output = document.getElementById('outputBtn')


const output_container = document.getElementById('output');
const logs_container = document.getElementById('logs');

/**
 * Global variables
 */
let runtime, code, sandbox, yagna_appkey

/**
 * Utility Functions
 */


function getRuntime(value) {
    runtime = value
}

function getSandbox(value) {
    sandbox = value
}

function getCode(value) {
    code = value
}

function getAppkey(value) {
    yagna_appkey = value
}

function downloadOutput() {

}

function appendResults(result) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(result));
    output_container.appendChild(div);
}

function appendLog(msg, level = 'info') {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(`[${new Date().toISOString()}] [${level}] ${msg}`));
    logs_container.appendChild(div);
}

const logger = {
    log: (msg) => appendLog(msg),
    warn: (msg) => appendLog(msg, 'warn'),
    debug: (msg) => appendLog(msg, 'debug'),
    error: (msg) => appendLog(msg, 'error'),
    info: (msg) => appendLog(msg, 'info'),
    table: (msg) => appendLog(JSON.stringify(msg, null, "\t")),
}


/**
 * Yagna Scripts
 */

async function run() {

    const executor = await TaskExecutor.create({
        package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
        yagnaOptions: {apiKey: '9373b61297eb41ec86d5cbe2c76eac7b'},
        logger
    });
    await executor
        .run(async (ctx) => appendResults((await ctx.run("echo 'Hello World'")).stdout))
        .catch(e => logger.error(e));
    await executor.end();
}

run_sandbox.addEventListener('click', () => run())
download_output.addEventListener('click', () => downloadOutput())

code_textbox.addEventListener('change', ev => getCode(ev.target.value))
yagna_appkeytext.addEventListener('input', ev => getAppkey(ev.target.value))
runtime_text.addEventListener('input', ev => getRuntime(ev.target.value))
sandbox_text.addEventListener('input', ev => getSandbox(ev.target.value))

