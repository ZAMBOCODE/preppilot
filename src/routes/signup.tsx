import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useState, useEffect } from "react";
import { signUpWithEmail } from "~/lib/supabase";
import { useAuth } from "~/contexts/auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const signupSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignupPage() {
  const navigate = useNavigate();
  const { session, isLoading: isAuthLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isAuthLoading && session) {
      navigate({ to: "/" });
    }
  }, [isAuthLoading, session, navigate]);

  const form = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setError(null);
      setIsLoading(true);

      const { data, error: authError } = await signUpWithEmail(
        value.email,
        value.password,
        value.displayName
      );

      setIsLoading(false);

      if (authError) {
        setError(authError.message);
        return;
      }

      // If email confirmation is required, show success message
      if (data.user && !data.session) {
        setSuccess(true);
        return;
      }

      // If auto-confirmed, redirect to dashboard
      navigate({ to: "/" });
    },
  });

  if (success) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Check your email</CardTitle>
              <CardDescription>
                We've sent you a confirmation link. Please check your email to
                complete registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: "/login" })}
              >
                Go to login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          PrepPilot
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                {error && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <form.Field
                  name="displayName"
                  validators={{
                    onChange: signupSchema.shape.displayName,
                  }}
                >
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="John Doe"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        disabled={isLoading}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <FieldDescription className="text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </FieldDescription>
                      )}
                    </Field>
                  )}
                </form.Field>
                <form.Field
                  name="email"
                  validators={{
                    onChange: signupSchema.shape.email,
                  }}
                >
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        disabled={isLoading}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <FieldDescription className="text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </FieldDescription>
                      )}
                    </Field>
                  )}
                </form.Field>
                <form.Field
                  name="password"
                  validators={{
                    onChange: signupSchema.shape.password,
                  }}
                >
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        disabled={isLoading}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <FieldDescription className="text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </FieldDescription>
                      )}
                    </Field>
                  )}
                </form.Field>
                <Field>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign up"}
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <a href="/login" className="underline underline-offset-4">
                      Sign in
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
