import http from 'http'

import { json } from './middlewares/json.js';

const server = http.createServer(async (req, res) => {
    try {
        const { method, url } = req

        await json(req, res)

        const route = routes.find(route => route.method === method && route.path.test(url));

        if (route) {
            const routeParams = req.url.match(route.path)

            const { query, ...params } = routeParams.groups

            req.params = params

            req.query = query ? extractQueryParams(query) : {}

            return route.handler(req, res)
        }

        return res.writeHead(404).end()
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500).end('Internal Server Error');
    }
});

server.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});

