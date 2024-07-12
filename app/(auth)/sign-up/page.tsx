"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { FaChevronLeft } from "react-icons/fa";

const FormSchema = z.object({
  email: z.string().email({ message: "Email is not valid!" }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { username: data.username } },
    });

    if (!error) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ email: data.email }]);

      if (profileError) {
        console.error(profileError);
        await supabase.auth.admin.deleteUser(data.email);
        toast({
          title: "Profile creation failed!",
          variant: "destructive",
        });
        router.push("/sign-up");
      } else {
        toast({
          title: "Sign up success!",
          variant: "default",
        });
        router.push("/");
      }
    } else {
      toast({
        title: "Sign up failed!",
        variant: "destructive",
      });
    }
  }

  return (
    <main className="flex flex-col items-center h-screen justify-center">
      <div className="w-1/3">
        <div className="flex items-center justify-start gap-4 mb-4">
          <FaChevronLeft
            className="cursor-pointer p-1"
            size={24}
            onClick={() => router.back()}
          />
          <h1 className="text-2xl text-center font-bold">Sign Up</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full !mt-10 !mb-2" type="submit">
              Sign Up
            </Button>
            <a className="text-sm underline underline-offset-2" href="/sign-in">
              Already have an account?
            </a>
          </form>
        </Form>
      </div>
    </main>
  );
}
