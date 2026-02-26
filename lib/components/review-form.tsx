"use client";

import { useState } from "react";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Textarea } from "@/lib/components/ui/textarea";

export function ReviewForm({ businessId }: { businessId: string }) {
  const [loading, setLoading] = useState(false);

  const submit = async (formData: FormData) => {
    setLoading(true);
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, business_id: businessId }) });
    setLoading(false);
    alert(res.ok ? "Recenzie trimisă pentru aprobare." : "Eroare la trimitere.");
  };

  return (
    <form action={submit} className="space-y-2">
      <Input name="author_name" placeholder="Numele tău" required />
      <Input name="rating" type="number" min={1} max={5} placeholder="Rating 1-5" required />
      <Textarea name="text" placeholder="Spune experiența ta" required />
      <Button disabled={loading} type="submit">Lasă o recenzie</Button>
    </form>
  );
}
