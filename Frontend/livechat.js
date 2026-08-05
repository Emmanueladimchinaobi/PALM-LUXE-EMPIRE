// Create unique visitor ID
let visitorId = localStorage.getItem("visitorId");

if (!visitorId) {
    visitorId = "visitor_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("visitorId", visitorId);
}

const socket = io("https://palm-luxe-empire.onrender.com");

const chatBtn = document.getElementById("chat-btn");
const chatBox = document.getElementById("chat-box");
const closeBtn2 = document.getElementById("close-chat");
const navbar = document.getElementById("navbar");

const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

// Open Chat
chatBtn.addEventListener("click", () => {

    chatBox.classList.remove("hidden");
    navbar.classList.add("hidden");

});

// Close Chat
closeBtn2.addEventListener("click", () => {

    chatBox.classList.add("hidden");
     navbar.classList.remove("hidden");

});

// Load previous messages
socket.on("load_messages", (history) => {

    messages.innerHTML = "";

    history.forEach((msg) => {

        addMessage(msg.sender, msg.message);

    });

});

// Send button
sendBtn.addEventListener("click", sendMessage);

// Press Enter
input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

function sendMessage() {

    const text = input.value.trim();

    if (!text) return;
    console.log(visitorId);

    console.log("Sending:", text);

    socket.emit("send_message", {

    visitorId,

    sender: "Customer",

    message: text

});

    input.value = "";

}

// Receive new message
socket.on("receive_message", (msg) => {

    console.log("Received:", msg);

    addMessage(msg.sender, msg.message);

});

function addMessage(sender, text) {

    const div = document.createElement("div");

    if (sender === "Customer") {

        div.className =
            "bg-pink-600 text-white rounded-lg px-3 py-2 mb-2 ml-auto max-w-[80%] w-fit";

    } else {

        div.className =
            "bg-gray-200 text-black rounded-lg px-3 py-2 mb-2 mr-auto max-w-[80%] w-fit";

    }

    div.innerHTML = `
        <strong>${sender}</strong><br>
        ${text}
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}