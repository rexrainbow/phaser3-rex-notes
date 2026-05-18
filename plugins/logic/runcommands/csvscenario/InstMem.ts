import Clone from '../../../utils/object/Clone';
import Clear from '../../../utils/object/Clear';
import GetValue from '../../../utils/object/GetValue';

class InstMem {
    currentIdx: any;
    nextIdx: any;
    queue: any;
    scenario: any;

    constructor(scenario?: any) {
        this.scenario = scenario;

        this.queue = [];
        this.currentIdx = -1;
        this.nextIdx = 0;
    }

    resetFromJSON(o?: any) {
        var queue = GetValue(o, 'queue', undefined);
        if (queue === undefined) {
            Clear(this.queue);
        } else {
            Clone(queue, this.queue);
        }

        this.currentIdx = GetValue(o, 'curIdx', -1);
        this.nextIdx = GetValue(o, 'nextIdx', 0);
        return this;
    }

    clear() {
        this.currentIdx = -1;
        this.nextIdx = 0;
        this.queue.length = 0;
        return this;
    }

    append(item?: any) {
        this.queue.push(item);
        return this;
    }

    setNextIndex(index?: any) {
        if (index === undefined) {
            index = this.currentIdx + 1;
        }
        this.nextIdx = index;
        return this;
    }

    get(index?: any) {
        if (index === undefined) {
            index = this.nextIdx;
        }
        this.currentIdx = index;
        return this.queue[index];
    }

    get length() {
        return this.queue.length;
    }
}

export default InstMem;