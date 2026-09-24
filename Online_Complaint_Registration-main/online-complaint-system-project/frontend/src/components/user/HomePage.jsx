import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const HomePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        try {
            const response = await API.get("/complaints/my");

            setComplaints(
                response.data.complaints || []
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to fetch complaints"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // ===============================
    // LOGOUT
    // ===============================
    const handleLogout = () => {
        logout();

        // Redirect directly to public Home page
        window.location.replace("/");
    };

    // ===============================
    // STATUS COUNTS
    // ===============================

    const pendingCount = complaints.filter(
        (complaint) =>
            complaint.status === "Pending"
    ).length;

    const inProgressCount = complaints.filter(
        (complaint) =>
            complaint.status === "In Progress"
    ).length;

    const resolvedCount = complaints.filter(
        (complaint) =>
            complaint.status === "Resolved"
    ).length;

    // ===============================
    // STATUS CLASS
    // ===============================

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning text-dark";

            case "Assigned":
                return "bg-info text-dark";

            case "In Progress":
                return "bg-primary";

            case "Resolved":
                return "bg-success";

            case "Rejected":
                return "bg-danger";

            case "Closed":
                return "bg-secondary";

            default:
                return "bg-primary";
        }
    };

    return (
        <div
            className="min-vh-100"
            style={{
                backgroundColor: "#f8fafc"
            }}
        >

            {/* ========================= */}
            {/* NAVBAR */}
            {/* ========================= */}

            <nav
                className="navbar navbar-dark shadow-sm"
                style={{
                    background:
                        "linear-gradient(135deg, #0f172a, #1e3a8a)"
                }}
            >

                <div className="container">

                    <span className="navbar-brand fw-bold">
                        🛡️ Complaint Management
                    </span>

                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <div className="container py-4">

                {/* ========================= */}
                {/* WELCOME SECTION */}
                {/* ========================= */}

                <div className="mb-4">

                    <h2 className="fw-bold mb-1">
                        Welcome, {user?.name} 👋
                    </h2>

                    <p className="text-muted mb-0">
                        Manage and track your complaints from one place.
                    </p>

                </div>

                {/* ========================= */}
                {/* STATISTICS */}
                {/* ========================= */}

                <div className="row g-3 mb-4">

                    {/* TOTAL */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Total Complaints
                                        </p>

                                        <h3 className="fw-bold mb-0">
                                            {complaints.length}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            backgroundColor: "#dbeafe",
                                            fontSize: "22px"
                                        }}
                                    >
                                        📋
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* PENDING */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Pending
                                        </p>

                                        <h3 className="fw-bold mb-0">
                                            {pendingCount}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            backgroundColor: "#fef3c7",
                                            fontSize: "22px"
                                        }}
                                    >
                                        ⏳
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* IN PROGRESS */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-1">
                                            In Progress
                                        </p>

                                        <h3 className="fw-bold mb-0">
                                            {inProgressCount}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            backgroundColor: "#dbeafe",
                                            fontSize: "22px"
                                        }}
                                    >
                                        🔄
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RESOLVED */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Resolved
                                        </p>

                                        <h3 className="fw-bold mb-0">
                                            {resolvedCount}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            backgroundColor: "#dcfce7",
                                            fontSize: "22px"
                                        }}
                                    >
                                        ✅
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================= */}
                {/* NEW COMPLAINT ACTION */}
                {/* ========================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                        borderRadius: "14px"
                    }}
                >

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <h4 className="fw-bold mb-2">
                                    Have a complaint?
                                </h4>

                                <p className="text-muted mb-md-0">
                                    Register a new complaint and track
                                    its progress easily.
                                </p>

                            </div>

                            <div className="col-md-4 text-md-end mt-3 mt-md-0">

                                <button
                                    className="btn btn-primary px-4 fw-semibold"
                                    onClick={() =>
                                        navigate("/complaint")
                                    }
                                >
                                    + New Complaint
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================= */}
                {/* MY COMPLAINTS */}
                {/* ========================= */}

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "14px"
                    }}
                >

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    My Complaints
                                </h4>

                                <p className="text-muted mb-0">
                                    View and track your registered complaints.
                                </p>

                            </div>

                            {complaints.length > 0 && (
                                <span className="badge bg-primary rounded-pill">
                                    {complaints.length} Total
                                </span>
                            )}

                        </div>

                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary mb-3"
                                    role="status"
                                ></div>

                                <p className="text-muted mb-0">
                                    Loading complaints...
                                </p>

                            </div>

                        ) : complaints.length === 0 ? (

                            <div className="text-center py-5">

                                <div
                                    style={{
                                        fontSize: "50px"
                                    }}
                                >
                                    📭
                                </div>

                                <h5 className="fw-semibold mt-3">
                                    No complaints yet
                                </h5>

                                <p className="text-muted">
                                    You have not registered any complaints.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate("/complaint")
                                    }
                                >
                                    Register Complaint
                                </button>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>

                                            <th>
                                                Complaint ID
                                            </th>

                                            <th>
                                                Subject
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Date
                                            </th>

                                            <th className="text-center">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {complaints.map(
                                            (complaint) => (

                                                <tr
                                                    key={
                                                        complaint._id
                                                    }
                                                >

                                                    <td>
                                                        <span className="fw-semibold">
                                                            {
                                                                complaint.complaintId
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {
                                                            complaint.subject
                                                        }
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${getStatusClass(
                                                                complaint.status
                                                            )} px-3 py-2`}
                                                        >
                                                            {
                                                                complaint.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="text-muted">

                                                        {new Date(
                                                            complaint.createdAt
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )}

                                                    </td>

                                                    <td className="text-center">

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/complaint/${complaint.complaintId}`
                                                                )
                                                            }
                                                        >
                                                            View →
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

                {/* ========================= */}
                {/* FOOTER */}
                {/* ========================= */}

                <div className="text-center mt-4">

                    <small className="text-muted">
                        Online Complaint Management System © 2026
                    </small>

                </div>

            </div>

        </div>
    );
};

export default HomePage;