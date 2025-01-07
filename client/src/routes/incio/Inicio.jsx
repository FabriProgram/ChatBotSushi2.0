import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'
import { Link } from 'react-router'
import './inicio.css'

const Inicio = () => {
    const [typingStatus, setTypingStatus] = useState("Persona");

    return (
    <div className="Inicio">
        <img src="/orbital.png" alt="" className="orbital" />
        <div className="izquierda">
            <h1>SUSHI CHAT BOT</h1>
            <h2>¡Bienvenido a SUSHI CHAT BOT!</h2>
            <h3>Para comenzar a chatear, debes iniciar sesion</h3>
            <Link to="/Dashboard">Empecemos</Link>
        </div>
        <div className="derecha">
            <div className="imgContainer">
                <div className="bgcontainer">
                    <div className="bg"></div>
                </div>
                <img src="/bot.png" alt="" className="bot" />
                <div className="chatExample">
                    <img src={typingStatus === "Persona" ? "/human1.jpeg" : "/bot.png"} alt="" className="persona" />
                    <TypeAnimation
                        sequence={[
                            'Persona: Hola, ¿estan abiertos?',
                            2000, 
                            () => {
                                setTypingStatus("SushiBot");
                            },
                            'SushiBot: Si de 19hs a 01hs (horario de Argentina)',
                            2000,
                            () => {
                                setTypingStatus("Persona");
                            },
                            'Persona: Podrías mostrarme el menu por favor?',
                            2000,
                            () => {
                                setTypingStatus("SushiBot");
                            },
                            'SushiBot: Claro que si!, pero necesito que hagas click en "empecemos"',
                            2000,
                            () => {
                                setTypingStatus("Persona");
                            },
                        ]}
                        wrapper="span"
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    </div>
)
}

export default Inicio