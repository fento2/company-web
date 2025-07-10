import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { X, Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { apiCall } from "@/helper/apiCall";

interface ISignUp {
  openSignUp: (value: boolean) => void;
  openSignIn: (value: boolean) => void;
}

export default function SignUp(props: ISignUp) {
  const [showPass, setShowPass] = useState(false);

  const inputFirstNameRef = useRef<HTMLInputElement>(null);
  const inputLastNameRef = useRef<HTMLInputElement>(null);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPassRef = useRef<HTMLInputElement>(null);
  const inputConfirmPassRef = useRef<HTMLInputElement>(null);

  const BtSignUp = async () => {
    const firstName = inputFirstNameRef.current?.value;
    const lastName = inputLastNameRef.current?.value;
    const username = inputUsernameRef.current?.value;
    const email = inputEmailRef.current?.value;
    const password = inputPassRef.current?.value;
    const confirmPassword = inputConfirmPassRef.current?.value;


    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {

      await apiCall.post("/accounts", {

        firstName,
        lastName,
        username,
        email,
        password,

      });



      toast.success("Account created successfully!");

      inputFirstNameRef.current!.value = "";
      inputLastNameRef.current!.value = "";
      inputUsernameRef.current!.value = "";
      inputEmailRef.current!.value = "";
      inputPassRef.current!.value = "";
      inputConfirmPassRef.current!.value = "";

      props.openSignUp(false);
      props.openSignIn(true);


    } catch  {
    
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="relative w-full max-w-md">
        {/* Close Button */}
        <X className="absolute top-4 right-4 text-black cursor-pointer"
          onClick={() => props.openSignUp(false)} />

        <Card className="rounded-none">
          {/* Header */}
          <CardHeader className="space-y-2">
            <h2 className="text-2xl font-bold text-center text-slate-700">Sign Up</h2>
            <p className="text-sm text-center text-slate-500">
              Please fill in your information to create an account
            </p>
          </CardHeader>

          {/* Form Fields */}
          <CardContent className="space-y-4">
            {/* First Name */}
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                className="w-full rounded-none"
                ref={inputFirstNameRef}
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                className="w-full rounded-none"
                ref={inputLastNameRef}
                required
              />
            </div>

            {/* Username */}
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="johndoe123"
                className="w-full rounded-none"
                ref={inputUsernameRef}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-none"
                ref={inputEmailRef}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="********"
                  className="w-full rounded-none"
                  ref={inputPassRef}
                  required
                />
                {showPass ? (
                  <Eye
                    className="absolute top-2.5 right-4 w-4 h-4 text-stone-600 cursor-pointer"
                    onClick={() => setShowPass(false)}
                  />
                ) : (
                  <EyeOff
                    className="absolute top-2.5 right-4 w-4 h-4 text-stone-600 cursor-pointer"
                    onClick={() => setShowPass(true)}
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPass ? "text" : "password"}
                placeholder="********"
                className="w-full rounded-none"
                ref={inputConfirmPassRef}
                required
              />
            </div>

            {/* Submit */}
            <Button
              onClick={BtSignUp}
              className="w-full mt-4 bg-stone-500 text-white hover:bg-stone-800 rounded-none"
            >
              Sign Up
            </Button>
          </CardContent>

          {/* Footer */}
          <CardFooter>
            <p className="text-sm text-slate-600 w-full">
              Already have an account?{" "}
              <span
                className="text-stone-600 hover:underline cursor-pointer"
                onClick={() => {
                  props.openSignUp(false);
                  props.openSignIn(true);
                }}
              >
                Sign In
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
