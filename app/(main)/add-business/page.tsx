import { AddBusinessForm } from "@/lib/components/add-business-form";

export default function AddBusinessPage() {
  return (
    <main className="space-y-4 py-4">
      <h1 className="text-xl font-bold">Adaugă business</h1>
      <p className="text-sm text-gray-600">Trimite datele firmei tale. Echipa verifică înainte de publicare.</p>
      <AddBusinessForm />
    </main>
  );
}
