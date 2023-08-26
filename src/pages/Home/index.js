import { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./style.css";

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {

            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/dashboard", { replace: true })
            })
            .catch(() => {
                console.log("Error in Log In!");
            })

        } else {
            alert("You need to enter the email and the password!");
        }
    }

    return (
        <div className="home-container">
            <h1>Task List</h1>
            <span>Organize your schedule easily.</span>

            <form className="form" onSubmit={handleLogin}>
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

                <button type="submit"> Sign In </button>
            </form>

            <Link className="btn-link" to="/register">
                Don't have an account yet? Sign up.
            </Link>
        </div>
    );
}

export default Home;