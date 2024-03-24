import env from "../config/env";
import * as admin from "firebase-admin";
import * as firebase from "firebase/app";
import { LoginDTO } from "../types/auth/auth";
import { ResponseService } from "./response";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ResponseDto } from "types/response/dtos";

export class AuthService {
  private readonly firebaseAdmin: admin.app.App;
  constructor() {
    this.login = this.login.bind(this);

    if (!firebase.getApps.length) {
      firebase.initializeApp(env.firebase.firebaseAuthConfig);
    }
  }

  public async login(payload: LoginDTO): Promise<ResponseDto<string>> {
    const auth = await getAuth();
    const token = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return ResponseService.printResponse<string>(
      200,
      "Login successful",
      await token.user.getIdToken()
    );
  }
}
