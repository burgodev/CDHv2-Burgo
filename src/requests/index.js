import { adminRequests } from './admin/adminRequest';
import { openRequests } from './open/openRequest';
import { userRequest } from "@/requests/user/userRequest";
let configs = {
    port: 1337,
    protocol: 'http',
    baseUrl: 'localhost',
};
let AdminRequest = new adminRequests(configs);
let OpenRequest = new openRequests(configs);
let UserRequest = new userRequest(configs);
export { AdminRequest as AdminAPI };
export { OpenRequest as OpenAPI };
export { UserRequest as UserAPI };
//# sourceMappingURL=index.js.map