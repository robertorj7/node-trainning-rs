export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams.replace(/([()])/g, '\\$1')}$`)
    return {
        path: pathRegex,
        params: Array.from(path.matchAll(routeParametersRegex)).map((match) => match[1])
    }
}
