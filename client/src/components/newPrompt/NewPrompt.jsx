//ESTA PAGINA ESTA INCOMPLETA!!
import './newPrompt.css'

import { useRef, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const NewPrompt = ({data}) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    
    const chat = model.startChat({
        history: [
            data?.history.map(({ role, parts }) => ({
                role,
                parts: [{ text: parts[0].text }],
            })),
        ],
    }); 

    const endRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data, question, answer]);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats${data._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question.length ? question : undefined,
                    answer,
                }),
            }).then((res) => res.json());
        },
        onSuccess: () => {
          queryClient
          .invalidateQueries({ queryKey: ['chat', data._id] })
          .then(() => {
            formRef.current.reset();
            setQuestion("");
            setAnswer("");
          });
        },
        onError: (error) => {
          console.log(error);
        },
      });
    
//ACA FALTA ALGO!! BUSCAR EN 3HS, 10MIN,

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target[0].value;
        if (!text) return;
        add(text, false);    
    };

    const hasRun = useRef(false);
    useEffect(() => {
        if (!hasRun.current) {
            if (data?.history?.length === 1) {
                add(data.history[0].parts[0].text, true);
            }
        }
        hasRun.current = true;
    }, []);

    const add = async () => {
        const promtp = "Probando";
        const result = await chat.call(promtp);
        console.log(result);
    }
    //ACA FALTA ALGO!! (IGNORAR IMAGENES NO AGREGAR)

    return (
        <div>
        <button onClick={add}>Test</button>
        <div className='finDeChat' ref={endRef}></div>
        <form className='newForm' onSubmit={handleSubmit} ref={formRef}>
            <input type="text" placeholder="Cotinuemos con tu pedido" />
            <button>
                <img src="/arrow.png" alt="" />
            </button>
        </form>
        </div>
    )
}

export default NewPrompt