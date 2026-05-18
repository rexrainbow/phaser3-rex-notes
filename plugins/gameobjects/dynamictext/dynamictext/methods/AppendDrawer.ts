var AppendDrawer = function(renderCallback?: any, width?: any, height?: any) {
    var child = this.createDrawerChild(renderCallback, width, height);
    this.addChild(child);

    return this;
};

export default AppendDrawer;