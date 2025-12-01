import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
};

export default function () {
  const payload = JSON.stringify({
    password: "minha_senha_secreta"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '60s' 
  };

  const res = http.post('http://localhost:3000/checkout/crypto', payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });
  
  sleep(1);
}