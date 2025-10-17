import Line from '../../line/Line.js';

var DefaultCreateEdgeGameObjectCallback = function (scene, id, parameters) {
    var {
        color = 0xffffff,
        width = 2,
        type = 'poly',
        head = 'none',
        tail = 'none,'
    } = parameters;
    var gameObject = new Line(scene, {
        color: color,
        lineWidth: width,
        lineType: type,
        headShape: head,
        tailShape: tail,
    })
    scene.add.existing(gameObject);
    return gameObject;
}

export default DefaultCreateEdgeGameObjectCallback;