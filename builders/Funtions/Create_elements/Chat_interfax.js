//Crea interfax de los chats

export const createInterfaxChats = (container, chats) => {
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
        searchInput.addEventListener("keyup", e => {SearchChats(e)});
        
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

//Chats create
export const createChats = dtChats => {
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

        /*chatElement.addEventListener("click", () => {
            sectionChatCreate(chatElement.getAttribute("data-id"));
        });*/
    });
    return chatsFragment;
}