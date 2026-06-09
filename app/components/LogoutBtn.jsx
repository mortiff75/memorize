import React, { useActionState } from "react";
import { logoutAction } from "../(auth)/actions";
import { useAuth } from "@/contexts/auth";

const LogoutBtn = () => {
  const { user } = useAuth();

  const [state, dispatch, isPending] = useActionState(logoutAction, {});

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={user._id} />
      <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white hover:text-[#08021C] transition-colors">
        {isPending ? "Loading..." : "LogOut"}
      </button>
    </form>
  );
};

export default LogoutBtn;
