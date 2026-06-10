import {
    EVT_PAUSE_CLICK,
    EVT_PAUSE_KEY,
    EVT_PAUSE_INPUT,
    EVT_RESUME_INPUT,
} from '../../eventsheetmanager/constants.js';

export default {
    onPauseClick() {
        this.addEvent({ type: EVT_PAUSE_CLICK }, undefined, undefined);
    },

    onPauseKey(key) {
        this.addEvent({ type: EVT_PAUSE_KEY, key: key }, undefined, undefined);
    },

    onPauseInput() {
        this.addEvent({ type: EVT_PAUSE_INPUT }, undefined, undefined);
    },

    onResumeInput() {
        this.addEvent({ type: EVT_RESUME_INPUT }, undefined, undefined);
    },
}