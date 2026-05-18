import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
        {/* Notifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <SettingsIcon size={24} />
            <span>Notifications</span>
          </h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span>Email notifications for budget alerts</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span>Notify when transaction is added</span>
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
          <div className="space-y-3">
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
              Change Password
            </button>
          </div>
        </div>

        {/* Data */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Data & Storage</h2>
          <div className="space-y-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Export Data
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
              Delete Account
            </button>
          </div>
        </div>

        {/* About */}
        <div className="border-t pt-8 text-gray-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
          <p>FinTrack v1.0.0</p>
          <p>Smart Finance Management Application</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
