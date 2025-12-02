/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/Password";
// import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: "Name is too short" })
      .max(50, { error: "Name is too big" }),
    email: z.email(),
    password: z
      .string()
      .min(6, { error: "password must be 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { error: "confirm password did not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",

      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register(data).unwrap();

      toast.success("Account created successfully");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="grid justify-center items-center min-h-screen min-w-full">
      <div className="flex flex-col justify-center w-xl max-w-2xl min-w-lg min-h-screen">
        <div className="flex flex-col  justify-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            A few moments before you business skyrockets!
          </p>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(" flex flex-col gap-3 justify-center px-12")}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter your name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is a field for the name input
                      </FormDescription>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@company.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is a field for the email input
                      </FormDescription>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="******* " type="password" {...field} /> */}
                        <Password {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is a field for the password input
                      </FormDescription>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is a field to confirm your password
                      </FormDescription>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

                <Button className="dark:text-white" type="submit">
                  Login
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm mt-10">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="relative max-h-svh w-full">
        <img src={registerImg} className="max-h-svh w-full" />
      </div> */}
    </div>
  );
};

export default Register;
