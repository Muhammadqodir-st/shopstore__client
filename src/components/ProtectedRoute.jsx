// react rouetr dom
import { Navigate, replace } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Navigate to={'/auth/login'} replace />
    }


    return children;
}