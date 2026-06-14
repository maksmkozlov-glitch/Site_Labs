class Logger {
    log(message) {
        const now = new Date();
        console.log(`[${now.toLocaleString()}] LOG: ${message}`);
    }
    error(message) {
        const now = new Date();
        console.error(`[${now.toLocaleString()}] ERROR: ${message}`);
    }
    warn(message) {
        const now = new Date();
        console.warn(`[${now.toLocaleString()}] WARN: ${message}`);
    }
}
module.exports = Logger;