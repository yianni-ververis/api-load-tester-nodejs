import Koa from 'koa'
import Router from 'koa-router'
import fetch from 'node-fetch'

const router = new Router();

const main = async (ctx: Koa.Context): Promise<void> => {
  const { url, method, delay, sessions, token, body } = ctx.request.body;

  let index = 0;
  const myPromise = () => new Promise(resolve => setTimeout( async () => {
    console.log(index)
    index += 1;
    const Authorization = (token) ? `Bearer ${token}`: '';
    const response = await fetch(url, {
      method,
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    const resJson = await response.json();
    resolve(resJson);
  }, (delay + index) * 1000))

  const promises = [... new Array(sessions)].map(async () => await myPromise() )
  await Promise.all(promises);

  ctx.body = {
    success: true,
    data: ctx.request.body
  }
  ctx.status = 200
}

router
  .post('/', main)

export default router