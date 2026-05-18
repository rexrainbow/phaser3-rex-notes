var SetCursorStyle = function(scene?: any, cursor?: any) {
    if (cursor === undefined) {
        cursor = '';
    }
    scene.input.manager.canvas.style.cursor = cursor;
}

export default SetCursorStyle;