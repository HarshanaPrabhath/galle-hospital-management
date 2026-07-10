import { useState } from "react";
import AppointmentSuccess from "../Components/BookAppointment/AppointmentSuccess";
import BookAppointmentForm from "../Components/BookAppointment/BookAppointmentForm";
import { EMPTY_APPOINTMENT_FORM } from "../Components/BookAppointment/bookAppointmentData";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// ── Data ────────────────────────────────────────────────────────────────────
// comment
const departments = [
  { value: "",          label: "Select department" },
  { value: "emergency",    label: "Emergency & Critical Care" },
  { value: "cardiology",   label: "Cardiology" },
  { value: "neurology",    label: "Neurology" },
  { value: "surgery",      label: "Surgery" },
  { value: "obgyn",        label: "Obstetrics & Gynaecology" },
  { value: "paediatrics",  label: "Paediatrics" },
  { value: "medicine",     label: "Internal Medicine" },
  { value: "ortho",        label: "Orthopaedics" },
  { value: "ent",          label: "ENT" },
  { value: "ophthalmology",label: "Ophthalmology" },
  { value: "radiology",    label: "Radiology & Diagnostics" },
  { value: "dermatology",  label: "Dermatology" },
  { value: "psychiatry",   label: "Psychiatry" },
  { value: "dental",       label: "Dental & Oral Health" },
];

const doctorsByDept = {
  cardiology:     ["Dr. Kasun Wickramasinghe", "Dr. Meera Krishnamurthy"],
  neurology:      ["Dr. Ranjith Fernando", "Dr. Ananthi Navaratnam"],
  surgery:        ["Dr. Chaminda Jayasuriya", "Dr. Tharaka Mendis", "Dr. Kavitha Balasundaram"],
  obgyn:          ["Dr. Sandya Abeysekera", "Dr. Usha Rajagopal"],
  paediatrics:    ["Dr. Dilhani Gunasekara", "Dr. Santhosh Ponnusamy"],
  medicine:       ["Dr. Rohan Dissanayake", "Dr. Lalitha Subramaniam", "Dr. Asanka Ratnaweera"],
  ortho:          ["Dr. Kavitha Balasundaram", "Dr. Pradeep Senanayake"],
  ent:            ["Dr. Janaka Bandara", "Dr. Nirmala Suresh"],
  ophthalmology: ["Dr. Shanti Perumal", "Dr. Gayan Ekanayake"],
  radiology:      ["Dr. Mahesh Karunanayake", "Dr. Vijaya Thilakasiri"],
  dermatology:   ["Dr. Renuka Jayawardena"],
  psychiatry:    ["Dr. Saman Samaraweera", "Dr. Preethi Wijesekara"],
  dental:        ["Dr. Amara Gunawardena", "Dr. Niluka Dias"],
  emergency:     ["Dr. Priya Ratnayake", "Dr. Arjun Sivakumar"],
};

const appointmentTypes = [
  { value: "opd",        label: "OPD Consultation",    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,         desc: "General outpatient visit with a doctor" },
  { value: "specialist",   label: "Specialist Clinic",     icon: <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M20 8v6M23 11h-6M9 7a4 4 0 100-8 4 4 0 000 8z" />,    desc: "Scheduled specialist appointment" },
  { value: "followup",     label: "Follow-up Visit",       icon: <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />,       desc: "Continuing care after a previous visit" },
  { value: "procedure",    label: "Procedure / Test",      icon: <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />,          desc: "Scheduled diagnostic or minor procedure" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30",
];

const prefLangs = ["English", "Sinhala", "Tamil"];

// ── Inline SVGs Core Helpers ────────────────────────────────────────────────
const IconWrapper = ({ children, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

// ── Shared UI Tailwind Bases ────────────────────────────────────────────────
const inputBase =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all";

const labelBase = "block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5";

function Field({ label, hint, required, children }) {
  return (
    <div className="flex flex-col">
      <label className={labelBase}>
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] font-medium text-slate-400 mt-1.5 leading-normal">{hint}</p>}
    </div>
  );
}

function SectionHeader({ icon, color, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className={`w-8 h-8 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0 border border-current/10 shadow-sm`}>
        <IconWrapper className={color.icon} size={16}>{icon}</IconWrapper>
      </div>
      <p className="text-sm font-extrabold tracking-tight text-slate-900">{title}</p>
    </div>
  );
}

// ── Component Main Layout ───────────────────────────────────────────────────
export default function BookAppointment() {
  const [form, setForm] = useState(EMPTY_APPOINTMENT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [refNo] = useState(
    () => "NHG-" + Math.floor(100000 + Math.random() * 900000)
  );

  const set = (key) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm(EMPTY_APPOINTMENT_FORM);
  };

  if (submitted) {
    return <AppointmentSuccess form={form} refNo={refNo} onReset={resetForm} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-teal-700 selection:text-white antialiased">
      <Navbar />
      <BookAppointmentForm
        form={form}
        onChange={set}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}
