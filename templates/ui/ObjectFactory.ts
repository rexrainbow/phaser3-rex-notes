class ObjectFactory {
    scene: any;

    constructor(scene?: any) {
        this.scene = scene;

        scene.events.once('destroy', this.destroy, this);
    }

    destroy() {
        this.scene = null;
    }

    static register(type?: any, callback?: any) {
        ObjectFactory.prototype[type] = callback;
    }
};
export default ObjectFactory;