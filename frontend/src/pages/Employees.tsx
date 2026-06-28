import { useState } from "react";
import { useBookingStore, Employee } from "../store/bookingStore";
import { Plus, Trash2, Edit2, X } from "lucide-react";

const ROLES = ["haircut", "massage", "nails", "spa", "all"] as const;

export default function Employees() {
    const { employees, addEmployee } = useBookingStore();

    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState<Employee | null>(null);

    const [form, setForm] = useState({
        name: "",
        role: "haircut",
        active: true,
    });

    // ---------------- RESET FORM ----------------
    const reset = () => {
        setForm({ name: "", role: "haircut", active: true });
        setEditMode(null);
    };

    // ---------------- CREATE ----------------
    const handleCreate = () => {
        if (!form.name.trim()) return;

        const newEmployee: Employee = {
            id: Date.now().toString(),
            name: form.name,
            role: form.role as Employee["role"],
            active: form.active,
        };

        addEmployee(newEmployee);
        reset();
        setOpen(false);
    };

    // ---------------- UPDATE ----------------
    const handleUpdate = () => {
        if (!editMode) return;

        const updated = employees.map((e) =>
            e.id === editMode.id
                ? {
                    ...e,
                    name: form.name,
                    role: form.role as Employee["role"],
                    active: form.active,
                }
                : e
        );

        useBookingStore.setState({ employees: updated });

        reset();
        setOpen(false);
    };

    // ---------------- DELETE ----------------
    const handleDelete = (id: string) => {
        const filtered = employees.filter((e) => e.id !== id);
        useBookingStore.setState({ employees: filtered });
    };

    // ---------------- EDIT OPEN ----------------
    const startEdit = (emp: Employee) => {
        setEditMode(emp);
        setForm({
            name: emp.name,
            role: emp.role,
            active: emp.active,
        });
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Employees</h1>

                <button
                    onClick={() => {
                        reset();
                        setOpen(true);
                    }}
                    className="bg-indigo-600 px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus size={16} /> Add Employee
                </button>
            </div>

            {/* LIST */}
            <div className="flex flex-col gap-4">
                {employees.map((emp) => (
                    <div
                        key={emp.id}
                        className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex justify-between items-center"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-semibold text-lg">{emp.name}</h2>
                                <p className="text-sm text-gray-400 capitalize">
                                    {emp.role}
                                </p>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => startEdit(emp)}
                                className="bg-blue-600 px-2 py-1 rounded text-xs flex items-center gap-1"
                            >
                                <Edit2 size={14} /> Edit
                            </button>

                            <button
                                onClick={() => handleDelete(emp.id)}
                                className="bg-red-600 px-2 py-1 rounded text-xs flex items-center gap-1"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
                    <div className="bg-gray-900 w-[400px] p-6 rounded-lg border border-gray-800">
                        {/* HEADER */}
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold">
                                {editMode ? "Edit Employee" : "Add Employee"}
                            </h2>

                            <button onClick={() => setOpen(false)}>
                                <X />
                            </button>
                        </div>

                        {/* NAME */}
                        <input
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full p-2 bg-gray-800 rounded mb-3"
                        />

                        {/* ROLE */}
                        <select
                            value={form.role}
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                            className="w-full p-2 bg-gray-800 rounded mb-3"
                        >
                            {ROLES.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>

                        {/* ACTIVE */}
                        <label className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(e) =>
                                    setForm({ ...form, active: e.target.checked })
                                }
                            />
                            Active
                        </label>

                        {/* SAVE */}
                        <button
                            onClick={editMode ? handleUpdate : handleCreate}
                            className="w-full bg-green-600 p-2 rounded"
                        >
                            {editMode ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
