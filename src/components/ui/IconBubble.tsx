import type { LucideIcon } from "lucide-react";
 
interface Props {
  icon: LucideIcon;
  tone: string;
  size?: number;
}
 
export const IconBubble = ({ icon: Icon, tone, size = 34 }: Props) => (
  <span className={`grid shrink-0 place-items-center rounded-full ${tone}`} style={{ width: size, height: size }}>
    <Icon size={size * 0.5} strokeWidth={1.8} />
  </span>
);
 