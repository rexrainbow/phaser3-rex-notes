var ClickableWhenHidden = function(GOClass?: any) {
    var WillRender = GOClass.prototype.willRender;
    return class Base extends GOClass {
        // Override default behavior, always return true even if this game object is invisible.
        willRender(camera?: any) {
            return true;
        }

        renderWebGL(renderer?: any, src?: any, camera?: any, parentMatrix?: any) {
            // Don't render anything if Default willRender method return false
            if (!WillRender.call(this, camera)) {
                return;
            }
            super.renderWebGL(renderer, src, camera, parentMatrix);
        }

        renderCanvas(renderer?: any, src?: any, camera?: any, parentMatrix?: any) {
            // Don't render anything if Default willRender method return false
            if (!WillRender.call(this, camera)) {
                return;
            }
            super.renderCanvas(renderer, src, camera, parentMatrix);
        }
    }
}

export default ClickableWhenHidden;