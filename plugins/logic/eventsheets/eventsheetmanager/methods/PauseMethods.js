import UUID from '../../../../utils/string/UUID.js';

export default {
    // Internal method
    clearResumeEventName() {
        this.__resumeEventName = undefined;
        return this;
    },

    // Internal method
    getResumeEventName() {
        return this.__resumeEventName;
    },

    pause(resumeEventName) {
        if (resumeEventName === undefined) {
            resumeEventName = UUID();
        }

        this.__resumeEventName = resumeEventName;

        return resumeEventName;
    },
}