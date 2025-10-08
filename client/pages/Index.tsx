import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import { useI18n } from "@/i18n";
import { AppShell } from "@/components/layout/AppSidebar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { SitesTable } from "@/components/dashboard/SitesTable";
import { useKpis, useStatusPie, useZonePie } from "@/hooks/useDashboard";
import { useState } from "react";

const STATUS_COLORS = ["#f43f5e", "#fb923c", "#22c55e", "#06b6d4", "#a3a3a3", "#8b5cf6"];
const ZONE_COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#22c55e", "#ef4444", "#0ea5e9"];

export default function Index() {
  const { t } = useI18n();
  const { data: kpis } = useKpis();
  const { data: statusData } = useStatusPie();
  const { data: zoneData } = useZonePie();
  const [showSitesOverview, setShowSitesOverview] = useState(false);

  const cards = [
    { key: "totalLitersToday", value: `${(kpis?.litersToday ?? 0).toFixed(2)} liters`, bg: "bg-rose-500" },
    { key: "totalLiters30", value: `${(kpis?.liters30d ?? 0).toFixed(2)} liters`, bg: "bg-sky-500" },
    { key: "activeMissions", value: String(kpis?.activeMissions ?? 0), bg: "bg-emerald-600" },
    { key: "activeDrivers", value: String(kpis?.activeDrivers ?? 0), bg: "bg-indigo-600" },
  ];

  return (
    <AppShell>
      <Header />
      <div className="px-4 pb-10 pt-4">
        <div className="mb-4 text-sm text-muted-foreground">{t("dashboard")}</div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((m) => (
            <Card key={m.key} className="overflow-hidden">
              <CardContent className={`${m.bg} p-4 text-white`}>
                <div className="text-sm/6 opacity-90">{t(m.key as any)}</div>
                <div className="mt-2 text-2xl font-semibold">{m.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="mb-3 text-base font-medium">{t("totalTasksStatusCount")}</div>
              <ChartContainer config={{}} className="aspect-[4/3]">
                <PieChart>
                  <Pie data={(statusData ?? []).map((d, i) => ({ ...d, color: STATUS_COLORS[i % STATUS_COLORS.length] }))} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {(statusData ?? []).map((_, i) => (
                      <Cell key={`s-${i}`} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-3 text-base font-medium">{t("totalTasksZonesCount")}</div>
              <ChartContainer config={{}} className="aspect-[4/3]">
                <PieChart>
                  <Pie data={(zoneData ?? []).map((d, i) => ({ ...d, color: ZONE_COLORS[i % ZONE_COLORS.length] }))} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {(zoneData ?? []).map((_, i) => (
                      <Cell key={`z-${i}`} fill={ZONE_COLORS[i % ZONE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex items-center">
          <button
            onClick={() => setShowSitesOverview((v) => !v)}
            className="inline-flex items-center rounded border px-3 py-1.5 text-sm hover:bg-muted"
          >
            {showSitesOverview ? t("hideSitesOverview") : t("showSitesOverview")}
          </button>
        </div>
        {showSitesOverview && (
          <div className="mt-4">
            <SitesTable sourceUrl="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0GkXnQMdKYZITuuMsAzeWDtGUqEJ3lWwqNdA67NewOsDOgqsZHKHECEEkea4nrukx4-DqxKmf62nC/pubhtml?gid=1149576218&single=true" />
          </div>
        )}
      </div>
    </AppShell>
  );
}
