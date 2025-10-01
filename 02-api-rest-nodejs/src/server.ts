import { app } from './app.ts';
import { env } from './env/index.ts';

app.listen({
  port: env.PORT
})
  .then(() => {
  console.log(`HTTP Server running on http://localhost:${env.PORT}`)
})