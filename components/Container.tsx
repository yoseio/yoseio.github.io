import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
}

export function Container(props: ContainerProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      {props.children}
    </div>
  );
}
