export default {
    camera({ x, y, rotate, zoom } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        if ((x !== undefined) || (y !== undefined)) {
            camera.setScroll(x, y);
        }
        if (rotate !== undefined) {
            camera.setRotation(rotate);
        }
        if (zoom !== undefined) {
            camera.setZoom(zoom);
        }

    },

    'camera.fadeIn'({ duration = 1000, red, green, blue, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        camera.fadeIn(duration, red, green, blue);
        if (wait) {
            return this.wait({ camera: 'fadeIn' }, manager);
        }
    },

    'camera.fadeOut'({ duration = 1000, red, green, blue, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        camera.fadeOut(duration, red, green, blue);
        if (wait) {
            return this.wait({ camera: 'fadeOut' }, manager);
        }
    },

    'camera.flash'({ duration = 1000, red, green, blue, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        camera.flash(duration, red, green, blue);
        if (wait) {
            return this.wait({ camera: 'flash' }, manager);
        }
    },

    'camera.shake'({ duration = 1000, intensity, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        camera.shake(duration, intensity);
        if (wait) {
            return this.wait({ camera: 'shake' }, manager);
        }
    },

    'camera.zoomTo'({ duration = 1000, zoom, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        camera.zoomTo(zoom, duration);
        if (wait) {
            return this.wait({ camera: 'zoom' }, manager);
        }
    },

    'camera.rotateTo'({ duration = 1000, rotate, ease, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        camera.rotateTo(rotate, false, duration, ease);
        if (wait) {
            return this.wait({ camera: 'rotate' }, manager);
        }
    },

    'camera.scrollTo'({ duration = 1000, x, y, ease, wait = false } = {}, manager) {
        var camera = this.sys.cameraTarget;
        if (!camera) {
            return;
        }

        var xSave = camera.scrollX;
        var ySave = camera.scrollY;
        camera.setScroll(x, y);
        x += camera.centerX;
        y += camera.centerY;
        camera.setScroll(xSave, ySave);

        // x,y in pan() is the centerX, centerY
        camera.pan(x, y, duration, ease);

        if (wait) {
            return this.wait({ camera: 'scroll' }, manager);
        }
    },

}