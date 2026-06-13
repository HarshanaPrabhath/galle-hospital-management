import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const departments = [
  {
    label: "Emergency & Critical Care",
    icon: "ti-urgent",
    color: { bg: "bg-red-50", icon: "text-red-600", badge: "bg-red-50 text-red-700 border-red-100" },
    doctors: [
      {
        name: "Dr. Priya Ratnayake",
        title: "Senior Consultant — Emergency Medicine",
        quals: "MBBS, MD (Em Med), FCCP",
        available: "Mon – Fri, 08:00 – 14:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Arjun Sivakumar",
        title: "Consultant Intensivist",
        quals: "MBBS, MRCP (UK), EDIC",
        available: "Mon, Wed, Fri · 09:00 – 13:00",
        langs: ["English", "Tamil"],
      },
      {
        name: "Dr. Nilufar Perera",
        title: "Consultant Intensivist — CCU",
        quals: "MBBS, MD (Cardiology)",
        available: "Tue, Thu · 08:00 – 13:00",
        langs: ["English", "Sinhala"],
      },
    ],
  },
  {
    label: "Cardiology",
    icon: "ti-heart-rate-monitor",
    color: { bg: "bg-pink-50", icon: "text-pink-700", badge: "bg-pink-50 text-pink-700 border-pink-100" },
    doctors: [
      {
        name: "Dr. Kasun Wickramasinghe",
        title: "Senior Consultant Cardiologist",
        quals: "MBBS, MD, FRCP (Edin)",
        available: "Mon, Wed, Fri · 08:00 – 12:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Meera Krishnamurthy",
        title: "Consultant Interventional Cardiologist",
        quals: "MBBS, DM (Cardiology), FSCAI",
        available: "Tue, Thu · 09:00 – 13:00",
        langs: ["English", "Tamil"],
      },
    ],
  },
  {
    label: "Neurology",
    icon: "ti-brain",
    color: { bg: "bg-purple-50", icon: "text-purple-700", badge: "bg-purple-50 text-purple-700 border-purple-100" },
    doctors: [
      {
        name: "Dr. Ranjith Fernando",
        title: "Consultant Neurologist",
        quals: "MBBS, MD (Neurology), FRCP",
        available: "Mon, Thu · 09:00 – 13:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Ananthi Navaratnam",
        title: "Consultant Neurologist",
        quals: "MBBS, MRCP (UK), PhD",
        available: "Wed, Fri · 08:00 – 12:00",
        langs: ["English", "Tamil"],
      },
    ],
  },
  {
    label: "Surgery",
    icon: "ti-scalpel",
    color: { bg: "bg-blue-50", icon: "text-blue-700", badge: "bg-blue-50 text-blue-700 border-blue-100" },
    doctors: [
      {
        name: "Dr. Chaminda Jayasuriya",
        title: "Senior Consultant General Surgeon",
        quals: "MBBS, MS (Surgery), FRCS (Ed)",
        available: "Mon – Fri · 07:30 – 12:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Tharaka Mendis",
        title: "Consultant Laparoscopic Surgeon",
        quals: "MBBS, MS, FACS",
        available: "Tue, Thu · 08:00 – 13:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Kavitha Balasundaram",
        title: "Consultant Orthopaedic Surgeon",
        quals: "MBBS, MS (Ortho), DNB",
        available: "Mon, Wed, Fri · 09:00 – 13:00",
        langs: ["English", "Tamil"],
      },
    ],
  },
  {
    label: "Obstetrics & Gynaecology",
    icon: "ti-baby-carriage",
    color: { bg: "bg-rose-50", icon: "text-rose-600", badge: "bg-rose-50 text-rose-700 border-rose-100" },
    doctors: [
      {
        name: "Dr. Sandya Abeysekera",
        title: "Senior Consultant Obstetrician & Gynaecologist",
        quals: "MBBS, MD (O&G), FRCOG",
        available: "Mon – Fri · 08:00 – 13:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Usha Rajagopal",
        title: "Consultant Gynaecologist",
        quals: "MBBS, DGO, MS (O&G)",
        available: "Tue, Thu, Sat · 09:00 – 12:00",
        langs: ["English", "Tamil"],
      },
    ],
  },
  {
    label: "Paediatrics",
    icon: "ti-mood-kid",
    color: { bg: "bg-yellow-50", icon: "text-yellow-600", badge: "bg-yellow-50 text-yellow-700 border-yellow-100" },
    doctors: [
      {
        name: "Dr. Dilhani Gunasekara",
        title: "Consultant Paediatrician",
        quals: "MBBS, MD (Paeds), MRCPCH",
        available: "Mon, Wed, Fri · 08:00 – 12:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Santhosh Ponnusamy",
        title: "Consultant Neonatologist",
        quals: "MBBS, MD (Paeds), Fellowship Neonatology",
        available: "Tue, Thu · 09:00 – 13:00",
        langs: ["English", "Tamil"],
      },
    ],
  },
  {
    label: "Internal Medicine",
    icon: "ti-stethoscope",
    color: { bg: "bg-teal-50", icon: "text-teal-700", badge: "bg-teal-50 text-teal-700 border-teal-100" },
    doctors: [
      {
        name: "Dr. Rohan Dissanayake",
        title: "Senior Consultant Physician",
        quals: "MBBS, MD, FRCP (Glasg)",
        available: "Mon – Thu · 08:00 – 12:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Lalitha Subramaniam",
        title: "Consultant Endocrinologist",
        quals: "MBBS, MD (Medicine), DM (Endo)",
        available: "Mon, Wed · 09:00 – 13:00",
        langs: ["English", "Tamil"],
      },
      {
        name: "Dr. Asanka Ratnaweera",
        title: "Consultant Nephrologist",
        quals: "MBBS, MD, FASN",
        available: "Tue, Fri · 08:00 – 12:00",
        langs: ["English", "Sinhala"],
      },
    ],
  },
  {
    label: "Radiology & Diagnostics",
    icon: "ti-scan",
    color: { bg: "bg-slate-50", icon: "text-slate-600", badge: "bg-slate-50 text-slate-600 border-slate-200" },
    doctors: [
      {
        name: "Dr. Mahesh Karunanayake",
        title: "Senior Consultant Radiologist",
        quals: "MBBS, MD (Radiology), FRCR (UK)",
        available: "Mon – Fri · 08:00 – 16:00",
        langs: ["English", "Sinhala"],
      },
      {
        name: "Dr. Vijaya Thilakasiri",
        title: "Consultant Radiologist",
        quals: "MBBS, MD, DMRD",
        available: "Mon, Tue, Thu · 09:00 – 14:00",
        langs: ["English", "Sinhala", "Tamil"],
      },
    ],
  },
];

