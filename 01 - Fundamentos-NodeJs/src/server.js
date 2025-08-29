import http from 'http'

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const body = JSON.parse(Buffer.concat(buffers).toString())

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email, age } = body
        
        users.push({
            id: 1,
            name,
            email,
            age
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
});

server.listen(3333);

