import type { Metadata } from "next"
import SalesDashboard from "@/components/sales-dashboard"

export const metadata: Metadata = {
  title: "Dashboard de Ventas",
  description: "Dashboard de estadísticas de ventas para promotoras",
}

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <SalesDashboard />
      </main>
    </div>
  )
}

