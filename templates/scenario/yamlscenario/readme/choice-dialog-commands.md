# Choice dialog commands

## Create Game Object Instance

```yaml
- name: CHOICE
  parameters:
    id: NAME
    width: 0
    height: 0
    vpx: 0.5
    vpy: 0.5
    vpw: 
    vph: 
```

Create ConfirmDialog as Choice dailog game object

## Destroy game object

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

### Choice

```yaml
- name: NAME.choice
  parameters:
    title: 
    content: 
    option1: 
    option2: 
    option3: 
    resultKey: choiceIndex
```

- If click button1 (option1), resultKey( choiceIndex) will set to `1`
- If click button2 (option2), resultKey( choiceIndex) will set to `2`
- If click button3 (option3), resultKey( choiceIndex) will set to `3`

### Shake

```yaml
- name: NAME.shake
  parameters:
    duration: 
    magnitude: 
    wait: true
```
