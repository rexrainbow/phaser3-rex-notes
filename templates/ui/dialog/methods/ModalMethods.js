export default {
    onCreateModalBehavior(self) {
        self.on('button.click', function (button, groupName, index, pointer, event) {
            if (groupName !== 'actions') {
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
}