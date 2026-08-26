import { Navigate } from "react-router-dom";

export const IsAuthenticated = ({
    children,
    isAuthenticated,
}: {
    children: React.ReactNode;
    isAuthenticated: boolean;
}) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}