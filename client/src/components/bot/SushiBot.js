const Sushibot = (text) => {
    //DICCIONARIOS Y VARIABLES QUE USARA EL BOT
    let precio1 = "Gracias por tu pedido, tu factura es de $250";
    let precio2 = "Gracias por tu pedido, tu factura es de $300";
    let precio3 = "Gracias por tu pedido, tu factura es de $275";
    let precio4 = "Gracias por tu pedido, tu factura es de $325";

    let pedido1 = ["1Aa","1Ab","1Ba","1Bb","1Ca","1Cb","1Da","1Db","1Ea","1Eb","2Aa","2Ab","2Ba","2Bb","2Ca","2Cb","2Da","2Db","2Ea","2Eb","3Aa","3Ab","3Ba","3Bb","3Ca","3Cb","3Da","3Db","3Ea","3Eb","4Aa","4Ab","4Ba","4Bb","4Ca","4Cb","4Da","4Db","4Ea","4Eb","5Aa","5Ab","5Ba","5Bb","5Ca","5Cb","5Da","5Db","5Ea","5Eb","6Aa","6Ab","6Ba","6Bb","6Ca","6Cb","6Da","6Db","6Ea","6Eb","7Aa","7Ab","7Ba","7Bb","7Ca","7Cb","7Da","7Db","7Ea","7Eb"]; 
    
    let pedido2 = ["1Ac","1Bc","1Cc","1Dc","1Ec","2Ac","2Bc","2Cc","2Dc","2Ec","3Ac","3Bc","3Cc","3Dc","3Ec","4Ac","4Bc","4Cc","4Dc","4Ec","5Ac","5Bc","5Cc","5Dc","5Ec","6Ac","6Bc","6Cc","6Dc","6Ec","7Ac","7Bc","7Cc","7Dc","7Ec"];

    let pedido3 = ["1Fa","1Fb","2Fa","2Fb","3Fa","3Fb","4Fa","4Fb","5Fa","5Fb","6Fa","6Fb","7Fa","7Fb"];

    let pedido4 = ["1Fc","2Fc","3Fc","4Fc","5Fc","6Fc","7Fc"]

    const horario = new Date();
    let pregunta = text
    let botRespuesta = "";
//FIN DE DICCIONARIOS Y VARIABLES

// BUCLE IF ELSE PARA CONVERSACIÓN SIMPLE
    if (pregunta.toLowerCase().includes("hola")) {
        botRespuesta = "Hola, Gracias por elegir Sushi Bot! Si quieres ver el menú, escribe SUSHI. Para saber si estamos abiertos, escribe ABIERTO. Si necesitas instruciones para pedir Sushi, escribe INSTRUCCIONES.";
    } else if (pregunta.toLowerCase().includes("sushi")) {
        botRespuesta =
        "A continuacion te muestro el menú de Sushi: 1. AVOCADO THAI ROLL x 4u $100 2. HUANCAINA BLACK ROLL x 4u $100 3. TIGER ROLL x 4u $100 4. CEVICHE ROLL x 4u $100 5. MERKEN ROLL x 4u $100 6. SWEET ROLL x 4u $100 7. SPICY ROLL x 4u $100 Quieres ver el menu de bebidas? escribe BEBIDAS";
    } else if (pregunta.toLowerCase().includes("bebidas")) {
        botRespuesta =
        "A. AGUA CON GAS $50 B. AGUA SIN GAS $50 C. COCA-COLA $50 D.   FANTA $50 E. SPRITE $50 F. SAKE $75. Quieres ver el menu de postres? escribe POSTRES";
    } else if (pregunta.toLowerCase().includes("postres")) {
        botRespuesta =
        "a. HELADO $100 b. ENSALADA DE FRUTAS $100 c. ENSALDA DE FRUTAS CON HELADO $150. Si estas listo para pedir, escribe PEDIR.";
    } else if (pregunta.toLowerCase().includes("instrucciones")) {
        botRespuesta =
        "Adelante de cada una de las opciones del menú, hay un indicador para seleccionar tu comida, bebida, o postre. Usa esos indicadores para pedir comida. Cuando tengas lista tu selección escribe los indicadores juntos, sin espacios y respetando las Mayúsculas y minúsculas : Por ejemplo: Si quieres pedir HUANCAINA BLACK ROLL, con FANTA, y de postre HELADO escribe 2Da cuando llegues a la instancia de realizar tu pedido.";
    } else if (pregunta.toLowerCase().includes("pedir")) {
        botRespuesta = 
        "Elige tu comida entre el 1 y el 7, tu bebida entre el A y el F, y tu postre entre el a y el c. Por ejemplo (1Bc), puedes volver a ver el menu escribiendo MENU";
    } else if (pedido1.includes(pregunta)) { 
        botRespuesta = precio1;
    } else if (pedido2.includes(pregunta)) { 
        botRespuesta = precio2;
    } else if (pedido3.includes(pregunta)) { 
        botRespuesta = precio3;
    } else if (pedido4.includes(pregunta)) { 
        botRespuesta = precio4;
    } else if (pregunta.toLowerCase().includes("abierto")) {
        botRespuesta = 
        horario.getHours() >= 19 || horario.getHours() <= 1 
        || horario.getHours() >= 10 && horario.getHours() <= 15 
        ? "Estamos abiertos" 
        : "Estamos cerrados";
    } else {
    botRespuesta =
      "Lo siento solo puedo ayudarte a pedir Sushi, y solo hablo Castellano, no puedo entender tu pedido. Para ver el menú, escribe SUSHI. Para saber si estamos abiertos, escribe ABIERTO. Si necesitas instruciones para pedir Sushi, escribe INSTRUCCIONES.";
  }
  return botRespuesta;
};

export default Sushibot;
