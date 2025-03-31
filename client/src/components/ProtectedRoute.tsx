import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, ReactNode } from "react";
import LoadingIndicator from "./LoadingIndicator";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshTokenValue) {
            setIsAuthorized(false);
            return;
        }
        
        try {
            const response = await authAPI.refreshToken(refreshTokenValue);
            localStorage.setItem(ACCESS_TOKEN, response.access);
            setIsAuthorized(true);
        } catch (error) {
            console.error("Token refresh failed:", error);
            // Clear tokens on refresh failure
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            // No token, check if we can refresh
            const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);
            if (refreshTokenValue) {
                await refreshToken();
            } else {
                setIsAuthorized(false);
            }
            return;
        }

        try {
            // Check token expiration
            const decoded = jwtDecode<{ exp: number }>(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                // Token expired, try to refresh
                await refreshToken();
            } else {
                // Token valid
                setIsAuthorized(true);
            }
        } catch (error) {
            // Invalid token format
            console.error("Token validation error:", error);
            await refreshToken();
        }
    };

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900">
                <div className="text-center">
                    <LoadingIndicator />
                    <p className="mt-4 text-gray-400">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    return isAuthorized ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace />
    );
}

export default ProtectedRoute;