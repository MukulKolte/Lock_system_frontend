import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <h1>Shared Lock</h1>

            <h2>Login</h2>

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
                    Login
                </button>

            </form>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <p>
                Don't have an account?
            </p>

            <button onClick={() => navigate("/register")}>
                Register
            </button>

        </div>
    );
};

export default Login;