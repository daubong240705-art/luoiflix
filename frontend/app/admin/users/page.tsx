import UsersController from "./components/UserController";
import { getAdminUsers } from "@/lib/api/admin.api";



export default async function AdminUsersPage() {

    const usersRes = await getAdminUsers();
    const users = usersRes.data?.result ?? [];

    return <UsersController users={users} />;

}