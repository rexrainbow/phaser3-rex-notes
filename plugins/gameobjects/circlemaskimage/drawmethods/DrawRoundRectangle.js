import GeomRoundRectangle from '../../shape/roundrectangle/geom/RoundRectangle.js';

const DegToRad = Phaser.Math.DegToRad;
const Rad0 = DegToRad(0);
const Rad90 = DegToRad(90);
const Rad180 = DegToRad(180);
const Rad270 = DegToRad(270);

var DrawRoundRectangle = function (ctx, width, height, radiusConfig) {
    if (radiusConfig === undefined) {
        radiusConfig = Math.min(Math.floor(width / 2), Math.floor(height / 2))
    }

    var geom = new GeomRoundRectangle(0, 0, width, height, radiusConfig);
    var cornerRadius = geom.cornerRadius, radius,
        centerX, centerY;

    // bottom-right
    radius = cornerRadius.br;
    centerX = geom.width - radius.x;
    centerY = geom.height - radius.y;
    if (isArcCorner(radius)) {
        ctx.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad0, Rad90);
    } else {
        ctx.moveTo(geom.width, centerY);
        ctx.lineTo(geom.width, geom.height);
        ctx.lineTo(centerX, geom.height);
    }

    // bottom-left
    radius = cornerRadius.bl;
    centerX = radius.x;
    centerY = geom.height - radius.y;
    ctx.lineTo(radius.x, geom.height);
    if (isArcCorner(radius)) {        
        ctx.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad90, Rad180);
    } else {
        ctx.lineTo(0, geom.height);
        ctx.lineTo(0, centerY);
    }

    // top-left
    radius = cornerRadius.tl;
    centerX = radius.x;
    centerY = radius.y;
    ctx.lineTo(0, centerY);
    if (isArcCorner(radius)) {
        ctx.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad180, Rad270);
    } else {
        ctx.lineTo(0, 0);
        ctx.lineTo(centerX, 0);
    }

    // top-right
    radius = cornerRadius.tr;
    centerX = geom.width - radius.x;
    centerY = radius.y;
    ctx.lineTo(centerX, 0);
    if (isArcCorner(radius)) {
        ctx.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad270, Rad0);
    } else {
        ctx.lineTo(geom.width, 0);
        ctx.lineTo(geom.width, centerY);
    }
    ctx.closePath();

}

var isArcCorner = function (radius) {
    return ((radius.x !== 0) && (radius.y !== 0));
}

export default DrawRoundRectangle;