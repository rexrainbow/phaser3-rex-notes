import MonitorViewport from './MonitorViewport.js';

var AddViewportCoordinateProperties = function (gameObject, viewport, vpx, vpy) {
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

    gameObject.vp = viewport;

    MonitorViewport(viewport);
    var events = viewport.events;

    // Set position of game object when view-port changed.
    var Transform = function () {
        gameObject.x = viewport.x + (viewport.width * vpx);
        gameObject.y = viewport.y + (viewport.height * vpy);
    }
    events.on('update', Transform);
    gameObject.once('destroy', function () {
        events.off('update', Transform);
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

}

export default AddViewportCoordinateProperties;