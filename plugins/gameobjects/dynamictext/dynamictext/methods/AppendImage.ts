var AppendImage = function(key?: any, frame?: any, properties?: any) {
    var child = this.createImageChild(key, frame, properties);
    this.addChild(child);

    return this;
};

export default AppendImage;