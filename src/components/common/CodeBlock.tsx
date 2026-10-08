import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  filename,
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-lg border border-canvas-border bg-[#0a0d12] shadow-xl overflow-hidden font-mono text-xs md:text-sm">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-canvas-border text-ink-secondary text-xs">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-gitbutler-coral" />
          <span className="font-medium text-ink-primary">{filename || language}</span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-canvas-subtle transition-colors text-ink-muted hover:text-ink-primary"
        >
          {copied ? <Check size={12} className="text-gitbutler-green" /> : <Copy size={12} />}
          <span className="text-[11px]">{copied ? 'Đã chép' : 'Copy'}</span>
        </button>
      </div>

      <div className="p-3.5 overflow-x-auto text-[#e6edf3] leading-relaxed">
        {lines.map((line, idx) => {
          const isCommand = line.startsWith('$') || line.startsWith('but ') || line.startsWith('git ');
          const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
          const isSuccess = line.includes('✓') || line.includes('Success');
          const isConflict = line.includes('CONFLICT') || line.includes('error:');

          return (
            <div key={idx} className="flex">
              {showLineNumbers && (
                <span className="select-none text-ink-muted w-6 text-right pr-3 shrink-0 opacity-40">
                  {idx + 1}
                </span>
              )}
              <span
                className={`break-all ${
                  isComment
                    ? 'text-ink-muted italic'
                    : isCommand
                    ? 'text-gitbutler-orange font-semibold'
                    : isSuccess
                    ? 'text-gitbutler-green'
                    : isConflict
                    ? 'text-gitbutler-red font-medium'
                    : 'text-ink-primary'
                }`}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
