"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialOperations = [
  {
    id: "OP-2024-001",
    product: "Laptop Dell XPS 13",
    barcode: "7891234567890",
    status: "En Proceso",
    date: "2024-03-20",
    location: "Almacén Central",
  },
  {
    id: "OP-2024-002",
    product: "Monitor LG 27'",
    barcode: "7891234567891",
    status: "Completado",
    date: "2024-03-20",
    location: "Zona de Despacho",
  },
  {
    id: "OP-2024-003",
    product: "Teclado Mecánico",
    barcode: "7891234567892",
    status: "Pendiente",
    date: "2024-03-20",
    location: "Recepción",
  },
];

export function RecentOperations() {
  const [operations, setOperations] = useState(initialOperations);

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

  const updateStatus = (id: string, newStatus: string) => {
    setOperations(
      operations.map((op) =>
        op.id === id ? { ...op, status: newStatus } : op
      )
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Código de Barras</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operations.map((op) => (
            <TableRow key={op.id}>
              <TableCell>{op.id}</TableCell>
              <TableCell>{op.product}</TableCell>
              <TableCell>{op.barcode}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(op.status)}>
                  {op.status}
                </Badge>
              </TableCell>
              <TableCell>{op.date}</TableCell>
              <TableCell>{op.location}</TableCell>
              <TableCell>
                <Select
                  defaultValue={op.status}
                  onValueChange={(value) => updateStatus(op.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cambiar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}