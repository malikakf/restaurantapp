import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, UtensilsCrossed, Wine, BarChart3 } from 'lucide-react';

const roles = [
  {
    id: 'waiter',
    title: 'Waiter',
    subtitle: 'Manage tables & orders',
    icon: UtensilsCrossed,
    path: '/waiter',
    color: '#D4AF37',
    description: 'Take orders and send to kitchen',
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    subtitle: 'Food orders queue',
    icon: ChefHat,
    path: '/kitchen',
    color: '#F97316',
    description: 'View and manage food orders',
  },
  {
    id: 'bar',
    title: 'Bar',
    subtitle: 'Drinks orders queue',
    icon: Wine,
    path: '/bar',
    color: '#3B82F6',
    description: 'View and manage drink orders',
  },
  {
    id: 'manager',
    title: 'Manager',
    subtitle: 'Dashboard & analytics',
    icon: BarChart3,
    path: '/manager',
    color: '#22C55E',
    description: 'View stats and floor plan',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <ChefHat size={36} className="text-[#D4AF37]" />
          <h1 className="text-4xl font-black text-white tracking-tight">
            Restaurant<span className="text-[#D4AF37]">OS</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Professional Restaurant Management</p>
        <div className="mt-2 w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
      </motion.div>

      {/* Role cards */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(role.path)}
              className="glass-card p-5 flex flex-col items-center gap-3 text-center hover:border-white/20 transition-all group"
            >
              <div
                className="p-3 rounded-2xl transition-all group-hover:scale-110"
                style={{ backgroundColor: `${role.color}20`, boxShadow: `0 0 20px ${role.color}20` }}
              >
                <Icon size={28} style={{ color: role.color }} />
              </div>
              <div>
                <h2 className="text-white font-bold text-base">{role.title}</h2>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{role.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-600 text-xs mt-10 text-center"
      >
        © 2024 RestaurantOS — Professional Edition
      </motion.p>
    </div>
  );
}
