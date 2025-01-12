const Sushibot = (text) => {
    let pregunta = text
    let botRespuesta = "";
    if (pregunta.toLowerCase().includes("hola", "buenas", "buenos")) {
        botRespuesta = "Hola, ¿en que puedo ayudarte?";
    } else {
        botRespuesta = "Lo siento solo puedo ayudarte a pedir Sushi, y solo hablo Castellano";
    };
    return botRespuesta
    
};

export default Sushibot