class ObjectFactory {
    static register(type?: any, callback?: any) {
        ObjectFactory.prototype[type] = callback;
    }
};
export default ObjectFactory;