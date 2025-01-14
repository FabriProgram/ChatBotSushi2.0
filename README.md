# Sushi Bot Challenge

Este archivo readme contiene informacion y configuracion para poder ejecutar correctame 
la prueba tecnica que consiste en hacer funcionar un chatbot para peidr Sushi

** Aclaraciones iniciales **
Todo el proyecto fue ejecuta con la version de nodeJs 22, por lo que se recomienda correr el proyecto
con una versión de node compatible con la misma.

También es importante aclarar que a la hora de colocar los archivos .env es importante respetar su
ubicación, como se indica en el interior de los mismo archivos ya que caso de no hacerlo su configuración
no funcionará. Lo mismo ocurre con el archivo .girignore.

Por último, se recomienda revisar la documentacion de cada dependencia, ya que puede actualizarse su version
en cualquier momento, dejando obsoleta la forma de instalar y/o usar

A continuación se detallará que dependencias deben instalarse y donde, para que el proyecto pueda ejecutarse
normalmente, también se otorgara una breve descripción de cada dependencia.


## Instalacion

dependencias:
Cliente:
** Las dependencias que se mencionan a continuación deben ser instaladas en el directorio client ** 

Posicionarse en el directorio client:
cd client

Luego instalar las siguientes dependencias:

react: (dependencia requerida para realizar la prueba)
npm i

React type animation: (Facilita estilos de animacion para el front end)
npm install react-type-animation

Clerk: (Automatiza logueos dando seguridad al proyecto)
npm install @clerk/clerk-react

Vite: (Facilita el uso de ract-route) 
npx create-react-router@latest my-react-router-app

npx create-vite@latest 
(para poder usar react router, pero puede que duplique la carpeta node-modules)

react router v7: (Facilita la utiizacion de rutas)
npm i react-router

Tanstack-query: (Para llamar a query usando atajos y hacer más cortas las invocaciones)
npm i @tanstack/react-query

-------------------------------**-----------------------------------------------------------------------


Backend:
** Las dependencias que se mencionan a continuación deben ser instaladas en el directorio backend ** 

Posicionarse en el directorio client:
cd backend

Luego instalar las siguientes dependencias:

nodemon: (dependencia requerida para realizar la prueba)
npm i nodemon

Express: (dependencia requerida para realizar la prueba)
npm i express

Clerk: (para utilizar clerk, pero en funciones de backend, es distinto al clerk del frontend)
npm install @clerk/express

Cors: (necesario para funciones de protocolos de seguridad)
npm i cors

mongoDb: (dependencia requerida para realizar la prueba) 
npm i mongodb 

mongoose: (middleware para acceder a MongoDB) 
npm i mongoose --save

(Para uso posterior en casa de querer hacer un deploy del proyecto para otro tipo de testo)
npm i path url


### Ejecutar el proyecto

Una vez instaladas todas las dependencias se puede ejecutar el proyecto por un lado y el backend por otro y que interactuen entre si.
para hacerlo hay que abrir dos terminales:

en una se debe posicionarse en el directorio Client y ejecutar el siguiente comando:
cd client
client/npm run dev

en backend:
cd backend
backend/ npm start

#### Aclaraciones
Por último quiero abrir la puerta a cualquier comunicación que este proyecto pueda generar, ya sea un feedback del trabajo realizado, o una seugerencia para modificar o mejorar algo (que seguro se puede),
o cualquier duda que pueda surgir a la hora de ejecutar el proyecto.
