import { ShoppingBasket, Settings, User, Presentation } from "lucide-react";
import type { SidebarData } from "../types/sideBar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Menú',
      items: [
        {
          title: "Dashboard",
          url: "/estadisticas",
          icon: Presentation,
        },
        {
          title: "Mis productos",
          url: "/productos",
          icon: ShoppingBasket,
        },
      ],
    },
    {
      title: "Otros",
      items: [
        {
          title: "Ajustes",
          icon: Settings,
          items: [
            { title: "Cuenta", url: "/ajustes/cuenta", icon: User },
          ]
        }
      ]
    }
  ],
};
