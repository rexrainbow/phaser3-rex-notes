import ModalMethods from '../../basesizer/ModalMethods.js';

export default {
    onCreateModalBehavior(self) {
        self.on('button.click', function (button, groupName, index, pointer, event) {
            var canClose = false;
            switch (groupName) {
                case 'actions':
                    // Click any action button
                    canClose = true;
                    break;

                case 'choices':
                    // Click any choice button, and no action button in this dialog
                    if (!self.hasAnyAction()) {
                        canClose = true;
                    }
                    break;
            }
            if (!canClose) {
                return;
            }

            var closeEventData = {
                index: index,
                text: button.text,
                button: button,
                dialog: self
            }


            switch (self.buttonsType) {
                case 'radio':
                    closeEventData.value = self.getChoicesSelectedButtonName();
                    break;
                case 'checkboxes':
                    closeEventData.value = self.getChoicesButtonStates();
                    break;
                default:
                    closeEventData.value = undefined;
            }

            self.modalClose(closeEventData);
        });
    },

    modal(config, onClose) {
        if (config && (config.defaultBehavior === false)) {
            this.onCreateModalBehavior = false;
        } else {
            delete this.onCreateModalBehavior;
        }

        ModalMethods.modal.call(this, config, onClose);
        return this;
    }
}