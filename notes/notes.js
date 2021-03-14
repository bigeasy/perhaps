async function main () {
    async function raise () {
        await new Promise(resolve => setTimeout(resolve, 1000))
        throw new Error('thrown')
    }
    console.log('approaching')
    await raise().catch(error => {})
    console.log('done')
}

main()
