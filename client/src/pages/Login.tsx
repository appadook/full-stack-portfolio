import Form from "../components/Form";

function Login() {
    return (
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
            {/* Decorative background elements - with proper z-index */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ zIndex: "0" }}>
                {/* Main gradient blobs */}
                <div 
                    className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" 
                    style={{ 
                        backgroundColor: "rgba(109, 40, 217, 0.15)",
                        animation: "pulse 15s infinite alternate" 
                    }}
                />
                <div 
                    className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" 
                    style={{ 
                        backgroundColor: "rgba(124, 58, 237, 0.15)",
                        animation: "pulse 18s 2s infinite alternate" 
                    }}
                />

                {/* Small decorative elements */}
                <div className="absolute inset-0 z-0">
                    {/* Top floating particle */}
                    <div
                        className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full"
                        style={{ 
                            backgroundColor: "#a78bfa",
                            animation: "float 5s infinite ease-in-out" 
                        }}
                    />
                    {/* Right floating particle */}
                    <div
                        className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full"
                        style={{ 
                            backgroundColor: "#8b5cf6",
                            animation: "float 7s 1s infinite ease-in-out" 
                        }}
                    />
                    {/* Bottom floating particle */}
                    <div
                        className="absolute bottom-[20%] left-[30%] w-2.5 h-2.5 rounded-full"
                        style={{ 
                            backgroundColor: "#c4b5fd",
                            animation: "float 6s 2s infinite ease-in-out" 
                        }}
                    />
                </div>
                
                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM2ODY2OGEiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwaDYwVjBoLTYweiIvPjwvZz48L3N2Zz4=')"
                    }}
                />
            </div>
            
            {/* Static glow effect at the top */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px]" 
                style={{ 
                    backgroundImage: "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.5), transparent)",
                    zIndex: "0"
                }}
            ></div>
            
            {/* Main content - with higher z-index */}
            <div style={{ position: "relative", zIndex: "10" }}>
                <Form route="/api/token/" method="login" />
            </div>
            
            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 0.3; transform: scale(1); }
                }
                
                @keyframes float {
                    0% { transform: translateY(0); opacity: 0.5; }
                    50% { transform: translateY(-20px); opacity: 1; }
                    100% { transform: translateY(0); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

export default Login;