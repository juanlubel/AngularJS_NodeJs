import test from "ava"
import fetch from 'node-fetch'
import '../routes/api/hotels.test'


//todo: pasar toda la config a todos los test

test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});

test('fetch:hotels', async t => {
    const res = await fetch(
        'http://localhost:3000/api/hotels').then(res => res)

    t.is(res.status, 200)
})
