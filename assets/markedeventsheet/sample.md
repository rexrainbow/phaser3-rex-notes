# Title

## [Condition]

金幣 > 5

## [Condition]

hp > 3

## Script

print\
 text=Hello


```print
World


World
```

print\
 text=I have {{金幣}} 金幣

set
  金幣=金幣 + 10

print\
 text=Now I have {{金幣}} 金幣

## Before if 

print
  text=Before if

## [If]

金幣 < 5

### Label A

print
  text=If (金幣 < 5)

## [Else]

### Label Else

print
  text=Else (金幣 < 5)

## [If]

金幣 > 10

### Label B

print
  text=If (金幣 > 10)

## After If 

print
  text=After If

## [Catch]

print\
  text=Try again
