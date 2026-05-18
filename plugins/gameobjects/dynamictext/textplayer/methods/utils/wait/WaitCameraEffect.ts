var IsWaitCameraEffect = function(name?: any) {
    switch (name?: any) {
        case 'camera.fadein':
        case 'camera.fadeout':
        case 'camera.flash':
        case 'camera.shake':
        case 'camera.zoom':
        case 'camera.rotate':
        case 'camera.scroll':
            return true;
        default:
            return false;
    }
}

export { IsWaitCameraEffect };