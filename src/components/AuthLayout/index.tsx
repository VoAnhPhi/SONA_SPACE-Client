import { useEffect, useRef, useState, type ReactNode } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import "./styles.scss";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  /** The sign-up form is wider because its fields sit in two columns */
  wide?: boolean;
  children: ReactNode;
}

// Photo on the left, form on the right (concept A2). The header sits over a dark page top, so
// no PageHero is needed; on phones the photo is dropped and only the form remains.
export default function AuthLayout({ title, subtitle, wide = false, children }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="auth-photo" aria-hidden="true">
        <p>Không gian sống theo đúng cách bạn sống</p>
      </div>
      <div className="auth-panel">
        <div className={`auth-box${wide ? " auth-box--wide" : ""}`}>
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

interface GoogleButtonProps {
  onSuccess: (response: CredentialResponse) => void;
  onError: () => void;
  text: "signin_with" | "signup_with";
}

// Google draws its own button at a fixed pixel width (200-400); fit it to the form column
export function GoogleButton({ onSuccess, onError, text }: GoogleButtonProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const measure = () => setWidth(Math.max(200, Math.min(400, Math.floor(holder.clientWidth))));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(holder);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="auth-google" ref={holderRef}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        text={text}
        theme="outline"
        shape="rectangular"
        size="large"
        width={width}
        locale="vi"
      />
    </div>
  );
}
