import SettingsTemplate, { SidebarNavItem } from "@/components/templates/settings/SettingsTemplate"
import {User  } from "lucide-react"

const sidebarNavItems: SidebarNavItem[] = [
    {
        title: 'Cuenta',
        icon: <User size={18} />,
        href: '/ajustes/cuenta',
    },
    
    
]

export default function SettingsScreen() {
    return <SettingsTemplate sidebarNavItems={sidebarNavItems} />
}
