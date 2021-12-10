## Secret Santa / Amigo Oculto

Uses Twilio to deliver messages revealing the secret santa result.

Utiliza Twilio para revelar o resultado do sorteio do amigo oculto.


#### Getting Started

```git clone git@github.com:pauloacmelo/amigo_oculto.git```
```yarn```


Edit `participants.csv` with participants data. Example file:
```
Alice,+1234567890
Bob,+2345678901
Charlie,+3456789012
Accountant,+4567890123,AUDITOR
```
Edit `.env` with twilio auth data. Example file:
```
TWILIO_ACCOUNT_SID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_NUMBER=+11234567890
```

Run script to send text messages: `node script.js`.

#### Expected result

- The system will partition participants.csv between participants and auditors.
- The system will shuffle the participants list
- The system will send one message to each participant with the name of the next one in the shuffled list
- The system will send one message to each auditor with the entire shuffled list, in case there's any need to add/remove participants or someone didn't get the text message the auditor can save the day without a new draw