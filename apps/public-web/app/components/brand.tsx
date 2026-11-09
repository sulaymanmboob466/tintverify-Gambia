import Link from "next/link";

type BrandProps = {
  className?: string;
};

export function Brand({ className = "" }: BrandProps) {
  return (
    <Link className={`brand ${className}`.trim()} href="/" aria-label="TintVerify-Gambia home">
      <svg
        aria-hidden="true"
        className="brand-mark"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 3 34 8v10c0 8.9-5.9 15.4-14 19-8.1-3.6-14-10.1-14-19V8l14-5Z" fill="currentColor" />
        <path d="m14 20 4 4 8-9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>
        <strong>TintVerify</strong>
        <small>Gambia</small>
      </span>
    </Link>
  );
}
