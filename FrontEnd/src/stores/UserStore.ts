import { SimpleEventEmitter,Listener } from '@/lib/utils/eventEmitter';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import {
    USERS_REQ, USERS_OK, USERS_ERR,
    USER_ADD_REQ, USER_ADD_OK, USER_ADD_ERR,
} from '@/actions/user/userActions';
import type { User } from '@/types';

type State = { loading: boolean; users: User[]; error?: string };
let state: State = { loading: false, users: [] };

class UserStore {
    private emitter = new SimpleEventEmitter();

    addChangeListener(fn: Listener) { this.emitter.on(fn); }
    removeChangeListener(fn: Listener) { this.emitter.off(fn); }
    getState(): State { return state; }

    handle = (action: any) => {
        switch (action.type) {
            case USERS_REQ:
            case USER_ADD_REQ:
                state = { ...state, loading: true };
                break;
            case USERS_OK:
                state = { loading: false, users: action.payload };
                break;
            case USER_ADD_OK:
                state = { ...state, loading: false };
                break;
            case USERS_ERR:
            case USER_ADD_ERR:
                state = { ...state, loading: false, error: action.error };
                break;
        }
        this.emitter.emit();
    };
}

export const userStore = new UserStore();
AppDispatcher.register(userStore.handle);
