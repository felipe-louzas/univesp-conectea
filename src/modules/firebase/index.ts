import { ProfileRepo } from "./repositories/ProfileRepo";

import { getAuth } from "firebase/auth";
import { firebaseApp } from "./config";

import { User } from "../user/UserInfo";

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