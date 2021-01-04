require('proof')(16, async (okay) => {
    const Future = require('..')
    {
        const future = new Future
        okay(!future.fulfilled, 'not fulfilled')
        okay(!future.vivified, 'no one wants the promise')
        future.resolve()
        future.resolve(1)
        future.reject(new Error('reject'))
        okay(future.fulfilled, 'fulfilled')
        const result = await future.promise
        okay(future.vivified, 'someone wanted the promise')
        okay(result === undefined, 'resolve empty value')
        okay(future.resolution,  [], 'empty resolution value')
    }
    {
        const test = []
        const future = new Future
        future.reject(new Error('reject'))
        try {
            await future.promise
        } catch (error) {
            test.push(error.message)
        }
        okay(test, [ 'reject' ], 'reject')
        okay(future.rejection.message, 'reject', 'rejection message')
    }
    {
        const future = new Future
        future.resolve(1)
        const result = await future.promise
        okay(result, 1, 'resolve error-first callback')
        okay(future.resolution, [ 1 ], 'resolution value')
        okay(await future.promise, 1, 'reuse promise')
    }
    {
        const future = new Future
        const promises = [ future.promise, future.promise ]
        future.resolve(1)
        const result = await promises.shift()
        await promises.shift()
        okay(result, 1, 'awaited value')
    }
    {
        const test = []
        const future = new Future
        const promise = future.promise
        future.reject(new Error('reject'))
        try {
            await promise
        } catch (error) {
            test.push(error.message)
        }
        okay(test, [ 'reject' ], 'awaited rejection')
    }
    {
        const future = new Future({ resolution: [ 1 ] })
        okay({
            fulfilled: future.fulfilled,
            resolve: await future.promise
        }, {
            fulfilled: true,
            resolve: 1
        }, 'constructed with resolution')
    }
    {
        const future = new Future({ rejection: new Error('reject') })
        const errors = []
        okay(future.fulfilled, 'constructed fulfilled rejected')
        try {
            await future.promise
        } catch (error) {
            errors.push(error.message)
        }
        okay(errors, [ 'reject' ], 'constructed fulfilled rejected thrown')
    }
})
