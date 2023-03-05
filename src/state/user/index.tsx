import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { User } from '@/interfaces/user/profile';

export const resetUserAtom = atom(false);

export const userAtom = atomWithReset<User>({ pk: '', sk: '', ext: false });
