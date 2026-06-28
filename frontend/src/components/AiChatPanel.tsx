import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useBookingStore } from "../store/bookingStore";

type Message = {
  role: "user" | "ai";
  text: string;
};

type BookingForm = {
  service: string;
  name: string;
  email: string;
  date: string;
  time: string;
};

const SERVICES = ["Haircut", "Massage", "Consultation", "Nails", "Spa"];

export default function AiChatPanel() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "form">("chat");

  const { addBooking, employees } = useBookingStore();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "💇 Book your haircut, massage, or spa appointment in seconds.",
    },
  ]);

  const [input, setInput] = useState("");

  const [form, setForm] = useState<BookingForm>({
    service: "",
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  const minDate = new Date().toISOString().split("T")[0];

  // ---------------- AUTO ASSIGN EMPLOYEE ----------------
  const assignEmployee = (service: string) => {
    const match = employees.find(
      (e) => e.role === service.toLowerCase() || e.role === "all"
    );
    return match || employees[0];
  };

  // ---------------- CHAT ----------------
  const sendMessage = () => {
    if (!input.trim()) return;

    const lower = input.toLowerCase();

    setMessages((p) => [...p, { role: "user", text: input }]);

    if (lower.includes("book")) {
      setMode("form");
      setMessages((p) => [
        ...p,
        {
          role: "ai",
          text: "📅 Fill the booking form: service, date, time, name.",
        },
      ]);
    } else {
      setMessages((p) => [
        ...p,
        {
          role: "ai",
          text: "I can help you book appointments or manage your schedule.",
        },
      ]);
    }

    setInput("");
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const e: Partial<BookingForm> = {};

    if (!form.service) e.service = "Select service";
    if (!form.name) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Invalid email";

    if (!form.date) {
      e.date = "Required";
    } else if (form.date < minDate) {
      e.date = "Must be future date";
    }

    if (!form.time) {
      e.time = "Required";
    } else {
      const [h] = form.time.split(":").map(Number);
      if (h < 7 || h > 19) e.time = "7:00 - 19:00 only";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const submitBooking = () => {
    if (!validate()) return;

    const employee = assignEmployee(form.service);

    addBooking({
      id: Date.now().toString(),
      service: form.service,
      employee: employee.name,
      employeeId: employee.id,
      date: form.date,
      time: form.time,
      status: "confirmed",
      createdAt: new Date().toISOString().split("T")[0],
    });

    setMessages((p) => [
      ...p,
      {
        role: "ai",
        text: `✅ Booked ${form.service} with ${employee.name} on ${form.date} at ${form.time}`,
      },
    ]);

    setForm({ service: "", name: "", email: "", date: "", time: "" });
    setMode("chat");
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] bg-indigo-600 text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-[560px] z-[9999] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col">
          
          {/* HEADER */}
          <div className="p-3 border-b border-gray-800">
            💇 Salon AI Booking Assistant
          </div>

          {/* MODE */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setMode("chat")}
              className={`flex-1 p-2 ${mode === "chat" ? "bg-indigo-600" : ""}`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("form")}
              className={`flex-1 p-2 ${mode === "form" ? "bg-indigo-600" : ""}`}
            >
              Book
            </button>
          </div>

          {/* CHAT */}
          {mode === "chat" && (
            <div className="flex-1 p-3 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className="text-sm mb-2">
                  {m.text}
                </div>
              ))}
            </div>
          )}

          {/* FORM */}
          {mode === "form" && (
            <div className="p-4 space-y-2 overflow-y-auto">

              <select
                value={form.service}
                onChange={(e) =>
                  setForm({ ...form, service: e.target.value })
                }
                className="w-full p-2 bg-gray-900"
              >
                <option value="">Service</option>
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full p-2 bg-gray-900"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full p-2 bg-gray-900"
              />

              <input
                type="date"
                min={minDate}
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full p-2 bg-gray-900"
              />

              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
                className="w-full p-2 bg-gray-900"
              />

              <button
                onClick={submitBooking}
                className="w-full bg-green-600 p-2"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
