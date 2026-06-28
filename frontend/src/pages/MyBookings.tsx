import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";
import { Calendar, Clock, User, Trash2, Edit2, Plus, AlertCircle } from "lucide-react";
import { useBookingStore, Booking } from "../store/bookingStore.js";

export default function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // ✅ GLOBAL STORE (single source of truth)
  const bookings = useBookingStore((s) => s.bookings);
  const setBookings = useBookingStore((s) => s.setBookings);
  const updateBooking = useBookingStore((s) => s.updateBooking);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Booking | null>(null);

  // -----------------------------
  // INIT MOCK DATA (MVP ONLY)
  // -----------------------------
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const mockBookings: Booking[] = [
        {
          id: "1",
          service: "Haircut",
          employee: "John",
          date: "2026-07-05",
          time: "10:00",
          status: "confirmed",
          createdAt: "2026-06-24",
        },
        {
          id: "2",
          service: "Massage",
          employee: "Anna",
          date: "2026-06-26",
          time: "14:00",
          status: "confirmed",
          createdAt: "2026-06-20",
        },
        {
          id: "3",
          service: "Consultation",
          employee: "Mike",
          date: "2026-06-15",
          time: "09:00",
          status: "completed",
          createdAt: "2026-06-10",
        },
        {
          id: "4",
          service: "Haircut",
          employee: "John",
          date: "2026-06-01",
          time: "11:00",
          status: "cancelled",
          createdAt: "2026-05-28",
        },
      ];

      await new Promise((r) => setTimeout(r, 500));

      // ✅ store becomes source of truth
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const getFilteredBookings = () => {
    const now = new Date();

    return bookings.filter((b) => {
      if (filter === "all") return true;

      if (filter === "upcoming") {
        return new Date(b.date) > now && b.status === "confirmed";
      }

      if (filter === "completed") return b.status === "completed";
      if (filter === "cancelled") return b.status === "cancelled";

      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  // -----------------------------
  // HELPERS
  // -----------------------------
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fi-FI", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // -----------------------------
  // ACTIONS (STORE-BASED)
  // -----------------------------
  const handleCancelBooking = (id: string) => {
    updateBooking(id, { status: "cancelled" });
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  const handleReschedule = () => {
    if (!editForm) return;

    updateBooking(editForm.id, {
      date: editForm.date,
      time: editForm.time,
    });

    setShowEditModal(false);
    setEditForm(null);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-950 pt-5 pb-20 px-4 text-white">
      <div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-400">Manage and track your appointments</p>
        </div>

        {/* Action */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/book")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            <Plus size={20} />
            New Booking
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            {["all", "upcoming", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
                  }`}
              >
                {tab}
                <span className="ml-2 text-xs">
                  ({filteredBookings.length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400">Loading bookings...</div>
        )}

        {/* Empty */}
        {!loading && filteredBookings.length === 0 && (
          <div className="text-center text-gray-400">
            No bookings found
          </div>
        )}

        {/* List */}
        {!loading && filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-4"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{booking.service}</h3>
                <p className="text-sm text-gray-400">#{booking.id}</p>

                <div className="mt-3 text-sm text-gray-300 space-y-1">
                  <p>📅 {formatDate(booking.date)}</p>
                  <p>⏰ {booking.time}</p>
                  <p>👤 {booking.employee}</p>
                </div>
              </div>

              <span
                className={`inline-flex items-center justify-center px-2 py-0 text-xs leading-none rounded h-8 ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            {/* Actions */}
            {booking.status === "confirmed" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditForm(booking);
                    requestAnimationFrame(() => setShowEditModal(true));
                  }}
                  className="bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  Reschedule
                </button>

                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowCancelModal(true);
                  }}
                  className="bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-red-600" />
              <h3 className="text-2xl font-bold text-gray-900">Cancel Booking?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your {selectedBooking.service} appointment on{" "}
              <strong>{formatDate(selectedBooking.date)}</strong> at <strong>{selectedBooking.time}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(selectedBooking.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Reschedule Booking</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Date
                </label>
                <input
                  type="date"
                  value={editForm?.date || ""}
                  onChange={(e) =>
                    setEditForm((prev) =>
                      prev ? { ...prev, date: e.target.value } : prev
                    )
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Time
                </label>
                <select
                  value={editForm?.time || ""}
                  onChange={(e) =>
                    setEditForm((prev) =>
                      prev ? { ...prev, time: e.target.value } : prev
                    )
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

