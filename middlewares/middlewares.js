import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

const authMiddleware = async({request, response, session}, next) => {
  const url = request.url.pathname;
  if (url.startsWith('/auth') || url.startsWith('/api') || url === ('/')) {
    await next();
  } else {
    const user = await session.get('user');
    if (!user) {
      response.redirect('/auth/login');
    } else {
      await next();
    }
  }
}

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, authMiddleware };