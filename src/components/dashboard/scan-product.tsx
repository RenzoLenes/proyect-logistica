"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Search } from "lucide-react";

export function ScanProduct() {
  const [barcode, setBarcode] = useState("");

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de procesamiento del código de barras
    alert(`Código de barras escaneado: ${barcode}`);
    setBarcode("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Barcode className="h-5 w-5" />
          Escanear Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleScan} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Escanee o ingrese el código de barras"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Escanee el código de barras del producto o ingréselo manualmente para actualizar su estado en el sistema.
          </div>
        </form>
      </CardContent>
    </Card>
  );
}