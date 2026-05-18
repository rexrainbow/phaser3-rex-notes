class ObjectFactory {
    displayList: any;
    scene: any;
    updateList: any;

    constructor(scene?: any) {
        this.scene = scene;
        this.displayList = scene.sys.displayList;
        this.updateList = scene.sys.updateList;

        scene.events.once('destroy', this.destroy, this);
    }

    destroy() {
        this.scene = null;
        this.displayList = null;
        this.updateList = null;
    }

    static register(type?: any, callback?: any) {
        ObjectFactory.prototype[type] = callback;
    }
};
export default ObjectFactory;