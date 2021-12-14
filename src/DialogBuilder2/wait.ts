export function wait(delay: number): [Promise<unknown>, () => void] {
    let timeoutId: NodeJS.Timeout;

    const timeoutPromise = new Promise((resolve) => {
        timeoutId = setTimeout(resolve, delay);
    });

    return [timeoutPromise, () => clearTimeout(timeoutId)];
}
