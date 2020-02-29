var MakeChildImageGameObject = function (parent, key, className) {
    if (className === undefined) {
        className = 'image';
    }
    if (!parent[key]) {
        parent[key] = parent.scene.make[className]({
            add: false,
            origin: { x: 0, y: 0 },
        });
        parent.on('destroy', function () {
            if (parent[key]) {
                parent[key].destroy();
                parent[key] = undefined;
            }
        })
    }
    return parent[key];
}
export default MakeChildImageGameObject;