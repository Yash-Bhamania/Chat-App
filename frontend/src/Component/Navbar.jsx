import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, LogIn } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const success = await logout();
      if (success) {
        // Force a full page refresh to clear any stale state
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2.5 hover:opacity-80 transition-all cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {authUser ? (
              <>
                <div
                  onClick={() => navigate("/settings")}
                  className="btn btn-sm gap-2 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </div>

                <div 
                  className="btn btn-sm gap-2 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </div>

                <button
                  className="btn btn-sm gap-2 transition-colors cursor-pointer"
                  onClick={logoutHandler}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
               <div
                  onClick={() => navigate("/settings")}
                  className="btn btn-sm gap-2 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </div>
                {/* <div
                  onClick={() => navigate("/login")}
                  className="btn btn-sm gap-2 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </div> */}

                {/* <div
                  onClick={() => navigate("/signup")}
                  className="btn btn-primary btn-sm gap-2 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
