import { getCategories } from "@/lib/api/main.api";
import Footer from "./components/main.footer";
import Header from "./components/main.header";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { AuthProvider } from "../context/auth-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luoiflix",
  description: "Website bài tập thôi nhá",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const res = await getCategories();
  const categories = res.data?.result ?? [];

  const initialUser = await getCurrentUser();

  return (
    <AuthProvider initialUser={initialUser}>
      <Header categories={categories} />
      {children}
      <Footer />
    </AuthProvider>
  );
}