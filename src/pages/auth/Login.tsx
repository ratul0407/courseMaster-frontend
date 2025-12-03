import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import Password from "@/components/ui/Password";
import config from "@/config";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
const Login = () => {
  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth();
  const [login] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: unknown) => {
    try {
      const res = await login(data).unwrap();
      if (res?.success) {
        setAuthLogin(res?.data?.user);
        toast.success("Login successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const handleDemoAdminLogin = async () => {
    onSubmit({ email: config.admin_email, password: config.admin_pass });
  };
  const handleDemoStudentLogin = async () => {
    onSubmit({ email: config.student_email, password: config.student_pass });
  };
  return (
    <div className="max-w-xl mx-auto items-center justify-center grid min-h-svh lg:gap-12 ">
      <div className="flex flex-col  justify-center gap-2 text-center min-w-xl">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-xs items-center justify-center  mx-auto">
          <Button onClick={handleDemoAdminLogin}>Demo Admin</Button>
          <Button onClick={handleDemoStudentLogin}>Demo Student</Button>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn(" flex flex-col gap-6 justify-center px-12")}
            >
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="dark:text-white" type="submit">
                Login
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm mt-10">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="ml-1 underline underline-offset-4">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
