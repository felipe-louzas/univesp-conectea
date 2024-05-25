import { SignJWT, importPKCS8 } from "jose"

export async function createCustomUserToken(uid: string) {
    const alg = 'RS256'

    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || '';
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '';

    if (serviceAccount === '' || serviceAccountKey === '') {
        throw new Error('Firebase service account not defined');
    }

    const privateKey = await importPKCS8(serviceAccountKey.replace(/\\n/g, '\n'), alg)

    const jwt = await new SignJWT({ uid })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(serviceAccount)
        .setSubject(serviceAccount)
        .setAudience('https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit')
        .setExpirationTime('1h')
        .sign(privateKey)

    return jwt;
}
