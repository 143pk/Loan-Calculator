import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  id: string | number;
  label?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ id, label = 'Advertisement', className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous elements
    containerRef.current.innerHTML = '';

    // Create an iframe to safely isolate window.atOptions and document.write for each ad slot
    const iframe = document.createElement('iframe');
    iframe.style.width = '728px';
    iframe.style.height = '90px';
    iframe.style.maxWidth = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('title', `Sponsor Advertisement Banner ${id}`);
    iframe.setAttribute('scrolling', 'no');

    containerRef.current.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                overflow: hidden;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              var atOptions = {
                'key' : '4b1b9d605a12c38864a9d825b1c23827',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/4b1b9d605a12c38864a9d825b1c23827/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [id]);

  return (
    <aside
      aria-label={`Advertisement Banner ${id}`}
      className={`my-6 flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg backdrop-blur-md transition-all hover:border-slate-700/80 ${className}`}
    >
      <div className="mb-2 flex items-center justify-between w-full max-w-3xl px-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold select-none">
          {label} #{id}
        </span>
        <span className="text-[10px] text-slate-400 select-none">Sponsored Link</span>
      </div>
      <div
        ref={containerRef}
        className="flex w-full items-center justify-center overflow-x-auto py-1 max-w-full"
      />
    </aside>
  );
};
