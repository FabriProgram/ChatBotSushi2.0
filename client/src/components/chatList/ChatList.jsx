import './chatList.css'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'

const ChatList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['userChats'],
        queryFn: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/userchats`,{
            credentials: 'include',
          }).then((res) => res.json()),
      });
    
    return (
        <div className='chatList'>
            <span className='titulo'>DASHBOARD</span>
            <Link to="/dashboard">Empezar un nuevo chat</Link>
            <Link to="/">Explorar Sushi Bot</Link>
            <Link to="/">Contacto</Link>
            <hr />
            <span className='titulo'>CHATS RECIENTES</span>
            <div className="lista">
                {isPending
                ? "Cargando..."
                : error
                ? "No se puede cargar el chat"
                : data?.map((chat) => (
                    <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                        {chat.title}
                    </Link>
                ))}  
            </div>
            <hr />
        </div>
    )
}
export default ChatList