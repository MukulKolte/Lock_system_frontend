import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {

    return (
        <AuthProvider>

            <BrowserRouter>

                <Routes>

                    <Route
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </BrowserRouter>

        </AuthProvider>
    );
};

export default App;