import React from 'react';
import { History, User, Clock, FileText } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const ActivityLogsView: React.FC = () => {
  const { activityLogs } = useNews();

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="pb-4 border-b border-gray-800">
        <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <History className="w-6 h-6 text-red-500" />
          Editorial Activity Audit Trail
        </h1>
        <p className="font-serif text-xs text-gray-400 mt-1">
          Historical record of article publishing, edits, updates, and administrator actions.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden divide-y divide-gray-800/80">
        {activityLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-mono text-xs">
            No activity logged in current session.
          </div>
        ) : (
          activityLogs.map((log) => (
            <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-gray-800/30 transition-colors">
              <div className="p-2 bg-gray-950 rounded-lg border border-gray-800 text-red-400 shrink-0">
                <FileText className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-red-400 font-mono uppercase tracking-wider">
                    {log.action}
                  </span>
                  <span className="font-mono text-gray-500 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>

                {log.articleTitle && (
                  <p className="font-serif text-sm text-gray-200 mb-1 font-semibold">
                    "{log.articleTitle}"
                  </p>
                )}

                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                  <User className="w-3 h-3 text-gray-500" />
                  <span>By {log.user}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
