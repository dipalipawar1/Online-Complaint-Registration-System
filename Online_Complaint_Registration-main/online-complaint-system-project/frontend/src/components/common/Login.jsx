import { useState } from "react";
import { useNavigate,useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [searchParams] = useSearchParams();

    const selectedRole =
        searchParams.get("role") || "USER";

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await API.post(
                "/auth/login",
                {
                    ...formData,
                    role: selectedRole
                }
            );

            login(
                response.data.token,
                response.data.user
            );

            toast.success("Login successful!");

            const role = response.data.user.role;

            if (role === "ADMIN") {
                navigate("/admin");
            } else if (role === "AGENT") {
                navigate("/agent");
            } else {
                navigate("/user");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)"
            }}
        >

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-11 col-sm-8 col-md-6 col-lg-4">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden"
                            }}
                        >

                            {/* HEADER */}
                            <div
                                className="text-center text-white p-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #2563eb, #1d4ed8)"
                                }}
                            >

                                <div
                                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.15)",
                                        fontSize: "30px"
                                    }}
                                >
                                    🛡️
                                </div>

                                <h2 className="fw-bold mb-1">
                                    Welcome Back
                                </h2>

                                <p className="mb-0 opacity-75">
                                    Online Complaint Management System
                                </p>

                            </div>


                            {/* FORM */}
                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={handleSubmit}>

                                    {/* EMAIL */}
                                    <div className="mb-4">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="email"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />

                                    </div>


                                    {/* PASSWORD */}
                                    <div className="mb-4">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>

                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                        />

                                    </div>


                                    {/* LOGIN BUTTON */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 fw-semibold shadow-sm"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>

                                                Logging in...
                                            </>
                                        ) : (
                                            <>
                                                Login
                                                <span className="ms-2">
                                                    →
                                                </span>
                                            </>
                                        )}
                                    </button>

                                </form>


                                {/* REGISTER */}
                                <div className="text-center mt-4">

                                    <p className="text-muted mb-0">
                                        Don't have an account?
                                    </p>

                                    <Link
                                        to="/register"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Create an account
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* FOOTER */}
                        <p className="text-center text-white-50 small mt-4 mb-0">
                            © 2026 Online Complaint Management System
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;