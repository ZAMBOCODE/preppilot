import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { createCustomer } from "~/lib/customers";
import { useAuth } from "~/contexts/auth";
import { CustomerForm } from "~/components/customer-form";
import type { CustomerFormData } from "~/lib/validations/customer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/_authenticated/customers/new")({
  component: NewCustomerPage,
});

function NewCustomerPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CustomerFormData) {
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    const { data: customer, error } = await createCustomer(
      {
        name: data.name,
        company: data.company || null,
        email: data.email || null,
        phone: data.phone || null,
        communication_style: data.communication_style || null,
      },
      user.id
    );

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    navigate({ to: "/customers/$customerId", params: { customerId: customer.id } });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/customers">
            <IconArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Customer</h1>
          <p className="text-muted-foreground">Add a new customer to your list</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            Enter the customer's information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Create Customer"
          />
        </CardContent>
      </Card>
    </div>
  );
}
