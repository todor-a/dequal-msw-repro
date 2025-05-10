import { dequal } from 'dequal';
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

test('should run a test', async () => {
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

    await main('1', 2);
    await main('2', 0);
});
