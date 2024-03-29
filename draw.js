require("dotenv").config();
// const { startServer, closeServer, sendMessage } = require("./whatsapp");
const { startServer, closeServer, sendMessage } = require("./whatsapp2.js");
// const twilio = require("twilio");
// const {
//   TWILIO_NUMBER,
//   TWILIO_ACCOUNT_SID: id,
//   TWILIO_AUTH_TOKEN: token,
// } = process.env;
const PARTICIPANTS_PATH = "participants.csv";

// function sendMessage({ from, to, body }) {
//   if (!id || !token) throw new Error(`Twilio credentials not set.`);
//   return twilio(id, token).messages.create({ from, to, body });
// }
function readCSV() {
  return new Promise((resolve) => {
    const participants = [];
    const csv = require("csv-parser");
    const fs = require("fs");
    fs.createReadStream(PARTICIPANTS_PATH)
      .pipe(csv(["name", "phone", "role", "cannot_pick"]))
      .on("data", (data) => participants.push(data))
      .on("end", () => resolve(participants));
  });
}
function shuffle(originalArray) {
  const array = [...originalArray];
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return invalidShuffle(array) ? shuffle(originalArray) : array;
}
function invalidShuffle(array) {
  return array.find((cur, index) =>
    (cur.cannot_pick || "")
      .split("|")
      .includes(array[(index + 1) % array.length]?.name)
  );
}

async function main() {
  await startServer();
  const rawCSV = await readCSV(PARTICIPANTS_PATH);
  const participants = rawCSV.filter((row) => row.role !== "AUDITOR");
  const auditors = rawCSV.filter((row) => row.role === "AUDITOR");
  const shuffled = shuffle(participants);

  const serializedShuffle = shuffled
    .map((participant, index) => {
      const next = shuffled[(index + 1) % shuffled.length];
      return `${participant.name} => ${next.name}`;
    })
    .join("\n");
  fs.writeFileSync("shuffle.json", JSON.stringify(serializedShuffle));
  const messages = []
    .concat(
      shuffled.map(({ name, phone }, index) => {
        const next = shuffled[(index + 1) % shuffled.length];
        return {
          // from: TWILIO_NUMBER,
          to: phone,
          body: `Amigo oculto da família:\nOlá ${name}, você tirou ${next.name}.`,
        };
      })
    )
    .concat(
      auditors.map((auditor) => {
        const body =
          (auditorMessage = `Olá ${auditor.name},\n${serializedShuffle}`);
        return {
          // from: TWILIO_NUMBER,
          to: auditor.phone,
          body,
        };
      })
    );
  await Promise.all(messages.map(sendMessage));
  await closeServer();
}
main();
