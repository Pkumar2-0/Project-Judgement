import React from "react";
import { FaRobot } from "react-icons/fa";

export default function DroneList({ droneIds, selectedDrone, setSelectedDrone, error }) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center border border-blue-100 transition-transform hover:scale-[1.02] hover:shadow-2xl duration-200">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <FaRobot className="text-blue-500 text-2xl" />
        <label className="font-semibold text-lg text-blue-700">Select Drone</label>
      </div>
      <div className="w-full border-b border-blue-100 mb-6"></div>
      <div className="relative w-full flex flex-col items-center gap-3">
        <select
          className="appearance-none w-full bg-blue-50 border-2 border-blue-200 hover:border-blue-400 focus:border-blue-500 rounded-lg px-4 py-3 pr-10 text-base shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-100"
          value={selectedDrone}
          onChange={e => setSelectedDrone(e.target.value)}
        >
          {droneIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-blue-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </div>
      {error && <div className="text-red-500 text-center mt-3 font-medium">{error}</div>}
    </div>
  );
} 