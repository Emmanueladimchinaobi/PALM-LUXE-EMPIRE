let selectedVisitor = null;

const customerList = document.getElementById("customer-list");

const socket = io("https://palm-luxe-empire.onrender.com");

const messages = document.getElementById("messages");

const input = document.getElementById("admin-input");

const send = document.getElementById("admin-send");

// Load history

socket.on("load_messages", (history) => {

    window.allMessages = history || [];

    const visitors = [...new Set(window.allMessages.map(m => m.visitorId))];

    customerList.innerHTML = "";

    visitors.forEach(id => {

        customerList.innerHTML += `
            <div
                class="p-4 border-b cursor-pointer hover:bg-gray-100"
                onclick="selectVisitor('${id}')"
            >
                👤 ${id}
            </div>
        `;

    });

});

// Receive

socket.on("receive_message", (msg) => {

    // Update message history
    window.allMessages.push(msg);

    // If no customer is selected, don't display it
    if (!selectedVisitor) return;

    // Only display messages for the selected visitor
    if (msg.visitorId === selectedVisitor) {

        addMessage(msg.sender, msg.message);

    }

});

// Send

send.onclick=()=>{

const text=input.value.trim();

if(!text) return;

if(!selectedVisitor){

    alert("Select a customer first.");

    return;

}

socket.emit("send_message",{

    visitorId:selectedVisitor,

    sender:"Support",

    message:text

});

input.value="";

};

function addMessage(sender,text){

const div=document.createElement("div");

if(sender==="Support"){

div.className="bg-pink-600 text-white p-3 rounded-lg ml-auto w-fit max-w-[70%]";

}else{

div.className="bg-gray-300 p-3 rounded-lg mr-auto w-fit max-w-[70%]";

}

div.innerHTML=`<strong>${sender}</strong><br>${text}`;

messages.appendChild(div);

messages.scrollTop=messages.scrollHeight;

}

function selectVisitor(id){

    selectedVisitor = id;

    messages.innerHTML="";

    const chat = window.allMessages.filter(

        m => m.visitorId === id

    );

    chat.forEach(msg=>{

        addMessage(msg.sender,msg.message);

    });

}