/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
};
function createResponse(status: number, statusText?: string, body?: string | object, headers?: HeadersInit): Response {
	const bdy = body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body);
	const init: ResponseInit = {
		status: status,
		statusText: statusText,
		headers: headers === undefined ? corsHeaders : {
			...headers,
			...corsHeaders
		},
	};
	if (body === undefined || typeof body === 'string') return new Response(body, init);
	else return Response.json(body, init);
}
async function handleOptions(request: Request<unknown, IncomingRequestCfProperties<unknown>>) {
	if (
		request.headers.get('Origin') !== null &&
		request.headers.get('Access-Control-Request-Method') !== null &&
		request.headers.get('Access-Control-Request-Headers') !== null
	) {
		// Handle CORS preflight requests.
		return new Response(null, {
			headers: {
				...corsHeaders,
				'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers')!,
			},
		});
	} else {
		// Handle standard OPTIONS request.
		return new Response(null, {
			headers: {
				Allow: 'GET, HEAD, POST, OPTIONS',
			},
		});
	}
}

const endpoint_functions: {
	[key: string]: (request: Request<unknown, IncomingRequestCfProperties<unknown>>) => Promise<Response>;
} = {
		"proxy": async function proxy(request: Request<unknown, IncomingRequestCfProperties<unknown>>): Promise<Response> {
		// If options send do CORS preflight
		if (request.method === 'OPTIONS') {
			const response = new Response('', {
				status: 200,
				headers: new Headers({
					'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
					'Access-Control-Allow-Methods': '*',
					'Access-Control-Allow-Headers':
						'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-goog-visitor-id, x-goog-api-key, x-origin, x-youtube-client-version, x-youtube-client-name, x-goog-api-format-version, x-user-agent, Accept-Language, Range, Referer',
					'Access-Control-Max-Age': '86400',
					'Access-Control-Allow-Credentials': 'true'
				})
			});
			return response;
		}
		const dev = false
		const host = !dev ? `youtubejs-worker.martinho-tavares.workers.dev` : `localhost:8787`
		const url = new URL(request.url, `htt${dev ? "p" : "ps"}://${host}/`);
		if (!url.searchParams.has('__host')) {
			return new Response(
			'Request is formatted incorrectly. Please include __host in the query string.',
			{ status: 400 }
			);
		}

		// Set the URL host to the __host parameter
		url.host = url.searchParams.get('__host')!;
		url.protocol = 'https';
		url.port = '443';
		url.searchParams.delete('__host');

		// Copy headers from the request to the new request
		const request_headers = new Headers(
			JSON.parse(url.searchParams.get('__headers') || '{}')
		);
		copyHeader('range', request_headers, request.headers);

		if (!request_headers.has('user-agent'))
			copyHeader('user-agent', request_headers, request.headers);
		url.searchParams.delete('__headers');
		url.pathname = url.pathname.split("/youtubejs/proxy").join("")
		url.href = url.href.split("/youtubejs/proxy").join("")
		// Make the request to YouTube
		const fetchRes = await fetch(url, {
			method: request.method,
			headers: request_headers,
			body: request.body
		});
		// Construct the return headers
		const headers = new Headers();

		// Copy content headers
		copyHeader('content-length', headers, fetchRes.headers);
		copyHeader('content-type', headers, fetchRes.headers);
		copyHeader('content-disposition', headers, fetchRes.headers);
		copyHeader('accept-ranges', headers, fetchRes.headers);
		copyHeader('content-range', headers, fetchRes.headers);

		// Add cors headers
		headers.set(
			'Access-Control-Allow-Origin',
			request.headers.get('origin') || '*'
		);
		headers.set('Access-Control-Allow-Headers', '*');
		headers.set('Access-Control-Allow-Methods', '*');
		headers.set('Access-Control-Allow-Credentials', 'true');
		// Return the proxied response
		return new Response(fetchRes.body, {
			status: fetchRes.status,
			headers: headers
		});
	},
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		for (const [key, fun] of Object.entries(endpoint_functions)) {
			if (url.pathname.indexOf(`/youtubejs/${key}`) >= 0) {
				return fun(request);
			}
			
		}

		return createResponse(404, 'Not Found');
	},
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	) {
		const result = await fetch(new URL("https://martinho.pt"))
		const status = result.status / 100
		if ((status == 2 || status == 3)) {
			const msg = createMimeMessage();
			msg.setSender({ name: "ALERTA MARTINHO.PT", addr: "eu@martinho.tp" });
			msg.setRecipient("eu@martinho.pt");
			msg.setSubject(`O SITE ESTA A RETORNAR ${result.status} EM VEZ DE 2XX OU 3XX`);
			msg.addMessage({
				contentType: 'text/plain',
				data: `Recebi o seguinte:
					${result.status} - ${result.statusText}
					
					Body:
					${result.body}
				`
			});

			const message = new EmailMessage(
				"eu@martinho.pt",
				"eu@martinho.pt",
				msg.asRaw()
			);
			try {
				await env.SEB.send(message);
			} catch (e) {
				console.log(e)
			}
		}
	}
} satisfies ExportedHandler<Env>;

function copyHeader(headerName: string, to: Headers, from: Headers) {
	const hdrVal = from.get(headerName);
	if (hdrVal) {
		to.set(headerName, hdrVal);
	}
}

