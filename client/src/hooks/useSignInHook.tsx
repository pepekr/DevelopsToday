import { useState } from "react";
import { UserSignIn } from "../../../shared/interfaces/User";

type Errors = Partial<Record<keyof UserSignIn, string>>;

export function useSigninForm() {
  const [formData, setFormData] = useState<UserSignIn>({
    email: "",
    password: "",
    confirmedPassword: "",
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
    if (!formData.confirmedPassword) {
      newErrors.confirmedPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmedPassword) {
      newErrors.confirmedPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =
    (onSuccess: (data: UserSignIn) => void) => (e: React.FormEvent) => {
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
