//import {getDataChats} from "./Funtions/chats_functions.js";

const getDataChats = async () => {
    try {
        const res = await fetch("./data/dataChats/dataChats.json");
        const data = await res.json();
        return data.data;
    }catch(e){
        console.log(e);
        return;
    }
}

//Variables

const dataChats = await getDataChats();
console.log(typeof dataChats)
const container = document.querySelector(".content_container");

const createInterfaxChats = (container, chats) => {
    const chatSpan = document.createElement("SPAN");
        chatSpan.textContent = "Chats";

        const headerUp = document.createElement("DIV");
        headerUp.className = "header-up";
        headerUp.appendChild(chatSpan);
        
        const search = document.createElement("SPAN");
        search.classList.add("search_header", "material-symbols-outlined");
        search.textContent = "search";
        
        const searchInput = document.createElement("INPUT");
        searchInput.id = "search_chat";
        searchInput.setAttribute("placeholder","Buscar...")
        searchInput.addEventListener("keyup", e => SearchChats(e));
        
        const searchContainer = document.createElement("DIV");
        searchContainer.className = "header-mid";
        searchContainer.appendChild(search);
        searchContainer.appendChild(searchInput);
        
        const headerWrapper = document.createElement("DIV");
        headerWrapper.className = "header_wrapper";
        headerWrapper.appendChild(headerUp);
        headerWrapper.appendChild(searchContainer);
        
        const chatContainer = document.createElement("DIV");
        chatContainer.className = "chats_container";
        chatContainer.appendChild(chats);

        const chatSection = document.createElement("SECTION");
        chatSection.className = "message_section";
        chatSection.appendChild(headerWrapper);
        chatSection.appendChild(chatContainer);

        container.appendChild(chatSection);
}

const SearchChats = e => {
    const search = document.querySelector(".search_header");
    if(e.target.value.length > 0) {
        if(!search.classList.contains("search_active")){
            search.classList.add("search_active");
            search.textContent = "close";
        }
    } else {
        search.classList.remove("search_active");
        search.textContent = "search";
    }

    const searchValue = e.target.value.toLowerCase();
    const chatsContainer = document.querySelector(".chats_container");
        if (e.target.value.length > 2){
            const searchChats = [...dataChats.filter( chat => chat.name.toLowerCase().includes(searchValue)),...dataChats.filter( chat => chat.messages[chat.messages.length - 1].message.toLowerCase().includes(searchValue))];
            
            if(searchChats.length > 0){
                chatsContainer.innerHTML = "";
                const chats = createChats(searchChats);
                chatsContainer.appendChild(chats);
                return;
            }
            
            chatsContainer.innerHTML = "";
            chatsContainer.innerHTML = "<p>No se encontraron chats</p>";
            return;
        }
        chatsContainer.innerHTML = "";
        const chats = createChats(dataChats);
        chatsContainer.appendChild(chats);
}



const createChats = dtChats => {
    const chatsFragment = document.createDocumentFragment();
    
    dtChats.forEach( chat => {
        const img = document.createElement("IMG");
        img.classList.add("profile_photo");
        img.src = chat.photo;
        
        const nameContact = document.createElement("P");
        nameContact.classList.add("name-contact");
        nameContact.textContent = chat.name;

        const hour = document.createElement("SPAN");
        hour.classList.add("hour");
        hour.textContent = chat.messages[chat.messages.length - 1].time;

        const content = document.createElement("SPAN");
        content.classList.add("content");
        content.textContent = chat.messages[chat.messages.length - 1].message;
        content.setAttribute("title", chat.messages[chat.messages.length - 1].message);

        const contentContainer = document.createElement("DIV");
        contentContainer.classList.add("chat-content_container");
        contentContainer.appendChild(nameContact);
        contentContainer.appendChild(hour);
        contentContainer.appendChild(content);

        const chatElement = document.createElement("DIV");
        chatElement.classList.add("chat");
        chatElement.setAttribute("data-id", chat.id)
        chatElement.appendChild(img);
        chatElement.appendChild(contentContainer);

        chatsFragment.appendChild(chatElement);

        chatElement.addEventListener("click", () => {
            sectionChatCreate(chatElement.getAttribute("data-id"));
        });
    });
    return chatsFragment;
}

