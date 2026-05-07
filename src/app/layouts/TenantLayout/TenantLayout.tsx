import { Menubar } from 'primereact/menubar';
import './tenant-layout.css';
import { Card } from 'primereact/card';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import type { MembershipInfo } from '../../../features/auth/interfaces/AuthInterface';
import { useState } from 'react';
import { getCurrentTenantSlug } from '../../../shared/helpers/tenant';

function MenuEnd(){
    const navigate = useNavigate();
    const memberships: MembershipInfo[] = JSON.parse(localStorage.getItem("memberships") || "[]");
    const [selectedTenant, setSelectedTenant] = useState(memberships[0]);

    function onSelectTenant(e: DropdownChangeEvent){
        console.log(e.value);
        setSelectedTenant(e.value);
        navigate(`/t/${selectedTenant.slug}/dashboard`);
    }

    return (
        <div>
            <Dropdown value={selectedTenant} onChange={onSelectTenant} options={memberships} optionLabel="tenantName" 
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

    const tenantSlug = getCurrentTenantSlug();
    if (!tenantSlug){
        navigate("/login");
    }

    const SIDE_MENU_ITEMS = [
        {
            label: "Dashboard",
            icon: "pi pi-home",
            command: () => navigate(`t/${tenantSlug}/dashboard`),
        },
        {
            label: "User Management",
            icon: "pi pi-users",
            command: () => navigate(`t/${tenantSlug}/members`),
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