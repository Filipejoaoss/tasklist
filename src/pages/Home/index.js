import { useState } from "react";

import { Link } from "react-router-dom";

import "./style.css";

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            alert("Test");
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
                    autoComplete={false}
                    type="password"
                    placeholder="****"
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