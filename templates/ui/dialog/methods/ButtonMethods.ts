export default {
    getChoice(index?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            return choicesSizer.getButton(index);
        } else {
            return undefined;
        }
    },

    getAction(index?: any) {
        return this.childrenMap.actionsSizer.getButton(index);
    },

    getToolbar(index?: any) {
        return this.childrenMap.toolbarSizer.getButton(index);
    },

    getLeftToolbar(index?: any) {
        return this.childrenMap.leftToolbarSizer.getButton(index);
    },

    setChoiceEnable(index?: any, enabled?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.setButtonEnable(index, enabled);
        }
        return this;
    },

    setActionEnable(index?: any, enabled?: any) {
        this.childrenMap.actionsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setToolbarEnable(index?: any, enabled?: any) {
        this.childrenMap.toolbarSizer.setButtonEnable(index, enabled);
        return this;
    },

    setLeftToolbarEnable(index?: any, enabled?: any) {
        this.childrenMap.leftToolbarSizer.setButtonEnable(index, enabled);
        return this;
    },

    toggleChoiceEnable(index?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.toggleButtonEnable(index);
        }
        return this;
    },

    toggleActionEnable(index?: any) {
        this.childrenMap.actionsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleToolbarEnable(index?: any) {
        this.childrenMap.toolbarSizer.toggleButtonEnable(index);
        return this;
    },

    toggleLeftToolbarEnable(index?: any) {
        this.childrenMap.leftToolbarSizer.toggleButtonEnable(index);
        return this;
    },

    getChoiceEnable(index?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            return choicesSizer.getButtonEnable(index);
        } else {
            return false;
        }
    },

    getActionEnable(index?: any) {
        return this.childrenMap.actionsSizer.getButtonEnable(index);
    },

    getToolbarEnable(index?: any) {
        return this.childrenMap.toolbarSizer.getButtonEnable(index);
    },

    getLeftToolbarEnable(index?: any) {
        return this.childrenMap.leftToolbarSizer.getButtonEnable(index);
    },

    emitChoiceClick(index?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.emitButtonClick(index);
        }
        return this;
    },

    emitActionClick(index?: any) {
        this.childrenMap.actionsSizer.emitButtonClick(index);
        return this;
    },

    emitToolbarClick(index?: any) {
        this.childrenMap.toolbarSizer.emitButtonClick(index);
        return this;
    },

    emitLeftToolbarClick(index?: any) {
        this.childrenMap.leftToolbarSizer.emitButtonClick(index);
        return this;
    },

    showChoice(index?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.showButton(index);
        }
        return this;
    },

    showAction(index?: any) {
        this.childrenMap.actionsSizer.showButton(index);
        return this;
    },

    showToolbar(index?: any) {
        this.childrenMap.toolbarSizer.showButton(index);
        return this;
    },

    showLeftToolbar(index?: any) {
        this.childrenMap.leftToolbarSizer.showButton(index);
        return this;
    },

    hideChoice(index?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.hideButton(index);
        }
        return this;
    },

    hideAction(index?: any) {
        this.childrenMap.actionsSizer.hideButton(index);
        return this;
    },

    hideToolbar(index?: any) {
        this.childrenMap.toolbarSizer.hideButton(index);
        return this;
    },

    hideLeftToolbar(index?: any) {
        this.childrenMap.leftToolbarSizer.hideButton(index);
        return this;
    },

    addChoice(gameObject?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.addButton(gameObject);
        }
        return this;
    },

    addAction(gameObject?: any) {
        this.childrenMap.actionsSizer.addButton(gameObject);
        return this;
    },

    addToolbar(gameObject?: any) {
        this.childrenMap.toolbarSizer.addButton(gameObject);
        return this;
    },

    addLeftToolbar(gameObject?: any) {
        this.childrenMap.leftToolbarSizer.addButton(gameObject);
        return this;
    },

    removeChoice(index?: any, destroyChild?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.removeButton(index, destroyChild);
        }
        return this;
    },

    removeAction(index?: any, destroyChild?: any) {
        this.childrenMap.actionsSizer.removeButton(index, destroyChild);
        return this;
    },

    removeToolbar(index?: any, destroyChild?: any) {
        this.childrenMap.toolbarSizer.removeButton(index, destroyChild);
        return this;
    },

    removeLeftToolbar(index?: any, destroyChild?: any) {
        this.childrenMap.leftToolbarSizer.removeButton(index, destroyChild);
        return this;
    },

    clearChoices(destroyChild?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.clearButtons(destroyChild);
        }
        return this;
    },

    clearActions(destroyChild?: any) {
        this.childrenMap.actionsSizer.clearButtons(destroyChild);
        return this;
    },

    clearToolbar(destroyChild?: any) {
        this.childrenMap.toolbarSizer.clearButtons(destroyChild);
        return this;
    },

    clearLeftToolbar(destroyChild?: any) {
        this.childrenMap.leftToolbarSizer.clearButtons(destroyChild);
        return this;
    },

    forEachChoice(callback?: any, scope?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.forEachButtton(callback, scope);
        }
        return this;
    },

    forEachAction(callback?: any, scope?: any) {
        this.childrenMap.actionsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachToolbar(callback?: any, scope?: any) {
        this.childrenMap.toolbarSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachLeftToolbar(callback?: any, scope?: any) {
        this.childrenMap.leftToolbarSizer.forEachButtton(callback, scope);
        return this;
    },

    setAllButtonsEnable(enabled?: any) {
        if (enabled === undefined) {
            enabled = true;
        }

        if (this.childrenMap.toolbarSizer) {
            this.setToolbarEnable(enabled);
        }
        if (this.childrenMap.leftToolbarSizer) {
            this.setLeftToolbarEnable(enabled);
        }
        if (this.childrenMap.actionsSizer) {
            this.setActionEnable(enabled);
        }
        if (this.childrenMap.choicesSizer) {
            this.setChoiceEnable(enabled);
        }

        return this;
    },

    // Checkboxes
    getChoicesButtonStates() {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            return choicesSizer.getAllButtonsState();
        } else {
            return {};
        }
    },

    getChoicesButtonState(name?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (name === undefined) {
            if (choicesSizer?: any) {
                return choicesSizer.getAllButtonsState();
            } else {
                return {}
            }
        } else {
            if (choicesSizer?: any) {
                return choicesSizer.getButtonState(name);
            } else {
                return false;
            }
        }
    },

    setChoicesButtonState(name?: any, state?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.setButtonState(name, state);
        }
        return this;
    },

    clearChoicesButtonStates() {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.clearAllButtonsState();
        }
        return this;
    },

    // Radio buttons
    getChoicesSelectedButtonName() {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            return choicesSizer.getSelectedButtonName();
        } else {
            return '';
        }
    },

    setChoicesSelectedButtonName(name?: any) {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            choicesSizer.setSelectedButtonName(name);
        }
        return this;
    },

    hasAnyChoice() {
        var choicesSizer = this.childrenMap.choicesSizer;
        if (choicesSizer?: any) {
            return choicesSizer.hasAnyButton();
        }
        return false;
    },

    hasAnyAction() {
        var actionsSizer = this.childrenMap.actionsSizer;
        if (actionsSizer?: any) {
            return actionsSizer.hasAnyButton();
        }
        return false;
    },

    hasAnyToolbar() {
        var toolbarSizer = this.childrenMap.toolbarSizer;
        if (toolbarSizer?: any) {
            return toolbarSizer.hasAnyButton();
        }
        return false;
    },

    hasAnyLeftToolbar() {
        var leftToolbarSizer = this.childrenMap.leftToolbarSizer;
        if (leftToolbarSizer?: any) {
            return leftToolbarSizer.hasAnyButton();
        }
        return false;
    },
};