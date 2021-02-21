"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const auth_1 = require("./auth");
const env_1 = __importDefault(require("./env"));
function buildCookieString(pairs) {
    return Object.keys(pairs).reduce((str, key) => str + key + '=' + pairs[key] + '; ', '');
}
exports.buildCookieString = buildCookieString;
/**
 * Pretty generic headers for connecting
 *
 * @param Cookie a string cookie, used for auth
 */
function buildWebsocketHeaders(Cookie) {
    return {
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        Connection: 'Upgrade',
        Cookie,
        Host: env_1.default.host,
        Origin: env_1.default.origin.firefox,
        Pragma: 'no-cache',
        Upgrade: 'websocket',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    };
}
exports.buildWebsocketHeaders = buildWebsocketHeaders;
/**
 * Create the options needed for connecting to the remote Grammarly host.
 */
function buildWSOptions(auth) {
    const cookie = buildCookieString(auth_1.getAuthCookies(auth));
    return {
        headers: buildWebsocketHeaders(cookie),
        origin: env_1.default.origin.firefox
    };
}
exports.buildWSOptions = buildWSOptions;
/**
 * Connect to the remote WebSocket
 *
 * @param userAuth a custom user auth object
 */
function connect(userAuth) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const auth = userAuth
            ? auth_1.buildAuthWithUserTokens(userAuth)
            : yield auth_1.buildAuth();
        const server = new isomorphic_ws_1.default(env_1.default.endpoint, buildWSOptions(auth));
        server.onopen = () => {
            resolve({
                connection: server,
                auth
            });
        };
        server.onerror = err => {
            reject(err);
            server.close();
        };
    }));
}
exports.connect = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQXNDO0FBQ3RDLGlDQU1nQjtBQUNoQixnREFBd0I7QUEyQnhCLFNBQWdCLGlCQUFpQixDQUFDLEtBQW9CO0lBQ3BELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQzlCLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUksS0FBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFDMUUsRUFBRSxDQUNILENBQUM7QUFDSixDQUFDO0FBTEQsOENBS0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IscUJBQXFCLENBQUMsTUFBYztJQUNsRCxPQUFPO1FBQ0wsaUJBQWlCLEVBQUUsbUJBQW1CO1FBQ3RDLGlCQUFpQixFQUFFLDRCQUE0QjtRQUMvQyxlQUFlLEVBQUUsVUFBVTtRQUMzQixVQUFVLEVBQUUsU0FBUztRQUNyQixNQUFNO1FBQ04sSUFBSSxFQUFFLGFBQUcsQ0FBQyxJQUFJO1FBQ2QsTUFBTSxFQUFFLGFBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTztRQUMxQixNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUUsV0FBVztRQUNwQixZQUFZLEVBQ1YsMkhBQTJIO0tBQzlILENBQUM7QUFDSixDQUFDO0FBZEQsc0RBY0M7QUFFRDs7R0FFRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxJQUFVO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLHFCQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV2RCxPQUFPO1FBQ0wsT0FBTyxFQUFFLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztRQUN0QyxNQUFNLEVBQUUsYUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPO0tBQzNCLENBQUM7QUFDSixDQUFDO0FBUEQsd0NBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLFFBQXVCO0lBQzdDLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdkQsTUFBTSxJQUFJLEdBQUcsUUFBUTtZQUNuQixDQUFDLENBQUMsOEJBQXVCLENBQUMsUUFBUSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxNQUFNLGdCQUFTLEVBQUUsQ0FBQztRQUV0QixNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFTLENBQUMsYUFBRyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVqRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNuQixPQUFPLENBQUM7Z0JBQ04sVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLElBQUk7YUFDTCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBCRCwwQkFvQkMifQ==