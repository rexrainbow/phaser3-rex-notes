import { WaitComplete } from '../../../../utils/promise/WaitEvent';

var Start = function(children?: any) {
    this.children = children;
    this.index = 0;
    this.isPageTyping = true;

    if (this.onTypeStart) {
        this.onTypeStart(children);
    }
    this.typing();

    return WaitComplete(this);  // Promise
}

export default Start;