import SetChildrenInteractiveBase from '../../utils/setchildreninteractive/SetChildrenInteractive';

var SetChildrenInteractive = function(config?: any) {
    if (config === undefined) {
        config = {};
    }
    config.targetMode = 'parent';
    config.targetSizers = [this];
    SetChildrenInteractiveBase(this, config);
    return this;
}
export default SetChildrenInteractive;