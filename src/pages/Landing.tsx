import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChefHat, GlassWater, LayoutDashboard, UtensilsCrossed } from 'lucide-react';

const roles = [
  {
    id: 'waiter',
    label: 'Waiter',
    description: 'Take orders & send to kitchen',
    icon: UtensilsCrossed,
    path: '/waiter',
    color: '#D4AF37',
    gradient: 'from-yellow-900/40 to-yellow-900/10',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    description: 'View & manage food orders',
    icon: ChefHat,
    path: '/kitchen',
    color: '#F97316',
    gradient: 'from-orange-900/40 to-orange-900/10',
  },
  {
    id: 'bar',
    label: 'Bar',
    description: 'Manage drink orders',
    icon: GlassWater,
    path: '/bar',
    color: '#3B82F6',
    gradient: 'from-blue-900/40 to-blue-900/10',
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'Stats, tables & reports',
    icon: LayoutDashboard,
    path: '/manager',
    color: '#22C55E',
    gradient: 'from-green-900/40 to-green-900/10',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-3xl glass-gold flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">🍽️</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">
          Restaurant<span className="text-gold">OS</span>
        </h1>
        <p className="text-[#9CA3AF] mt-2 text-sm">Professional Restaurant Management</p>
      </motion.div>

      {/* Role cards */}
      <div className="w-full max-w-sm space-y-3">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(role.path)}
            className={`w-full glass bg-gradient-to-r ${role.gradient} rounded-2xl p-5 flex items-center gap-4 text-left transition-all`}
            style={{ borderColor: `${role.color}30` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${role.color}20`, color: role.color }}
            >
              <role.icon size={24} />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{role.label}</p>
              <p className="text-[#9CA3AF] text-sm">{role.description}</p>
            </div>
            <svg className="text-[#9CA3AF]" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-[#4B5563] text-xs mt-10"
      >
        RestaurantOS v1.0 · All rights reserved
      </motion.p>
    </motion.div>
  );
}
