
class TaskTypeCache {
    static register(type, klass) {
        if (!types.hasOwnProperty(type)) {
            types[type] = klass;
        }
    }
    
    static get(type) {
        return types[type];
    }
}

var types = {};
export default TaskTypeCache;