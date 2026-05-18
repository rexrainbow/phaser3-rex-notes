var AppendSpace = function(width?: any) {
    var child = this.createSpaceChild(width);
    this.addChild(child);

    return this;
};

export default AppendSpace;