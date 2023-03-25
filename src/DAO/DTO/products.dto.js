export default class ProductDTO {

    constructor(product) {
        this.marca = product.marca ||""
        this.modelo = product.modelo || ""
        this.tipo = product.tipo || ""
        this.rango= product.rango || ""
        this.precio = product.precio || ""
        this.topFeature1 = product.topFeature || ""
        this.topFeature2 = product.topFeature1 || ""
        this.topFeature3 = product.topFeature3 || ""
        this.imageName= product.imageName || ""
        this.liked= product.liked || ""
        this.stock = product.stock || ""
        this.onCart= product.onCart || ""
    }

}