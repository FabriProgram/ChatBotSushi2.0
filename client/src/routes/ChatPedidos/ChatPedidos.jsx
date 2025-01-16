import { useLocation } from 'react-router';
import './chatPedidos.css';
import { useQuery } from '@tanstack/react-query';
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPedidos = () => {
    const path = useLocation().pathname // Obtiene la url
    const chatId = path.split('/').pop() // Obtiene el id
    
    // Obtener los chats del user para mostrar el historial
    const { isPending, error, data } = useQuery({
        queryKey: ['chat', chatId],
        queryFn: () =>
          fetch(`${import.meta.env.VITE_API_URL}/chats/${chatId}`,{
            credentials: 'include',
          }).then((res) => res.json()),
    });
    // Fin de Obtener los chats del user para mostrar el historial
    return (
        <div className='chatPedidos'>
            <div className='wrapper'>
                <div className='chat'>
                    {isPending
                        ? "Cargando..."
                        : error
                        ? "No se puede cargar el chat"
                        : data?.history?.map((mensaje, i) => (
                            <div className={mensaje.role === "user"
                                ? "mensaje usuario"
                                : "mensaje"}
                              key={i}>
                                {mensaje.parts[0].text}
                            </div>
                        ))}
                    {data && <NewPrompt data={data} />}
                </div>
            </div>
        </div>
    )
}

export default ChatPedidos