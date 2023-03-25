const addForm = document.getElementById("form")

addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
    
// AGREGARA POR DEFECTO SIEMPRE AL MISMO CARRITO POR AHORA EL CUAL YA SE QUE EXISTE, SUPONIENDO QUE ES EL CART DEL USUARIO

    const response = await fetch("/session/login" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          ,
          body: JSON.stringify({
            email:email,
            password:password
          })
      })

      console.log("llega aca")
      return()
      
  })