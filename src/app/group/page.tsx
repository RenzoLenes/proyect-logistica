"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Search, Users, UserPlus, Activity } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SideBar from "@/components/dashboard/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamData = [
  {
    id: "USR001",
    name: "Juan Pérez",
    role: "Operador",
    email: "juan@logitrack.com",
    status: "Activo",
    operations: 145,
    lastActive: "Hace 5 minutos",
  },
  {
    id: "USR002",
    name: "María García",
    role: "Supervisor",
    email: "maria@logitrack.com",
    status: "Activo",
    operations: 89,
    lastActive: "Hace 15 minutos",
  },
  {
    id: "USR003",
    name: "Carlos López",
    role: "Operador",
    email: "carlos@logitrack.com",
    status: "Inactivo",
    operations: 56,
    lastActive: "Hace 2 horas",
  },
];

export default function GroupPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-500/10 text-green-500";
      case "Inactivo":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Supervisor":
        return "bg-blue-500/10 text-blue-500";
      case "Operador":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Filtrar miembros basado en el término de búsqueda
  const filteredMembers = teamData.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <SideBar isMobileOpen={isMobileOpen} toggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />

      <div className="flex-1 p-8 lg:ml-64">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Equipo</h1>
                <p className="text-muted-foreground">
                  Gestión de personal y roles
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Miembros
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  18 activos ahora
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Operaciones Hoy
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  Por 12 miembros
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Eficiencia Promedio
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar miembro..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Agregar Miembro
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Miembro</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Operaciones</TableHead>
                    <TableHead>Última Actividad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.operations}</TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
