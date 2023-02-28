# npm install @mui/material @emotion/react @emotion/styled
# npm install @mui/icons-material
# <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
# Reserta o css <CssBaseline />


function component()=>{

  return(
    <>
      <button onClick={useDipatch(incrementByAmount(1))}>
      clicar
    </button>
  )

}

# desafio vai ser criar um estado global de usuarios: id, name, email, password
# cadastrar e apagar (Page>CadUser.tsx) -> id, name, email, password
# consultar por nome (Page>FilterName.tsx) -> input e butao que chama a acao