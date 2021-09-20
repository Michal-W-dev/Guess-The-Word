const sizes = {
    up(size) {
        const sizes = {
            md: '800px',
        }
        return `@media (min-width:${sizes[size]})`
    },
    down(size) {
        const sizes = {
            xs: '540px',
            sm: '650px',
            md: '800px',
            lg: '950px',
            xlg: '1350px'
        }
        return `@media (max-width:${sizes[size]})`
    }
}

export default sizes;