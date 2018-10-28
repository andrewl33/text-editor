import { ThunkDispatch } from "redux-thunk";
import { AuthAction, updateToken } from "src/Auth/AuthAction";
import { StoreState } from "../types";

export async function handleAuthRequests<T, U>(
  dispatch: ThunkDispatch<StoreState, void, AuthAction>,
  url: string,
  method: string,
  auth?: string,
  data?: T
): Promise<U> {
  let res;

  const headers = new Headers();
  headers.append("Content-Type", "application/json; charset=utf-8");
  if (auth) {
    headers.append("Authorization", auth);
  }

  const options: RequestInit = {
    method,
    mode: "cors",
    credentials: "include",
    headers
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  try {
    res = await fetch(url);
    const newAuth: string | null = res.headers.get("Authorization");

    if (newAuth && newAuth !== auth) {
      dispatch(updateToken(newAuth));
    }

    return await res.json();
  } catch (e) {
    // tslint:disable-next-line
    console.log(e);
  }

  return ({ success: false } as unknown) as U;
}
