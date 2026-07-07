import { useState } from "react";
import AppointmentSuccess from "../Components/BookAppointment/AppointmentSuccess";
import BookAppointmentForm from "../Components/BookAppointment/BookAppointmentForm";
import { EMPTY_APPOINTMENT_FORM } from "../Components/BookAppointment/bookAppointmentData";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

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
