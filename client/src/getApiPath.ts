import { env } from "~/env";

export const getApiPath = (path: string) =>
  `${env.NEXT_PUBLIC_API_URL}${path.startsWith("/") ? path.slice(1) : path}`;
export const getApiPathWebSocket = (path: string) =>
  `${env.NEXT_PUBLIC_WS_URL}${path.startsWith("/") ? path.slice(1) : path}`;
