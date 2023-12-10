const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

let client = null;

async function startServer() {
  if (client) return;
  client = new Client({
    authStrategy: new LocalAuth(),
  });
  client.initialize();
  console.log("Client initialized");
  client.on("qr", (qr) => {
    // Generate and scan this code with your phone
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr, { small: true });
  });
  return new Promise((resolve) =>
    client.on("ready", () => {
      console.log("READY");

      resolve();
    })
  );
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
  // client.close();
}
function sendMessage({ to, body }) {
  client.sendMessage(to.replace(/\+/, "") + "@c.us", body);
}

module.exports = { sendMessage, startServer, closeServer };
