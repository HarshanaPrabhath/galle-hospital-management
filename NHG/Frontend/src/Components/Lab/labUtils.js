export const EMPTY_LAB_FORM = {
  testName: "",
  category: "",
  price: "",
  turnaroundTime: "",
  status: "ACTIVE",
  description: "",
};

export const LAB_STATUSES = ["ACTIVE", "INACTIVE"];

export const getLabId = (lab) => lab?.id ?? lab?._id ?? lab?.labId;

export const getUploadStorageKey = (authData) =>
  `patientLabUploads:${authData?.id || authData?.email || "current"}`;

export const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.labs)) return data.labs;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.reports)) return data.reports;
  return [];
};

export const buildLabPayload = (form) => ({
  testName: form.testName.trim(),
  category: form.category.trim(),
  price: form.price === "" ? null : Number(form.price),
  turnaroundTime: form.turnaroundTime.trim() || null,
  status: form.status,
  description: form.description.trim() || null,
});

export const validateLabForm = (form) => {
  const nextErrors = {};
  if (!form.testName.trim()) nextErrors.testName = "Test name is required.";
  if (!form.category.trim()) nextErrors.category = "Category is required.";
  if (form.price && Number(form.price) < 0) {
    nextErrors.price = "Price cannot be negative.";
  }
  return nextErrors;
};
