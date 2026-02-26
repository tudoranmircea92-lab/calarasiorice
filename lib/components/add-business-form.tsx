"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Textarea } from "@/lib/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  phone: z.string().min(8),
  whatsapp: z.string().optional(),
  address: z.string().min(5),
  hours: z.string().min(4),
  description: z.string().min(10)
});

type FormData = z.infer<typeof schema>;

export function AddBusinessForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    const res = await fetch("/api/businesses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (res.ok) reset();
    alert(res.ok ? "Mulțumim! Cererea a fost trimisă." : "A apărut o eroare.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Nume business" {...register("name")} />
      <Input placeholder="Categorie" {...register("category")} />
      <Input placeholder="Telefon" {...register("phone")} />
      <Input placeholder="WhatsApp" {...register("whatsapp")} />
      <Input placeholder="Adresă" {...register("address")} />
      <Input placeholder="Program (ex: 09:00-18:00)" {...register("hours")} />
      <Textarea placeholder="Descriere scurtă" {...register("description")} />
      {Object.values(errors)[0]?.message && <p className="text-sm text-rose-600">Completează corect toate câmpurile obligatorii.</p>}
      <Button disabled={isSubmitting} type="submit" className="w-full">Trimite business</Button>
    </form>
  );
}
