/* eslint-disable no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ markdown, className = '' }) => {
  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mb-4 mt-6 text-3xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mb-3 mt-5 text-2xl font-bold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mb-2 mt-4 text-xl font-bold" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="mb-2 mt-3 text-lg font-bold" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="mb-1 mt-3 text-base font-bold" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="mb-1 mt-3 text-sm font-bold" {...props} />
          ),
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="my-3 list-disc pl-6" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="my-3 list-decimal pl-6" {...props} />
          ),
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-gray-300 pl-4 italic"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => <hr className="my-6" {...props} />,
          img: ({ node, ...props }) => (
            <img
              className="my-4 h-auto max-w-full rounded"
              {...props}
              alt={props.alt || ''}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="my-6 overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-300"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-gray-200" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="even:bg-gray-50" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm text-gray-500" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
