import { User } from '@/common/interfaces/user';
import { atom } from 'jotai';


export const userAtom = atom<User | undefined>(undefined);
