import React, { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, X,
  User, Phone, Mail, ChevronDown, HeartPulse, Calendar,
} from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

const INITIAL_PATIENTS = [
  { id: 1, name: "Kamal Dissanayake", age: 34, gender: "Male", blood: "O+", email: "kamal@gmail.com", phone: "+94 77 111 2233", status: "Active" },
  { id: 2, name: "Sanduni Wijesinghe", age: 27, gender: "Female", blood: "A-", email: "sanduni@gmail.com", phone: "+94 71 444 5566", status: "Active" },
  { id: 3, name: "Thilak Rajapaksa", age: 52, gender: "Male", blood: "B+", email: "thilak@gmail.com", phone: "+94 76 777 8899", status: "Inactive" },
];

const EMPTY_FORM = { name: "", age: "", gender: "", blood: "", email: "", phone: "", status: "Active" };

export default function PatientPage() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setForm(EMPTY_FORM); setErrors({}); setSelected(null); setModal("create"); };
  const openEdit = (p) => { setForm({ ...p }); setErrors({}); setSelected(p); setModal("edit"); };
  const openDelete = (p) => { setSelected(p); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelected(null); setErrors({}); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.age || isNaN(form.age) || form.age < 1) e.age = "Enter a valid age.";
    if (!form.gender) e.gender = "Select a gender.";
    if (!form.blood) e.blood = "Select a blood group.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    return e;
  };

  const handleCreate = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setPatients((prev) => [...prev, { ...form, age: Number(form.age), id: Date.now() }]);
    closeModal();
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setPatients((prev) => prev.map((p) => (p.id === selected.id ? { ...form, age: Number(form.age), id: p.id } : p)));
    closeModal();
  };

  const handleDelete = () => { setPatients((prev) => prev.filter((p) => p.id !== selected.id)); closeModal(); };

  const change = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${status === "Active" ? "bg-emerald-50 text-emerald-600 ring-emerald-200" : "bg-slate-100 text-slate-500 ring-slate-200"
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
      {status}
    </span>
  );

  const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );

  const inputCls = (err) =>
    `w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 transition ${err ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:ring-emerald-200 focus:border-emerald-400"
    }`;

  const Modal = ({ title, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"><X size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <HeartPulse size={18} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">Patients</h1>
              <p className="text-xs text-slate-400">{patients.length} registered</p>
            </div>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
            <Plus size={15} /> Add Patient
          </button>
        </div>

        {/* search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by name or email…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition shadow-sm" />
        </div>

        {/* table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Patient", "Age / Gender", "Blood", "Contact", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No patients found.</td></tr>
              ) : (
                filtered.map((p, i) => (
                  <tr key={p.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i === filtered.length - 1 ? "border-none" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <User size={14} />
                        </div>
                        <span className="font-medium text-slate-700">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 text-slate-600 text-xs"><Calendar size={11} /> {p.age} yrs</span>
                        <span className="text-slate-400 text-xs">{p.gender}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-50 text-red-500 text-xs font-semibold ring-1 ring-red-100">{p.blood}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Mail size={11} /> {p.email}</span>
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Phone size={11} /> {p.phone}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"><Pencil size={14} /></button>
                        <button onClick={() => openDelete(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(modal === "create" || modal === "edit") && (
        <Modal title={modal === "create" ? "Add Patient" : "Edit Patient"}>
          <div className="p-6 space-y-4">
            <Field label="Full Name" error={errors.name}>
              <input className={inputCls(errors.name)} placeholder="Kamal Dissanayake" value={form.name} onChange={(e) => change("name", e.target.value)} />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Age" error={errors.age}>
                <input className={inputCls(errors.age)} placeholder="34" type="number" min="1" value={form.age} onChange={(e) => change("age", e.target.value)} />
              </Field>
              <Field label="Gender" error={errors.gender}>
                <div className="relative">
                  <select className={`${inputCls(errors.gender)} appearance-none pr-8`} value={form.gender} onChange={(e) => change("gender", e.target.value)}>
                    <option value="">Select</option>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Blood Group" error={errors.blood}>
                <div className="relative">
                  <select className={`${inputCls(errors.blood)} appearance-none pr-8`} value={form.blood} onChange={(e) => change("blood", e.target.value)}>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email" error={errors.email}>
                <input className={inputCls(errors.email)} placeholder="patient@gmail.com" type="email" value={form.email} onChange={(e) => change("email", e.target.value)} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input className={inputCls(errors.phone)} placeholder="+94 77 000 0000" value={form.phone} onChange={(e) => change("phone", e.target.value)} />
              </Field>
            </div>
            <Field label="Status">
              <div className="flex gap-3">
                {["Active", "Inactive"].map((s) => (
                  <button key={s} onClick={() => change("status", s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${form.status === s
                        ? s === "Active" ? "bg-emerald-50 border-emerald-300 text-emerald-600" : "bg-slate-100 border-slate-300 text-slate-600"
                        : "border-slate-200 text-slate-400 hover:border-slate-300 bg-white"
                      }`}>{s}</button>
                ))}
              </div>
            </Field>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition bg-white">Cancel</button>
            <button onClick={modal === "create" ? handleCreate : handleUpdate} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition">
              {modal === "create" ? "Add Patient" : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {modal === "delete" && selected && (
        <Modal title="Remove Patient">
          <div className="p-6">
            <p className="text-slate-500 text-sm">
              Are you sure you want to remove <span className="text-slate-700 font-medium">{selected.name}</span>? This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition bg-white">Cancel</button>
            <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition">Remove</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
