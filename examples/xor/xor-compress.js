import XOR from '../../plugins/xor.js';
import LZString from '../../plugins/lzstring.js';

class StringPacker {
  constructor(config) {
    this.xor = XOR;
    this.lzstring = new LZString(config);
  }

  zip(src, pwd) {
    var enc = this.xor.Encrypt(src, pwd);
    console.log('encrypt ' + (enc.length / src.length))
    var comp = this.lzstring.compress(enc);
    console.log('compress ' + (comp.length / enc.length));
    console.log('src -> zip ' + (comp.length / src.length));
    return comp;
  }

  unzip(src, pwd) {
    var decomp = this.lzstring.decompress(src);
    var dec = this.xor.Decrypt(decomp, pwd);
    return dec;
  }
}

class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: 'examples'
    })
  }

  preload() {}

  create() {
    var packer = new StringPacker();

    var data = [];
    for (var i = 0; i < 10000; i++) {
      data.push({
        item: Math.random()
      });
    }
    data = JSON.stringify(data);
    var pwd = 'aabbcc';

    var result = packer.zip(data, pwd);
    var src = packer.unzip(result, pwd);
    console.log((data === src) ? 'pass' : 'fail');
  }

  update() {}
}

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: Demo
};

var game = new Phaser.Game(config);