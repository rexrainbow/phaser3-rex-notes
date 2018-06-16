## Introduction

[Matter](http://brm.io/matter-js/) physics engine in phaser.

- Author: Richard Davey

## Usage

### Configuration

```javascript
var config = {
    // ...
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: false
        }
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add physics object

#### Image object

Static object

```javascript
var image = scene.matter.add.imag(x, y, key, frame, { isStatic: true });
```

Dynamic object

```javascript
var image = scene.matter.add.imag(x, y, key, frame);
```

#### Sprite object

Static object

```javascript
var image = scene.matter.add.sprite(x, y, key, frame, { isStatic: true });
```

Dynamic object

```javascript
var image = scene.matter.add.sprite(x, y, key, frame);
```

### Methods of game object

#### Size

```javascript
gameObject.setRectangle(width, height, options);
```

```javascript
gameObject.setCircle(radius, options);
```

```javascript
gameObject.setPolygon(radius, sides, options);
```

```javascript
gameObject.setTrapezoid(width, height, slope, options);
```

#### Velocity

```javascript
gameObject.setVelocity(x, y);
```

```javascript
gameObject.setVelocityX(x);
```

```javascript
gameObject.setVelocityY(x);
```

#### Mass

```javascript
gameObject.setMass(v);
```

```javascript
gameObject.setDensity(v);
```

#### Acceleration

#### Gravity

```javascript
gameObject.setGravity(x, y);
```

#### Friction

```javascript
gameObject.setFriction(value, air, fstatic);
```

```javascript
gameObject.setFrictionAir(v);
```

```javascript
gameObject.setFrictionStatic(v);
```

#### Angular

```javascript
gameObject.setAngularVelocity(v);
```

#### Bounce

```javascript
gameObject.setBounce(v);
```