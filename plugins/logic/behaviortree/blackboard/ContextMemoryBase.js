class ContextMemoryBase {
    destroy() {
    }

    getEvalContext() {
        throw new Error('ContextMemory.getEvalContext() is not implemented');
    }
    dump() {
        throw new Error('ContextMemory.dump() is not implemented');
    }

    load(data) {
        throw new Error('ContextMemory.load() is not implemented');
    }

    get(path) {
        throw new Error('ContextMemory.get() is not implemented');
    }

    set(path, value) {
        throw new Error('ContextMemory.set() is not implemented');
    }

    has(path) {
        throw new Error('ContextMemory.has() is not implemented');
    }

    remove(path) {
        throw new Error('ContextMemory.remove() is not implemented');
    }
}

export default ContextMemoryBase;