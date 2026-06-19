import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Proof } from "./pages/Proof";
import { Tools } from "./pages/Tools";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "about", Component: About },
      { path: "proof", Component: Proof },
      { path: "tools", Component: Tools },
      { path: "contact", Component: Contact },
      { path: "privacy", Component: PrivacyPolicy },
    ],
  },
]);