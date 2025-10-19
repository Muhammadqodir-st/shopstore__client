// react rouetr dom
import { Navigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// loading
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useSelector((state) => state?.user);

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={'/auth/login'} replace />
    }

    return children;
}