import EaseValueTask from '../../../plugins/utils/ease/EaseValueTask.js';

var EaseScrollChildOY = function (y0, y1, duration, ease) {
    if ((duration === undefined) || (duration <= 0)) {
        return;
    }
    if (this._easeScrollChildOY === undefined) {
        this._easeScrollChildOY = new EaseValueTask(this)
    }
    this._easeScrollChildOY.restart({
        key: 'childOY',
        from: y0,
        to: y1,
        duration: duration,
        ease: ease
    });
}

export default {
    scrollToLine(lineIndex, duration, ease) {
        var y0 = this.childOY;
        this.childrenMap.child.scrollToLine(lineIndex);
        var y1 = this.childOY;

        EaseScrollChildOY.call(this, y0, y1, duration, ease);
        return this;
    },

    scrollToNextLine(lineCount, duration, ease) {
        var y0 = this.childOY;
        this.childrenMap.child.scrollToNextLine(lineCount);
        var y1 = this.childOY;

        EaseScrollChildOY.call(this, y0, y1, duration, ease);
        return this;
    }
}
