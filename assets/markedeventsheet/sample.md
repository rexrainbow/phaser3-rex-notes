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

## [Catch]

print\
  text=Try again
