import { useEffect, useRef, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ChatWindow = ({ complaintId }) => {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const messagesEndRef = useRef(null);

    // =========================
    // FETCH MESSAGES
    // =========================

    const fetchMessages = async () => {
        try {
            const response = await API.get(
                `/messages/${complaintId}`
            );

            setMessages(response.data.messages || []);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load messages"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (complaintId) {
            fetchMessages();
        }
    }, [complaintId]);

    // =========================
    // AUTO SCROLL
    // =========================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    // =========================
    // SEND MESSAGE
    // =========================

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        try {
            setSending(true);

            const response = await API.post(
                "/messages",
                {
                    complaintId,
                    message: message.trim()
                }
            );

            setMessages((prevMessages) => [
                ...prevMessages,
                response.data.data
            ]);

            setMessage("");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to send message"
            );
        } finally {
            setSending(false);
        }
    };

    // =========================
    // UI
    // =========================

    return (
        <div
            className="card border-0 shadow-sm mt-4"
            style={{
                borderRadius: "16px",
                overflow: "hidden"
            }}
        >

            {/* ========================= */}
            {/* CHAT HEADER */}
            {/* ========================= */}

            <div
                className="text-white p-3 p-md-4"
                style={{
                    background:
                        "linear-gradient(135deg, #2563eb, #1d4ed8)"
                }}
            >

                <div className="d-flex align-items-center gap-3">

                    <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            backgroundColor:
                                "rgba(255,255,255,0.15)",
                            fontSize: "23px"
                        }}
                    >
                        💬
                    </div>

                    <div>

                        <h5 className="fw-bold mb-1">
                            Complaint Chat
                        </h5>

                        <small className="opacity-75">
                            Discuss and track updates related
                            to this complaint
                        </small>

                    </div>

                </div>

            </div>


            {/* ========================= */}
            {/* MESSAGES */}
            {/* ========================= */}

            <div
                className="p-3 p-md-4"
                style={{
                    height: "380px",
                    overflowY: "auto",
                    backgroundColor: "#f8fafc"
                }}
            >

                {loading ? (

                    <div className="h-100 d-flex align-items-center justify-content-center">

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
                                Loading messages...
                            </p>

                        </div>

                    </div>

                ) : messages.length === 0 ? (

                    <div className="h-100 d-flex align-items-center justify-content-center">

                        <div className="text-center">

                            <div
                                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "65px",
                                    height: "65px",
                                    borderRadius: "50%",
                                    backgroundColor: "#dbeafe",
                                    fontSize: "28px"
                                }}
                            >
                                💬
                            </div>

                            <h6 className="fw-bold">
                                No messages yet
                            </h6>

                            <p className="text-muted small mb-0">
                                Start a conversation about this
                                complaint.
                            </p>

                        </div>

                    </div>

                ) : (

                    messages.map((item) => {

                        const isOwnMessage =
                            item.senderId?._id === user?.userId ||
                            item.senderId?.userId === user?.userId;

                        return (
                            <div
                                key={item._id}
                                className={`mb-3 d-flex ${
                                    isOwnMessage
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                }`}
                            >

                                <div
                                    style={{
                                        maxWidth: "80%",
                                        minWidth: "120px"
                                    }}
                                >

                                    {/* SENDER */}

                                    <div
                                        className={`small fw-semibold mb-1 ${
                                            isOwnMessage
                                                ? "text-end text-primary"
                                                : "text-start text-muted"
                                        }`}
                                    >
                                        {isOwnMessage
                                            ? "You"
                                            : item.senderId?.name ||
                                              "User"}
                                    </div>


                                    {/* MESSAGE BUBBLE */}

                                    <div
                                        className={
                                            isOwnMessage
                                                ? "text-white"
                                                : "bg-white border"
                                        }
                                        style={{
                                            backgroundColor:
                                                isOwnMessage
                                                    ? "#2563eb"
                                                    : "#ffffff",
                                            borderRadius: isOwnMessage
                                                ? "16px 16px 4px 16px"
                                                : "16px 16px 16px 4px",
                                            padding:
                                                "10px 14px",
                                            boxShadow:
                                                "0 2px 6px rgba(0,0,0,0.06)"
                                        }}
                                    >

                                        <div
                                            style={{
                                                lineHeight: "1.5",
                                                wordBreak:
                                                    "break-word"
                                            }}
                                        >
                                            {item.message}
                                        </div>


                                        {/* TIME */}

                                        <div
                                            className={
                                                isOwnMessage
                                                    ? "text-white-50"
                                                    : "text-muted"
                                            }
                                            style={{
                                                fontSize:
                                                    "0.72rem",
                                                marginTop: "5px"
                                            }}
                                        >
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString()}
                                        </div>

                                    </div>

                                </div>

                            </div>
                        );
                    })

                )}

                <div ref={messagesEndRef} />

            </div>


            {/* ========================= */}
            {/* MESSAGE INPUT */}
            {/* ========================= */}

            <div
                className="p-3 p-md-4 border-top"
                style={{
                    backgroundColor: "#ffffff"
                }}
            >

                <form
                    onSubmit={handleSendMessage}
                    className="d-flex gap-2"
                >

                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        disabled={sending}
                        autoComplete="off"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={
                            sending || !message.trim()
                        }
                    >

                        {sending ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>

                                Sending
                            </>
                        ) : (
                            <>
                                Send
                                <span className="ms-2">
                                    →
                                </span>
                            </>
                        )}

                    </button>

                </form>

                <div className="text-muted mt-2">
                    <small>
                        Press the Send button to send your message.
                    </small>
                </div>

            </div>

        </div>
    );
};

export default ChatWindow;