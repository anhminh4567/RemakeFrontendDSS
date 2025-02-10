import { useState } from "react";

function useFormData<T>(initValue?: T) {
  const [formData, setFormData] = useState<T>(initValue ?? ({} as T));
  const setForm = <K extends keyof T>(key: K, value: T[K]): void => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return [formData, setForm];
}

export default useFormData;
