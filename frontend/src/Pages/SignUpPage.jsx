// "use client"

import React, { useState,useEffect   } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../Component/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signup, isSigningUp,authUser } = useAuthStore();
  // console.log(isSigningUp)

  useEffect(()=>{
    if(authUser){
      navigate("/home")
    }
  },[authUser])

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Email is Invalid");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be more that 6 word");

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)

    const success =   validateForm()

    if(success===true){
      console.log("enter in sucesssss")
      try {
        await signup(formData)
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left lide of the form  */}

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group ">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium ">Full Name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <User
                    className="size-5 text-base-content/64 "
                    style={{
                      zIndex: 1,
                    }}
                  />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 `}
                  placeholder="Yash Bhamania"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium ">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <Mail
                    className="size-5 text-base-content/40  "
                    style={{
                      zIndex: 1,
                    }}
                  />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 `}
                  placeholder="sample@gmail.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium ">Password</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <Lock
                    className="size-5 text-base-content/60  "
                    style={{
                      zIndex: 1,
                    }}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 `}
                  placeholder="Password "
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin " />
                  Loading
                  {/* {navigate("/")} */}
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center flex justify-center">
            <p className="text-base-content/60 px-2 ">
              Already have an account
            </p>
            {"  "}
            <p
              className="text-base-content/60 link-primary hover:text-base-content/90 cursor-pointer "
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="join our team"
        subtitle="Connect with friends, share Moments and stay in touch with your love ones"
      />
    </div>
  );
};

export default SignUpPage;
