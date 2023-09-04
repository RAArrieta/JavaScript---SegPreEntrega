//arrays de productos
const pizza = [
    {cod: 100, nom: "Muzzarella", cnt: 0, sbt: 0, prc: 1700},
    {cod: 101, nom: "Con Jamon", cnt: 0, sbt: 0, prc: 2000},
    {cod: 102, nom: "Especial", cnt: 0, sbt: 0, prc: 2200},
    {cod: 103, nom: "Super Especial", cnt: 0, sbt: 0, prc: 2600},
    {cod: 104, nom: "Con Huevo", cnt: 0, sbt: 0, prc: 1900},
    {cod: 105, nom: "Huevo y Morron", cnt: 0, sbt: 0, prc: 2100},
    {cod: 106, nom: "Fugazza", cnt: 0, sbt: 0, prc: 2000},
    {cod: 107, nom: "Napolitana", cnt: 0, sbt: 0, prc: 2000},
    {cod: 108, nom: "Provenzal", cnt: 0, sbt: 0, prc: 1900},
    {cod: 109, nom: "Roquefort", cnt: 0, sbt: 0, prc: 2000},
    {cod: 110, nom: "Calabresa", cnt: 0, sbt: 0, prc: 2200}
];
const sandwich = [
    {cod: 200, nom: "Lomito", cnt: 0, sbt: 0, prc: 2400},
    {cod: 201, nom: "De Milanesa", cnt: 0, sbt: 0, prc: 2900}
];
const empanadas = [
    {cod: 300, nom: "Arabes", cnt: 0, sbt: 0, prc: 250},
    {cod: 301, nom: "Criollas", cnt: 0, sbt: 0, prc: 250},
    {cod: 302, nom: "Criollas Dulces", cnt: 0, sbt: 0, prc: 250},
    {cod: 303, nom: "Jamón y Queso", cnt: 0, sbt: 0, prc: 250},
    {cod: 304, nom: "Cebolla y Queso", cnt: 0, sbt: 0, prc: 250}
];
const minutas = [
    {cod: 400, nom: "Ravioles", cnt: 0, sbt: 0, prc: 1400},
    {cod: 401, nom: "Tallarines", cnt: 0, sbt: 0, prc: 1300},
    {cod: 402, nom: "Canelones", cnt: 0, sbt: 0, prc: 1300},
    {cod: 403, nom: "Lasagna", cnt: 0, sbt: 0, prc: 1400},
    {cod: 404, nom: "Milanesa con papas", cnt: 0, sbt: 0, prc: 2100},
    {cod: 405, nom: "Milanesa con ensalada", cnt: 0, sbt: 0, prc: 2100},
    {cod: 406, nom: "Mila Napo con papas", cnt: 0, sbt: 0, prc: 2300},
    {cod: 407, nom: "Mila Napo con ensalada", cnt: 0, sbt: 0, prc: 2300}
];

const pedido = [];
const pedidoTotal =[];
let nroPedido=0;
let total=0;

