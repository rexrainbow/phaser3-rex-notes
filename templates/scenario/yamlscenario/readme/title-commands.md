# Title commands

## Create Game Object Instance

```yaml
- name: TITLE
  parameters:
    id: NAME
    width: 0
    height: 0  
    vpx: 0.5
    vpy: 1
    vpw: 
    vph: 
    alignLeft: false
    alignRight: true
    alignTop: true
    alignBottom: false
    text0: 
    text1: 
```

Create TitleLabel as Title game object

- `alignLeft`, `alignRight`, `alignTop`, `alignBottom` : Assign Origin. Default behavior is align at top-right.
- `text0` : Text content of upper text game object.
- `text1` : Text content of lower text game object.

## Destroy

```yaml
- name: NAME.destroy
```

## Set properties

```yaml
- name: NAME.set
  parameters:
    x: 
    vpx: 
    y: 
    vpy: 
    alpha: 
    duration: 1000
    ease: Linear
    repeat: 0
    wait: 
```

## Ease properties

```yaml
- name: NAME.to
  parameters:
    x: 
    vpx: 
    y: 
    vpy: 
    alpha: 
    duration: 1000
    ease: Linear
    repeat: 0
    wait: 
```

or

```yaml
- name: NAME.yoyo
  parameters:
    x: 
    vpx: 
    y: 
    vpy: 
    alpha: 
    duration: 1000
    ease: Linear
    repeat: 0
    wait: 
```

## Call methods

### Set text

```yaml
- name: NAME.setText
  parameters:
    text0: 
    text1: 
```

### Pop up

```yaml
- name: NAME.popUp
  parameters:
    text0: 
    text1: 
    separatorDir: right
    text0Dir: up
    text1Dir: down
    separatorThenText: true
    duration:
    wait: true
```

- `separatorDir` : Ease direction, `right` or `left`
- `text0Dir`, `text1Dir` : Ease direction, `up`, `down`, `right`, or `left`
- `separatorThenText` :
    - `true` : Ease separator then ease text0, text1
    - `false` : Ease separator, text0, text1 at the same time


### Shake

```yaml
- name: NAME.shake
  parameters:
    duration: 
    magnitude: 
    wait: true
```
