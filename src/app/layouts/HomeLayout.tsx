import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";    
import type { MenuItem } from "primereact/menuitem";
import { Outlet } from "react-router";

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
    return (
        <div className="flex align-items-center gap-2">
            <Button label="Sign In" link/>
            <Button label="Sign Up" outlined/>
        </div>
    );
}

export default function HomeLayout() {
    return (
        <div>
            <Menubar model={MENU_ITEMS} end={<MenuEnd />}/>
            <Outlet />
        </div>
    );
}