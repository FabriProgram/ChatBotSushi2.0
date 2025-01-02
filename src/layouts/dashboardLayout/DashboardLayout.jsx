import { Outlet, useAuth, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './dashboardLayout.css'

const DashboardLayout = () => {
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in");
        }
    }, [isLoaded, userId, navigate]);
    if (!isLoaded) return "Cargando...";

    return (
        <div className="dashboardLayout">
            <div className="menu">MENU</div>
            <div className="content">
            <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout