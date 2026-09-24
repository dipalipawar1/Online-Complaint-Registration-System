import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";

import { useAuth } from "./context/AuthContext";

import HomePage from "./components/user/HomePage";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";

import AdminHome from "./components/admin/AdminHome";
import AgentHome from "./components/agent/AgentHome";

// ===============================
// PROTECTED ROUTE
// ===============================

const ProtectedRoute = ({ children, role }) => {

    const {
        user,
        isAuthenticated
    } = useAuth();

    // ===============================
    // NOT LOGGED IN
    // ===============================

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // ===============================
    // WRONG ROLE
    // ===============================

    if (
        role &&
        user?.role !== role
    ) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
};


// ===============================
// APP
// ===============================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC HOME PAGE
                ========================= */}

                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />


                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* =========================
                    REGISTER
                ========================= */}

                <Route
                    path="/register"
                    element={
                        <SignUp />
                    }
                />


                {/* =========================
                    USER DASHBOARD
                ========================= */}

                <Route
                    path="/user"
                    element={

                        <ProtectedRoute role="USER">

                            <HomePage />

                        </ProtectedRoute>

                    }
                />


                {/* =========================
                    CREATE COMPLAINT
                ========================= */}

                <Route
                    path="/complaint"
                    element={

                        <ProtectedRoute role="USER">

                            <Complaint />

                        </ProtectedRoute>

                    }
                />


                {/* =========================
                    COMPLAINT STATUS
                ========================= */}

                <Route
                    path="/complaint/:complaintId"
                    element={

                        <ProtectedRoute role="USER">

                            <Status />

                        </ProtectedRoute>

                    }
                />


                {/* =========================
                    ADMIN DASHBOARD
                ========================= */}

                <Route
                    path="/admin"
                    element={

                        <ProtectedRoute role="ADMIN">

                            <AdminHome />

                        </ProtectedRoute>

                    }
                />


                {/* =========================
                    AGENT DASHBOARD
                ========================= */}

                <Route
                    path="/agent"
                    element={

                        <ProtectedRoute role="AGENT">

                            <AgentHome />

                        </ProtectedRoute>

                    }
                />


                {/* =========================
                    UNKNOWN URL
                ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;