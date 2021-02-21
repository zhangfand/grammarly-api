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
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("./auth");
const connection_1 = require("./connection");
function getPlagiarismHostOrigin() {
    return {
        Host: 'capi.grammarly.com',
        Origin: 'https://www.grammarly.com'
    };
}
exports.getPlagiarismHostOrigin = getPlagiarismHostOrigin;
/**
 * Free Plagiarism Checker
 *
 *
 * @author Stewart McGown
 */
function plagiarism(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const { Host, Origin } = getPlagiarismHostOrigin();
        const auth = yield auth_1.buildAuth(Origin, 'www.grammarly.com', 'https://www.grammarly.com/plagiarism-checker');
        const headers = auth_1.buildAuthHeaders(connection_1.buildCookieString(auth_1.getAuthCookies(auth)), auth.gnar_containerId, Origin, Host);
        headers['Content-Type'] = 'text/plain;charset=UTF-8';
        const response = yield axios_1.default.request({
            url: 'https://capi.grammarly.com/api/check',
            data: text,
            method: "POST",
            headers
        });
        const results = response.data;
        const detected = results.find(r => r.category === 'Plagiarism' || r.group === 'Plagiarism') || {
            count: 0
        };
        // Extract plagiarism
        return Object.assign({}, detected, { text, hasPlagiarism: !!detected.count });
    });
}
exports.plagiarism = plagiarism;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhZ2lhcmlzbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcGxhZ2lhcmlzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLGlDQUFtRjtBQUNuRiw2Q0FBK0M7QUFjL0MsU0FBZ0IsdUJBQXVCO0lBQ3JDLE9BQU87UUFDTCxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLE1BQU0sRUFBRSwyQkFBMkI7S0FDcEMsQ0FBQztBQUNKLENBQUM7QUFMRCwwREFLQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBc0IsVUFBVSxDQUFFLElBQVk7O1FBQzVDLE1BQU0sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLEdBQUcsdUJBQXVCLEVBQUUsQ0FBQztRQUVqRCxNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFTLENBQzFCLE1BQU0sRUFDTixtQkFBbUIsRUFDbkIsOENBQThDLENBQy9DLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyx1QkFBZ0IsQ0FDOUIsOEJBQWlCLENBQUMscUJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLE1BQU0sRUFDTixJQUFJLENBQ0wsQ0FBQztRQUNGLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRywwQkFBMEIsQ0FBQztRQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxPQUFPLENBQ2xDO1lBQ0UsR0FBRyxFQUFFLHNDQUFzQztZQUMzQyxJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTztTQUNSLENBQ0YsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUE2QixRQUFRLENBQUMsSUFBSSxDQUFDO1FBRXhELE1BQU0sUUFBUSxHQUEyQixPQUFPLENBQUMsSUFBSSxDQUNuRCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUM3RCxJQUFJO1lBQ0gsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDO1FBRUYscUJBQXFCO1FBQ3JCLHlCQUNLLFFBQVEsSUFDWCxJQUFJLEVBQ0osYUFBYSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUMvQjtJQUNKLENBQUM7Q0FBQTtBQXRDRCxnQ0FzQ0MifQ==