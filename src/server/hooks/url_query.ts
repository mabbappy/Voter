
function url_query({ url }: { url: string }) {
    const get_url = new URL(url)
    const searchParams = get_url.searchParams
    return (query: string) => {
        return searchParams.get(query)
    }
}

export default url_query;