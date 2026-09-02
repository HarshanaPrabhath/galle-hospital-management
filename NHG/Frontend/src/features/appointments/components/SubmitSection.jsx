import { IconWrapper } from "./bookAppointmentUi";

export default function SubmitSection({ consent, t, error, loading, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <input
          type="checkbox"
          checked={consent}
          onChange={onChange("consent")}
          className="mt-0.5 h-4 w-4 accent-teal-700"
        />
        <span className="text-xs font-medium leading-relaxed text-slate-600">
          {t.submit.consent}
        </span>
      </label>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
          <IconWrapper size={12} className="text-slate-300">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </IconWrapper>
          {t.submit.secureNote}
        </p>
        <button
          type="submit"
          disabled={!consent || loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all active:scale-98"
        >
          <IconWrapper size={14}>
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8" />
          </IconWrapper>
          {loading ? t.submit.buttonLoading : t.submit.button}
        </button>
      </div>
    </div>
  );
}
