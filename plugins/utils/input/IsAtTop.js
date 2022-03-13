var TopObjects = {}; // {groupName: {tick, key}}
var IsAtTop = function (scene, groupName, key) {
    var result;
    var tick = scene.game.loop.frame;
    if (TopObjects.hasOwnProperty(groupName)) {
        var item = TopObjects[groupName];
        if (item.tick < tick) {
            result = true;
        } else if (item.tick === tick) {
            result = (key !== undefined) && (item.key === key);
        } else {
            result = false;
        }
        if (result) {
            item.tick = tick;
            item.key = key;
        }
    } else {
        TopObjects[groupName] = {
            tick: tick,
            key: key
        }
        result = true;
    }
    return result;
}

export default IsAtTop;