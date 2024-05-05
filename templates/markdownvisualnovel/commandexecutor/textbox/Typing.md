# Typing

## FSM

https://mermaid.live/edit#pako:eNptkU1vgzAMhv8K8hkQ5Ts57NTdNmnSepq4RMSjqCWJQtDKgP--NC1jmpqT_frR69ieoJYcgUKjmTp6h30lKuHZ1xumjRcET56SrTCoufy6l_4IDmj7w6ha0UxrsNy4NXXQPGI_e4o1iII_qgs5W-WF9ebNQtMW_rqtwsYLvJir5WPCdaxlp85ocJ3r_oPHk61-_6vgQ4e6Yy23m5qubAXmiB1WQG3ImT5VUInFcoPizOAzb43UQI0e0Ac2GPk-inrNb8y-ZXbpHdBPdu6tqpj4kHLL0Xm83s7jruQYoBNcgO7iNCzTIs-iIs-TMslLH0agQRJHYUFKQuKIkDLP8sWHb2e7C1MLkswSJYmTJF1-AI4ApWA

```mermaid
graph TD

    start --> pointerdown
    pointerdown --> isTyping{isTyping}
    isTyping --> |yes| pageend
    isTyping --> |no| isLastPage{isLastPage}
    isLastPage --> |no| nextpage
    isLastPage --> |yes| complete

    pageend --> pointerdown
    nextpage --> pointerdown
```