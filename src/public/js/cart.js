const addForm = document.getElementById("form")

addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const id = document.getElementById("id").value
    const qty = document.getElementById("qty").value
    
// AGREGARA POR DEFECTO SIEMPRE AL MISMO CARRITO POR AHORA EL CUAL YA SE QUE EXISTE, SUPONIENDO QUE ES EL CART DEL USUARIO

    const response = await fetch("/api/carts/63d9d629fc420e0e4f35bb85/product/"+id , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          ,
          body: JSON.stringify({
            quantity:qty
          })
      })
      const data = await response.json()
      if(response.status == 200){
          alert("se agrego correctamente el producto al carrito")
      } else {
          alert("Error no se pudo agregar el producto")
      }
  })