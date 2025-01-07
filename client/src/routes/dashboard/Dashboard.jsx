import './dashboard.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        // Metodo POST para datos ingresados en el form  
        mutationFn: (text) => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            }).then((res) => res.json());
        },
        // Direcionamiento a la pagina del chat
        onSuccess: (id) => {
          queryClient.invalidateQueries({ queryKey: ['userChats'] })
          navigate(`/dashboard/chats/${id}`);
        },
        // Fin direcionamiento
    });
    // Fin metodo POST
    
    // Funcion para enviar los datos del form y evitar entrada vacia
    const handleSubmit = async(e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;
        mutation.mutate(text);
    };
    // Fin de la funcion
    
    // Enviar el form en formato HTML al body de la pagina dashboard, al ejecutar la funcion Dashboard
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
    );
};

export default Dashboard;