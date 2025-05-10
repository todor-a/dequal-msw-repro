import { setupServer } from 'msw/node';

import { handlers } from './handlers';

export const server = setupServer(...handlers);

// server.events.on('request:start', async ({ request }) => {
//     const body = await request.clone().text();

//     console.log(
//         'MSW intercepted:',
//         JSON.stringify(
//             {
//                 method: request.method,
//                 path: request.url,
//                 body,
//             },
//             null,
//             2,
//         ),
//     );
// });
