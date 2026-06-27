import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/types/api";

export interface CustomerAuthUser {
  Id: number;
  name: string;
  Phone?: string;
  phone?: string;
}

export interface CustomerAuthResult {
  token: string;
  customer: CustomerAuthUser;
}

export async function loginCustomer(
  phone: string,
  password: string,
): Promise<CustomerAuthResult> {
  const res = await apiFetch<ApiResponse<CustomerAuthResult>>(
    "/customer/login",
    {
      method: "POST",
      body: JSON.stringify({
        phone,
        password,
      }),
    },
  );

  return res.data;
}

export async function registerCustomer(
  fullName: string,
  phone: string,
  password: string,
): Promise<CustomerAuthUser> {
  const res = await apiFetch<ApiResponse<CustomerAuthUser>>(
    "/customer/register",
    {
      method: "POST",
      body: JSON.stringify({
        name: fullName.trim(),
        phone,
        password,
      }),
    },
  );

  return res.data;
}
