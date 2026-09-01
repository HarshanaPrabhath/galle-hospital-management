import { useEffect, useState } from "react";
import apiClient from "../../../shared/api/api";

const Icon = ({ d, size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);

const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const COUNTER_COUNT = 4;
const PLACEHOLDER = { now: "—", next: "—", next2: "—" };

function ClinicQueue() {
  const [displays, setDisplays] = useState(
    Array.from({ length: COUNTER_COUNT }, (_, i) => ({
      id: String(i + 1),
      ...PLACEHOLDER,
    }))
  );

  useEffect(() => {
    let cancelled = false;

    const fetchQueue = async () => {
      try {
        const res = await apiClient.get("/queue-flow-all");
        const data = res.data?.displays || {};
        const ids = new Set([
          ...Array.from({ length: COUNTER_COUNT }, (_, i) => String(i + 1)),
          ...Object.keys(data),
        ]);
        const list = Array.from(ids)
          .sort((a, b) => Number(a) - Number(b))
          .map((id) => ({ id, ...PLACEHOLDER, ...data[id] }));
        if (!cancelled) setDisplays(list);
      } catch {
        if (!cancelled) {
          setDisplays(
            Array.from({ length: COUNTER_COUNT }, (_, i) => ({
              id: String(i + 1),
              ...PLACEHOLDER,
            }))
          );
        }
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Live Updates
              </p>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Today's Clinic Queue
            </h2>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-600 transition-colors group"
          >
            <span>All departments</span>
            <span className="transform group-hover:translate-x-0.5 transition-transform">
              <ChevronRight />
            </span>
          </a>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displays.map((d) => (
            <div
              key={d.id}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-100">
                  Counter {d.id}
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                  Status
                </span>
              </div>

              {/* Main Content: Now Serving */}
              <div className="my-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Now Serving
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight text-teal-900 drop-shadow-sm">
                    {d.now}
                  </span>
                </div>
              </div>

              {/* Footer Content: Next Up Queue */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-400">Next:</span>
                  <span className="font-bold text-slate-700">{d.next}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-400">Next 2:</span>
                  <span className="font-bold text-slate-700">{d.next2}</span>
                </div>
              </div>

              {/* Subtle visual hover flare */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClinicQueue;