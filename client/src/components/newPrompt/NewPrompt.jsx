import './newPrompt.css';
import SushiBot from '../bot/SushiBot';
import { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//MIRAR BIEN LAS PORCIONES DE TEXTO COMENTADO ANTES DE TERMINAR.

const NewPrompt = ({data}) => {
    // creacion de Estructura del chat
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState(""); 
    const endRef = useRef(null);
    const formRef = useRef(null);
    // Fin creacion de Estructura del chat

    // Efecto para emprolijar el chat con scroll automatico
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data, pregunta, respuesta]);
    // Fin Efecto para emprolijar el chat con scroll automatico

    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        // Actualizar el chat y llamar al metodo PUT para impactar en DB
        mutationFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/chats/${data._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pregunta: pregunta.length ? pregunta : undefined,
                    respuesta,
                }),
            }).then((res) => res.json());
        },
        // Fin Actualizar el chat y llamar al metodo PUT para impactar en DB

        // Resetear Chat al actualizar
        onSuccess: () => {
          queryClient
          .invalidateQueries({ queryKey: ['chat', data._id] })
          .then(() => {
            formRef.current.reset();
            setPregunta("");
            setRespuesta("");
          });
        },
        onError: (error) => {
          console.log(error);
        },
        // Fin Resetear Chat al actualizar
    });

    // Setear la pregunta y la respuesta
    
    const add = (text, isInitial) => {
        if (!isInitial) setPregunta(text);
        const bot = SushiBot(text);
        document.querySelector('.mensaje').insertAdjacentHTML('afterend', `<div>${bot}</div>`);
        setRespuesta(bot);
        mutation.mutate();
        //console.log(bot);
    }    
    // Fin Setear la pregunta y la respuesta

    // Funcion para enviar los datos del form y evitar entrada vacia
    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;
        add(text, false);   
    };
    // Fin Funcion para enviar los datos del form y evitar entrada vacia
    // Efecto para prevenir bug en el chat nuevo y que se ejecute 2 veces
    const hasRun = useRef(false);
    useEffect(() => {
        if (!hasRun.current) {
            if (data?.history?.length === 1) {
                add(data.history[0].parts[0].text, true);
            }
        }
        hasRun.current = true;
    }, []);
    // Fin Efecto para prevenir bug en el chat nuevo y que se ejecute 2 veces
    return (
        <>
            {pregunta && <div className='mensaje usuario'>{pregunta}</div>}
            {respuesta && (
                <div className='mensaje'>
                    {respuesta}
                </div>
            )}
            <div className='finDeChat' ref={endRef}></div>
            <form className='newForm' onSubmit={handleSubmit} ref={formRef}>
                <input type="text" name='text' placeholder="Cotinuemos con tu pedido" />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </>
    );
};

export default NewPrompt