import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function EvaluatorRoutes() {
    const { user } = useAuthContext()
    console.log("user", user)
    if (!user) {
        return <Navigate to="/auth" />;
    }

    if (user?.type === "OPERATOR" || user?.type === "ADMIN") {
        return <Outlet />
    }

    return <Navigate to="/no-autorizado" />
}
