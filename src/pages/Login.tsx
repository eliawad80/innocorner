import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const redirectUrl = location.state?.from || "/";

  // Listen for auth state changes and errors
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
      navigate(redirectUrl);
    }
    if (event === "USER_DELETED" || event === "SIGNED_OUT") {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome to InnoCorner
          </h2>
          <p className="text-gray-600">
            Sign in or create an account to continue shopping
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                }
              }
            }
          }}
          providers={["google"]} // Only enable Google for now
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders={false}
          showLinks={true}
          view="sign_in"
        />
      </div>
    </div>
  );
};

export default Login;