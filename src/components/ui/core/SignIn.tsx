"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { X, Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import { toast } from "sonner";
import { useAppDispatch} from "@/lib/redux/hook";
import { login } from "@/lib/redux/features/userSlice";
import { Checkbox } from "../checkbox";
interface ISignIn {
    openSignIn: (value: boolean) => void;
    openSignUp: (value: boolean) => void;
}

export default function SignIn(props: ISignIn) {
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPassRef = useRef<HTMLInputElement>(null);
    const [showPass, setShowPass] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useAppDispatch();



    const BtSignIn = async () => {
        const email = inputEmailRef.current?.value;
        const pass = inputPassRef.current?.value;

        if (!email || !pass) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const res = await apiCall.get("/accounts", {
                params: {
                    where: `email = '${email}' AND password = '${pass}'`,
                },
            });

            if (!res.data[0]) {
                toast.error("Incorrect email or password.");
                return;
            }

            const userData = {
                objectId: res.data[0].objectId ?? "",
                username: res.data[0].username ?? "",
                firstName: res.data[0].firstName ?? "",
                lastName: res.data[0].lastName ?? "",
                isLogin: true,
            };

            dispatch(login(userData));
            toast.success(`Welcome ${userData.username}`);

            // Simpan ke localStorage atau sessionStorage
            if (rememberMe) {
                localStorage.setItem("tkn", userData.objectId);
            } else {
                sessionStorage.setItem("tkn", userData.objectId);
            }

            props.openSignIn(false);
        } catch (error) {
          
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-black/30 backdrop-blur-xs">
            <div className="relative w-full max-w-md">
                <X
                    className="absolute top-4 right-4 text-black cursor-pointer"
                    onClick={() => props.openSignIn(false)}
                />

                <Card className="rounded-none">
                    <CardHeader className="space-y-2">
                        <h2 className="text-2xl font-bold text-center text-slate-700">Sign In</h2>
                        <p className="text-sm text-center text-slate-500">Please enter your credentials</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-none"
                                ref={inputEmailRef}
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    placeholder="********"
                                    className="w-full rounded-none"
                                    ref={inputPassRef}
                                />
                                {showPass ? (
                                    <Eye className="absolute top-2.5 right-4 w-4 h-4 text-stone-600 cursor-pointer" onClick={() => setShowPass(false)} />
                                ) : (
                                    <EyeOff className="absolute top-2.5 right-4 w-4 h-4 text-stone-600 cursor-pointer" onClick={() => setShowPass(true)} />
                                )}
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2 mt-2">
                            <Checkbox
                                id="rememberMe"
                                checked={rememberMe}
                                onCheckedChange={(val) => setRememberMe(!!val)}
                                //versi sederhana yang diatas
                                // onCheckedChange={(val) => {
                                //     if (val) {
                                //         setRememberMe(true);
                                //     } else {
                                //         setRememberMe(false);
                                //     }
                                // }}
                                className="border-stone-400 data-[state=checked]:bg-stone-500 data-[state=checked]:text-white data-[state=checked]:border-none transition duration-200
                                rounded-none"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-slate-600">
                                Remember me
                            </label>
                        </div>

                        <Button className="w-full mt-4 bg-stone-500 text-white hover:bg-stone-800 rounded-none" onClick={BtSignIn}>
                            Sign In
                        </Button>
                    </CardContent>

                    <CardFooter>
                        <p className="text-sm text-center text-slate-600">
                            Don&apos;t have an account?{" "}
                            <span
                                className="text-stone-600 hover:underline cursor-pointer"
                                onClick={() => {
                                    props.openSignIn(false);
                                    props.openSignUp(true);
                                }}
                            >
                                Sign Up
                            </span>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
