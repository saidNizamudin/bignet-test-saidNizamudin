import AxiosInstances from 'axios';

const axios = AxiosInstances.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
	headers: {
		'Content-Type': 'application/json',
		Bearer: 'Bearer ' + localStorage.getItem('token'), //Disini biasanya diisini dengan token yang didapat dari login
	},
});
export default axios;

export function getPosts() {
	return axios({
		method: 'get',
		url: `posts`,
	});
}

export function testSendAPIWithBody(data) {
	return axios({
		method: 'post',
		url: `posts`,
		data: data,
	});
}

export function testSendAPIWithParams(id) {
	return axios({
		method: 'get',
		url: `posts/${id}`,
	});
}
