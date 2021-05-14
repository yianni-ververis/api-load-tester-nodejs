## Api Load tester in nodejs
Generic Api Load Tester for Cloud Services in Nodejs and Koa.

### Prerequisites
node >=14.0.0

### Usage
- `npm i`
- `npm run start`

### With Postman
- URL: `POST localhost:8080`
- Body raw: 
```
{
    "url": "https://{host}/api/v1/{endpoint}",
    "method": "GET",
    "delay": 1,
    "sessions": 1000,
    "token": "..."
}
```
![Postman](./Postman.png)