"use server";
import * as controller from "./controller.js";

// @ Register User
export const registerAction = controller.register;

// @ Login User
export const loginAction = controller.login;

// @ Logout User
export const logoutAction = controller.logout;
