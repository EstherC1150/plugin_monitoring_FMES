/**
 * Custom logger for the Nextspace Plugin.
 */
export function log(message, data) {
    const timestamp = new Date().toLocaleTimeString();
    if (data) {
        console.log(`[Plugin ${timestamp}] ${message}:`, data);
    } else {
        console.log(`[Plugin ${timestamp}] ${message}`);
    }
}
