import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

export default function MedicalContextSection({ reason, t, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8M16 17H8" />}
        color={{ bg: "bg-emerald-50", icon: "text-emerald-700" }}
        title={t.medical.title}
      />
      <Field
        label={t.medical.reason}
        required
        hint={t.medical.reasonHint}
      >
        <textarea
          value={reason}
          onChange={onChange("reason")}
          rows={3}
          required
          placeholder={t.medical.reasonPlaceholder}
          className={`${inputBase} resize-none leading-relaxed`}
        />
      </Field>
    </div>
  );
}
