// Finding Promise construction cumbersome. Happy to have an object at the
// outset that bundles the promise with with the the notification. Makes it
// easier to create data structures containing promises.

//
class Future {
    static resolve (...vargs) {
        const future = new Future
        future.resolve.apply(future, vargs)
        return future
    }

    static reject (error) {
        const future = new Future
        future.reject(error)
        return future
    }

    static capture (promise, callback) {
        const future = new Future
        promise.then((...vargs) => {
            future.resolve.apply(future, vargs)
            callback(future)
        }, error => {
            future.reject(error)
            callback(future)
        })
        return future
    }

    constructor () {
        this.fulfilled = false
        this.resolution = null
        this.rejection = null
        this._promise = null
        this._resolve = null
        this._reject = null
        if (arguments.length == 1) {
            this.resolve(arguments[0])
        }
    }

    get vivified () {
        return this._promise != null
    }

    get promise () {
        if (this._promise != null) {
            return this._promise
        }
        if (!this.fulfilled) {
            return this._promise = new Promise((resolve, reject) => {
                this._resolve = resolve
                this._reject = reject
            })
        }
        if (this.rejection != null) {
            return this._promise = Promise.reject(this.rejection)
        }
        return this._promise = Promise.resolve.apply(Promise, this.resolution)
    }

    then (resolve, reject) {
        this.promise.then(resolve, reject)
    }

    resolve (...vargs) {
        if (! this.fulfilled) {
            if (vargs.length != 0 && typeof vargs[0].then == 'function') {
                vargs[0].then(result => this.resolve(result), error => this.reject(error))
            } else {
                this.fulfilled = true
                this.resolution = vargs
                if (this._resolve != null) {
                    this._resolve.apply(null, vargs)
                }
            }
        }
    }

    reject (error) {
        if (! this.fulfilled) {
            this.fulfilled = true
            this.rejection = error
            if (this._reject != null) {
                this._reject.call(null, error)
            }
        }
    }
}

module.exports = Future
