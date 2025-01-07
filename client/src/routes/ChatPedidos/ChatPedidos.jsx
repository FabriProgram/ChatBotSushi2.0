import { useLocation } from 'react-router';
import './chatPedidos.css';
import { useQuery } from '@tanstack/react-query';
//import Markdown from 'react-markdown';
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPedidos = () => {
    const path = useLocation().pathname
    const chatId = path.split('/').pop()
    
    const { isPending, error, data } = useQuery({
        queryKey: ['chat', chatId],
        queryFn: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/chats${chatId}`,{
            credentials: 'include',
          }).then((res) => res.json()),
      });

    return (
        <div className='chatPedidos'>
            <div className='wrapper'>
                <div className='chat'>
                    {isPending
                        ? "Cargando..."
                        : error
                        ? "No se puede cargar el chat"
                        : data?.history.map((mensaje, i) => (
                            <div className={
                                mensaje.role === "user"
                                ? "mensaje usuario"
                                : "mensaje"
                            } key={i}>
                                <Markdown>{mensaje.parts[0].text}</Markdown>
                            </div>
                        ))}
                    {data && <NewPrompt data={data}/>}
                </div>
            </div>
        </div>
    )
}

export default ChatPedidos