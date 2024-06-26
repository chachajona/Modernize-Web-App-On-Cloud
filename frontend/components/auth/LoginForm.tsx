"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginSchema, LoginType } from "@/schema/auth.schema";
import { handleSignIn } from "@/lib/cognitoActions";

export function LoginForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const result = await handleSignIn(formData);
      if (result.redirectLink == "/dashboard") {
        toast({
          variant: "default",
          title: "Login successfully!",
          description: "Welcome back to your account",
        });
        router.push(result.redirectLink);
      } else if (result.redirectLink == `/auth/verify?email=${data.email}`) {
        toast({
          variant: "default",
          title: "Action required!",
          description: "Please check your email for the verification code",
        });
        router.push(result.redirectLink);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[600px] flex-shrink-0 space-y-2"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@mail.com" type="email" {...field} />
                  </FormControl>
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
                    <Input placeholder="****" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="!mt-5 w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
