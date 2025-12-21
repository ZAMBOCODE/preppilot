import { supabase, type Customer, type CustomerInsert, type CustomerUpdate } from "./supabase";

export async function getCustomers(searchQuery?: string) {
  let query = supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
    );
  }

  const { data, error } = await query;
  return { data, error };
}

export async function getCustomer(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function getCustomerWithMeetings(id: string) {
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (customerError) {
    return { data: null, error: customerError };
  }

  const { data: meetings, error: meetingsError } = await supabase
    .from("meetings")
    .select("*")
    .eq("customer_id", id)
    .order("scheduled_at", { ascending: false });

  if (meetingsError) {
    return { data: null, error: meetingsError };
  }

  return { data: { ...customer, meetings }, error: null };
}

export async function createCustomer(customer: Omit<CustomerInsert, "user_id">, userId: string) {
  const { data, error } = await supabase
    .from("customers")
    .insert({ ...customer, user_id: userId })
    .select()
    .single();
  return { data, error };
}

export async function updateCustomer(id: string, customer: CustomerUpdate) {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase.from("customers").delete().eq("id", id);
  return { error };
}

export type CustomerWithMeetings = Customer & {
  meetings: import("./supabase").Meeting[];
};
