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
            self.modalClose(closeEventData);
        });
    },
}