import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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

        const {
            name,
            email,
            phone,
            password
        } = formData;

        if (!name || !email || !phone || !password) {
            toast.error("Please fill all fields");
            return;
        }

        if (password.length < 6) {
            toast.error(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            setLoading(true);

            await API.post(
                "/auth/register",
                formData
            );

            toast.success(
                "Registration successful! Please login."
            );

            navigate("/login");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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

                    <div className="col-11 col-sm-9 col-md-7 col-lg-5">

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
                                        background:
                                            "rgba(255,255,255,0.15)",
                                        fontSize: "30px"
                                    }}
                                >
                                    📝
                                </div>

                                <h2 className="fw-bold mb-1">
                                    Create Account
                                </h2>

                                <p className="mb-0 opacity-75">
                                    Register for Online Complaint Management
                                </p>

                            </div>


                            {/* FORM */}
                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={handleSubmit}>

                                    {/* FULL NAME */}
                                    <div className="mb-3">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="name"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />

                                    </div>


                                    {/* EMAIL */}
                                    <div className="mb-3">

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


                                    {/* PHONE */}
                                    <div className="mb-3">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="phone"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            autoComplete="tel"
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
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />

                                        <small className="text-muted">
                                            Password must be at least 6 characters.
                                        </small>

                                    </div>


                                    {/* REGISTER BUTTON */}
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

                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account
                                                <span className="ms-2">
                                                    →
                                                </span>
                                            </>
                                        )}
                                    </button>

                                </form>


                                {/* LOGIN LINK */}
                                <div className="text-center mt-4">

                                    <p className="text-muted mb-0">
                                        Already have an account?
                                    </p>

                                    <Link
                                        to="/login"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Login to your account
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

export default SignUp;