//constructor de producto
class Producto {
    constructor (codigo, nombre, cantidad, subtotal, precio) {
        this.cod = codigo,
        this.nom = nombre,
        this.cnt = cantidad,
        this.sbt = subtotal,
        this.prc = precio
    }
}
//opciones
function initPrograma (){
    let trueOrFalse = true;
    while (trueOrFalse) {
        let opc = parseInt(prompt("Elija una opción\n1 - Cargar pedido\n2 - Cambiar estado\n3 - Modificar Pedido\n4 - Ver Pedidos\n5 - Ver lista de Precios\n6 - Agregar un Producto a la lista\n7 - Quitar un Producto de la lista\n8 - Modificar precio de producto\n9 - Salir"));
        switch (opc){
            case 1:
                cargarPedido ();
                break;
            case 2:   
                cambiarEstado ();
                break;     
            case 3:
                modificarPedido ();
                break;
            case 4:
                const pedidos = verPedidos ();
                alert (pedidos)
                break;
            case 5:
                const lista = listaPrecios ();
                alert (lista);
                break;
            case 6:
                agregarProductoEnLista ();
                break;
            case 7:
                quitarProductoDeLista ();
                break;
            case 8:
                modificarPrecio ();
                break;
            case 9:
                alert("Hasta pronto")
                trueOrFalse=false;
                break;            
            default:
                alert("ERROR: valor incorrecto");
                break;
        }
    }
}
//cargo pedido
function cargarPedido (){
    total = 0;
    const listaprod = listaProductos();
    trueOrFalse = true;
    while (trueOrFalse){ //Cargo porductos hasta que indican con N
        let index = productoIndex (listaprod);
        listaprod[index].cnt = Number(prompt(`Cantidad de ${listaprod[index].nom}`));
        listaprod[index].sbt = listaprod[index].cnt * listaprod[index].prc;
        total += listaprod[index].sbt;
        pedido.push (listaprod[index])
        let opc = prompt("Desea cargar otro producto?\nSalir: N")
        if (opc == "N" || opc == "n"){  //cargo el resto de los datos del pedido y lo subo al array donde estan todos los pedidos (pedidoTotal)
            const nroped = pedidoTotal.length + 1;
            const dire = prompt("Dirección");
            const client = prompt("Nombre");
            const obs = prompt("Observación");
            const pedidoCopy = pedido.map (producto=>({...producto}));
            pedidoTotal.push({nroped, dire, client, obs, productos: pedidoCopy, total: total, estado: "PENDIENTE"});
            pedido.length ="";
            trueOrFalse=false;
        }
    }
}
//unifico el listado para mostrarlo completo
function listaProductos (){
    const unionPizzaSand = pizza.concat(sandwich);
    const unionEmpMin = empanadas.concat(minutas);
    const listaProductos = unionPizzaSand.concat(unionEmpMin);
    return listaProductos;
}
//encuentra la posicion en el listado
function productoIndex (Array){
    let index;
    let trueOrFalse = true;
    const listaprod = listaPrecios ();
    while (trueOrFalse){
        const codPr = Number(prompt("Ingrese el código\n"+ listaprod));
        if ((codPr>99 && codPr<(100+pizza.length))||(codPr>199 && codPr<(200+sandwich.length))||(codPr>299 && codPr<(300+empanadas.length))||(codPr>399 && codPr<(400+minutas.length))){
            for (index = 0; index < Array.length; index++){
                if (Array[index].cod==codPr){
                    break;
                }
            }
            trueOrFalse=false;
            return index;
        }else {
            alert("El producto no existe")
        }
    }        
}
//si se entrego un pedido se marca como entregado y si se equivocaron se puede volver atras
function cambiarEstado (){
    let nroPed = Number(prompt("Número de pedido"))
    let index = buscarPedido (nroPed);
    if (pedidoTotal[index].estado == "PENDIENTE"){
        pedidoTotal[index].estado = "ENTREGADO"
    }else if (pedidoTotal[index].estado == "ENTREGADO"){
        pedidoTotal[index].estado = "PENDIENTE"
    }
}
//encuentra el pedido y devuelve la posición
function buscarPedido (a){
    let i=0;
    for (i; i<pedidoTotal.length; i++){
        if (pedidoTotal[i].nroped==a){
            return i;
        }
    }
    if (i==pedidoTotal.length){
        alert("El pedido no existe...")
        initPrograma ()
    }       
}
//modifico los datos del pedido y/o los productos
function modificarPedido (){
    let trueOrFalse=true;
    let trueOrFalse2=true;
    let pedidos = verPedidos ();
    let index;
    while (trueOrFalse){
        let nroped = Number(prompt("Que nro de pedido desea modificar?\n" + pedidos));
        if (nroped<=0 || nroped>pedidoTotal.length || isNaN(nroped)){
            alert("El pedido no existe...")
            trueOrFalse = false;
            trueOrFalse2 = false;
        }
        while (trueOrFalse2){
            let opc = Number(prompt("Que desea modificar?\n1 - Dirección\n2 - Cliente\n3 - Observación\n4 - Productos\n5 - Salir\n"));
            switch (opc){
                case 1:
                    index = buscarPedido (nroped);
                    pedidoTotal[index].dire = prompt("Ingrese la nueva dirección");
                    break;
                case 2:
                    index = buscarPedido (nroped);
                    pedidoTotal[index].client = prompt("Ingrese el nuevo cliente");
                    break;
                case 3:
                    index = buscarPedido (nroped);
                    pedidoTotal[index].obs = prompt("Ingrese la nueva observación");
                    break;
                case 4:
                    index = buscarPedido (nroped);
                    modificarProducto (index);
                    break;
                case 5:
                    trueOrFalse=false;
                    trueOrFalse2=false;
                    break;        
                default:
                    alert("Valor incorrecto...")
                    break;
            }
        }
    }  
}
//agrego, quito o modifico producto de pedido
function modificarProducto (index){
    let arrProductos = pedidoTotal[index].productos;
    const opc = Number(prompt("1 - Agregar producto\n2 - Quitar producto\n3 - Modificar Producto\n4 - Salir"));
    switch (opc){
        case 1:
            agregarProductoAPedido (arrProductos);
            reCalcularTotal (arrProductos,index);
            break;
        case 2:
            quitarProductoAPedido (arrProductos);
            reCalcularTotal (arrProductos,index);
            break;
        case 3:
            modificoProductoAPedido (arrProductos);
            reCalcularTotal (arrProductos,index);
            break;
        case 4:
            initPrograma ()
            break;
        default:
            alert("Valor incorrecto...")    
    }
}
//agrego producto a un pedido existente
function agregarProductoAPedido (array){
    let lista = listaProductos ();
    let index = productoIndex (listaProductos ()); 
    cantidad = Number(prompt("Cantidad"));
    let newProd = ({cod: lista[index].cod, nom: lista[index].nom, cnt: cantidad, sbt: cantidad*lista[index].prc, prc: lista[index].prc });
    array.push(newProd)
}
//quito producto a pedido existente
function quitarProductoAPedido (array){
    const productos = muestroProductPedido (array);
    let elimProd = Number(prompt(`Ingrese el codigo a eliminar\n${productos}`))
    for (let i=0; i<array.length; i++){
        if (array[i].cod==elimProd){
            array.splice(i, 1);
        }
    }
}
//modifico producto a pedido existente
function modificoProductoAPedido (array){
    const productos = muestroProductPedido (array);
    let modifProd = Number(prompt(`Ingrese el codigo a modificar\n${productos}`))
    for (let i=0; i<array.length; i++){
        if (array[i].cod==modifProd){
            array[i].cnt = Number(prompt("Ingrese la nueva cantidad"));
            array[i].sbt = array[i].cnt * array[i].prc
        }
    }
}
//muestro los productos que hay en un pedido
function muestroProductPedido (array){
    let mostrarProdPedido;
    mostrarProdPedido = "";
    array.forEach( (el) => {
        mostrarProdPedido += (`${el.cod}  ${el.cnt}  ${el.nom}  $${el.sbt}\n`)
    })
    return mostrarProdPedido;
}
//modificamos un pedido entonces calculo el nuevo total
function reCalcularTotal (array, a){
    total=0
    array.forEach( (el) => {
        total += el.sbt 
    })
    pedidoTotal[a].total = total;
}
//muestro todos los pedidos
function verPedidos (){
    let obj = "PEDIDOS";
    let arrayProd;
    let productosPedidos = "";
    pedidoTotal.forEach ( (el)=> {
        arrayProd = el.productos;
        arrayProd.forEach ( (el) => {
        productosPedidos += (`${el.cnt}  ${el.nom}  $${el.sbt}\n`);
        })
        obj += (`\n==================\nPedido ${el.nroped}     Estado: ${el.estado}\nDirección: ${el.dire}\nCliente: ${el.client}\nObservaciones: ${el.obs}\n--------------------------------\n${productosPedidos}--------------------------------\nTotal: $${el.total}`);
        productosPedidos = "";
    })
    return obj;
}
//lista de precios
function listaPrecios (){
    const lista = listaProductos ();
    let listaPrecios = "PRODUCTOS\n"
    lista.forEach( (el)=> {listaPrecios += (`${el.cod}    ${el.nom}    $${el.prc}\n`)});
    return listaPrecios;
}
//elijo lista en donde agrego el producto
function agregarProductoEnLista (){
    let trueOrFalse = true;
    let newProd;
    while (trueOrFalse){
        const tipoProd = Number(prompt("Elija una opción a agregar\n1 - Pizza\n2 - Sandwich\n3 - Empanadas\n4 - Minutas\n5 - Salir"));
        switch (tipoProd){
            case 1:
                newProd = agregarProducto(pizza);
                pizza.push(newProd);
                break;
            case 2:
                newProd = agregarProducto(sandwich);
                sandwich.push(newProd);
                break;
            case 3:
                newProd = agregarProducto(empanadas);
                empanadas.push(newProd);
                break;
            case 4:
                newProd = agregarProducto(minutas);
                minutas.push(newProd);
                break;
            case 5:
                trueOrFalse = false;
                break;
            default:
                alert("Valor incorrecto...");
                break;
        }
    }
}
//agrego el producto
function agregarProducto(Array){
    let index = Array.length - 1
    const newCod = Array[index].cod + 1
    const nombre = prompt("Nombre");
    const precio = Number(prompt("Precio"));
    const newProd = new Producto (newCod, nombre, 0, 0, precio);
    return newProd;
}
//quito producto de lista
function quitarProductoDeLista () {
    let trueOrFalse = true;
    let index;
    while (trueOrFalse){
        const tipoProd = Number(prompt("Elija una opción a quitar\n1 - Pizza\n2 - Sandwich\n3 - Empanadas\n4 - Minutas\n5 - Salir"));
        switch (tipoProd){
            case 1:
                index = productoIndex (pizza);
                pizza.splice(index, 1)
                break;
            case 2:
                index = productoIndex (sandwich);
                sandwich.splice(index, 1)
                break;
            case 3:
                index = productoIndex (empanadas);
                empanadas.splice(index, 1)
                break;
            case 4:
                index = productoIndex (minutas);
                minutas.splice(index, 1)
                break;
            case 5:
                trueOrFalse = false;
                break;
            default:
                alert("Valor incorrecto...");
                break;
        }
    }
}
//modifico precio a producto en lista
function modificarPrecio (){
    let trueOrFalse = true;
    let index;
    while (trueOrFalse){
        let modificarProducto = Number(prompt("Que desea modificar?\n1 - Pizzas\n2 - Sandwichs\n3 - Empanadas\n4 - Minutas\n5 - Salir\n"));
        switch (modificarProducto){
            case 1:
                index = productoIndex (pizza);
                pizza[index].prc = Number(prompt("Ingrese el nuevo precio"));
                break;
            case 2:
                index = productoIndex (sandwich);
                sandwich[index].prc = Number(prompt("Ingrese el nuevo precio"));
                break;
            case 3:
                index = productoIndex (empanadas);
                empanadas[index].prc = Number(prompt("Ingrese el nuevo precio"));
                break;
            case 4:
                index = productoIndex (minutas);
                minutas[index].prc = Number(prompt("Ingrese el nuevo precio"));
                break;
            case 5:
                trueOrFalse = false;
                break;
            default:
                alert("Valor incorrecto...");
                break;
        }
    }
}

initPrograma ();