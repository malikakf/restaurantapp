import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({ title, value, subtitle, icon: Icon, color = '#D4AF37' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#9CA3AF] text-sm font-medium">{title}</p>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color }}
        >
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {subtitle && <p className="text-[#9CA3AF] text-xs">{subtitle}</p>}
    </motion.div>
  );
}
