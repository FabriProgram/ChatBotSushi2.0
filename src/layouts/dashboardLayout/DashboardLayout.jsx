import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import './dashboardLayout.css'
import { useAuth } from "@clerk/clerk-react";
import ChatList from "../../components/chatList/ChatList";

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
            <div className="menu"><ChatList /></div>
            <div className="content">
            <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout