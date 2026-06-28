// ai/assignEmployee.ts
import { Employee } from "../store/employeeStore";

export function assignEmployeeAI(
  employees: Employee[],
  service: string,
  bookings: any[]
): Employee | null {
  const active = employees.filter((e) => e.active);

  // 1. score employees by skill match
  const scored = active.map((emp) => {
    let score = 0;

    if (emp.skills.includes(service.toLowerCase())) score += 50;

    // 2. workload check (simple)
    const todayCount = bookings.filter(
      (b) => b.employee === emp.name
    ).length;

    score -= todayCount * 10;

    // 3. role preference
    if (service === "haircut" && emp.role === "barber") score += 20;

    return { emp, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored[0]?.emp || null;
}
