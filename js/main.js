document.addEventListener('DOMContentLoaded', init);

const MODE = Object.freeze({
    DEV: 'DEV',
    PROD: 'PRODUCTION',
    STAGING: 'STAGING',
});

// IIFE that runs before init to determine our app mode
// http://127.0.0.1:5500/index.html - origin
// 127.0.0.1:5500 - host
// 127.0.0.1 - hostname
let mode = (() => {
    if(location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        return MODE.DEV; //DEV
    }
    if(location.hostname.endsWith('github.io')) {
        return MODE.STAGING; //STAGING
    }
    if(location.hostname.includes('vercel.app')) {
        return MODE.PROD; //production
    }
})();

// level = 'info' || 'warn' || 'error'
const log = (msg, level = 'info') => {
    switch(level) {
        case 'info':
            if(mode === MODE.DEV) {
                console.log(msg);
            }
            break;
        case 'warn':
            console.warn(msg);
            break;
        case 'error':
            console.log(mode);            console.error(msg);
    }
}

function init() {
    // page is ready to use
    log('hello');
    log('yikes', 'warn');
    log('oh no', 'error');

    feedback('Something happpened', 'error');
}

function feedback(msg, level='info') {
    let dialog = document.getElementById('feedback');
    let title = dialog.querySelector('.title');
    let message = dialog.querySelector('.message');
    let button = dialog.querySelector('.actions button');
    title.textContent = 'User feedback';
    message.textContent = msg;
    dialog.className = level;
    dialog.showModal();
    button.addEventListener('click',(ev) => dialog.close(), { once: true });

    switch(level) {
        case 'info':
            break;
        case 'warn':
            break;
        case 'error':
            break;
        case 'success':
            break;
    }
}