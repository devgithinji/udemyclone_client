export const checkActivePath = (currentPath, path) => {
    return currentPath === path ? 'nav-link active' : 'nav-link'
}