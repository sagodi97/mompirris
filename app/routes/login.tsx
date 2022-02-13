import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useActionData,
} from "remix";
import Input from "~/components/Input";
import { Paths } from "~/constants";
import { createUserSession, getUserId, login } from "~/utils/auth.server";

type ActionData = {
  fields?: Record<string, string>;
  fieldErrors?: Record<string, string>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect(Paths.FEED);
  }
  return {};
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { username, password };

  const user = await login({ username, password });
  if (user) {
    return createUserSession(user.id, Paths.FEED);
  } else {
    return json(
      { fields, fieldErrors: { password: "Wrong!!" } },
      { status: 401 }
    );
  }
};

export default function LoginPage() {
  const data = useActionData<ActionData>();
  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <form method="post">
        <div className="popup relative flex w-10/12 flex-col items-center justify-center overflow-hidden bg-white py-7 px-7 md:w-96 md:px-20">
          <h1 className="my-2 text-3xl font-extrabold">Sign In</h1>
          <h2 className="mb-4 text-xs font-light">
            Need an account?{" "}
            <span className="border-b-2 border-gray-800">
              Ask{" "}
              <a
                href="https://twitter.com/sagodi97"
                target="_blank"
                rel="noopener noreferrer"
              >
                Santiago
              </a>{" "}
            </span>
            🧑🏽‍🚀
          </h2>
          <Input
            name="username"
            id="username"
            label="Username"
            placeholder="pedrito.coral"
            defaultValue={data?.fields?.username ?? ""}
            error={[
              !!data?.fieldErrors?.username,
              data?.fieldErrors?.username as string,
            ]}
            required
          />
          <Input
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder="doctora_p_123"
            defaultValue={data?.fields?.username ?? ""}
            error={[
              !!data?.fieldErrors?.password,
              data?.fieldErrors?.password as string,
            ]}
            required
          />
          <button type="submit" className="btn-m btn-cta mt-4 w-full">
            Continue
          </button>
          <a
            href="http://twitter.com/sagodi97"
            target="_blank"
            rel="noopener noreferrer"
            className="my-4 border-b-2 border-gray-400 text-xs text-gray-400"
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
}
