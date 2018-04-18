'use strict'

class Pool {
    constructor() {
        this.items = [];
    }

    allocate() {
        return (this.items.length > 0) ? this.items.pop() : null;
    }

    free(l) {
        this.items.push(l);
    }

    freeArr(arr) {        
        for (var i = 0, len = arr.length; i < len; i++) {
            this.items.push(arr[i]);
        }
        arr.length = 0;
    }
}

export default Pool;