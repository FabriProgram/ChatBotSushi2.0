import './chatList.css'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'

const ChatList = () => {
    // Obtener los chats del user para mostrar el historial
    const { isPending, error, data } = useQuery({
        queryKey: ['userChats'],
        queryFn: () =>
          fetch(`${import.meta.env.VITE_API_URL}/userchats`,{
            credentials: 'include',
          }).then((res) => res.json()),
    });
    // Fin Obtener los chats del user
    
    return (
        <div className='chatList'>
            <span className='titulo'>DASHBOARD</span>
            <Link to="/dashboard">Empezar un nuevo chat</Link>
            <Link to="/">Explorar Sushi Bot</Link>
            <hr />
            <span className='titulo'>CHATS RECIENTES</span>
            <div className="lista">
                {isPending
                ? "Cargando..."
                : error
                ? "No se encuentran historial para este usuario"
                : data?.map((chat) => (// Buscar los chats del user
                    <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                        {chat.title}
                    </Link>
                ))}  
            </div>
            <hr />
        </div>
    );
};

export default ChatList