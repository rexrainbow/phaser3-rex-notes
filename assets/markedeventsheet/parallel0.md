# Event sheet 0

## Condition

coin > 5

## Script

set
  coin=3

print
  text=Event 0 start

wait

print
  text=Event 0 progress 0

wait

print
  text=Event 0 progress 1

wait

print
  text=Event 0 complete

## Else

print
  text=Else, Event 0