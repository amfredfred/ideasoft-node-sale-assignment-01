export const promise = (seconds: number = 3000, rejects: boolean = false) => new Promise((resolved, rejected) => {
    setTimeout(rejects ? rejected : resolved, seconds)
})