import { motion } from "motion/react";
import { Award, School, Timer, CircleSlash } from "lucide-react";

interface StatsBarProps {
  issuedCount: number;
}

export default function StatsBar({ issuedCount }: StatsBarProps) {
  const stats = [
    {
      id: "stat-issued",
      label: "CREDENTIALS ISSUED",
      value: (120 + issuedCount).toLocaleString(),
      change: "+100% Verified Proofs",
      icon: Award,
      color: "text-purple-400"
    },
    {
      id: "stat-institutions",
      label: "PARTNER INSTITUTIONS",
      value: "12",
      change: "Universities & Professional Sectors",
      icon: School,
      color: "text-teal-400"
    },
    {
      id: "stat-time",
      label: "VERIFICATION SPEED",
      value: "< 1s",
      change: "Instant QR Profile Auditing",
      icon: Timer,
      color: "text-emerald-400"
    },
    {
      id: "stat-fraud",
      label: "FRAUD REDUCTION RATE",
      value: "99.9%",
      change: "Tamper-resistant blockchain proofs",
      icon: CircleSlash,
      color: "text-red-400"
    }
  ];

  return (
    <section className="relative py-12 bg-[#08080f] border-y border-white/5 overflow-hidden">
      {/* Decorative vertical divider backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-950/5 to-transparent"></div>

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col space-y-2 text-left group"
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs text-gray-500 tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
                
                <div className="flex flex-col mt-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-400 mt-0.5">
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
