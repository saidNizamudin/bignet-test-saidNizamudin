import AxiosInstances from 'axios';

const axios = AxiosInstances.create({
	baseURL: 'blablabla',
});
export default axios;

export function getClient() {
	return axios({
		method: 'get',
		url: `blablabla`,
	});
}
