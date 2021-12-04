const sizes = {
    up(size: string) {
        const sizes: any = {
            md: '800px',
        }
        return `@media (min-width:${sizes[size]})`
    },
    down(size: string) {
        const sizes: any = {
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