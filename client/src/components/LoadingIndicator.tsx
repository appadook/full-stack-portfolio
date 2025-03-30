const LoadingIndicator = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1.5rem 0" }}>
            <div 
                style={{ 
                    width: "40px", 
                    height: "40px", 
                    border: "4px solid rgba(139, 92, 246, 0.3)",
                    borderTopColor: "#7c3aed", 
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                }}
            />
            
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingIndicator;