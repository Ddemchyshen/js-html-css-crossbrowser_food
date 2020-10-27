// Работа с сервером с помощью fetch()
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

    return await result.json();
}

const getMenuItem = async url => {
    const result = await fetch(url)

    if (!result.ok) {
        throw new Error(`Не получилось обработать ${url}, статус ошибки ${result.status}`)
    }

    return await result.json();
}

export {postData};
export {getMenuItem};