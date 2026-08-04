const socket = io("https://palm-luxe-empire.onrender.com");

const messages = document.getElementById("messages");

const input = document.getElementById("admin-input");

const send = document.getElementById("admin-send");

// Load history

socket.on("load_messages", history => {

messages.innerHTML="";

history.forEach(msg=>{

addMessage(msg.sender,msg.message);

});

});

// Receive

socket.on("receive_message", msg=>{

addMessage(msg.sender,msg.message);

});

// Send

send.onclick=()=>{

const text=input.value.trim();

if(!text) return;

socket.emit("send_message",{

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