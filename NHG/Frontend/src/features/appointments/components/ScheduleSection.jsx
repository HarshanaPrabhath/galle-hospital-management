import { prefLangs, timeSlots } from "../data/bookAppointmentData";
import { prefLangDisplay } from "../data/bookAppointmentI18n";
import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

export default function ScheduleSection({ form, t, uiLang, onChange }) {
  const langLabels = prefLangDisplay[uiLang] || prefLangDisplay.en;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />}
        color={{ bg: "bg-amber-50", icon: "text-amber-600" }}
        title={t.schedule.title}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field
          label={t.schedule.date}
          required
          hint={t.schedule.dateHint}
        >
          <input
            type="date"
            value={form.date}
            onChange={onChange("date")}
            min={new Date().toISOString().split("T")[0]}
            required
            className={inputBase}
          />
        </Field>
        <Field label={t.schedule.time} required>
          <select
            value={form.time}
            onChange={onChange("time")}
            required
            className={inputBase}
          >
            <option value="">{t.schedule.timePlaceholder}</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time} {t.schedule.hrs}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t.schedule.lang}>
        <div className="flex gap-2 flex-wrap mt-1">
          {prefLangs.map((language) => {
            const isActive = form.lang === language;
            return (
              <label
                key={language}
                className={`flex items-center justify-center px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  isActive
                    ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="lang"
                  value={language}
                  checked={isActive}
                  onChange={onChange("lang")}
                  className="sr-only"
                />
                {langLabels[language] || language}
              </label>
            );
          })}
        </div>
      </Field>
    </div>
  );
}
