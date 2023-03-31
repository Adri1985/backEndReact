import { faker } from '@faker-js/faker'

faker.locale = 'es'



export const getProducts = () => {

    const numOfProducts = 100
    const products = []

    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct())
    }

    return products

}

export const generateProduct = () => {
    return {
            marca : faker.commerce.productAdjective(),
            modelo : faker.commerce.productName(),
            tipo : faker.commerce.productDescription(),
            rango: 100,
            precio : faker.commerce.price(),
            topFeature1 : "aaa",
            topFeature2 : "bbb",
            topFeature3 : "ccc",
            imageName: "ddd",
            liked: "Y",
            stock : "10",
            onCart: "y"
     
    }
}