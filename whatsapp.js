const venom = require("venom-bot");
let client;

async function startServer() {
  return (client ||= await venom.create({
    session: "session-name", //name of session
    multidevice: true, // for version not multidevice use false.(default: true)
  }));
}

// client.onMessage((message) => {
//   if (message.body === "Hi" && message.isGroupMsg === false) {
//     client
//       .sendText(message.from, "Welcome Venom 🕷")
//       .then((result) => {
//         console.log("Result: ", result); //return object success
//       })
//       .catch((error) => {
//         console.error("Error when sending: ", error); //return object error
//       });
//   }
// });

function closeServer() {
  client.close();
}
function sendMessage({ to, body }) {
  return new Promise((resolve, reject) =>
    client
      .sendText(to.replace(/\+/, "") + "@c.us", body)
      .then(resolve)
      .catch(reject)
  );
}

module.exports = { sendMessage, startServer, closeServer };
