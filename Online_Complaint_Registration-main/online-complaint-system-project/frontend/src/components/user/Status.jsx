import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import ChatWindow from "../common/ChatWindow";

const Status = () => {
    const { complaintId } = useParams();
    const navigate = useNavigate();

    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchComplaint = async () => {
        try {
            const response = await API.get(
                `/complaints/${complaintId}`
            );

            setComplaint(response.data.complaint);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to fetch complaint"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaint();
    }, [complaintId]);

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
                return "👤";

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

    if (loading) {
        return (
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: "#f8fafc"
                }}
            >
                <div className="text-center">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="text-muted mb-0">
                        Loading complaint details...
                    </p>

                </div>
            </div>
        );
    }

    if (!complaint) {
        return (
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: "#f8fafc"
                }}
            >
                <div className="text-center">

                    <div
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            backgroundColor: "#fee2e2",
                            fontSize: "30px"
                        }}
                    >
                        🔍
                    </div>

                    <h4 className="fw-bold">
                        Complaint Not Found
                    </h4>

                    <p className="text-muted">
                        The requested complaint could not be found.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/user")}
                    >
                        ← Back to Dashboard
                    </button>

                </div>
            </div>
        );
    }

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
                        onClick={() => navigate("/user")}
                    >
                        ← Dashboard
                    </button>

                </div>

            </nav>


            {/* ========================= */}
            {/* MAIN CONTENT */}
            {/* ========================= */}

            <div className="container py-4 py-md-5">

                {/* PAGE HEADER */}

                <div className="mb-4">

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                        <div>

                            <div className="d-flex align-items-center gap-2 mb-2">

                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "12px",
                                        backgroundColor: "#dbeafe",
                                        fontSize: "22px"
                                    }}
                                >
                                    📋
                                </div>

                                <div>

                                    <h2 className="fw-bold mb-0">
                                        Complaint Details
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Track your complaint status and
                                        communicate with the assigned team.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/user")}
                        >
                            ← Back
                        </button>

                    </div>

                </div>


                {/* ========================= */}
                {/* STATUS HEADER CARD */}
                {/* ========================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                        borderRadius: "16px",
                        overflow: "hidden"
                    }}
                >

                    <div
                        className="card-body p-4"
                        style={{
                            background:
                                "linear-gradient(135deg, #eff6ff, #ffffff)"
                        }}
                    >

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                            <div>

                                <small className="text-muted d-block mb-1">
                                    Complaint ID
                                </small>

                                <h4 className="fw-bold mb-0">
                                    {complaint.complaintId}
                                </h4>

                            </div>


                            <div className="text-md-end">

                                <small className="text-muted d-block mb-2">
                                    Current Status
                                </small>

                                <span
                                    className={`badge ${getStatusClass(
                                        complaint.status
                                    )} px-3 py-2`}
                                    style={{
                                        fontSize: "0.9rem"
                                    }}
                                >
                                    {getStatusIcon(complaint.status)}{" "}
                                    {complaint.status}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ========================= */}
                {/* COMPLAINT INFORMATION */}
                {/* ========================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                        borderRadius: "16px"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        <div className="mb-4">

                            <h5 className="fw-bold mb-1">
                                Complaint Information
                            </h5>

                            <p className="text-muted small mb-0">
                                Details submitted when the complaint was
                                registered.
                            </p>

                        </div>


                        <div className="row">

                            {/* NAME */}

                            <div className="col-md-6 mb-4">

                                <small className="text-muted d-block mb-1">
                                    Name
                                </small>

                                <div className="fw-semibold">
                                    {complaint.name}
                                </div>

                            </div>


                            {/* SUBJECT */}

                            <div className="col-md-6 mb-4">

                                <small className="text-muted d-block mb-1">
                                    Subject
                                </small>

                                <div className="fw-semibold">
                                    {complaint.subject}
                                </div>

                            </div>


                            {/* CITY */}

                            <div className="col-md-6 mb-4">

                                <small className="text-muted d-block mb-1">
                                    City
                                </small>

                                <div className="fw-semibold">
                                    {complaint.city}
                                </div>

                            </div>


                            {/* STATE */}

                            <div className="col-md-6 mb-4">

                                <small className="text-muted d-block mb-1">
                                    State
                                </small>

                                <div className="fw-semibold">
                                    {complaint.state}
                                </div>

                            </div>


                            {/* PINCODE */}

                            <div className="col-md-6 mb-4">

                                <small className="text-muted d-block mb-1">
                                    Pincode
                                </small>

                                <div className="fw-semibold">
                                    {complaint.pincode}
                                </div>

                            </div>


                            {/* REGISTERED DATE */}

                            <div className="col-md-6 mb-4">

                                <small className="text-muted d-block mb-1">
                                    Registered On
                                </small>

                                <div className="fw-semibold">
                                    {new Date(
                                        complaint.createdAt
                                    ).toLocaleString()}
                                </div>

                            </div>


                            {/* ADDRESS */}

                            <div className="col-12 mb-4">

                                <small className="text-muted d-block mb-1">
                                    Address
                                </small>

                                <div
                                    className="p-3 rounded"
                                    style={{
                                        backgroundColor: "#f8fafc"
                                    }}
                                >
                                    {complaint.address}
                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="col-12">

                                <small className="text-muted d-block mb-1">
                                    Complaint Description
                                </small>

                                <div
                                    className="p-3 rounded"
                                    style={{
                                        backgroundColor: "#f8fafc",
                                        lineHeight: "1.7"
                                    }}
                                >
                                    {complaint.description}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ========================= */}
                {/* RESOLUTION NOTE */}
                {/* ========================= */}

                {complaint.resolutionNote && (

                    <div
                        className="card border-0 shadow-sm mb-4"
                        style={{
                            borderRadius: "16px"
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex align-items-start gap-3">

                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "12px",
                                        backgroundColor: "#dcfce7",
                                        fontSize: "22px"
                                    }}
                                >
                                    ✅
                                </div>

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Resolution Note
                                    </h5>

                                    <p className="text-muted small mb-2">
                                        Update from the assigned team
                                    </p>

                                    <p className="mb-0">
                                        {complaint.resolutionNote}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* ========================= */}
                {/* CHAT SECTION */}
                {/* ========================= */}

                <div className="mb-4">

                    <div className="mb-3">

                        <h5 className="fw-bold mb-1">
                            💬 Complaint Chat
                        </h5>

                        <p className="text-muted small mb-0">
                            Communicate regarding this complaint.
                        </p>

                    </div>

                    <ChatWindow
                        complaintId={complaint.complaintId}
                    />

                </div>


                {/* ========================= */}
                {/* FOOTER */}
                {/* ========================= */}

                <div className="text-center pt-2">

                    <small className="text-muted">
                        Online Complaint Management System © 2026
                    </small>

                </div>

            </div>

        </div>
    );
};

export default Status;