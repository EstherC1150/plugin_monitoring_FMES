/**
 * Utility to make an element draggable.
 * @param {HTMLElement} element The element to move.
 * @param {HTMLElement} handle The element used to drag (e.g. title bar).
 */
export function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.onmousedown = dragMouseDown;
    handle.style.cursor = "move";

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Set the element's new position
        const targetTop = element.offsetTop - pos2;
        const targetLeft = element.offsetLeft - pos1;

        // Keep within window boundaries (optional enhancement)
        const margin = 10;
        const maxLeft = window.innerWidth - element.offsetWidth - margin;
        const maxTop = window.innerHeight - element.offsetHeight - margin;

        element.style.top = Math.min(Math.max(margin, targetTop), maxTop) + "px";
        element.style.left = Math.min(Math.max(margin, targetLeft), maxLeft) + "px";
        
        // Ensure we don't use transform if we are dragging via offset
        element.style.transform = "none";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
