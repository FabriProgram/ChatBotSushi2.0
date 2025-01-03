import './chatList.css'
import { Link } from 'react-router'

const ChatList = () => {
    return (
        <div className='chatList'>
            <span className='titulo'>DASHBOARD</span>
            <Link to="/dashboard">Empezar un nuevo chat</Link>
            <Link to="/">Explorar Sushi Bot</Link>
            <Link to="/">Contacto</Link>
            <hr />
            <span className='titulo'>CHATS RECIENTES</span>
            <div className="lista">
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
                <Link to="/">CHAT</Link>
            </div>
            <hr />
        </div>
    )
}
export default ChatList