const createSimpleInterfax = container => {
    if(document.querySelector(".interfax-chat_section")) document.querySelector(".interfax-chat_section").remove();

        const simpleInterfax = document.createElement("DIV");
        simpleInterfax.className = "simple-interfax";
        simpleInterfax.innerHTML = `
        <span class="material-symbols-outlined">
        chat
        </span>`;

        container.appendChild(simpleInterfax);

        const simpleInterfaxText = document.createElement("P");
        simpleInterfaxText.className = "simple-interfax_text";
        simpleInterfaxText.textContent = "Selecciona un chat para iniciar una conversación";

        simpleInterfax.appendChild(simpleInterfaxText);

}

document.querySelector("body").addEventListener("keyup", e => {
    if(e.key == "Escape") {
        if(document.querySelector(".interfax-chat_section")) document.querySelector(".interfax-chat_section").remove();
        if(!document.querySelector(".simple-interfax")) createSimpleInterfax(container);
    }
})

const createInterfaxChat = container => {
    const imgChatContact = document.createElement("IMG");
    imgChatContact.className = "profile-photo_chat";
    imgChatContact.setAttribute("alt","Foto de perfil");
    imgChatContact.setAttribute("title", "Foto de perfil");
    
    const nameChatContact = document.createElement("SPAN");
    nameChatContact.className = "name-chat";

    const infoContainer = document.createElement("DIV");
    infoContainer.className = "info-chat_container";
    infoContainer.appendChild(imgChatContact);
    infoContainer.appendChild(nameChatContact);
    
    const order = document.createElement("SPAN");
    order.classList.add("order", "material-symbols-outlined");
    order.setAttribute("title","Pedido");
    order.textContent = "shopping_bag";

    const navbarInfo = document.createElement("NAV");
    navbarInfo.className = "navbar_info";
    navbarInfo.appendChild(infoContainer);
    navbarInfo.appendChild(order);
    
    const sectionChat = document.createElement("DIV");
    
    const secionChatConteiner = document.createElement("DIV");
    secionChatConteiner.className = "message_container";
    secionChatConteiner.appendChild(sectionChat);

    const addBTN = document.createElement("BUTTON");
    addBTN.classList.add("add_btn", "material-symbols-outlined");
    addBTN.textContent = "add";
    
    const sendMessageContainer = document.createElement("DIV");
    sendMessageContainer.className = "send-message_container"
    sendMessageContainer.innerHTML = `
    <span class="material-symbols-outlined btn_funnel">la</span>
    <span class="material-symbols-outlined btn_bots">bolt</span>
    <input type="text" placeholder="Escribe un mensaje" class="input_sender-message"></input>`
    
    const microBTN = document.createElement("BUTTON");
    microBTN.classList.add("btn_micro", "material-symbols-outlined");
    microBTN.textContent = "mic";
    
    const sendMessageWrapper = document.createElement("DIV");
    sendMessageWrapper.className = "send-message_wrapper";
    sendMessageWrapper.appendChild(addBTN);
    sendMessageWrapper.appendChild(sendMessageContainer);
    sendMessageWrapper.appendChild(microBTN);
    
    const interfaxContainer = document.createElement("DIV");
    interfaxContainer.className = "interfax-chat_section";
    interfaxContainer.appendChild(navbarInfo);
    interfaxContainer.appendChild(secionChatConteiner);
    interfaxContainer.appendChild(sendMessageWrapper);
    
    container.appendChild(interfaxContainer)
    return;

}

function sectionChatCreate(chatId) {
    const chat = dataChats.find( chat => chat.id == chatId);

    if(!document.querySelector(".interfax-chat_section")) createInterfaxChat(container);
    if(document.querySelector(".simple-interfax")) document.querySelector(".simple-interfax").remove();
    

    const imgChatContact = document.querySelector(".profile-photo_chat");
    const nameChatContact = document.querySelector(".name-chat");
    const sectionChat = document.querySelector(".message_container > div");

    imgChatContact.src = chat.photo;
    nameChatContact.textContent = chat.name;

    chat.messages.forEach( message => {
        const messageElement = document.createElement("DIV");
        messageElement.classList.add("message");
        messageElement.classList.add(message.type);
        messageElement.textContent = message.message;
        messageElement.setAttribute("data-time", message.time);
        sectionChat.appendChild(messageElement);
    });

    //console.log(sendMessageContainer);
};

createInterfaxChats(container, createChats(dataChats));
createSimpleInterfax(container);

const btnSearch = document.querySelector(".search_header");

btnSearch.addEventListener("click", () => {
    if(btnSearch.textContent === "close"){
        document.querySelector("#search_chat").value = "";
        SearchChats({target: document.querySelector("#search_chat")});
        return;
    }
    document.querySelector("#search_chat").focus();
})