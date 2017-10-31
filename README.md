## Secret Santa / Amigo Oculto

Use Amazon SNS (Simple Notification System) to deliver messages revealing the secret santa result.

Use Amazon SNS (Simple Notification System) para revelar o resultado do sorteio do amigo oculto.


#### Getting Started

```gem install aws-sdk```

```git clone https://github.com/pauloacmelo/amigosecreto```

Edit `participants.csv`. Example file:
```
Alice,+1234567890
Bob,+2345678901
Charlie,+3456789012
Accountant,+4567890123,AUDITOR
```

```ruby script.rb```