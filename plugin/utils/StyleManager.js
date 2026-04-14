/**
 * Simple utility to inject CSS strings into the document head.
 * Ensures the same style string is only injected once.
 */
const injectedStyles = new Set();

export function injectCSS(id, cssString) {
    if (injectedStyles.has(id)) return;

    const style = document.createElement("style");
    style.id = `style-${id}`;
    style.textContent = cssString;
    document.head.appendChild(style);
    
    injectedStyles.add(id);
    console.log(`[StyleManager] Injected styles for: ${id}`);
}
