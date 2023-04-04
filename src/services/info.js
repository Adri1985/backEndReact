export const generateProductErrorInfo = product =>{
    return `Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorios:
     - Modelo: Must be a string. (${product.modelo})
`}