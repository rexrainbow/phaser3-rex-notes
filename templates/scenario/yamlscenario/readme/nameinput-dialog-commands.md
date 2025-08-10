# Name-input dialog commands

## Create Game Object Instance

```yaml
- name: NAMEINPUT
  parameters:
    id: NameInput
    width: 0
    height: 0
    vpx: 0.5
    vpy: 0.5
    vpw: 
    vph: 
```

Create Name-input dailog game object

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

### Name-input

```yaml
- name: NAME.input
  parameters:
    title: 
    firstNameTitle: 
    lastNameTitle: 
    button: 
    firstName: 
    lastName: 
    firstNameKey: firstName
    lastNameKey: lastName
```

- Store input to variable by key `firstNameKey` and `lastNameKey`

### Shake

```yaml
- name: NAME.shake
  parameters:
    duration: 
    magnitude: 
    wait: true
```
