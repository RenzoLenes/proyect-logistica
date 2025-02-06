"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Ene", total: 1420 },
  { name: "Feb", total: 1620 },
  { name: "Mar", total: 1790 },
  { name: "Abr", total: 1890 },
  { name: "May", total: 2390 },
  { name: "Jun", total: 2490 },
];

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de Operaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}