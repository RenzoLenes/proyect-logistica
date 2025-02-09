import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Search } from "lucide-react";
import Scanner from "../../components/dashboard/scanner";

export function ScanProduct() {
  const [barcode, setBarcode] = useState("");

  // Función que maneja la detección del código de barras
  const handleDetected = (result: any) => {
    if (result?.codeResult?.code) {
      const scannedCode = result.codeResult.code;
      setBarcode(scannedCode); // Almacena el código escaneado en el estado
    }
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
        {/* Componente del escáner */}
        <Scanner onDetected={handleDetected} />

        <div className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder="Escanee o ingrese el código de barras"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="flex-1"
          />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Escanee el código de barras del producto o ingréselo manualmente.
        </div>
      </CardContent>
    </Card>
  );
}
