import { Menubar } from 'primereact/menubar';
import './tenant-layout.css';
import { Card } from 'primereact/card';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import type { MembershipInfo } from '../../../features/auth/interfaces/AuthInterface';
import { useState } from 'react';

function MenuEnd(){
    const navigate = useNavigate();
    const tenants: MembershipInfo[] = JSON.parse(localStorage.getItem("tenants") || "[]");
    const [selectedTenant, setSelectedTenant] = useState(tenants[0]);

    function onSelectTenant(e: DropdownChangeEvent){
        console.log(e.value);
        setSelectedTenant(e.value);
        navigate(`/t/${selectedTenant.slug}/dashboard`);
    }

    return (
        <div>
            <Dropdown value={selectedTenant} onChange={onSelectTenant} options={tenants} optionLabel="tenantName" 
                placeholder="Select a Tenant" checkmark={true} highlightOnSelect={false} />
        </div>
    );
}

export default function TenantLayout(){
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    if (!token){
        navigate("/login");
    }

    const SIDE_MENU_ITEMS = [
        {
            label: "Dashboard",
            icon: "pi pi-home",
            command: () => navigate("/dashboard"),
        },
        {
            label: "User Management",
            icon: "pi pi-users",
            command: () => navigate("/users"),
        },
        {
            label: "Settings",
            icon: "pi pi-cog",
            command: () => navigate("/settings"),
        },
    ];

    return(
        <div className="tenant-layout-container">
            {/* Top Navbar */}
            <Menubar end={<MenuEnd />} />

            {/* Sidebar + Content */}
            <div className="tenant-layout-main">
                
                {/* Sidebar */}
                <aside className="tenant-layout-sidebar">
                    <Menu model={SIDE_MENU_ITEMS} />
                </aside>

                {/* Content */}
                <div className="tenant-layout-content">
                    <Card style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <div className="tenant-layout-outlet">
                        <Outlet />
                        </div>
                    </Card>
                </div>

            </div>

            {/* Footer */}
            <footer className="tenant-layout-footer">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    );
}