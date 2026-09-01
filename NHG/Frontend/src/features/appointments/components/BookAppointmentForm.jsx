import { translations } from "../data/bookAppointmentI18n";
import AppointmentIntro from "./AppointmentIntro";
import AppointmentTypeSection from "./AppointmentTypeSection";
import HelpDeskStrip from "./HelpDeskStrip";
import MedicalContextSection from "./MedicalContextSection";
import PersonalDetailsSection from "./PersonalDetailsSection";
import ScheduleSection from "./ScheduleSection";
import SubmitSection from "./SubmitSection";
import { IconWrapper } from "./bookAppointmentUi";

export default function BookAppointmentForm({
  form,
  uiLang,
  onToggleLang,
  patientDetailsError,
  patientDetailsLoading,
  submitError,
  submitLoading,
  onChange,
  onSubmit,
}) {
  const t = translations[uiLang] || translations.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={onToggleLang}
          className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-sm transition-all active:scale-98"
        >
          <IconWrapper size={14} className="text-teal-700">
            <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
          </IconWrapper>
          {t.toggleLabel}: {uiLang === "en" ? "සිංහල" : "English"}
        </button>
      </div>

      <AppointmentIntro t={t} />

      <form onSubmit={onSubmit} className="space-y-6">
        <PersonalDetailsSection
          form={form}
          t={t}
          uiLang={uiLang}
          loading={patientDetailsLoading}
          error={patientDetailsError}
          onChange={onChange}
        />
        <AppointmentTypeSection
          selectedType={form.type}
          t={t}
          onChange={onChange}
        />
        <ScheduleSection form={form} t={t} uiLang={uiLang} onChange={onChange} />
        <MedicalContextSection
          reason={form.reason}
          t={t}
          onChange={onChange}
        />
        <SubmitSection
          consent={form.consent}
          t={t}
          error={submitError}
          loading={submitLoading}
          onChange={onChange}
        />
        <HelpDeskStrip t={t} />
      </form>
    </div>
  );
}
