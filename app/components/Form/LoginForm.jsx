"use client";

import React, { useEffect } from "react";
import * as Form from "@/app/components/Form/Form";
import { useForm } from "./FormProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { state, isPending, dispatch } = useForm();

  const { errors, defaultValue, success } = state;

  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.replace("/");
      return;
    }

    toast(state?.errors);
  }, [state]);

  return (
    <Form.Root action={dispatch}>
      <Form.Header title={"Login"} subTitle={"Enter your details account"} />
      <Form.Input
        name={"email"}
        type={"email"}
        error={errors?.email}
        value={defaultValue?.email}
      />
      <Form.Input
        name={"password"}
        type={"password"}
        error={state?.errors?.password}
        value={defaultValue?.password}
      />

      <Form.SubmitBtn title={"Login"} isDisabled={isPending} />

      <div className="mt-16 flex items-center justify-between">
        <span className="text-gray-400 text-sm">Don't have an account?</span>
        <Link
          href={"/register"}
          className="bg-[#2e2e34] text-white px-5 py-2.5 rounded-lg text-sm hover:bg-[#3a3a42] transition-colors duration-300"
        >
          Sign up
        </Link>
      </div>
    </Form.Root>
  );
};

export default LoginForm;
