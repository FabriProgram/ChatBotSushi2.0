import './signIn.css'
import { SignIn } from '@clerk/clerk-react'

const Logueo = () => {
    return (
        <div className='signin'>
            <SignIn 
                path="/sign-in" 
                signUpUrl="/sign-up" 
                forceRedirectUrl="/Dashboard"
             />
        </div>
    )
}

export default Logueo