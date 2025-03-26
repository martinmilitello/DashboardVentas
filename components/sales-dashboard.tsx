"use client"

import { useState } from "react"
import { ArrowDown, Calendar, Download, Filter, HelpCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

// Sample data - replace with actual data from your API/database
const resellers = [
  {
    id: "2468171",
    name: "Escobar Patricia Nelida",
    address: "JOSE IGLESIAS 2285, CHAJARI - Entre Rios",
    phone: "3456550669",
    birthDate: "27/09/1976",
    section: "08A",
    zone: "201",
    debt: 53000,
    debtCampaign: "202417",
    campaigns: {
      "202318": { totalUnits: 45, totalCosme: 30, totalExtra: 15, totalDebt: 0, boxDisassembly: 1, boxDeposit: 0 },
      "202502": { totalUnits: 52, totalCosme: 35, totalExtra: 17, totalDebt: 150, boxDisassembly: 0, boxDeposit: 1 },
      "202503": { totalUnits: 38, totalCosme: 25, totalExtra: 13, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
      "202504": { totalUnits: 0, totalCosme: 0, totalExtra: 0, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
      "202505": { totalUnits: 0, totalCosme: 0, totalExtra: 0, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
    },
  },
  {
    id: "2468172",
    name: "Gómez María Fernanda",
    address: "AV. LIBERTAD 1234, CONCORDIA - Entre Rios",
    phone: "3458765432",
    birthDate: "15/03/1982",
    section: "08A",
    zone: "201",
    debt: 0,
    debtCampaign: "",
    campaigns: {
      "202318": { totalUnits: 12, totalCosme: 8, totalExtra: 4, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
      "202502": { totalUnits: 15, totalCosme: 10, totalExtra: 5, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
      "202503": { totalUnits: 0, totalCosme: 0, totalExtra: 0, totalDebt: 200, boxDisassembly: 0, boxDeposit: 1 },
      "202504": { totalUnits: 20, totalCosme: 15, totalExtra: 5, totalDebt: 0, boxDisassembly: 1, boxDeposit: 0 },
      "202505": { totalUnits: 22, totalCosme: 16, totalExtra: 6, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
    },
  },
  {
    id: "2468173",
    name: "Rodríguez Ana Laura",
    address: "BELGRANO 567, FEDERACIÓN - Entre Rios",
    phone: "3454321098",
    birthDate: "08/11/1990",
    section: "09A",
    zone: "201",
    debt: 25000,
    debtCampaign: "202503",
    campaigns: {
      "202318": { totalUnits: 30, totalCosme: 20, totalExtra: 10, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
      "202502": { totalUnits: 0, totalCosme: 0, totalExtra: 0, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
      "202503": { totalUnits: 0, totalCosme: 0, totalExtra: 0, totalDebt: 25000, boxDisassembly: 0, boxDeposit: 1 },
      "202504": { totalUnits: 0, totalCosme: 0, totalExtra: 0, totalDebt: 25000, boxDisassembly: 0, boxDeposit: 0 },
      "202505": { totalUnits: 8, totalCosme: 5, totalExtra: 3, totalDebt: 0, boxDisassembly: 0, boxDeposit: 0 },
    },
  },
]

// All available campaigns
const allCampaigns = ["202318", "202502", "202503", "202504", "202505"]

// Available zones
const zones = ["201", "202", "203", "204", "205"]

// Available sections
const sections = ["08A", "08B", "09A", "09B", "10A"]

export default function SalesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedZone, setSelectedZone] = useState("201")
  const [selectedSection, setSelectedSection] = useState("08A")
  const [selectedCampaign, setSelectedCampaign] = useState("202503")
  const [filterType, setFilterType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [unitRange, setUnitRange] = useState([0, 100])
  const [displayData, setDisplayData] = useState(resellers)

  // Filter resellers based on search term, zone and section
  const handleSearch = () => {
    let filtered = resellers.filter(
      (reseller) =>
        (searchTerm === "" || reseller.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedZone === "" || reseller.zone === selectedZone) &&
        (selectedSection === "" || reseller.section === selectedSection),
    )

    // Apply additional filters based on selected campaign
    if (filterType !== "all") {
      filtered = filtered.filter((reseller) => {
        const campaignData = reseller.campaigns[selectedCampaign]
        if (!campaignData) return false

        switch (filterType) {
          case "withDebt":
            return campaignData.totalDebt > 0
          case "noOrders":
            return campaignData.totalUnits === 0
          case "withBoxDeposit":
            return campaignData.boxDeposit > 0
          case "withBoxDisassembly":
            return campaignData.boxDisassembly > 0
          case "unitRange":
            return campaignData.totalUnits >= unitRange[0] && campaignData.totalUnits <= unitRange[1]
          default:
            return true
        }
      })
    }

    setDisplayData(filtered)
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Zone filter */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="zone" className="text-sm font-medium">
              Zona
            </label>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger id="zone" className="bg-muted/50">
                <SelectValue placeholder="Zona" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Section filter */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="section" className="text-sm font-medium">
              Sección
            </label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger id="section" className="bg-muted/50">
                <SelectValue placeholder="Sección" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Name search */}
        <div className="md:col-span-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              id="name"
              placeholder="Buscar por nombre..."
              className="bg-muted/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden md:col-span-1 md:block"></div>

        {/* Action buttons */}
        <div className="flex items-end justify-end gap-2 md:col-span-3">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant={showFilters ? "secondary" : "outline"} onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            AÑADIR FILTRO
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            EXPORTAR
          </Button>
        </div>
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="campaign-filter">Campaña para filtrar</Label>
                <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                  <SelectTrigger id="campaign-filter">
                    <SelectValue placeholder="Seleccionar campaña" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCampaigns.map((campaign) => (
                      <SelectItem key={campaign} value={campaign}>
                        {campaign}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-5">
                <Label>Tipo de filtro</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-all"
                      checked={filterType === "all"}
                      onCheckedChange={() => setFilterType("all")}
                    />
                    <label htmlFor="filter-all" className="text-sm font-medium">
                      Todos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-debt"
                      checked={filterType === "withDebt"}
                      onCheckedChange={() => setFilterType("withDebt")}
                    />
                    <label htmlFor="filter-debt" className="text-sm font-medium">
                      Con deuda
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-no-orders"
                      checked={filterType === "noOrders"}
                      onCheckedChange={() => setFilterType("noOrders")}
                    />
                    <label htmlFor="filter-no-orders" className="text-sm font-medium">
                      Sin pedido
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-box-deposit"
                      checked={filterType === "withBoxDeposit"}
                      onCheckedChange={() => setFilterType("withBoxDeposit")}
                    />
                    <label htmlFor="filter-box-deposit" className="text-sm font-medium">
                      Cajas en depósito
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-box-disassembly"
                      checked={filterType === "withBoxDisassembly"}
                      onCheckedChange={() => setFilterType("withBoxDisassembly")}
                    />
                    <label htmlFor="filter-box-disassembly" className="text-sm font-medium">
                      Cajas en desarme
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-unit-range"
                      checked={filterType === "unitRange"}
                      onCheckedChange={() => setFilterType("unitRange")}
                    />
                    <label htmlFor="filter-unit-range" className="text-sm font-medium">
                      Rango unidades
                    </label>
                  </div>
                </div>
              </div>

              {filterType === "unitRange" && (
                <div className="space-y-2 md:col-span-2">
                  <Label>
                    Unidades: {unitRange[0]} - {unitRange[1]}
                  </Label>
                  <Slider defaultValue={unitRange} max={100} step={1} onValueChange={setUnitRange} className="py-4" />
                </div>
              )}

              <div className="flex items-end justify-end md:col-span-2">
                <Button onClick={handleSearch}>Aplicar filtros</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="min-w-[200px]">
                    <div className="flex items-center gap-1">
                      Número de cuenta
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Sección</TableHead>
                  {allCampaigns.map((campaign) => (
                    <TableHead key={campaign} className="text-center">
                      {campaign}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No se encontraron resultados.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayData.map((reseller) => (
                    <TableRow key={reseller.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <div className="font-bold">
                            {reseller.id} - {reseller.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{reseller.address}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" /> {reseller.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" /> {reseller.birthDate}
                          </div>
                          {reseller.debt > 0 && (
                            <div className="text-sm font-medium text-red-500">
                              Deuda: ${reseller.debt.toLocaleString()} ({reseller.debtCampaign})
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{reseller.section}</TableCell>

                      {/* Campaign data cells with mini-boxes */}
                      {allCampaigns.map((campaign) => {
                        const campaignData = reseller.campaigns[campaign]

                        // Skip rendering if no data
                        if (!campaignData) return <TableCell key={campaign}></TableCell>

                        // Determine if we need to show any indicators
                        const hasDebt = campaignData.totalDebt > 0
                        const hasNoOrders = campaignData.totalUnits === 0
                        const hasBoxDeposit = campaignData.boxDeposit > 0
                        const hasBoxDisassembly = campaignData.boxDisassembly > 0

                        return (
                          <TableCell key={campaign} className="p-1">
                            <div
                              className={`rounded-md border p-2 ${hasDebt ? "border-red-200 bg-red-50" : hasBoxDeposit ? "border-blue-200 bg-blue-50" : hasBoxDisassembly ? "border-amber-200 bg-amber-50" : hasNoOrders ? "border-gray-200 bg-gray-50" : "border-green-200 bg-green-50"}`}
                            >
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <div className="col-span-2 text-center">
                                  <span className="font-bold text-gray-700">
                                    {hasNoOrders ? "-" : campaignData.totalUnits}
                                  </span>
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-500">Cosme</span>
                                  <span className="font-medium">{campaignData.totalCosme}</span>
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-500">Extra</span>
                                  <span className="font-medium">{campaignData.totalExtra}</span>
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-500">Deuda</span>
                                  <span className={`font-medium ${hasDebt ? "text-red-600" : ""}`}>
                                    {hasDebt ? `$${campaignData.totalDebt}` : "-"}
                                  </span>
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-500">Cajas</span>
                                  <div className="flex gap-1">
                                    {hasBoxDisassembly && (
                                      <Badge variant="outline" className="h-3 px-1 text-[9px]">
                                        D
                                      </Badge>
                                    )}
                                    {hasBoxDeposit && (
                                      <Badge variant="secondary" className="h-3 px-1 text-[9px]">
                                        P
                                      </Badge>
                                    )}
                                    {!hasBoxDisassembly && !hasBoxDeposit && "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm border-red-200 bg-red-50"></div>
          <span>Con deuda</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm border-blue-200 bg-blue-50"></div>
          <span>Caja en depósito</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm border-amber-200 bg-amber-50"></div>
          <span>Caja en desarme</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm border-gray-200 bg-gray-50"></div>
          <span>Sin pedido</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm border-green-200 bg-green-50"></div>
          <span>Con pedido</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="h-3 px-1 text-[9px]">
            D
          </Badge>
          <span>Desarme</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="secondary" className="h-3 px-1 text-[9px]">
            P
          </Badge>
          <span>Depósito</span>
        </div>
      </div>
    </div>
  )
}

