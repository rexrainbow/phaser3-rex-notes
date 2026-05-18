import Label from '../label/Label';
import ConfirmAction from '../confirmdialog/ConfirmAction';
import Clone from '../../../plugins/utils/object/Clone';

class ConfirmActionButton extends Label {
    confirmActionConfig: any;
    confirmDialog: any;
    confirmDialogEnable: any;
    ignoreDestroy: any;
    onClick: any;
    onClickCallback: any;
    scene: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexConfirmActionButton';

        this.setConfirmDialogEnable();

        this.confirmActionConfig = Clone(config.confirmDialog || {});
        if (config.confirm) {
            this.setConfirmCallback(config.confirm, config.confirmScope);
        }
        if (config.cancel) {
            this.setCancelCallback(config.cancel, config.cancelScope);
        }

        this.onClickCallback = function() {
            if (this.confirmDialogEnable) {
                if (this.confirmDialog) {
                    return;
                }

                this.confirmDialog = ConfirmAction(scene, this.confirmActionConfig);
                this.confirmDialog.once('destroy', function() {
                    this.confirmDialog = undefined;
                }, this);

            } else {
                this.runConfirmCallback();
            }
        }
        this.onClick(this.onClickCallback, this);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.confirmDialog) {
            this.confirmDialog.destroy();
        }

        super.destroy(fromScene);

        this.confirmActionConfig = undefined;
        this.onClickCallback = undefined;
        this.confirmDialog = undefined;
    }

    setConfirmCallback(callback?: any, scope?: any) {
        this.confirmActionConfig.confirm = callback;
        this.confirmActionConfig.confirmScope = scope;
        return this;
    }

    setCancelCallback(callback?: any, scope?: any) {
        this.confirmActionConfig.cancel = callback;
        this.confirmActionConfig.cancelScope = scope;
        return this;
    }

    setConfirmDialogContent(content?: any) {
        this.confirmActionConfig.content = content;
        return this;
    }

    setConfirmDialogStyle(style?: any) {
        this.confirmActionConfig.style = style;
        return this;
    }

    setConfirmDialogModalConfig(config?: any) {
        this.confirmActionConfig.modal = config;
        return this;
    }

    setConfirmDialogEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.confirmDialogEnable = enable;
        return this;
    }

    runConfirmCallback() {
        var callback = this.confirmActionConfig.confirm;
        var scope = this.confirmActionConfig.confirmScope;

        if (callback?: any) {
            callback.call(scope);
        }

        return this;
    }
}

export default ConfirmActionButton;