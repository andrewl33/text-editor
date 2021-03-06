import { ThunkDispatch } from "redux-thunk";
import { AuthAction, updateToken } from "../Auth/AuthAction";
import { StoreState } from "../types";

export default async function handleAuthRequests<T, U>(
  dispatch: ThunkDispatch<StoreState, void, AuthAction>,
  url: string,
  method: string,
  auth?: string,
  data?: T
): Promise<U> {
  let res;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (auth) {
    headers.append("Authorization", auth);
  }

  const options: RequestInit = {
    method,
    mode: "same-origin",
    headers
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    res = await fetch(url, options);

    const newAuth: string | null = await res.headers.get("Authorization");

    if (newAuth && newAuth !== auth) {
      dispatch(updateToken(newAuth));
    }
    if (res.status === 422) {
      return ((await { success: false, message: "authFetch" }) as unknown) as U;
    }
    return await res.json();
  } catch (e) {
    // tslint:disable-next-line
    console.log(e);
  }

  return ({ success: false, message: "authFetch" } as unknown) as U;
}
