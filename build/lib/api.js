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
const consola_1 = __importDefault(require("consola"));
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const connection_1 = require("./connection");
const messages_1 = require("./messages");
/**
 * Manage an interactive Grammarly session.
 */
class Grammarly {
    constructor(options = {}) {
        this.options = options;
    }
    get isEstablished() {
        return (this.connection !== undefined &&
            this.connection instanceof isomorphic_ws_1.default &&
            this.connection.readyState === isomorphic_ws_1.default.OPEN);
    }
    /**
     * Analyse some text
     *
     * @param text text to analyse
     * @param timeout how long to wait before we stop collecting results
     */
    analyse(text, timeout = 30000) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isEstablished) {
                yield this.establish();
            }
            consola_1.default.debug('Successfully connected to Grammarly!');
            return new Promise((resolve, reject) => {
                // Send the text now that we have
                this.connection.send(JSON.stringify(messages_1.buildOTMessage(text)));
                consola_1.default.debug('Sent text to Grammarly!');
                const alerts = [];
                /**
                 * This message handler will listen for all corrections from the server. Once it receives
                 * the {@link CompleteMessage} object the promise will resolve.
                 */
                this.connection.onmessage = (message) => {
                    const parsed = JSON.parse(message.data.toString());
                    // Message is probably a correction
                    if (parsed.action === 'alert') {
                        const alert = parsed;
                        alerts.push(alert);
                    }
                    else if (parsed.action === 'finished') {
                        const result = parsed;
                        resolve({
                            alerts,
                            result,
                            original: text
                        });
                        this.connection.close();
                    }
                };
                // Handle timeout
                const interval = setInterval(() => {
                    reject(new Error('Still waiting for results before timeout'));
                    this.connection.close();
                    clearInterval(interval);
                }, timeout);
            });
        });
    }
    /**
     * Establish communication with the Grammarly API.
     *
     * @returns the initial response message
     * @throws {Object} if cookies are bad
     */
    establish() {
        return __awaiter(this, void 0, void 0, function* () {
            consola_1.default.debug('Re-establishing connection.');
            const { connection } = yield connection_1.connect(this.options.auth);
            this.connection = connection;
            this.connection.send(JSON.stringify(messages_1.buildInitialMessage()));
            consola_1.default.debug('Sent establishing message');
            return new Promise((resolve, reject) => {
                /**
                 * The first message should be in this form:
                 *
                 * ```js
                 * { sid: 0, action: 'start', id: 0 }
                 * ```
                 *
                 *  Receiving this, without another 'error' message, means the connection is
                 *  ready to go and we can start sending text.
                 */
                this.connection.onmessage = (message) => {
                    const parsedMessage = JSON.parse(message.data.toString());
                    if (parsedMessage && parsedMessage.action === 'start') {
                        this.connection.onmessage = () => null; // Garbage collect
                        resolve(parsedMessage);
                    }
                    else {
                        reject(parsedMessage);
                    }
                };
            });
        });
    }
}
exports.Grammarly = Grammarly;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QixrRUFBd0Q7QUFFeEQsNkNBQXVDO0FBQ3ZDLHlDQUE4RTtBQXVCOUU7O0dBRUc7QUFDSCxNQUFhLFNBQVM7SUFXcEIsWUFBb0IsVUFBNEIsRUFBRTtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtJQUFHLENBQUM7SUFSdEQsSUFBWSxhQUFhO1FBQ3ZCLE9BQU8sQ0FDTCxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsWUFBWSx1QkFBUztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsS0FBSyx1QkFBUyxDQUFDLElBQUksQ0FDOUMsQ0FBQztJQUNKLENBQUM7SUFJRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FDbEIsSUFBWSxFQUNaLFVBQWtCLEtBQUs7O1lBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN4QjtZQUVELGlCQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFFdEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDckMsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxpQkFBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUV6QyxNQUFNLE1BQU0sR0FBc0IsRUFBRSxDQUFDO2dCQUVyQzs7O21CQUdHO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsT0FBcUIsRUFBRSxF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