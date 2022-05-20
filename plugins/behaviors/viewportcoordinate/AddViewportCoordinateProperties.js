import MonitorViewport from './MonitorViewport.js';

var AddViewportCoordinateProperties = function (gameObject, viewport, vpx, vpy, transformCallback) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('vp')) {
        return gameObject;
    }

    if (vpx === undefined) {
        vpx = 0.5;
    }
    if (vpy === undefined) {
        vpy = 0.5;
    }
    if (transformCallback === undefined) {
        transformCallback = DefaultTransformCallback;
    }

    MonitorViewport(viewport);
    var events = viewport.events;

    gameObject.vp = viewport;

    // Set position of game object when view-port changed.
    var Transform = function () {
        transformCallback(gameObject, viewport, vpx, vpy);
    }
    events.on('update', Transform);
    gameObject.once('destroy', function () {
        events.off('update', Transform);
        gameObject.vp = undefined;
    })

    Object.defineProperty(gameObject, 'vpx', {
        get: function () {
            return vpx;
        },
        set: function (value) {
            if (vpx !== value) {
                vpx = value;
                Transform();
            }
        },
    });

    Object.defineProperty(gameObject, 'vpy', {
        get: function () {
            return vpy;
        },
        set: function (value) {
            if (vpy !== value) {
                vpy = value;
                Transform();
            }
        },
    });

    Transform();
}

var DefaultTransformCallback = function (gameObject, viewport, vpx, vpy) {
    gameObject.x = viewport.x + (viewport.width * vpx);
    gameObject.y = viewport.y + (viewport.height * vpy);
}

export default AddViewportCoordinateProperties;