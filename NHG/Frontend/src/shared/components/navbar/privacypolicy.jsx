import React from "react";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-slate-50/50">

        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <span className="inline-block bg-[#f5a623]/10 text-[#f5a623] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-[#f5a623]/20">
            Legal Information
          </span>

          <h1 className="text-4xl font-extrabold text-[#02342c] tracking-tight mb-3">
            Privacy Policy
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            National Hospital Galle is committed to protecting the privacy and
            confidentiality of every patient, visitor, and website user. This
            Privacy Policy explains how we collect, use, store, and safeguard
            your personal information when you use our website.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              title: "Secure Data",
              value: "Protected",
            },
            {
              title: "Patient Privacy",
              value: "Confidential",
            },
            {
              title: "Data Sharing",
              value: "Limited",
            },
            {
              title: "Policy Status",
              value: "ACTIVE",
              live: true,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center"
            >
              {item.live ? (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#02342c] text-[#00e676] rounded-md mb-2">
                  {item.value}
                </span>
              ) : (
                <span className="block text-xl font-bold text-[#02342c]">
                  {item.value}
                </span>
              )}

              <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mt-1">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {/* Policy Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Information Collection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">📋</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Information We Collect
              </h2>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Personal information provided through appointment forms.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Contact details such as email addresses and phone numbers.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Website usage information collected to improve our services.
              </li>
            </ul>
          </div>

          {/* Information Usage */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">🔒</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                How We Use Information
              </h2>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                To manage appointments and healthcare services.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                To communicate important healthcare updates.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                To improve the quality and security of our website.
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">🛡️</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Data Security
              </h2>
            </div>

            <p className="text-gray-700 leading-7">
              We implement appropriate technical and organizational security
              measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
              Only authorized hospital personnel have access to sensitive
              information when required for healthcare services.
            </p>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">⚖️</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Your Rights
              </h2>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Request access to your personal information.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Request correction of inaccurate information.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Contact the hospital regarding privacy concerns.
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-10 bg-[#02342c] text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f5a623]/10 to-transparent rounded-full"></div>

          <div>
            <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest block mb-2">
              Privacy Support
            </span>

            <h3 className="text-2xl font-extrabold mb-2">
              Questions About Your Privacy?
            </h3>

            <p className="text-gray-300 text-sm max-w-xl">
              If you have questions regarding this Privacy Policy or the way
              your information is handled, please contact National Hospital
              Galle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">

            <div className="bg-[#f5a623] text-[#02342c] px-5 py-3 rounded-lg font-bold text-center">
              <span className="block text-xs uppercase">
                Call Us
              </span>

              <a href="tel:+94912232561">
                📞 +94 91 223 2561
              </a>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase text-gray-400">
                Email
              </span>

              <a
                href="mailto:info@gallehospital.lk"
                className="hover:text-[#f5a623]"
              >
                info@gallehospital.lk
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;