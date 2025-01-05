import './newPrompt.css'
import { useRef, useEffect } from 'react'

const NewPrompt = () => {
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    
    return (
        <div>
        <div className='finDeChat' ref={endRef}></div>
            <form className='newForm'>
                <input type="text" placeholder="Cotinuemos con tu pedido" />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default NewPrompt