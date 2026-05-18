var SetVelocity = function(gameObject?: any, vx?: any, vy?: any, onChange?: any) {
    var body = gameObject.body;
    var preVx = body.velocity.x,
        preVy = body.velocity.y;
    if ((vx === preVx) && (vy === preVy)) {
        return
    }
    body.setVelocity(vx, vy);
    if (onChange?: any) {
        onChange(vx, vy, preVx, preVy);
    }
}

var SetAcceleration = function(gameObject?: any, ax?: any, ay?: any, onChange?: any) {
    var body = gameObject.body;
    var preAx = body.acceleration.x,
        preAy = body.acceleration.y;
    if ((ax === preAx) && (ay === preAy)) {
        return;
    }
    body.setAcceleration(ax, ay);
    if (onChange?: any) {
        onChange(ax, ay, preAx, preAy);
    }
}

var SetAngularVelocity = function(gameObject?: any, av?: any, onChange?: any) {
    var body = gameObject.body;
    var preAv = body.angularVelocity;
    if (av === preAv) {
        return;
    }
    body.setAngularVelocity(av);
    if (onChange?: any) {
        onChange(av, preAv);
    }
}

var SetAngularAcceleration = function(gameObject?: any, aa?: any, onChange?: any) {
    var body = gameObject.body;
    var preAa = body.angularAcceleration
    if (aa === preAa) {
        return;
    }
    body.setAngularAcceleration(aa);
    if (onChange?: any) {
        onChange(aa, preAa);
    }
}

export {
    SetVelocity,
    SetAcceleration,
    SetAngularVelocity,
    SetAngularAcceleration
}