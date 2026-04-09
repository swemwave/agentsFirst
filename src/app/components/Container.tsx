import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`container mx-auto px-12 ${className}`} style={{ maxWidth: '1440px' }}>
      {children}
    </div>
  );
}
