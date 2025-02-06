// Get Products
export async function getProducts (id) {
    const url = id ? `https://fakestoreapi.com/products/${id}` : "https://fakestoreapi.com/products"
    const res = await fetch(url);
    if(!res.ok){
        throw {
            message : "Could not find products",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data
}

