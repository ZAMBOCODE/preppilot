import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconCalendar,
  IconEdit,
  IconMail,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react";
import { getCustomerWithMeetings, deleteCustomer, type CustomerWithMeetings } from "~/lib/customers";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Badge } from "~/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/customers/$customerId/")({
  component: CustomerDetailPage,
});

function CustomerDetailPage() {
  const { customerId } = Route.useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerWithMeetings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  async function loadCustomer() {
    setIsLoading(true);
    setError(null);
    const { data, error } = await getCustomerWithMeetings(customerId);
    if (error) {
      setError(error.message);
    } else {
      setCustomer(data);
    }
    setIsLoading(false);
  }

  async function handleDelete() {
    setIsDeleting(true);
    const { error } = await deleteCustomer(customerId);
    if (error) {
      setError(error.message);
      setIsDeleting(false);
      return;
    }
    navigate({ to: "/customers" });
  }

  if (isLoading) {
    return <CustomerDetailSkeleton />;
  }

  if (error || !customer) {
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
          {error || "The customer you're looking for doesn't exist."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/customers">
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            {customer.company && (
              <p className="text-muted-foreground">{customer.company}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/customers/$customerId/edit" params={{ customerId }}>
              <IconEdit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <IconTrash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {customer.name}? This action
                  cannot be undone and will also delete all associated meetings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customer.email && (
              <div className="flex items-center gap-3">
                <IconMail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${customer.email}`}
                  className="text-primary hover:underline"
                >
                  {customer.email}
                </a>
              </div>
            )}
            {customer.phone && (
              <div className="flex items-center gap-3">
                <IconPhone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${customer.phone}`}
                  className="text-primary hover:underline"
                >
                  {customer.phone}
                </a>
              </div>
            )}
            {!customer.email && !customer.phone && (
              <p className="text-muted-foreground">No contact information</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Style</CardTitle>
          </CardHeader>
          <CardContent>
            {customer.communication_style ? (
              <p className="whitespace-pre-wrap">{customer.communication_style}</p>
            ) : (
              <p className="text-muted-foreground">No notes added yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>
              {customer.meetings.length} meeting
              {customer.meetings.length !== 1 ? "s" : ""} with this customer
            </CardDescription>
          </div>
          <Button asChild>
            <Link to="/meetings/new" search={{ customerId }}>
              <IconCalendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {customer.meetings.length === 0 ? (
            <p className="text-muted-foreground">No meetings scheduled yet</p>
          ) : (
            <div className="space-y-3">
              {customer.meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{meeting.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(meeting.scheduled_at).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        meeting.status === "completed"
                          ? "default"
                          : meeting.status === "cancelled"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {meeting.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        to="/meetings/$meetingId"
                        params={{ meetingId: meeting.id }}
                      >
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CustomerDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}
