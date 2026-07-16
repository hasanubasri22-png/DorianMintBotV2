import React, { useState, useEffect } from 'react';
import { useActivityLogContext } from '@/context/ActivityLogContext';
import { RefreshCw, Filter } from 'lucide-react';

const ActivityLog = () => {
  const { logs, loading, loadLogs, getByType } = useActivityLogContext();
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  useEffect(() => {
    if (selectedType) {
      const filtered = logs.filter((log) => log.type === selectedType);
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(logs);
    }
  }, [logs, selectedType]);

  const handleFilterChange = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-blue-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const types = [...new Set(logs.map((log) => log.type))];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Activity Log</h2>
        <button
          onClick={loadLogs}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-3 py-1 rounded text-sm ${
              selectedType === type
                ? 'bg-blue-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {loading && !filteredLogs.length && (
          <div className="text-center text-gray-400">Loading activity logs...</div>
        )}

        {filteredLogs.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-8">No activity logs found</div>
        )}

        {filteredLogs.map((log, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded p-3 hover:border-gray-600 transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${getStatusColor(log.status)}`}>
                    {log.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-400">{log.type}</span>
                </div>
                <div className="text-sm font-semibold mt-1">{log.action}</div>
                {log.details && (
                  <div className="text-xs text-gray-500 mt-1 break-all">
                    {log.details.substring(0, 66)}...
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 ml-4 text-right">
                {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;