import { useEffect, useState } from "react";
import { getAuthData } from "../../Utils/auth";
import AvailableLabTests from "./AvailableLabTests";
import PatientLabUploadForm from "./PatientLabUploadForm";
import PatientLabUploadsList from "./PatientLabUploadsList";
import { getUploadStorageKey } from "./labUtils";

const EMPTY_UPLOAD_FORM = {
  testName: "",
  reportDate: "",
  notes: "",
  fileName: "",
};

export default function PatientLabPortal({ labs }) {
  const authData = getAuthData();
  const storageKey = getUploadStorageKey(authData);
  const [uploads, setUploads] = useState([]);
  const [form, setForm] = useState(EMPTY_UPLOAD_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setUploads(JSON.parse(localStorage.getItem(storageKey) || "[]"));
      } catch {
        setUploads([]);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [storageKey]);

  const activeLabs = labs.filter((lab) => lab.status !== "INACTIVE");

  const change = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
    setSuccess("");
  };

  const submitUpload = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.testName.trim()) {
      setError("Please select or enter the lab test name.");
      return;
    }

    if (!form.reportDate) {
      setError("Please select the report date.");
      return;
    }

    if (!form.fileName) {
      setError("Please choose a lab report file.");
      return;
    }

    const nextUpload = {
      id: crypto.randomUUID(),
      testName: form.testName.trim(),
      reportDate: form.reportDate,
      notes: form.notes.trim(),
      fileName: form.fileName,
      uploadedAt: new Date().toISOString(),
    };
    const nextUploads = [nextUpload, ...uploads];

    localStorage.setItem(storageKey, JSON.stringify(nextUploads));
    setUploads(nextUploads);
    setForm(EMPTY_UPLOAD_FORM);
    setSuccess("Lab information added to your patient portal.");
  };

  const removeUpload = (id) => {
    const nextUploads = uploads.filter((upload) => upload.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(nextUploads));
    setUploads(nextUploads);
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Patient Labs
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          Upload Lab Information
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Add your lab report details and keep diagnostic information together
          in your patient portal.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <PatientLabUploadForm
          activeLabs={activeLabs}
          error={error}
          form={form}
          onChange={change}
          onSubmit={submitUpload}
          success={success}
        />
        <AvailableLabTests activeLabs={activeLabs} />
      </div>

      <PatientLabUploadsList uploads={uploads} onRemove={removeUpload} />
    </div>
  );
}