const highlights = [
  { value: "60+",  label: "Consultants",      icon: "ti-user-check",  color: "text-teal-700", bg: "hover:bg-teal-50/50" },
  { value: "40+",  label: "Specialties",     icon: "ti-award",       color: "text-blue-700",  bg: "hover:bg-blue-50/50" },
  { value: "3",    label: "Languages served", icon: "ti-language",    color: "text-purple-700",bg: "hover:bg-purple-50/50" },
  { value: "6",    label: "Days a week",        icon: "ti-calendar",    color: "text-amber-600", bg: "hover:bg-amber-50/50" },
];

const langColor = {
  English: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
  Sinhala: "bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100",
  Tamil:   "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
};

export default function DoctorsPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-12 antialiased">

        {/* ── Hero ── */}
        <div className="flex flex-col sm:flex-row items-start gap-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 ring-4 ring-teal-50/50">
            <i className="ti ti-users text-2xl text-teal-700" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Our Doctors
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
              Board-certified consultants across all major specialties — available in English,
              Sinhala and Tamil. Clinic schedules are updated weekly; call ahead to confirm.
            </p>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {highlights.map((h) => (
            <div
              key={h.label}
              className={`bg-white border border-gray-200 rounded-2xl px-4 py-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 ${h.bg}`}
            >
              <div className="p-2 rounded-full mb-1">
                <i className={`ti ${h.icon} text-xl ${h.color}`} aria-hidden="true" />
              </div>
              <span className={`text-2xl font-bold tracking-tight ${h.color}`}>{h.value}</span>
              <span className="text-xs font-medium text-gray-400 mt-1">{h.label}</span>
            </div>
          ))}
        </div>

        {/* ── Departments ── */}
        <div className="flex flex-col gap-10">
          {departments.map((dept) => (
            <div key={dept.label} className="group/dept">
              {/* Department header */}
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100 group-hover/dept:border-gray-200 transition-colors duration-300">
                <div className={`w-8 h-8 rounded-xl ${dept.color.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/dept:scale-105`}>
                  <i className={`ti ${dept.icon} text-base ${dept.color.icon}`} aria-hidden="true" />
                </div>
                <p className="text-base font-bold text-gray-800 tracking-tight">{dept.label}</p>
              </div>

              {/* Doctor cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dept.doctors.map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 ease-in-out"
                  >
                    {/* Department badge */}
                    <div className="flex items-start gap-2">
                      <span
                        className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md border ${dept.color.badge} whitespace-nowrap`}
                      >
                        {dept.label.split(" ")[0]}
                      </span>
                    </div>

                    {/* Avatar + name */}
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-full ${dept.color.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/card:scale-105`}>
                        <i className={`ti ti-user text-lg ${dept.color.icon}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-snug tracking-tight">{doc.name}</p>
                        <p className="text-[11px] font-medium text-gray-400 mt-0.5 leading-none">{doc.quals}</p>
                      </div>
                    </div>

                    {/* Title */}
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">{doc.title}</p>

                    {/* Availability */}
                    <div className="flex items-center gap-2 mt-auto pt-2.5 border-t border-gray-100">
                      <i className="ti ti-clock text-[12px] text-gray-400" aria-hidden="true" />
                      <span className="text-[11px] font-medium text-gray-500">{doc.available}</span>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {doc.langs.map((lang) => (
                        <span
                          key={lang}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-colors duration-200 ${langColor[lang]}`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Appointment strip ── */}
        <div className="mt-12 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-1 tracking-tight">Book a consultant appointment</p>
            <p className="text-xs text-gray-500 leading-relaxed">Visit the OPD registration desk or call our helpline — walk-ins welcome during clinic hours.</p>
          </div>
          <div className="flex items-center gap-2.5 text-teal-700 bg-teal-50 border border-teal-100/50 px-4 py-2 rounded-xl flex-shrink-0 transition-all duration-300 hover:bg-teal-100/60">
            <i className="ti ti-calendar-event text-base" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wide uppercase">OPD · Mon – Sat · 07:30</span>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}