## Secret Santa / Amigo Oculto

Use Amazon SNS (Simple Notification System) to deliver messages revealing the secret santa result.

Utilize a Amazon SNS (Simple Notification System) para revelar o resultado do sorteio do amigo oculto.


#### Getting Started

```gem install aws-sdk```

```git clone git@github.com:pauloacmelo/amigo_oculto.git```

Edit `participants.csv`. Example file:
```
Alice,+1234567890
Bob,+2345678901
Charlie,+3456789012
Accountant,+4567890123,AUDITOR
```

Run script to send text messages: `ruby script.rb`.