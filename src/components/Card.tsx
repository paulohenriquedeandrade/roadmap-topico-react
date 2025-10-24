import "./Card.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
