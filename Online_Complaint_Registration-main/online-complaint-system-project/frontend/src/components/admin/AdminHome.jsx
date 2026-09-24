import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AdminHome = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const [creatingAgent, setCreatingAgent] = useState(false);

    const [selectedAgents, setSelectedAgents] = useState({});

    const [agentForm, setAgentForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    // ================================
    // FETCH ADMIN DATA
    // ================================

    const fetchAdminData = async () => {
        try {
            const [
                usersResponse,
                agentsResponse,
                complaintsResponse
            ] = await Promise.all([
                API.get("/admin/users"),
                API.get("/admin/agents"),
                API.get("/admin/complaints")
            ]);

            setUsers(usersResponse.data.users || []);
            setAgents(agentsResponse.data.agents || []);
            setComplaints(
                complaintsResponse.data.complaints || []
            );

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load admin data"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    // ================================
    // AGENT SELECTION
    // ================================

    const handleAgentChange = (
        complaintId,
        agentId
    ) => {
        setSelectedAgents({
            ...selectedAgents,
            [complaintId]: agentId
        });
    };

    // ================================
    // AGENT FORM
    // ================================

    const handleAgentFormChange = (e) => {
        setAgentForm({
            ...agentForm,
            [e.target.name]: e.target.value
        });
    };

    // ================================
    // CREATE AGENT
    // ================================

    const handleCreateAgent = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            phone,
            password
        } = agentForm;

        if (!name || !email || !phone || !password) {
            toast.error(
                "Please fill all agent fields"
            );
            return;
        }

        if (password.length < 6) {
            toast.error(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            setCreatingAgent(true);

            await API.post(
                "/admin/agents",
                agentForm
            );

            toast.success(
                "Agent created successfully"
            );

            setAgentForm({
                name: "",
                email: "",
                phone: "",
                password: ""
            });

            await fetchAdminData();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to create agent"
            );
        } finally {
            setCreatingAgent(false);
        }
    };

    // ================================
    // ASSIGN COMPLAINT
    // ================================

    const assignComplaint = async (
        complaintId
    ) => {
        const agentId =
            selectedAgents[complaintId];

        if (!agentId) {
            toast.error(
                "Please select an agent"
            );
            return;
        }

        try {
            setAssigning(true);

            await API.post(
                "/assignments/assign",
                {
                    complaintId,
                    agentId
                }
            );

            toast.success(
                "Complaint assigned successfully"
            );

            await fetchAdminData();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to assign complaint"
            );
        } finally {
            setAssigning(false);
        }
    };

    // ================================
    // LOGOUT
    // ================================

    const handleLogout = () => {
    logout();
    window.location.replace("/");
    };

    // ================================
    // STATUS HELPERS
    // ================================

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
                return "bg-dark";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return "⏳";

            case "Assigned":
                return "📋";

            case "In Progress":
                return "🔄";

            case "Resolved":
                return "✅";

            case "Rejected":
                return "❌";

            case "Closed":
                return "🔒";

            default:
                return "📌";
        }
    };

    // ================================
    // STATISTICS
    // ================================

    const totalUsers = users.length;
    const totalAgents = agents.length;
    const totalComplaints = complaints.length;

    const pendingComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "Pending"
        ).length;

    const assignedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "Assigned"
        ).length;

    const inProgressComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "In Progress"
        ).length;

    const resolvedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "Resolved"
        ).length;

    return (
        <div
            className="min-vh-100"
            style={{
                backgroundColor: "#f8fafc"
            }}
        >

            {/* ================================= */}
            {/* NAVBAR */}
            {/* ================================= */}

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

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white d-none d-md-block">
                            👨‍💼 Admin
                        </span>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </nav>


            {/* ================================= */}
            {/* MAIN CONTAINER */}
            {/* ================================= */}

            <div className="container py-4 py-md-5">

                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

                <div className="mb-4">

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                        <div className="d-flex align-items-center gap-3">

                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "58px",
                                    height: "58px",
                                    borderRadius: "15px",
                                    backgroundColor: "#dbeafe",
                                    fontSize: "28px"
                                }}
                            >
                                👨‍💼
                            </div>

                            <div>

                                <h2 className="fw-bold mb-1">
                                    Admin Dashboard
                                </h2>

                                <p className="text-muted mb-0">
                                    Welcome back,{" "}
                                    <strong>
                                        {user?.name || "Admin"}
                                    </strong>
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* STATISTICS */}
                {/* ================================= */}

                <div className="row g-3 mb-4">

                    {/* USERS */}

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
                                            Total Users
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {totalUsers}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            backgroundColor: "#dbeafe",
                                            fontSize: "23px"
                                        }}
                                    >
                                        👥
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* AGENTS */}

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
                                            Total Agents
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {totalAgents}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            backgroundColor: "#dcfce7",
                                            fontSize: "23px"
                                        }}
                                    >
                                        👨‍💼
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* COMPLAINTS */}

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
                                            Total Complaints
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {totalComplaints}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            backgroundColor: "#fef3c7",
                                            fontSize: "23px"
                                        }}
                                    >
                                        📋
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PENDING */}

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
                                            Pending Complaints
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {pendingComplaints}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            backgroundColor: "#fef3c7",
                                            fontSize: "23px"
                                        }}
                                    >
                                        ⏳
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* QUICK STATUS SUMMARY */}
                {/* ================================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                        borderRadius: "16px"
                    }}
                >

                    <div className="card-body p-4">

                        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Complaint Status Overview
                                </h5>

                                <p className="text-muted mb-0">
                                    Current complaint distribution
                                </p>

                            </div>

                            <div className="d-flex flex-wrap gap-2">

                                <span className="badge bg-warning text-dark px-3 py-2">
                                    Pending: {pendingComplaints}
                                </span>

                                <span className="badge bg-info text-dark px-3 py-2">
                                    Assigned: {assignedComplaints}
                                </span>

                                <span className="badge bg-primary px-3 py-2">
                                    In Progress: {inProgressComplaints}
                                </span>

                                <span className="badge bg-success px-3 py-2">
                                    Resolved: {resolvedComplaints}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* CREATE AGENT */}
                {/* ================================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                        borderRadius: "16px"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        <div className="d-flex align-items-center gap-3 mb-4">

                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "46px",
                                    height: "46px",
                                    borderRadius: "12px",
                                    backgroundColor: "#dcfce7",
                                    fontSize: "22px"
                                }}
                            >
                                ➕
                            </div>

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Create New Agent
                                </h4>

                                <p className="text-muted mb-0">
                                    Add a new support agent to the system
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleCreateAgent}
                        >

                            <div className="row g-3">

                                {/* NAME */}

                                <div className="col-12 col-md-6 col-lg-3">

                                    <label
                                        className="form-label fw-semibold"
                                        htmlFor="agentName"
                                    >
                                        Agent Name
                                    </label>

                                    <input
                                        id="agentName"
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter agent name"
                                        value={
                                            agentForm.name
                                        }
                                        onChange={
                                            handleAgentFormChange
                                        }
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="col-12 col-md-6 col-lg-3">

                                    <label
                                        className="form-label fw-semibold"
                                        htmlFor="agentEmail"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="agentEmail"
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={
                                            agentForm.email
                                        }
                                        onChange={
                                            handleAgentFormChange
                                        }
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="col-12 col-md-6 col-lg-2">

                                    <label
                                        className="form-label fw-semibold"
                                        htmlFor="agentPhone"
                                    >
                                        Phone
                                    </label>

                                    <input
                                        id="agentPhone"
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone number"
                                        value={
                                            agentForm.phone
                                        }
                                        onChange={
                                            handleAgentFormChange
                                        }
                                    />

                                </div>


                                {/* PASSWORD */}

                                <div className="col-12 col-md-6 col-lg-2">

                                    <label
                                        className="form-label fw-semibold"
                                        htmlFor="agentPassword"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="agentPassword"
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Min. 6 characters"
                                        value={
                                            agentForm.password
                                        }
                                        onChange={
                                            handleAgentFormChange
                                        }
                                    />

                                </div>


                                {/* BUTTON */}

                                <div className="col-12 col-lg-2 d-flex align-items-end">

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 fw-semibold"
                                        disabled={
                                            creatingAgent
                                        }
                                        style={{
                                            minHeight: "38px"
                                        }}
                                    >

                                        {creatingAgent ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                Create Agent
                                            </>
                                        )}

                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>


                {/* ================================= */}
                {/* COMPLAINT MANAGEMENT */}
                {/* ================================= */}

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "16px",
                        overflow: "hidden"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Complaint Management
                                </h4>

                                <p className="text-muted mb-0">
                                    Review complaints and assign them to agents
                                </p>

                            </div>

                            <span className="badge bg-light text-dark border px-3 py-2">
                                {totalComplaints} Complaints
                            </span>

                        </div>


                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary mb-3"
                                    role="status"
                                ></div>

                                <p className="text-muted mb-0">
                                    Loading admin data...
                                </p>

                            </div>

                        ) : complaints.length === 0 ? (

                            <div
                                className="text-center py-5"
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: "12px"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "42px"
                                    }}
                                >
                                    📋
                                </div>

                                <h5 className="fw-semibold mt-3">
                                    No Complaints Available
                                </h5>

                                <p className="text-muted mb-0">
                                    There are currently no complaints in the system.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead
                                        style={{
                                            backgroundColor: "#f8fafc"
                                        }}
                                    >

                                        <tr>

                                            <th className="py-3">
                                                Complaint ID
                                            </th>

                                            <th className="py-3">
                                                Subject
                                            </th>

                                            <th className="py-3">
                                                User
                                            </th>

                                            <th className="py-3">
                                                Status
                                            </th>

                                            <th className="py-3">
                                                Assign Agent
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

                                                        <span className="fw-semibold text-primary">
                                                            {
                                                                complaint.complaintId
                                                            }
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div
                                                            className="fw-semibold"
                                                            style={{
                                                                minWidth: "160px"
                                                            }}
                                                        >
                                                            {
                                                                complaint.subject
                                                            }
                                                        </div>

                                                    </td>


                                                    <td>

                                                        <div
                                                            style={{
                                                                minWidth: "130px"
                                                            }}
                                                        >

                                                            <div className="fw-semibold">
                                                                {
                                                                    complaint.userId?.name ||
                                                                    complaint.name
                                                                }
                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={`badge ${getStatusClass(
                                                                complaint.status
                                                            )} px-3 py-2`}
                                                        >

                                                            {getStatusIcon(
                                                                complaint.status
                                                            )}{" "}
                                                            {
                                                                complaint.status
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {complaint.status ===
                                                        "Pending" ? (

                                                            <div
                                                                className="d-flex flex-column flex-sm-row gap-2"
                                                                style={{
                                                                    minWidth: "250px"
                                                                }}
                                                            >

                                                                <select
                                                                    className="form-select form-select-sm"
                                                                    value={
                                                                        selectedAgents[
                                                                            complaint.complaintId
                                                                        ] ||
                                                                        ""
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleAgentChange(
                                                                            complaint.complaintId,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                >

                                                                    <option value="">
                                                                        Select Agent
                                                                    </option>

                                                                    {agents.map(
                                                                        (
                                                                            agent
                                                                        ) => (

                                                                            <option
                                                                                key={
                                                                                    agent.userId
                                                                                }
                                                                                value={
                                                                                    agent.userId
                                                                                }
                                                                            >
                                                                                {
                                                                                    agent.name
                                                                                }
                                                                            </option>

                                                                        )
                                                                    )}

                                                                </select>


                                                                <button
                                                                    className="btn btn-sm btn-primary fw-semibold"
                                                                    disabled={
                                                                        assigning
                                                                    }
                                                                    onClick={() =>
                                                                        assignComplaint(
                                                                            complaint.complaintId
                                                                        )
                                                                    }
                                                                >

                                                                    {assigning ? (
                                                                        <span
                                                                            className="spinner-border spinner-border-sm"
                                                                            role="status"
                                                                        ></span>
                                                                    ) : (
                                                                        "Assign"
                                                                    )}

                                                                </button>

                                                            </div>

                                                        ) : (

                                                            <span className="text-muted small">
                                                                Already assigned
                                                            </span>

                                                        )}

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


                {/* ================================= */}
                {/* FOOTER */}
                {/* ================================= */}

                <div className="text-center mt-4">

                    <small className="text-muted">
                        Online Complaint Management System © 2026
                    </small>

                </div>

            </div>

        </div>
    );
};

export default AdminHome;