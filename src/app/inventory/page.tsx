"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Package, Search, AlertCircle } from "lucide-react";
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

const inventoryData = [
  {
    id: "INV001",
    name: "Laptop Dell XPS 13",
    sku: "LAP-DELL-001",
    quantity: 15,
    location: "A-123",
    status: "En Stock",
    lastUpdated: "2024-03-20",
  },
  {
    id: "INV002",
    name: "Monitor LG 27'",
    sku: "MON-LG-001",
    quantity: 8,
    location: "B-234",
    status: "Bajo Stock",
    lastUpdated: "2024-03-19",
  },
  {
    id: "INV003",
    name: "Teclado Mecánico",
    sku: "TEC-MEC-001",
    quantity: 0,
    location: "C-345",
    status: "Sin Stock",
    lastUpdated: "2024-03-18",
  },
];

export default function InventoryPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Stock":
        return "bg-green-500/10 text-green-500";
      case "Bajo Stock":
        return "bg-yellow-500/10 text-yellow-500";
      case "Sin Stock":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Filtrar los datos en base al término de búsqueda
  const filteredData = inventoryData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
                <h1 className="text-3xl font-bold">Inventario</h1>
                <p className="text-muted-foreground">
                  Gestión y control de productos
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Productos
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  23 productos bajo stock
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Valor Total
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,678</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% respecto al mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ubicaciones
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  3 ubicaciones llenas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, SKU o ubicación..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                Agregar Producto
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Actualización</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
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
