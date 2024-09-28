var ClickableWhenHidden = function (GOClass) {
    var WillRender = GOClass.prototype.willRender;
    return class Base extends GOClass {
        // Override default behavior, always return true even if this game object is invisible.
        willRender(camera) {
            return true;
        }

        renderWebGL(renderer, src, camera, parentMatrix) {
            // Don't render anything if Default willRender method return false
            if (!WillRender.call(this, camera)) {
                return;
            }
            super.renderWebGL(renderer, src, camera, parentMatrix);
        }

        renderCanvas(renderer, src, camera, parentMatrix) {
            // Don't render anything if Default willRender method return false
            if (!WillRender.call(this, camera)) {
                return;
            }
            super.renderCanvas(renderer, src, camera, parentMatrix);
        }
    }
}

export default ClickableWhenHidden;