import Pool from '../../pool';

class TimerPool extends Pool {
    pop: any;
    push: any;

    allocate() {
        return this.pop();
    }

    free(timer?: any) {
        timer.onFree();
        this.push(timer);
    }

    freeMultiple(arr?: any) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
            this.free(arr[i]);
        }
        return this;
    }
}

export default TimerPool;