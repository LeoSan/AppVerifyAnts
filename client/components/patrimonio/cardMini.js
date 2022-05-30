import React from 'react'

const cardMini = ({categoria_id, listaPatrimonios}) => {

    let temporal = []; 
    
         temporal =  listaPatrimonios.filter(producto =>{
            return producto.includes(categoria_id)
         })

//      console.log(categoria_id);
//      console.log(listaPatrimonios);
//      console.log(temporal);

  return (
        <>

            {temporal.map((list, index) => (
            <div key={index} className={`capitalize  ${list[4]}` } >
                <div className='mr-5'>{list[2]} </div>
                <div className="">{list[3]} </div>
            </div>                        
            ))}

        </>    
  )
}

export default cardMini;