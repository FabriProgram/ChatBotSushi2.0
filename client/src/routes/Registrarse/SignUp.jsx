//import './signUp.css'
import { SignUp, } from '@clerk/clerk-react'

const Registrarse = () => {
    return (
        <div className="signup">
            <SignUp path="/sign-up" signInUrl="/sign-in" />
        </div>
    )
}

export default Registrarse