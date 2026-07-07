import { appointmentTypes } from "./bookAppointmentData";
import { IconWrapper, SectionHeader } from "./bookAppointmentUi";

export default function AppointmentTypeSection({ selectedType, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 01-2-2h5l2 3h9a2 2 0 012 2z" />}
        color={{ bg: "bg-blue-50", icon: "text-blue-700" }}
        title="2. Allocation Target Matrix"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointmentTypes.map((type) => {
          const isSelected = selectedType === type.value;
          return (
            <label
              key={type.value}
              className={`flex items-start gap-3.5 border rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5 ${
                isSelected
                  ? "border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="appt-type"
                value={type.value}
                checked={isSelected}
                onChange={onChange("type")}
                className="mt-1 accent-teal-700 w-4 h-4 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconWrapper
                    className={isSelected ? "text-teal-700" : "text-slate-400"}
                    size={14}
                  >
                    {type.icon}
                  </IconWrapper>
                  <p className="text-xs font-bold text-slate-900">
                    {type.label}
                  </p>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1 leading-normal">
                  {type.desc}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
