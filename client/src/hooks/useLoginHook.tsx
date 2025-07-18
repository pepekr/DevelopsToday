import { useState } from "react";
import { UserLogin } from "../../../shared/interfaces/User";

type Errors = {
  email?: string;
  password?: string;
  login?: string;
};

export function useLoginForm() {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =
    (onSuccess: (data: UserLogin) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        onSuccess(formData);
      }
    };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
}
