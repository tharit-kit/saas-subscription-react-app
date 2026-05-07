import { Button } from "primereact/button";
import { Card } from "primereact/card";
import type { MenuItem } from "primereact/menuitem";
import { Outlet, useNavigate } from "react-router";
import './home-layout.css'
import Footer from "../Shared/components/Footer";
import Topbar from "../Shared/components/Topbar";

const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
];

function MenuEnd(){
    const navigate = useNavigate();

    function goToSignIn(){
        navigate('/login');
    }

    function goToSignUp(){
        navigate('/registration');
    }

    return (
        <div className="flex align-items-center gap-2">
            <Button label="Sign In" onClick={goToSignIn} link/>
            <Button label="Sign Up" onClick={goToSignUp} outlined/>
        </div>
    );
}

export default function HomeLayout() {
    return (
        <div className="home-layout">
            {/* Navbar */}
            <Topbar items={MENU_ITEMS} end={<MenuEnd />}></Topbar>

            {/* Content */}
            <div className="home-content">
                <Card className="home-card">
                    <div className="home-outlet">
                        <Outlet />
                    </div>
                </Card>
            </div>

            {/* Footer */}
            <Footer></Footer>
        </div>
    );
}