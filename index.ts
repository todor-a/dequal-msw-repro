export async function main(id: any, expected: any) {
    const response = await fetch('https://example.com/user', {
        method: 'POST',
        body: JSON.stringify({
            params: {
                id: id,
            },
        }),
    });

    const data = await response.json();
    console.log(
        `calling with ${id}, result is ${data.total}, and expected is ${expected}`,
    );
}
