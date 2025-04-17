const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

export const parseName = (name: unknown): string => {
    if (!isString(name) || name.trim() === '') {
        throw new Error('Name is required!')
    }

    if (name.trim().length > 50) {
        throw new Error('Name must be 50 characters or less!')
    }

    return name.trim()
}