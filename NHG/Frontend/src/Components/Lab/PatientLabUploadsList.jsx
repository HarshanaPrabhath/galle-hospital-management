import { FileText } from "lucide-react";

export default function PatientLabUploadsList({ onRemove, uploads }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h2 className="font-semibold text-[#002325]">
          Your Uploaded Lab Info
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {uploads.length} records saved
        </p>
      </div>

      {uploads.length ? (
        <div className="divide-y divide-slate-100">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {upload.testName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {upload.fileName} - Report date: {upload.reportDate}
                  </p>
                  {upload.notes && (
                    <p className="mt-1 text-sm text-slate-500">
                      {upload.notes}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(upload.id)}
                className="self-start rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 md:self-center"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          No lab information uploaded yet.
        </div>
      )}
    </div>
  );
}
