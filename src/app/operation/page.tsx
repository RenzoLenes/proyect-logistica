"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Search, ArrowUpDown, Clock, CheckCircle2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const operationsData = [
  {
    id: "OP001",
    type: "Entrada",
    product: "Laptop Dell XPS 13",
    quantity: 10,
    status: "Completado",
    operator: "Juan Pérez",
    date: "2024-03-20",
  },
  {
    id: "OP002",
    type: "Salida",
    product: "Monitor LG 27'",
    quantity: 5,
    status: "En Proceso",
    operator: "María García",
    date: "2024-03-20",
  },
  {
    id: "OP003",
    type: "Traslado",
    product: "Teclado Mecánico",
    quantity: 15,
    status: "Pendiente",
    operator: "Carlos López",
    date: "2024-03-19",
  },
];

export default function OperationPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-500/10 text-green-500";
      case "En Proceso":
        return "bg-blue-500/10 text-blue-500";
      case "Pendiente":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entrada":
        return "bg-emerald-500/10 text-emerald-500";
      case "Salida":
        return "bg-red-500/10 text-red-500";
      case "Traslado":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

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
                <h1 className="text-3xl font-bold">Operaciones</h1>
                <p className="text-muted-foreground">
                  Control de movimientos y transacciones
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Operaciones Hoy
                </CardTitle>
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  +12 desde ayer
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  En Proceso
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  4 retrasadas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completadas
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  Esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="in-progress">En Proceso</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar operación..."
                    className="pl-10 w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  Nueva Operación
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Operador</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operationsData.filter(op =>
                      op.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      op.operator.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((op) => (
                      <TableRow key={op.id}>
                        <TableCell>{op.id}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(op.type)}>
                            {op.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{op.product}</TableCell>
                        <TableCell>{op.quantity}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(op.status)}>
                            {op.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{op.operator}</TableCell>
                        <TableCell>{op.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
