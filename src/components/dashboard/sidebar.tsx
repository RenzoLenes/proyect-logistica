"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ArrowUpDown,
  Truck,
  Users,
  ChevronLeft,
} from "lucide-react";

export default function SideBar({
  isMobileOpen,
  toggleSidebar
}: {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname(); // Obtiene la ruta actual

  const navItems = [
    { label: "Dashboard", icon: <BarChart3 className="h-5 w-5" />, href: "/dashboard" },
    { label: "Inventario", icon: <Package className="h-5 w-5" />, href: "/inventory" },
    { label: "Operaciones", icon: <ArrowUpDown className="h-5 w-5" />, href: "/operation" },
    { label: "Equipo", icon: <Users className="h-5 w-5" />, href: "/group" },
  ];

  return (
    <>
      {/* Versión Desktop */}
      <div className="hidden lg:block fixed h-screen w-64 bg-background border-r p-6">
        <div className="flex items-center gap-3 mb-8">
          <Truck className="h-8 w-8 text-primary" />
          <h2 className="text-xl font-bold">LogiTrack</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-accent"}`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Versión Mobile */}
      <div className={`lg:hidden fixed h-screen w-16 bg-background border-r transform transition-transform z-40 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex flex-col items-center h-full">
          <button onClick={toggleSidebar} className="p-2 mb-8 rounded-lg hover:bg-accent">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <nav className="flex-1 flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`p-2 rounded-lg ${pathname === item.href ? "bg-accent" : "hover:bg-accent"}`}>
                {item.icon}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
