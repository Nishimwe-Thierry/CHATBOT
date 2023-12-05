const chatInput = document.querySelector(".chat-input textarea"); // Adjusted the selector
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY =  "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? ` <img src="https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" style="height: 40px;width: 40px; border-radius: 40%;">
    <p></p>` : `<img src="./Chat Image2.png" alt="" style="height: 40px;width: 40px; border-radius: 40%;"><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 
}
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p")
    const requestOptions = {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content: userMessage}]
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) =>{
        messageElement.classList.add("error");
        messageElement.textContent = "Opps! Something is Wrong. You should try again!"
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Responding...", "incoming")

        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);

    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (k) => {
    if(k.key === "Enter" && !k.shiftKey && window.innerWidth > 800){
        k.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
var chatbot = document.querySelector('.chatbox');
chatbox.scrollTop = chatbox.scrollHeight;


function fetchData() {
    // Show some loading indicator if needed
    
    return fetch('your_api_endpoint')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        // Process the received data
        return data;
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  // for chatbot to in full screen
//   function toggleFullscreen() {
//     var div = document.getElementById('myDiv');
//     div.classList.toggle('fullscreen');
//   }
  