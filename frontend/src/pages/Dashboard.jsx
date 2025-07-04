import { useEffect, useState } from "react";
import axios from "axios";
import DroneList from "../components/DroneList";

export default function Dashboard() {
  const [droneIds, setDroneIds] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState("");
  const [telemetry, setTelemetry] = useState(null);
  const [error, setError] = useState("");

  // Get JWT token from localStorage
  const token = localStorage.getItem("pj_token");

  useEffect(() => {
    // Fetch all drone IDs from the backend
    async function fetchDroneIds() {
      try {
        const res = await axios.get("/api/telemetry/drone-ids", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDroneIds(res.data);
        if (res.data.length > 0) setSelectedDrone(res.data[0]);
      } catch (err) {
        setError("Failed to fetch drone IDs");
      }
    }
    fetchDroneIds();
  }, []);

  useEffect(() => {
    if (!selectedDrone) return;
    // Fetch telemetry data for selected drone
    async function fetchTelemetry() {
      try {
        const res = await axios.get(`/api/telemetry/${selectedDrone}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTelemetry(res.data);
        setError("");
      } catch (err) {
        setTelemetry(null);
        setError(
          err.response?.data?.error || "Failed to fetch telemetry data"
        );
      }
    }
    fetchTelemetry();
  }, [selectedDrone]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-left text-blue-800 drop-shadow">Dashboard</h2>
        {/* Drone's List */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-blue-100 flex flex-col gap-8">
            <h3 className="text-2xl font-semibold text-blue-700 text-center mb-8">Drone's List</h3>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <DroneList
                  droneIds={droneIds}
                  selectedDrone={selectedDrone}
                  setSelectedDrone={setSelectedDrone}
                  error={error && droneIds.length > 0 ? error : ""}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center">
                {telemetry && (
                  <div className="w-full">
                    <h4 className="text-lg font-semibold mb-4 text-blue-600 text-center">Latest Telemetry</h4>
                    <div className="grid grid-cols-1 gap-3 px-2">
                      <div><span className="font-medium">Drone ID:</span> {telemetry.droneId}</div>
                      <div><span className="font-medium">GPS:</span> {telemetry.gps}</div>
                      <div><span className="font-medium">Altitude:</span> {telemetry.altitude} m</div>
                      <div><span className="font-medium">Speed:</span> {telemetry.speed} km/h</div>
                      <div><span className="font-medium">Battery:</span> {telemetry.battery}%</div>
                      <div><span className="font-medium">Timestamp:</span> {new Date(telemetry.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 