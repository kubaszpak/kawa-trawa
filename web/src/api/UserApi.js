import API, { authHeader } from "./ApiConnector";

export class UserApi {
	static async getUser(userId) {
		return API.get(`/users/${userId}`, authHeader());
	}
}
