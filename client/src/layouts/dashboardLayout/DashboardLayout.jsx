import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import './dashboardLayout.css'
import { useAuth } from "@clerk/clerk-react";
import ChatList from "../../components/chatList/ChatList";

const DashboardLayout = () => {
    const { userId, isLoaded } = useAuth(); //Chequeo si el user esta logeado
    const navigate = useNavigate();

    useEffect(() => {//Ruteos para usuarios no logeados y logeados
        if (isLoaded && !userId) {
            navigate("/sign-in");
        }
    }, [isLoaded, userId, navigate]);
    if (!isLoaded) return "Cargando...";//Fin de ruteos

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