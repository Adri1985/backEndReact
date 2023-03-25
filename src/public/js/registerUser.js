const addForm = document.getElementById("form")

addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const email = document.getElementById("email").value
    const age = document.getElementById("age").value
    const password = document.getElementById("password").value
    
    
// AGREGARA POR DEFECTO SIEMPRE AL MISMO CARRITO POR AHORA EL CUAL YA SE QUE EXISTE, SUPONIENDO QUE ES EL CART DEL USUARIO

    const response = await fetch("/session/register" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          ,
          body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email:email,
            age: age,
            password:password
          })
      })

      console.log("llega aca")
      
  })