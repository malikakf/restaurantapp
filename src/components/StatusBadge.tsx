import { OrderStatus } from '../types';

interface Props {
  status: OrderStatus;
  pulse?: boolean;
}

const labels: Record<OrderStatus, string> = {
  new: 'NEW',
  'in-progress': 'IN PROGRESS',
  ready: 'READY',
  served: 'SERVED',
};

export default function StatusBadge({ status, pulse }: Props) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase
        status-${status}
        ${pulse && status === 'new' ? 'pulse-red' : ''}
      `}
    >
      {status === 'new' && pulse && (
        <span className="w-2 h-2 rounded-full bg-red-400 mr-2 animate-pulse" />
      )}
      {labels[status]}
    </span>
  );
}
