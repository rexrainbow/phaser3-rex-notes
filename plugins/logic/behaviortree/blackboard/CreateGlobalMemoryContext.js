import CreateProxyContext from '../../../utils/proxy/createproxycontext/CreateProxyContext.js';

var CreateGlobalMemoryConext = function (blackboard) {
    return CreateProxyContext({
        has(target, key) {
            return blackboard.has(key)
        },
        get(target, key) {
            return blackboard.get(key)
        }
    });
}

export default CreateGlobalMemoryConext;