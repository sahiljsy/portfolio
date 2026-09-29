import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page wrap">
      <h1 className="page-title">This page doesn't exist</h1>
      <p className="lede">
        The link may be old. <Link href="/">Go to the home page</Link>.
      </p>
    </div>
  );
}
