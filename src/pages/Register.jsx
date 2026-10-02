import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            await register(username, password);

            setMessage(
                "Registration successful. You can now login."
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <h1>Shared Lock</h1>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Register
                </button>

            </form>

            {message && (
                <p className="success">
                    {message}
                </p>
            )}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <button onClick={() => navigate("/")}>
                Back to Login
            </button>

        </div>
    );
};

export default Register;