import React from "react";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

const TermsOfUse = () => {
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
            Terms of Use
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Welcome to the National Hospital Galle website. By accessing or
            using this website, you agree to comply with these Terms of Use.
            Please read them carefully before using our online services.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Website Access",
              value: "Public",
            },
            {
              label: "Information",
              value: "Official",
            },
            {
              label: "User Responsibility",
              value: "Required",
            },
            {
              label: "Terms Status",
              value: "ACTIVE",
              isLive: true,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center"
            >
              {item.isLive ? (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#02342c] text-[#00e676] rounded-md mb-2">
                  {item.value}
                </span>
              ) : (
                <span className="block text-xl font-bold text-[#02342c]">
                  {item.value}
                </span>
              )}

              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Terms Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Acceptable Use */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">✅</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Acceptable Use
              </h2>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Use this website only for lawful purposes.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Do not attempt to disrupt or interfere with website services.
              </li>

              <li className="flex gap-3">
                <span className="text-[#00e676] font-bold">✔</span>
                Respect the privacy and rights of other users.
              </li>
            </ul>
          </div>

          {/* Information Accuracy */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">📄</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Information Accuracy
              </h2>
            </div>

            <p className="text-gray-700 leading-7">
              National Hospital Galle makes every effort to ensure that the
              information published on this website is accurate and up to date.
              However, medical services, schedules, contact details, and other
              information may change without prior notice.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">©️</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Intellectual Property
              </h2>
            </div>

            <p className="text-gray-700 leading-7">
              All website content including text, images, graphics, logos,
              documents, and design elements are the property of National
              Hospital Galle unless otherwise stated. Unauthorized copying,
              reproduction, or distribution is prohibited.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">⚖️</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Limitation of Liability
              </h2>
            </div>

            <p className="text-gray-700 leading-7">
              The website is provided for informational purposes only and does
              not replace professional medical advice. National Hospital Galle
              is not liable for any direct or indirect loss resulting from the
              use of information available on this website.
            </p>
          </div>

          {/* External Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">🔗</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                External Links
              </h2>
            </div>

            <p className="text-gray-700 leading-7">
              This website may contain links to external websites for your
              convenience. National Hospital Galle is not responsible for the
              content, privacy practices, or availability of third-party
              websites.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl">🔄</span>
              </div>

              <h2 className="text-2xl font-bold text-[#02342c]">
                Changes to These Terms
              </h2>
            </div>

            <p className="text-gray-700 leading-7">
              National Hospital Galle reserves the right to modify these Terms
              of Use at any time. Updated versions will be published on this
              page, and continued use of the website constitutes acceptance of
              the revised terms.
            </p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-10 bg-[#02342c] text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f5a623]/10 to-transparent rounded-full"></div>

          <div>
            <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest block mb-2">
              Need Assistance?
            </span>

            <h3 className="text-2xl font-extrabold mb-2">
              Contact National Hospital Galle
            </h3>

            <p className="text-gray-300 text-sm max-w-xl">
              If you have any questions regarding these Terms of Use or require
              further clarification, please contact our administration office.
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
                className="text-sm font-semibold hover:text-[#f5a623] transition-colors"
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

export default TermsOfUse;