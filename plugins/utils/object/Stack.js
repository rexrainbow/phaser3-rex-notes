class Stack {
    constructor() {
        this.items = [];
    }

    pop() {
        return (this.items.length > 0) ? this.items.pop() : null;
    }

    push(l) {
        this.items.push(l);
    }

    pushMultiple(arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            this.items.push(arr[i]);
        }
        arr.length = 0;
    }
}

export default Stack;