export default {
    'camera.set'(
        {
            x, y, rotate, zoom,
            name
        } = {},
        eventSheetManager, eventsheet
    ) {
        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

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
                name,
                wait = false
            } = {},
            eventSheetManager, eventsheet
        ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

        if (!camera) {
            return this;
        }

        camera.fadeIn(duration, red, green, blue);
        if (wait) {
            this.wait({ camera: 'fadeIn', cameraName: name }, eventSheetManager);
        }
        return this;
    },

    'camera.fadeOut'(
        {
            duration = 1000,
            red, green, blue,
            name,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

        if (!camera) {
            return this;
        }

        camera.fadeOut(duration, red, green, blue);
        if (wait) {
            this.wait({ camera: 'fadeOut', cameraName: name }, eventSheetManager);
        }
        return this;
    },

    'camera.flash'(
        {
            duration = 1000,
            red, green, blue,
            name,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

        if (!camera) {
            return this;
        }

        camera.flash(duration, red, green, blue);
        if (wait) {
            this.wait({ camera: 'flash', cameraName: name }, eventSheetManager);
        }
        return this;
    },

    'camera.shake'(
        {
            duration = 1000,
            intensity,
            name,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

        if (!camera) {
            return this;
        }

        camera.shake(duration, intensity);
        if (wait) {
            this.wait({ camera: 'shake', cameraName: name }, eventSheetManager);
        }
        return this;
    },

    'camera.zoomTo'(
        {
            duration = 1000,
            zoom,
            name,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

        if (!camera) {
            return this;
        }

        camera.zoomTo(zoom, duration);
        if (wait) {
            this.wait({ camera: 'zoom', cameraName: name }, eventSheetManager);
        }
        return this;
    },

    'camera.rotateTo'(
        {
            duration = 1000,
            rotate, ease,
            name,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

        if (!camera) {
            return this;
        }

        camera.rotateTo(rotate, false, duration, ease);
        if (wait) {
            this.wait({ camera: 'rotate', cameraName: name }, eventSheetManager);
        }
        return this;
    },

    'camera.scrollTo'(
        {
            duration = 1000,
            x, y, ease,
            name,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var camera;
        if (name) {
            camera = this.sys.scene.cameras.getCamera(name);
        } else {
            camera = this.sys.cameraTarget;
        }

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
            this.wait({ camera: 'scroll', cameraName: name }, eventSheetManager);
        }
        return this;
    },

}