"use client";
import React, { useEffect } from "react";
import * as Form from "./Form";
import { useForm } from "./FormProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { state, isPending, dispatch } = useForm();

  const { errors, success, defaultValue } = state;

  useEffect(() => {
    if (state?.toast) {
      toast(state.toast);
    }
  }, [state]);

  return (
    <Form.Root action={dispatch}>
      <Form.Header title={"Register"} subTitle={"Enter your details account"} />
      <Form.Input
        name={"username"}
        error={errors?.username}
        value={defaultValue?.username}
      />
      <Form.Input
        name={"email"}
        type={"email"}
        error={errors?.email}
        value={defaultValue?.email}
      />
      <Form.Input
        name={"password"}
        type={"password"}
        error={errors?.password}
        value={defaultValue?.password}
      />

      <Form.SubmitBtn title={"Register"} isDisabled={isPending} />

      <div className="mt-16 flex items-center justify-between">
        <span className="text-gray-400 text-sm">Have an account?</span>
        <Link
          href={"/login"}
          className="bg-[#2e2e34] text-white px-5 py-2.5 rounded-lg text-sm hover:bg-[#3a3a42] transition-colors duration-300"
        >
          Sign in
        </Link>
      </div>
    </Form.Root>
  );
};

export default RegisterForm;
