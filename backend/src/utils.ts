const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

export const parseName = (name: unknown): string => {
    if (!isString(name) || name.trim() === '') {
        throw new Error('Name is required!')
    }

    return name.trim()
}