import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.js';
import api from '../lib/api.js';
import type { Appointment } from '../types/index.js';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[93dvh] bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-2">Role: <span className="font-semibold capitalize">{user?.role}</span></p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-bold text-blue-600">{appointments.length}</div>
            <p className="text-gray-600 mt-2">Your Appointments</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'SCHEDULED').length}
            </div>
            <p className="text-gray-600 mt-2">Scheduled</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-bold text-orange-600">
              {appointments.filter(a => a.status === 'COMPLETED').length}
            </div>
            <p className="text-gray-600 mt-2">Completed</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Your Appointments</h2>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No appointments yet.</p>
              <a href="/book" className="text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-block">
                Book your first appointment →
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Employee</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{apt.service.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{apt.employee.user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {new Date(apt.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                          apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
