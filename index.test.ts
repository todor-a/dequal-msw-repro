import { dequal } from 'dequal';
import { isEqual } from 'es-toolkit';
import { isEqual as isEqualLodash } from 'lodash';
import { http, HttpResponse } from 'msw';
import { main } from './index.ts';
import { server } from './msw/node.ts';

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

test('with dequal', async () => {
    server.use(
        http.post('https://example.com/user', async ({ request }) => {
            const body = await request.clone().json();
            const filter = { params: { id: '1' } };

            if (dequal(body, filter)) {
                return HttpResponse.json({
                    total: 2,
                });
            }

            return HttpResponse.json({
                total: 0,
            });
        }),
    );

    expect(await main('1', 2)).toBe(2);
    expect(await main('2', 0)).toBe(0);
});

test('with es-toolkit', async () => {
    server.use(
        http.post('https://example.com/user', async ({ request }) => {
            const body = await request.clone().json();
            const filter = { params: { id: '1' } };

            if (isEqual(body, filter)) {
                return HttpResponse.json({
                    total: 2,
                });
            }

            return HttpResponse.json({
                total: 0,
            });
        }),
    );

    expect(await main('1', 2)).toBe(2);
    expect(await main('2', 0)).toBe(0);
});

test('with lodash', async () => {
    server.use(
        http.post('https://example.com/user', async ({ request }) => {
            const body = await request.clone().json();
            const filter = { params: { id: '1' } };

            if (isEqualLodash(body, filter)) {
                return HttpResponse.json({
                    total: 2,
                });
            }

            return HttpResponse.json({
                total: 0,
            });
        }),
    );

    expect(await main('1', 2)).toBe(2);
    expect(await main('2', 0)).toBe(0);
});
