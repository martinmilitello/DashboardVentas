import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FilterPanel() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="grid gap-2">
            <Label htmlFor="zone">Zona</Label>
            <Select defaultValue="all">
              <SelectTrigger id="zone">
                <SelectValue placeholder="Todas las zonas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las zonas</SelectItem>
                <SelectItem value="norte">Norte</SelectItem>
                <SelectItem value="sur">Sur</SelectItem>
                <SelectItem value="este">Este</SelectItem>
                <SelectItem value="oeste">Oeste</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="section">Sección</Label>
            <Select defaultValue="all">
              <SelectTrigger id="section">
                <SelectValue placeholder="Todas las secciones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las secciones</SelectItem>
                <SelectItem value="a1">A1</SelectItem>
                <SelectItem value="a2">A2</SelectItem>
                <SelectItem value="b1">B1</SelectItem>
                <SelectItem value="b2">B2</SelectItem>
                <SelectItem value="c1">C1</SelectItem>
                <SelectItem value="c2">C2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="min-units">Unidades mínimas</Label>
            <Input id="min-units" type="number" placeholder="0" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="max-debt">Deuda máxima</Label>
            <Input id="max-debt" type="number" placeholder="Sin límite" />
          </div>

          <div className="grid gap-2">
            <Label>Estado de caja</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-boxes" />
                <Label htmlFor="all-boxes">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disassembly" id="disassembly" />
                <Label htmlFor="disassembly">En desarme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deposit" id="deposit" />
                <Label htmlFor="deposit">En depósito</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label>Estado de pedido</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-orders" />
                <Label htmlFor="all-orders">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="with-order" id="with-order" />
                <Label htmlFor="with-order">Con pedido</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="without-order" id="without-order" />
                <Label htmlFor="without-order">Sin pedido</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline">Limpiar filtros</Button>
          <Button>Aplicar filtros</Button>
        </div>
      </CardContent>
    </Card>
  )
}

