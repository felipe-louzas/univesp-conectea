import { ProfileRepo } from "./repositories/ProfileRepo";

import { getAuth } from "firebase/auth";
import { firebaseApp } from "./config";

import { User } from "../user/UserInfo";
import { PessoaRepo } from "./repositories/PessoaRepo";

const auth = getAuth(firebaseApp);

export async function getProfileRepository(user?: User): Promise<ProfileRepo> {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) throw new Error('User not logged in');

    if (!user) {
        user = new User(firebaseUser);
        await user.loadProfile();
    }

    return new ProfileRepo(firebaseUser, user);
}

export async function getPessoaRepository(user?: User): Promise<PessoaRepo> {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) throw new Error('User not logged in');

    if (!user) {
        user = new User(firebaseUser);
        await user.loadProfile();
    }

    return new PessoaRepo(user);
}

export async function currentUser(): Promise<User> {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) throw new Error('User not logged in');

    const user = new User(firebaseUser);
    await user.loadProfile();

    return user;
}