import {
  Calendar,
  Users,
  DollarSign,
  Bell,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", bookings: 40 },
  { name: "Tue", bookings: 65 },
  { name: "Wed", bookings: 50 },
  { name: "Thu", bookings: 80 },
  { name: "Fri", bookings: 95 },
  { name: "Sat", bookings: 120 },
  { name: "Sun", bookings: 110 },
];
export default function Dashboard() {
  return (
    <div className="flex pt-5 min-h-screen bg-gray-950 text-white">

      {/* ---------------- MAIN ---------------- */}
      <main className="flex-1 space-y-6">

        {/* ---------------- CORE BUSINESS KPIs ---------------- */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard title="Total Revenue" value="$24,780" icon={<DollarSign />} />
          <KpiCard title="Monthly Revenue" value="$6,420" icon={<DollarSign />} />
          <KpiCard title="Total Bookings" value="1,248" icon={<Calendar />} />
          <KpiCard title="Total Customers" value="342" icon={<Users />} />
        </div>

        {/* ---------------- DAILY OPS KPIs ---------------- */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard title="Today Revenue" value="$1,240" icon={<DollarSign />} />
          <KpiCard title="Revenue Target" value="78%" icon={<DollarSign />} />
          <KpiCard title="New Bookings" value="32" icon={<Calendar />} />
          <KpiCard title="Cancellations" value="4" icon={<Bell />} />
        </div>

        {/* ---------------- STAFF KPIs ---------------- */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard title="Active Staff" value="14" icon={<Users />} />
          <KpiCard title="Top Performer" value="Lisa A." icon={<Users />} />
          <KpiCard title="Avg Rating" value="4.8" icon={<Users />} />
          <KpiCard title="Utilization" value="82%" icon={<Users />} />
        </div>

        {/* ---------------- CHART + APPOINTMENTS ---------------- */}
        <div className="grid grid-cols-3 gap-4">

          {/* CHART */}
          <div className="col-span-2 bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <h3 className="font-semibold mb-4">Bookings Overview</h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: "#6366f1" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* APPOINTMENTS */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <h3 className="font-semibold mb-4">Upcoming Appointments</h3>

            <div className="space-y-3 text-sm">
              <Appointment name="Sarah Johnson" time="10:00 AM" service="Haircut" />
              <Appointment name="Michael Brown" time="11:30 AM" service="Beard Trim" />
              <Appointment name="Emily Davis" time="01:00 PM" service="Color" />
            </div>
          </div>
        </div>

        {/* ---------------- BOTTOM GRID ---------------- */}
        <div className="grid grid-cols-3 gap-4">

          <BottomCard title="Top Services">
            <p>Haircut - 432</p>
            <p>Massage - 298</p>
            <p>Nails - 186</p>
          </BottomCard>

          <BottomCard title="Top Employees">
            <p>John Smith</p>
            <p>Lisa Anderson</p>
            <p>Robert Taylor</p>
          </BottomCard>

          <BottomCard title="Revenue Split">
            <p>Services 57%</p>
            <p>Products 25%</p>
            <p>Other 18%</p>
          </BottomCard>

        </div>

      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function NavItem({ icon, label, active = false }: any) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${active ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-800"
        }`}
    >
      {icon}
      {label}
    </div>
  );
}

function KpiCard({ title, value, icon }: any) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-xl font-bold">{value}</h3>
        </div>
        <div className="text-indigo-400">{icon}</div>
      </div>
    </div>
  );
}

function Appointment({ name, time, service }: any) {
  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <p className="font-semibold">{name}</p>
      <p className="text-xs text-gray-400">{service}</p>
      <p className="text-xs text-indigo-400">{time}</p>
    </div>
  );
}

function BottomCard({ title, children }: any) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="text-sm text-gray-300 space-y-1">{children}</div>
    </div>
  );
}
