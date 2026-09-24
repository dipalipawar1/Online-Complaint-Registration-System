import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ChatWindow from "../common/ChatWindow";

const AgentHome = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedComplaint, setSelectedComplaint] =
        useState(null);

    // =========================
    // FETCH ASSIGNED COMPLAINTS
    // =========================

    const fetchAssignments = async () => {
        try {
            const response = await API.get(
                "/assignments/agent"
            );

            setAssignments(
                response.data.assignments || []
            );

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to fetch assigned complaints"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    // =========================
    // UPDATE STATUS
    // =========================

    const updateStatus = async (
        complaintId,
        status
    ) => {
        try {
            await API.put(
                `/assignments/${complaintId}/status`,
                { status }
            );

            toast.success(
                "Complaint status updated"
            );

            await fetchAssignments();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update status"
            );
        }
    };

    // =========================
    // NEXT ALLOWED STATUS
    // =========================

    const getNextStatusOptions = (status) => {
        switch (status) {
            case "Assigned":
                return ["In Progress"];

            case "In Progress":
                return ["Resolved"];

            case "Resolved":
                return ["Closed"];

            case "Closed":
                return [];

            default:
                return [];
        }
    };

    // =========================
    // STATUS BADGE
    // =========================

    const getStatusClass = (status) => {
        switch (status) {
            case "Assigned":
                return "bg-info text-dark";

            case "In Progress":
                return "bg-primary";

            case "Resolved":
                return "bg-success";

            case "Closed":
                return "bg-secondary";

            default:
                return "bg-dark";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Assigned":
                return "📋";

            case "In Progress":
                return "🔄";

            case "Resolved":
                return "✅";

            case "Closed":
                return "🔒";

            default:
                return "📌";
        }
    };

    // =========================
    // OPEN CHAT
    // =========================

    const openChat = (complaint) => {
        setSelectedComplaint(complaint);
    };

    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {
    logout();
    window.location.replace("/");
    };

    // =========================
    // STATISTICS
    // =========================

    const totalComplaints = assignments.length;

    const assignedCount = assignments.filter(
        (item) => item.status === "Assigned"
    ).length;

    const inProgressCount = assignments.filter(
        (item) => item.status === "In Progress"
    ).length;

    const resolvedCount = assignments.filter(
        (item) => item.status === "Resolved"
    ).length;

    const closedCount = assignments.filter(
        (item) => item.status === "Closed"
    ).length;

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
                        className="btn btn-outline-light btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* ========================= */}
            {/* MAIN CONTENT */}
            {/* ========================= */}

            <div className="container py-4 py-md-5">

                {/* ========================= */}
                {/* HEADER */}
                {/* ========================= */}

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                    <div>

                        <div className="d-flex align-items-center gap-3">

                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "55px",
                                    height: "55px",
                                    borderRadius: "14px",
                                    backgroundColor: "#dbeafe",
                                    fontSize: "27px"
                                }}
                            >
                                👨‍💼
                            </div>

                            <div>

                                <h2 className="fw-bold mb-1">
                                    Agent Dashboard
                                </h2>

                                <p className="text-muted mb-0">
                                    Welcome, {user?.name || "Agent"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ========================= */}
                {/* STATISTICS */}
                {/* ========================= */}

                <div className="row g-3 mb-4">

                    {/* TOTAL */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "16px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Total Assigned
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {totalComplaints}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            borderRadius: "12px",
                                            backgroundColor: "#dbeafe",
                                            fontSize: "21px"
                                        }}
                                    >
                                        📋
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ASSIGNED */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "16px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Assigned
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {assignedCount}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            borderRadius: "12px",
                                            backgroundColor: "#cffafe",
                                            fontSize: "21px"
                                        }}
                                    >
                                        📌
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* IN PROGRESS */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "16px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-1">
                                            In Progress
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {inProgressCount}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            borderRadius: "12px",
                                            backgroundColor: "#dbeafe",
                                            fontSize: "21px"
                                        }}
                                    >
                                        🔄
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RESOLVED */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "16px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Resolved
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {resolvedCount + closedCount}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            borderRadius: "12px",
                                            backgroundColor: "#dcfce7",
                                            fontSize: "21px"
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
                {/* ASSIGNED COMPLAINTS */}
                {/* ========================= */}

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "16px",
                        overflow: "hidden"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Assigned Complaints
                                </h4>

                                <p className="text-muted small mb-0">
                                    Manage complaints assigned to you.
                                </p>

                            </div>

                            <span className="badge bg-light text-dark border px-3 py-2">
                                {assignments.length} Complaint
                                {assignments.length !== 1
                                    ? "s"
                                    : ""}
                            </span>

                        </div>


                        {/* LOADING */}

                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary mb-3"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>

                                <p className="text-muted mb-0">
                                    Loading assigned complaints...
                                </p>

                            </div>

                        ) : assignments.length === 0 ? (

                            /* EMPTY STATE */

                            <div className="text-center py-5">

                                <div
                                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "50%",
                                        backgroundColor: "#f1f5f9",
                                        fontSize: "30px"
                                    }}
                                >
                                    📭
                                </div>

                                <h5 className="fw-bold">
                                    No complaints assigned
                                </h5>

                                <p className="text-muted mb-0">
                                    New complaints assigned to you
                                    will appear here.
                                </p>

                            </div>

                        ) : (

                            /* TABLE */

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>

                                            <th className="text-muted small">
                                                Complaint ID
                                            </th>

                                            <th className="text-muted small">
                                                Subject
                                            </th>

                                            <th className="text-muted small">
                                                User
                                            </th>

                                            <th className="text-muted small">
                                                Status
                                            </th>

                                            <th className="text-muted small">
                                                Update
                                            </th>

                                            <th className="text-muted small text-center">
                                                Chat
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {assignments.map(
                                            (item) => {

                                                const complaint =
                                                    item.complaintId;

                                                return (
                                                    <tr
                                                        key={
                                                            item._id
                                                        }
                                                    >

                                                        {/* ID */}

                                                        <td>

                                                            <span className="fw-semibold">
                                                                {
                                                                    complaint?.complaintId
                                                                }
                                                            </span>

                                                        </td>


                                                        {/* SUBJECT */}

                                                        <td>

                                                            <div
                                                                className="fw-semibold"
                                                                style={{
                                                                    minWidth:
                                                                        "180px"
                                                                }}
                                                            >
                                                                {
                                                                    complaint?.subject
                                                                }
                                                            </div>

                                                        </td>


                                                        {/* USER */}

                                                        <td>

                                                            <div
                                                                className="d-flex align-items-center gap-2"
                                                                style={{
                                                                    minWidth:
                                                                        "130px"
                                                                }}
                                                            >

                                                                <div
                                                                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                                    style={{
                                                                        width: "34px",
                                                                        height: "34px",
                                                                        borderRadius:
                                                                            "50%",
                                                                        backgroundColor:
                                                                            "#dbeafe"
                                                                    }}
                                                                >
                                                                    👤
                                                                </div>

                                                                <span>
                                                                    {
                                                                        item.userId?.name
                                                                    }
                                                                </span>

                                                            </div>

                                                        </td>


                                                        {/* STATUS */}

                                                        <td>

                                                            <span
                                                                className={`badge ${getStatusClass(
                                                                    item.status
                                                                )} px-3 py-2`}
                                                            >
                                                                {
                                                                    getStatusIcon(
                                                                        item.status
                                                                    )
                                                                }{" "}
                                                                {
                                                                    item.status
                                                                }
                                                            </span>

                                                        </td>


                                                        {/* UPDATE STATUS */}

                                                        <td>

                                                            <select
                                                                className="form-select form-select-sm"
                                                                value=""
                                                                style={{
                                                                    minWidth:
                                                                        "150px"
                                                                }}
                                                                onChange={(
                                                                    e
                                                                ) => {

                                                                    if (
                                                                        e
                                                                            .target
                                                                            .value
                                                                    ) {

                                                                        updateStatus(
                                                                            complaint.complaintId,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );

                                                                    }

                                                                }}
                                                                disabled={
                                                                    item.status ===
                                                                    "Closed"
                                                                }
                                                            >

                                                                <option value="">

                                                                    {item.status ===
                                                                    "Closed"
                                                                        ? "No further action"
                                                                        : "Update status"}

                                                                </option>


                                                                {getNextStatusOptions(
                                                                    item.status
                                                                ).map(
                                                                    (
                                                                        status
                                                                    ) => (

                                                                        <option
                                                                            key={
                                                                                status
                                                                            }
                                                                            value={
                                                                                status
                                                                            }
                                                                        >
                                                                            {
                                                                                status
                                                                            }
                                                                        </option>

                                                                    )
                                                                )}

                                                            </select>

                                                        </td>


                                                        {/* CHAT */}

                                                        <td className="text-center">

                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() =>
                                                                    openChat(
                                                                        complaint
                                                                    )
                                                                }
                                                            >
                                                                💬 Chat
                                                            </button>

                                                        </td>

                                                    </tr>
                                                );

                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* ========================= */}
                {/* CHAT WINDOW */}
                {/* ========================= */}

                {selectedComplaint && (

                    <div
                        className="mt-4"
                        style={{
                            scrollMarginTop: "20px"
                        }}
                    >

                        <div
                            className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3"
                        >

                            <div>

                                <h4 className="fw-bold mb-1">
                                    💬 Complaint Chat
                                </h4>

                                <p className="text-muted small mb-0">
                                    Complaint ID:{" "}
                                    <strong>
                                        {
                                            selectedComplaint.complaintId
                                        }
                                    </strong>
                                </p>

                            </div>

                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() =>
                                    setSelectedComplaint(
                                        null
                                    )
                                }
                            >
                                ✕ Close Chat
                            </button>

                        </div>


                        <ChatWindow
                            complaintId={
                                selectedComplaint.complaintId
                            }
                        />

                    </div>

                )}


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

export default AgentHome;