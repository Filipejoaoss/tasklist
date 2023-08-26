import { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        if (email !== '' && password !== '') {

            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/dashboard", { replace: true })
                })
                .catch((error) => {
                    console.log("Error in Registration!");
                })

        } else {
            alert("You need to enter the email and the password!");
        }
    }

    return (
        <div className="home-container">
            <h1>Register</h1>
            <span>Let's create an account!</span>

            <form className="form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="example@mail.pt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit"> Create </button>
            </form>

            <Link className="btn-link" to="/">
                Already have an account? Sign in.
            </Link>
        </div>
    );
}

export default Register;