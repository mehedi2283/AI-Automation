import React from 'react';
import { ExecutionLog, Workflow } from '../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface LogsViewProps {
  logs: ExecutionLog[];
  workflows: Workflow[];
}

export const LogsView: React.FC<LogsViewProps> = ({ logs, workflows }) => {
  const getWorkflowName = (id: string) => workflows.find(w => w.id === id)?.name || 'Unknown Workflow';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-white">Recent Executions</h3>
        <span className="text-xs text-slate-400">{logs.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900/50 text-slate-200 font-medium">
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Workflow</th>
              <th className="px-6 py-3">Input Preview</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {logs.length === 0 ? (
               <tr>
                 <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No execution logs yet.</td>
               </tr>
            ) : (
                logs.slice().reverse().map((log) => (
                <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                    {log.status === 'success' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                        <CheckCircle className="w-3 h-3" /> Success
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                        <XCircle className="w-3 h-3" /> Error
                        </span>
                    )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-200">
                        {getWorkflowName(log.workflowId)}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={log.input}>
                        {log.input}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                        {log.durationMs}ms
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleString()}
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
