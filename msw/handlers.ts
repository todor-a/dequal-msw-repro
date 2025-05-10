import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post('/foo', () => {
        return HttpResponse.json({});
    }),
];
