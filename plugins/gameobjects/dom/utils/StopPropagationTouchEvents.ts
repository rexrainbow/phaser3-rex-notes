var StopPropagationTouchEvents = function(element?: any) {
    // Don't propagate touch/mouse events to parent(game canvas)
    element.addEventListener('touchstart', callback, false);
    element.addEventListener('touchmove', callback, false);
    element.addEventListener('touchend', callback, false);
    element.addEventListener('mousedown', callback, false);
    element.addEventListener('mouseup', callback, false);
    element.addEventListener('mousemove', callback, false);
}

var callback = function(e?: any) {
    e.stopPropagation();
}
export default StopPropagationTouchEvents;