import { getAdminCategories } from "@/lib/api/admin.api";
import CategoriesController from "./components/CategoryController";


export default async function AdminCategoriesPage() {

    const categoriesRes = await getAdminCategories();
    const categories = categoriesRes.data?.result ?? [];

    return <CategoriesController categories={categories} />;

}