import React, { useState } from 'react';
import { Play, Loader2, Copy, Check } from 'lucide-react';
import { Workflow, ExecutionLog } from '../types';
import { runWorkflow } from '../services/geminiService';

interface WorkflowRunnerProps {
  workflows: Workflow[];
  onLog: (log: ExecutionLog) => void;
}

export const WorkflowRunner: React.FC<WorkflowRunnerProps> = ({ workflows, onLog }) => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(workflows[0]?.id || '');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId);

  const handleRun = async () => {
    if (!selectedWorkflow || !input.trim()) return;

    setLoading(true);
    setOutput('');
    const startTime = Date.now();

    try {
      const result = await runWorkflow(selectedWorkflow, input);
      setOutput(result);
      
      const log: ExecutionLog = {
        id: crypto.randomUUID(),
        workflowId: selectedWorkflow.id,
        timestamp: new Date().toISOString(),
        input: input,
        output: result,
        durationMs: Date.now() - startTime,
        status: 'success'
      };
      onLog(log);

    } catch (error) {
      setOutput("Error executing workflow. Please check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <p>No active workflows found.</p>
        <p className="text-sm">Create a new workflow in the Data Editor to get started.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      {/* Input Section */}
      <div className="flex flex-col gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">Select Automation Service</label>
            <select
              value={selectedWorkflowId}
              onChange={(e) => setSelectedWorkflowId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {workflows.map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.model})</option>
              ))}
            </select>
            {selectedWorkflow && (
               <p className="mt-2 text-sm text-slate-500">{selectedWorkflow.description}</p>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-slate-400 mb-2">Input Data</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
              placeholder="Enter text payload to process..."
            />
          </div>

          <button
            onClick={handleRun}
            disabled={loading || !input.trim()}
            className={`mt-6 w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              loading || !input.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            {loading ? 'Processing...' : 'Run Automation'}
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex flex-col h-full">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Output Result</h3>
                {output && (
                    <button 
                        onClick={copyToClipboard}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-500"/> : <Copy className="w-4 h-4"/>}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                )}
            </div>
            
            <div className="flex-1 overflow-auto bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                {output ? (
                    <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                        {output}
                    </pre>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600">
                        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                            <Play className="w-6 h-6 text-slate-700 ml-1" />
                        </div>
                        <p>Waiting for execution...</p>
                    </div>
                )}
            </div>

            {selectedWorkflow && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>Model: {selectedWorkflow.model}</span>
                    <span>Temp: {selectedWorkflow.temperature}</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
