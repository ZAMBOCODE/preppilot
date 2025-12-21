import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { getCustomer, updateCustomer } from "~/lib/customers";
import type { Customer } from "~/lib/supabase";
import { CustomerForm } from "~/components/customer-form";
import type { CustomerFormData } from "~/lib/validations/customer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/customers/$customerId/edit")({
  component: EditCustomerPage,
});

function EditCustomerPage() {
  const { customerId } = Route.useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  async function loadCustomer() {
    setIsLoading(true);
    setError(null);
    const { data, error } = await getCustomer(customerId);
    if (error) {
      setError(error.message);
    } else {
      setCustomer(data);
    }
    setIsLoading(false);
  }

  async function handleSubmit(data: CustomerFormData) {
    setIsSubmitting(true);
    setError(null);

    const { error } = await updateCustomer(customerId, {
      name: data.name,
      company: data.company || null,
      email: data.email || null,
      phone: data.phone || null,
      communication_style: data.communication_style || null,
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    navigate({ to: "/customers/$customerId", params: { customerId } });
  }

  if (isLoading) {
    return <EditCustomerSkeleton />;
  }

  if (error && !customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/customers">
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Not Found</h1>
        </div>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/customers/$customerId" params={{ customerId }}>
            <IconArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Customer</h1>
          <p className="text-muted-foreground">Update {customer?.name}'s information</p>
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
            Update the customer's information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customer && (
            <CustomerForm
              defaultValues={{
                name: customer.name,
                company: customer.company || "",
                email: customer.email || "",
                phone: customer.phone || "",
                communication_style: customer.communication_style || "",
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Save Changes"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EditCustomerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-96" />
    </div>
  );
}
