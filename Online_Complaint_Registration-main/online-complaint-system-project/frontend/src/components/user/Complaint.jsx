import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

const Complaint = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        subject: "",
        description: ""
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
            address,
            city,
            state,
            pincode,
            subject,
            description
        } = formData;

        if (
            !name ||
            !address ||
            !city ||
            !state ||
            !pincode ||
            !subject ||
            !description
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (!/^\d{6}$/.test(pincode)) {
            toast.error(
                "Please enter a valid 6-digit pincode"
            );
            return;
        }

        try {
            setLoading(true);

            const response = await API.post(
                "/complaints",
                formData
            );

            toast.success(
                response.data.message ||
                "Complaint registered successfully!"
            );

            navigate("/user");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to register complaint"
            );
        } finally {
            setLoading(false);
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
            {/* TOP NAVBAR */}
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
            {/* FORM CONTAINER */}
            {/* ========================= */}

            <div className="container py-4 py-md-5">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9 col-xl-8">

                        {/* PAGE HEADER */}

                        <div className="text-center mb-4">

                            <div
                                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "65px",
                                    height: "65px",
                                    borderRadius: "50%",
                                    backgroundColor: "#dbeafe",
                                    fontSize: "30px"
                                }}
                            >
                                📝
                            </div>

                            <h2 className="fw-bold mb-2">
                                Register a Complaint
                            </h2>

                            <p className="text-muted mb-0">
                                Provide the details below to submit
                                your complaint.
                            </p>

                        </div>


                        {/* FORM CARD */}

                        <div
                            className="card border-0 shadow-sm"
                            style={{
                                borderRadius: "16px"
                            }}
                        >

                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={handleSubmit}>

                                    {/* ========================= */}
                                    {/* PERSONAL INFORMATION */}
                                    {/* ========================= */}

                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-1">
                                            Personal Information
                                        </h5>

                                        <p className="text-muted small">
                                            Enter your basic contact details.
                                        </p>

                                    </div>


                                    <div className="row">

                                        {/* NAME */}

                                        <div className="col-md-6 mb-3">

                                            <label
                                                htmlFor="name"
                                                className="form-label fw-semibold"
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


                                        {/* PINCODE */}

                                        <div className="col-md-6 mb-3">

                                            <label
                                                htmlFor="pincode"
                                                className="form-label fw-semibold"
                                            >
                                                Pincode
                                            </label>

                                            <input
                                                id="pincode"
                                                type="text"
                                                name="pincode"
                                                className="form-control form-control-lg"
                                                placeholder="Enter 6-digit pincode"
                                                maxLength="6"
                                                inputMode="numeric"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>


                                    {/* ADDRESS */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="address"
                                            className="form-label fw-semibold"
                                        >
                                            Address
                                        </label>

                                        <textarea
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Enter your complete address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* CITY + STATE */}

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <label
                                                htmlFor="city"
                                                className="form-label fw-semibold"
                                            >
                                                City
                                            </label>

                                            <input
                                                id="city"
                                                type="text"
                                                name="city"
                                                className="form-control form-control-lg"
                                                placeholder="Enter city"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />

                                        </div>


                                        <div className="col-md-6 mb-3">

                                            <label
                                                htmlFor="state"
                                                className="form-label fw-semibold"
                                            >
                                                State
                                            </label>

                                            <input
                                                id="state"
                                                type="text"
                                                name="state"
                                                className="form-control form-control-lg"
                                                placeholder="Enter state"
                                                value={formData.state}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* ========================= */}
                                    {/* COMPLAINT INFORMATION */}
                                    {/* ========================= */}

                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-1">
                                            Complaint Details
                                        </h5>

                                        <p className="text-muted small">
                                            Clearly describe the issue you
                                            want to report.
                                        </p>

                                    </div>


                                    {/* SUBJECT */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="subject"
                                            className="form-label fw-semibold"
                                        >
                                            Complaint Subject
                                        </label>

                                        <input
                                            id="subject"
                                            type="text"
                                            name="subject"
                                            className="form-control form-control-lg"
                                            placeholder="Enter a short complaint subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="description"
                                            className="form-label fw-semibold"
                                        >
                                            Complaint Description
                                        </label>

                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            rows="6"
                                            placeholder="Describe your complaint in detail..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* ========================= */}
                                    {/* BUTTONS */}
                                    {/* ========================= */}

                                    <div className="d-flex flex-column flex-sm-row gap-2">

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg flex-fill"
                                            onClick={() =>
                                                navigate("/user")
                                            }
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>


                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg flex-fill fw-semibold"
                                            disabled={loading}
                                        >

                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>

                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Complaint
                                                    <span className="ms-2">
                                                        →
                                                    </span>
                                                </>
                                            )}

                                        </button>

                                    </div>


                                    {/* INFORMATION */}

                                    <div
                                        className="alert alert-light border mt-4 mb-0"
                                        role="alert"
                                    >
                                        <small className="text-muted">
                                            💡 Please provide accurate
                                            information so the complaint
                                            can be processed efficiently.
                                        </small>
                                    </div>

                                </form>

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="text-center mt-4">

                            <small className="text-muted">
                                Online Complaint Management System © 2026
                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Complaint;