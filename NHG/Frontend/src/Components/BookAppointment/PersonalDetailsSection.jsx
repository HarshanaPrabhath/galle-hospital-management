import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

export default function PersonalDetailsSection({ form, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />}
        color={{ bg: "bg-teal-50", icon: "text-teal-700" }}
        title="1. Personal Demographic Records"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" required>
          <input
            type="text"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder="Kasun"
            required
            className={inputBase}
          />
        </Field>
        <Field label="Last name" required>
          <input
            type="text"
            value={form.lastName}
            onChange={onChange("lastName")}
            placeholder="Perera"
            required
            className={inputBase}
          />
        </Field>
        <Field label="Date of birth" required>
          <input
            type="date"
            value={form.dob}
            onChange={onChange("dob")}
            required
            className={inputBase}
          />
        </Field>
        <Field label="Gender identity" required>
          <select
            value={form.gender}
            onChange={onChange("gender")}
            required
            className={inputBase}
          >
            <option value="">Select gender alignment</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Omit verification parameter</option>
          </select>
        </Field>
        <Field
          label="National ID (NIC) / Passport Reference"
          required
          hint="Used to extract existing electronic history files smoothly from centralized clinical logs."
        >
          <input
            type="text"
            value={form.nic}
            onChange={onChange("nic")}
            placeholder="e.g. 199012345678"
            required
            className={inputBase}
          />
        </Field>
        <Field
          label="Primary Contact Mobile Stream"
          required
          hint="Critical token gate. Session tracking tokens route here."
        >
          <div className="flex gap-2 relative">
            <span className="flex items-center px-3 border border-slate-200 rounded-xl bg-slate-100 text-xs font-bold text-slate-500 select-none shadow-inner">
              +94
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={onChange("phone")}
              placeholder="77 123 4567"
              required
              className={inputBase}
            />
          </div>
        </Field>
        <Field
          label="Electronic Mail (Email)"
          hint="Optional. Alternative diagnostic summary dispatch routing endpoint."
        >
          <input
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="kasun.perera@example.com"
            className={inputBase}
          />
        </Field>
        <Field
          label="Residential Boundary Address"
          hint="District bounds classification matches core scheduling zones."
        >
          <input
            type="text"
            value={form.address}
            onChange={onChange("address")}
            placeholder="Galle, Southern Province"
            className={inputBase}
          />
        </Field>
      </div>
    </div>
  );
}
