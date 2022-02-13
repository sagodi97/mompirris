import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/app.css";
import { getUserId } from "./utils/auth.server";
import { db } from "./utils/db.server";
import Navbar from "./components/Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en-gb";
import { NAVBAR_HEIGHT, Paths } from "./constants";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "Mompirris" };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return { user: null };
  }
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("Somethings wrong, please contact your admin");
  }

  return { user };
};

export default function App() {
  const data = useLoaderData();
  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar user={data.user} logout={() => navigate(Paths.LOGOUT)} />
        <div style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
