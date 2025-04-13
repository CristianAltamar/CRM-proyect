//Datos para chats
export const getDataChats = async () => {
    try {
        const res = await fetch("./data/dataChats/dataChats.json");
        const data = await res.json();
        return data.data;
    }catch(e){
        console.log(e);
        return;
    }
}