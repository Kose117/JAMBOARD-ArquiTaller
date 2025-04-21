import { axiosApi as axios } from '@/lib/api/axios';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import {
    usersReq, usersOk, usersErr,
} from './userActions';
import type {UpdateUserInput } from '@/types';

export const loadUsers = async () => {
    AppDispatcher.dispatch(usersReq());
    try {
        const { data } = await axios.get('/user');
        AppDispatcher.dispatch(usersOk(data));
    } catch (e) {
        AppDispatcher.dispatch(usersErr((e as Error).message));
    }
};



export const updateUser = async (upd: UpdateUserInput) => {
    await axios.patch(`/user/`, upd);
    await loadUsers();
};

export const deleteUser = async () => {
    await axios.delete(`/user/`);
    await loadUsers();
};

