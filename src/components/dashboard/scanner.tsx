import { useEffect, useRef } from "react";
import Quagga from "quagga-scanner";

interface ScannerProps {
  onDetected: (result: any) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 320,
            facingMode: "environment", // Cámara trasera
          },
          target: scannerRef.current,
        },
        locator: {
          halfSample: true,   // Usar muestreo a la mitad para mejorar la precisión
          patchSize: "large", // Configura el tamaño de la zona de escaneo
          debug: {
            showCanvas: true, // Mostrar el lienzo de depuración para ver el proceso
            showPatches: true, // Mostrar las parches del escaneo
            showFoundPatches: true, // Mostrar los parches encontrados
          },
        },
        
        numOfWorkers: 2,
        decoder: {
          readers: [
            "code_128_reader", // Código de barras estándar
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("❌ Error al inicializar Quagga:", err);
          return;
        }
        console.log("✅ Quagga inicializado correctamente");
        Quagga.start();
      }
    );

    // Llamada para manejar la detección del código
    Quagga.onDetected((result: any) => {
      const { codeResult } = result;
      if (codeResult?.code) {
        onDetected(result); // Enviar el resultado al componente padre
      }
    });

    return () => {
      Quagga.stop();
      Quagga.offDetected(onDetected);
    };
  }, [onDetected]);

  return (
    <div
      ref={scannerRef}
      className="viewport w-full h-[320px] border-2 border-dashed border-blue-500 relative overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Overlay de escaneo */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Marco de enfoque */}
        <div 
          className="border-2 border-red-500 bg-opacity-20 relative"
          style={{
            width: "80%",
            height: "60%",
            boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.5)",
            pointerEvents: "none"
          }}
        >
          {/* Líneas decorativas en las esquinas */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-red-500" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-r-2 border-t-2 border-red-500" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-2 border-b-2 border-red-500" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-red-500" />
        </div>
      </div>

      {/* Texto de instrucción */}
      <div 
        className="absolute bottom-4 left-0 w-full text-center text-white text-sm"
        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
      >
        Encuadre el código de barras dentro del área marcada
      </div>
    </div>
  );
};
export default Scanner;
