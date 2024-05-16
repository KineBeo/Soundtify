import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/uses.module";
import AuthenticationController from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";

@Module({
    imports: [
        UsersModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})
export class AuthenticationModule {}