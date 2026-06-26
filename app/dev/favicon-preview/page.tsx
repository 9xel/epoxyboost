import { notFound } from "next/navigation";

import { FaviconPreviewClient } from "./FaviconPreviewClient";
import "./favicon-preview.css";

export default function FaviconPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <FaviconPreviewClient />;
}
