import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var qr2x = function (mode, q, r) {
    var x;
    switch (mode) {
        case ODD_R:
            x = q - (r - (r & 1)) / 2;
            break;

        case EVEN_R:
            x = q - (r + (r & 1)) / 2;
            break;

        case ODD_Q:
        case EVEN_Q:
            x = q;
            break;
    }
    return x;
};

var qr2y = function (mode, q, r) {
    var x = qr2x(mode, q, r);
    var z = qr2z(mode, q, r);
    var y = -x - z;
    return y;
};

var qr2z = function (mode, q, r) {
    var z;
    switch (mode) {
        case ODD_R:
        case EVEN_R:
            z = r;
            break;

        case ODD_Q:
            z = r - (q - (q & 1)) / 2;
            break;
        case EVEN_Q:
            z = r - (q + (q & 1)) / 2;
            break;
    }
    return z;
};

var qr2xyz = function (mode, q, r, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globXYZ;
    }
    out.x = qr2x(mode, q, r);
    out.y = qr2y(mode, q, r);
    out.z = qr2z(mode, q, r);
    return out;
}

var globXYZ = {};

var xyz2q = function (mode, x, y, z) {
    var q;
    switch (mode) {
        case ODD_R:
            q = x + (z - (z & 1)) / 2;
            break;
        case EVEN_R:
            q = x + (z + (z & 1)) / 2;
            break;

        case ODD_Q:
        case EVEN_Q:
            q = x;
            break;
    }
    return q;
};

var xyz2r = function (mode, x, y, z) {
    var r;
    switch (mode) {
        case ODD_R:
        case EVEN_R:
            r = z;
            break;

        case ODD_Q:
            r = z + (x - (x & 1)) / 2;
            break;
        case EVEN_Q:
            r = z + (x + (x & 1)) / 2;
            break;
    }
    return r;
};

var xyz2qr = function (mode, x, y, z, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globQR;
    }

    out.q = xyz2q(mode, x, y, z);
    out.r = xyz2r(mode, x, y, z);
    return out;
}

var globQR = {};

export {
    qr2x,
    qr2y,
    qr2z,
    qr2xyz,
    xyz2q,
    xyz2r,
    xyz2qr
};