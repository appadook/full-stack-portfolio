import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

interface FormProps {
  route: string;
  method: "login" | "register";
}

function Form({ route, method }: FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/admin-portal");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div 
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "2rem",
                    backgroundColor: "#111827", 
                    borderRadius: "1rem",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.3)"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <h1 style={{ 
                        fontSize: "2rem", 
                        fontWeight: "800",
                        background: "linear-gradient(to right, #a78bfa, #7c3aed)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "0.5rem",
                        textAlign: "center"
                    }}>
                        {name}
                    </h1>
                    <div style={{ 
                        height: "6px", 
                        width: "100px", 
                        margin: "0 auto",
                        borderRadius: "9999px",
                        background: "linear-gradient(to right, #8b5cf6, #6d28d9)"
                    }}></div>
                </div>
                
                <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ 
                            display: "block", 
                            marginBottom: "0.5rem", 
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#c4b5fd" 
                        }}>
                            Username
                        </label>
                        <input
                            style={{
                                width: "100%",
                                padding: "0.875rem 1.25rem", // Equal padding on both sides
                                backgroundColor: "#1f2937",
                                color: "#fff",
                                border: "1px solid #374151",
                                borderRadius: "0.75rem",
                                outline: "none",
                                boxSizing: "border-box" // Ensures padding is included in width calculation
                            }}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ 
                            display: "block", 
                            marginBottom: "0.5rem", 
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#c4b5fd" 
                        }}>
                            Password
                        </label>
                        <input
                            style={{
                                width: "100%",
                                padding: "0.875rem 1.25rem", // Equal padding on both sides
                                backgroundColor: "#1f2937",
                                color: "#fff",
                                border: "1px solid #374151",
                                borderRadius: "0.75rem",
                                outline: "none",
                                boxSizing: "border-box" // Ensures padding is included in width calculation
                            }}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    {loading ? (
                        <LoadingIndicator />
                    ) : (
                        <button
                            style={{
                                width: "100%",
                                padding: "0.875rem 1.25rem",
                                background: "linear-gradient(to bottom right, #7c3aed, #6d28d9, #5b21b6)",
                                color: "white",
                                border: "none",
                                borderRadius: "0.75rem",
                                fontWeight: "600",
                                fontSize: "1.125rem",
                                cursor: "pointer",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                            type="submit"
                        >
                            {name}
                        </button>
                    )}
                    
                    {method === "login" && (
                        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                            <p style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                                Don't have an account?{" "}
                                <a 
                                    href="/register" 
                                    style={{ 
                                        color: "#a78bfa", 
                                        fontWeight: "500",
                                        textDecoration: "underline"
                                    }}
                                >
                                    Register here
                                </a>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Form;