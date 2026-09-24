import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div
            className="min-vh-100"
            style={{ backgroundColor: "#f8fafc" }}
        >

            {/* NAVBAR */}
            <nav
                className="navbar navbar-expand-lg navbar-dark shadow-sm"
                style={{
                    background:
                        "linear-gradient(135deg, #0f172a, #1e3a8a)"
                }}
            >
                <div className="container">

                    <Link
                        to="/"
                        className="navbar-brand fw-bold"
                    >
                        🛡️ Complaint Management
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="mainNavbar"
                    >
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a
                                    href="#about"
                                    className="nav-link"
                                >
                                    About
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    href="#how"
                                    className="nav-link"
                                >
                                    How It Works
                                </a>
                            </li>

                            {/* LOGIN DROPDOWN */}

                            <li className="nav-item dropdown">

                                <button
                                    className="btn btn-outline-light dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Login
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/login?role=USER"
                                        >
                                            👤 User Login
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/login?role=AGENT"
                                        >
                                            👨‍💼 Agent Login
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/login?role=ADMIN"
                                        >
                                            👑 Admin Login
                                        </Link>
                                    </li>

                                </ul>

                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/register"
                                    className="btn btn-primary ms-lg-2"
                                >
                                    Register
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


            {/* HERO */}

            <section
                className="py-5"
                style={{
                    background:
                        "linear-gradient(135deg, #eff6ff, #dbeafe)"
                }}
            >
                <div className="container py-5">

                    <div className="row align-items-center">

                        <div className="col-lg-7">

                            <span className="badge bg-primary px-3 py-2 mb-3">
                                Smart Complaint Management
                            </span>

                            <h1
                                className="display-4 fw-bold"
                                style={{ color: "#0f172a" }}
                            >
                                Submit. Track.
                                <br />
                                <span className="text-primary">
                                    Resolve.
                                </span>
                            </h1>

                            <p className="lead text-muted mt-3">
                                A simple and secure platform to
                                register complaints, track their
                                status and communicate with support
                                agents.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mt-4">

                                <Link
                                    to="/register"
                                    className="btn btn-primary btn-lg px-4"
                                >
                                    Register Now →
                                </Link>

                                <Link
                                    to="/login"
                                    className="btn btn-outline-primary btn-lg px-4"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>


                        <div className="col-lg-5 text-center mt-5 mt-lg-0">

                           <div className="text-center mt-4 mt-lg-0">
    <img
        src="/complaint-management-logo.png"
        alt="Complaint Management"
        className="img-fluid"
        style={{
            width: "320px",
            maxWidth: "100%",
            height: "auto"
        }}
    />
</div>

                        </div>

                    </div>

                </div>
            </section>


            {/* ABOUT */}

            <section
                id="about"
                className="py-5"
            >
                <div className="container py-4">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            About the System
                        </h2>

                        <p className="text-muted">
                            One platform for complete complaint
                            registration and management.
                        </p>

                    </div>

                    <div className="row g-4">

                        {[
                            [
                                "📝",
                                "Easy Registration",
                                "Register and submit your complaint easily."
                            ],
                            [
                                "📊",
                                "Track Complaints",
                                "Check complaint status anytime."
                            ],
                            [
                                "🔐",
                                "Secure Access",
                                "Role-based access for users, agents and admins."
                            ]
                        ].map(
                            ([icon, title, text]) => (
                                <div
                                    className="col-md-4"
                                    key={title}
                                >
                                    <div
                                        className="card border-0 shadow-sm h-100 text-center p-4"
                                        style={{
                                            borderRadius: "16px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "40px"
                                            }}
                                        >
                                            {icon}
                                        </div>

                                        <h5 className="fw-bold mt-3">
                                            {title}
                                        </h5>

                                        <p className="text-muted mb-0">
                                            {text}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}

                    </div>

                </div>
            </section>


            {/* HOW IT WORKS */}

            <section
                id="how"
                className="py-5"
                style={{
                    backgroundColor: "#f1f5f9"
                }}
            >
                <div className="container py-4">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            How It Works
                        </h2>

                        <p className="text-muted">
                            Simple workflow from complaint to resolution.
                        </p>

                    </div>

                    <div className="row g-4 text-center">

                        {[
                            ["1", "👤", "Register"],
                            ["2", "📝", "Submit Complaint"],
                            ["3", "👨‍💼", "Agent Assigned"],
                            ["4", "🔄", "Complaint Resolved"]
                        ].map(
                            ([number, icon, title]) => (
                                <div
                                    className="col-6 col-md-3"
                                    key={number}
                                >
                                    <div
                                        className="bg-white shadow-sm p-4 h-100"
                                        style={{
                                            borderRadius: "16px"
                                        }}
                                    >

                                        <div className="text-primary fw-bold">
                                            Step {number}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: "40px",
                                                marginTop: "10px"
                                            }}
                                        >
                                            {icon}
                                        </div>

                                        <h6 className="fw-bold mt-3">
                                            {title}
                                        </h6>

                                    </div>
                                </div>
                            )
                        )}

                    </div>

                </div>
            </section>


            {/* ROLES */}

            <section className="py-5">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            System Roles
                        </h2>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center">
                                <div style={{ fontSize: "45px" }}>
                                    👤
                                </div>
                                <h5 className="fw-bold mt-3">
                                    User
                                </h5>
                                <p className="text-muted">
                                    Submit and track complaints
                                    and communicate with agents.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center">
                                <div style={{ fontSize: "45px" }}>
                                    👨‍💼
                                </div>
                                <h5 className="fw-bold mt-3">
                                    Agent
                                </h5>
                                <p className="text-muted">
                                    Manage assigned complaints
                                    and update their status.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center">
                                <div style={{ fontSize: "45px" }}>
                                    👑
                                </div>
                                <h5 className="fw-bold mt-3">
                                    Admin
                                </h5>
                                <p className="text-muted">
                                    Manage users, agents and
                                    complaint assignments.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer
                className="py-4 text-center text-white"
                style={{
                    backgroundColor: "#0f172a"
                }}
            >
                <p className="mb-1 fw-semibold">
                    🛡️ Online Complaint Management System
                </p>

                <small className="text-white-50">
                    © 2026 All Rights Reserved
                </small>
            </footer>

        </div>
    );
};

export default Home;