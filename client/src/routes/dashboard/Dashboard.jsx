import './dashboard.css'
import { useAuth } from '@clerk/clerk-react'

const Dashboard = () => {
    const { userId } = useAuth();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;

        await fetch('http://localhost:3000/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, text}),
        });
    }
    return (
        <div className='dashboard'>
            <div className='texto'>
                <div className='logo'>
                    <img src="/logo.png" alt="" />
                    <h1>SUSHI CHAT BOT</h1>
                </div>
                <div className='opciones'>
                    <div className='opcion'>
                        <img src="/chat.png" alt="" />
                        <span>Empezar un nuevo chat</span>
                    </div>
                    <div className='opcion'>
                        <img src="/code.png" alt="" />
                        <span>Ayuda con mi chat</span>
                    </div>
                </div>
            </div>
            <div className='formContainer'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="text" placeholder="Cotinuemos con tu pedido" />
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Dashboard