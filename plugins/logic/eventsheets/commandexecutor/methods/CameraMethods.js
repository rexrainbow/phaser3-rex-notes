export default {
    'camera.set'(
        {
            x, y, rotate, zoom
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
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
        return this;
    },

    'camera.fadeIn'
        (
            {
                duration = 1000,
                red, green, blue,
                wait = false
            } = {},
            eventSheetManager, eventsheet
        ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
        }

        camera.fadeIn(duration, red, green, blue);
        if (wait) {
            this.wait({ camera: 'fadeIn' }, eventSheetManager);
        }
        return this;
    },

    'camera.fadeOut'(
        {
            duration = 1000,
            red, green, blue,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
        }

        camera.fadeOut(duration, red, green, blue);
        if (wait) {
            this.wait({ camera: 'fadeOut' }, eventSheetManager);
        }
        return this;
    },

    'camera.flash'(
        {
            duration = 1000,
            red, green, blue,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
        }

        camera.flash(duration, red, green, blue);
        if (wait) {
            this.wait({ camera: 'flash' }, eventSheetManager);
        }
        return this;
    },

    'camera.shake'(
        {
            duration = 1000,
            intensity,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
        }

        camera.shake(duration, intensity);
        if (wait) {
            this.wait({ camera: 'shake' }, eventSheetManager);
        }
        return this;
    },

    'camera.zoomTo'(
        {
            duration = 1000,
            zoom,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
        }

        camera.zoomTo(zoom, duration);
        if (wait) {
            this.wait({ camera: 'zoom' }, eventSheetManager);
        }
        return this;
    },

    'camera.rotateTo'(
        { duration = 1000,
            rotate, ease,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
        }

        camera.rotateTo(rotate, false, duration, ease);
        if (wait) {
            this.wait({ camera: 'rotate' }, eventSheetManager);
        }
        return this;
    },

    'camera.scrollTo'(
        {
            duration = 1000,
            x, y, ease,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera = this.sys.cameraTarget;
        if (!camera) {
            return this;
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
            this.wait({ camera: 'scroll' }, eventSheetManager);
        }
        return this;
    },

}