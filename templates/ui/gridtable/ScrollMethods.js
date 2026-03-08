import EaseValueTask from '../../../plugins/utils/ease/EaseValueTask.js';

export default {
    scrollToRow(rowIndex, duration, ease) {
        var startChildOY = this.childOY;

        var table = this.childrenMap.child;
        table.scrollToRow(rowIndex);

        if ((duration === undefined) || (duration <= 0)) {
            this.updateController();

        } else {
            var endChildOY = this.childOY;

            if (this._easeScrollChildOY === undefined) {
                this._easeScrollChildOY = new EaseValueTask(this)
            }

            this._easeScrollChildOY.restart({
                key: 'childOY',
                from: startChildOY,
                to: endChildOY,
                duration: duration,
                ease: ease
            });
        }

        return this;
    },

    scrollToNextRow(rowCount, duration, ease) {
        var table = this.childrenMap.child;
        table.scrollToNextRow(rowCount, duration, ease);
        return this;
    }
}