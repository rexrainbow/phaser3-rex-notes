var Make = function (name, config) {
    var gameObject;
    var builder = this.builders[name];
    if (builder) {
        gameObject = builder(this.scene, config, this.styles)
    } else {

    }

    return gameObject;
}

export default Make;