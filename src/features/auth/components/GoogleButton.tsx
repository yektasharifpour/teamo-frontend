import { useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { googleLogin } from "../../../services/authService";

interface GoogleCredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;

          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
            },
          ) => void;
        };
      };
    };
  }
}

export default function GoogleButton() {
  const hiddenButtonRef = useRef<HTMLDivElement>(null);
  const auth = useAuth();
  const handleCredentialResponse = async (
    response: GoogleCredentialResponse,
  ) => {
    try {
      const data = await googleLogin(response.credential);

      auth.login(data.token, data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google) {
        setTimeout(initializeGoogle, 500);
        return;
      }

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      if (hiddenButtonRef.current) {
        window.google.accounts.id.renderButton(hiddenButtonRef.current, {
          theme: "outline",
          size: "large",
        });
      }
    };

    initializeGoogle();
  }, []);

  const handleGoogleLogin = () => {
    const googleButton = hiddenButtonRef.current?.firstElementChild;

    if (googleButton instanceof HTMLElement) {
      googleButton.click();
    }
  };

  return (
    <>
      <div ref={hiddenButtonRef} className="hidden"></div>

      <button
        onClick={handleGoogleLogin}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/90
          py-4
          text-black
          backdrop-blur-md
          transition-all
          hover:bg-white
        "
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="google"
          className="h-5 w-5"
        />

        <span className="font-medium">ورود با گوگل</span>
      </button>
    </>
  );
}
