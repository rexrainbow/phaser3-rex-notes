import Line from '../../line/Line.js';

const DefaultDashPattern = [5, 5];

var GetDefaultCreateEdgeGameObjectCallback = function (config) {
    var {
        dashPattern = DefaultDashPattern
    } = config;

    var DefaultCreateEdgeGameObjectCallback = function (scene, id, parameters) {
        var {
            color = 0xffffff,
            width = 2,
            type = 'poly',
            head = 'none',
            tail = 'none',
            $dashed = false
        } = parameters;
        var gameObject = new Line(scene, {
            color: color,
            lineWidth: width,
            lineType: type,
            headShape: head,
            tailShape: tail,
            dashPattern: ($dashed) ? dashPattern : undefined
        });
        scene.add.existing(gameObject);
        return gameObject;
    }

    return DefaultCreateEdgeGameObjectCallback;
}

export default GetDefaultCreateEdgeGameObjectCallback;