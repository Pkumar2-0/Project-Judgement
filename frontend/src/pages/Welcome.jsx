import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to Judgement</h1>
      <p className="mb-2 text-gray-700 text-lg text-center font-semibold max-w-xl">
        Autonomous Defense Drone Platform
      </p>
      <p className="mb-8 text-gray-600 text-lg text-center max-w-xl">
        Please login or register to access your dashboard and telemetry data.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</Link>
        <Link to="/register" className="px-6 py-2 bg-gray-200 text-blue-700 rounded hover:bg-gray-300 transition">Register</Link>
      </div>
    </div>
  );
} 