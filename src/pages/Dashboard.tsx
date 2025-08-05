import React from 'react';
import { AlertTriangle, Server, FileText, Activity } from 'lucide-react';
import LogVolumeChart from '../components/charts/LogVolumeChart';
import SeverityDistributionChart from '../components/charts/SeverityDistributionChart';
import TopErrorsChart from '../components/charts/TopErrorsChart';
import SystemHealthChart from '../components/charts/SystemHealthChart';
import { useMockLogs } from '../hooks/useMockLogs';

const Dashboard: React.FC = () => {
  const { logs, todayLogs, errorCount } = useMockLogs();

  const metrics = [
    {
      name: 'Total Logs Today',
      value: todayLogs.length,
      change: '+12.5%',
      icon: <FileText size={20} className="text-blue-500" />,
      trend: 'up',
    },
    {
      name: 'Error Count',
      value: errorCount,
      change: '+3.2%',
      icon: <AlertTriangle size={20} className="text-red-500" />,
      trend: 'up',
    },
    {
      name: 'Active Servers',
      value: 12,
      change: '0%',
      icon: <Server size={20} className="text-green-500" />,
      trend: 'neutral',
    },
    {
      name: 'Active Alerts',
      value: 3,
      change: '-5%',
      icon: <Activity size={20} className="text-amber-500" />,
      trend: 'down',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your system status and metrics</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{metric.name}</p>
                <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                <div
                  className={`mt-1 inline-flex items-center text-xs font-medium
                    ${
                      metric.trend === 'up'
                        ? 'text-red-600'
                        : metric.trend === 'down'
                        ? 'text-green-600'
                        : 'text-slate-600'
                    }
                  `}
                >
                  {metric.change}
                </div>
              </div>
              <div className="rounded-full bg-slate-100 p-3">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Log Volume (7 days)</h2>
          <div className="h-72">
            <LogVolumeChart />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Severity Distribution</h2>
          <div className="h-72">
            <SeverityDistributionChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Top Errors (24h)</h2>
          <div className="h-72">
            <TopErrorsChart />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">System Health</h2>
          <div className="h-72">
            <SystemHealthChart />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-slate-800">Recent Activity</h2>
          <button className="text-sm text-teal-600 hover:text-teal-700">View all</button>
        </div>
        <div className="divide-y divide-slate-200">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3">
              <div className="flex items-start">
                <span
                  className={`mr-3 mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    log.severity === 'error'
                      ? 'bg-red-500'
                      : log.severity === 'warning'
                      ? 'bg-amber-500'
                      : log.severity === 'info'
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{log.message}</p>
                  <div className="mt-1 flex items-center">
                    <p className="text-xs text-slate-500">
                      {log.timestamp.toLocaleTimeString()} • {log.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;