import { getLabId } from "./labUtils";

export default function AvailableLabTests({ activeLabs }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-[#002325]">
        Available lab tests
      </p>
      <p className="mt-1 text-sm text-slate-500">
        These tests are maintained by hospital admins.
      </p>

      <div className="mt-4 space-y-3">
        {activeLabs.slice(0, 6).map((lab) => (
          <div
            key={getLabId(lab)}
            className="rounded-lg border border-slate-200 bg-white p-3"
          >
            <p className="text-sm font-semibold text-slate-800">
              {lab.testName}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {lab.category || "General"}
              {lab.turnaroundTime ? ` - ${lab.turnaroundTime}` : ""}
            </p>
          </div>
        ))}

        {!activeLabs.length && (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            No active lab tests are available yet. You can still type your test
            name manually.
          </p>
        )}
      </div>
    </div>
  );
}
