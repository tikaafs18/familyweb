import React from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../Components/UserTable";

const DashboardPage = () => {
    const navigate = useNavigate();

    return <div className="dashboard">
        <UserTable />
        <button id="btnadd" onClick={() => navigate('/add')}>Add Data</button>
    </div>
}

export default DashboardPage;