import { loadUsers, updateUser, deleteUser } from '@/actions/user/userThunks';
export const useUserActions = () => ({ loadUsers, updateUser, deleteUser });
