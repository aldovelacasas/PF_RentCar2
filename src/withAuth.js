import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./app/context/AuthContext";

export function withAuth(ProtectedRoute) {
  function AuthenticatedComponent(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    return user ? <ProtectedRoute {...props} /> : null;
  }

  return AuthenticatedComponent;
}
