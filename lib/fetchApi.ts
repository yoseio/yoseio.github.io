import { headers } from "next/headers";

export const fetchApi: typeof fetch = (input, init) => {
  const proto = headers().get("X-Forwarded-Proto") || "http";
  const host = headers().get("host");
  return fetch(`${proto}://${host}/${input}`, init);
};
