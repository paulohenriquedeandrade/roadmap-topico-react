interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border border-gray-200">
      {title && (
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
          {title}
        </h3>
      )}

      <div className="text-gray-600 space-y-2">{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2 justify-end">
          {footer}
        </div>
      )}
    </div>
  );
};
