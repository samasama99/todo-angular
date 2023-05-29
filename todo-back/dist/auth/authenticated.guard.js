"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedGuard = void 0;
class AuthenticatedGuard {
    canActivate(context) {
        const request = context
            .switchToHttp()
            .getRequest();
        return request.isAuthenticated();
    }
}
exports.AuthenticatedGuard = AuthenticatedGuard;
//# sourceMappingURL=authenticated.guard.js.map