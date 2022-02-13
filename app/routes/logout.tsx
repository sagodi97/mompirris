import { ActionFunction, LoaderFunction, redirect } from "remix";
import { Paths } from "~/constants";
import { logout } from "~/utils/auth.server";

export const loader: LoaderFunction = async () => {
  return redirect(Paths.FEED);
};

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};
