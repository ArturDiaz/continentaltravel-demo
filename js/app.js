/*const contadorVl = segCont =>{
    let tiempo = new Date(),
        contTiemp = (new Date(segCont) - tiempo + 1000) / 1000,
        contSeg = ('0' + Math.floor(contTiemp % 60)).slice(-2),
        contMin = ('0' + Math.floor(contTiemp / 60 % 60)).slice(-2),
        contHor = ('0' + Math.floor(contTiemp / 3600 % 24)).slice(-2);

    return{
        contTiemp,
        contSeg,
        contMin,
        contHor
    }
};

const cuentRegresiv = (segCont, elem) => {
    const imprimir = document.getElementById(elem);

    const actualizTempo = setInterval(() => {
        let tie = contadorVl(segCont);
        imprimir.innerHTML = '${tie.contHor}:${tie.contMin}:${tie.contSeg}';

        if(tie.contadorVl <= 1){
            clearInterval(actualizTempo);
            imprimir.innerHTML = "final";
        }
    }, 1000)
};

cuentRegresiv('Dic 30 2019 10:32:52 GMT-0500','contadorViaj');
*/

$(document).ready(function(){

   //------------ Flotante -----------//

   var flotante = $(".flotante");
		setTimeout(function (){
			flotante.addClass('mostrar');
		},5000);


        $(".cerrarFlot").click(function(){
          $(".flotante").addClass("cerrarF");  
          $(".flotante").removeClass("mostrar");
        });

        $(".ingresFlot").click(function(){
            $(".flotante").addClass("cerrarF");  
            $(".flotante").removeClass("mostrar");
          });


    // ------ Formulario ------------ //
    /*var btnEnviar = $("#btnEnviar");



    btnEnviar.click(function(){

        var usuario = $("#usuario").val();
        var email = $("#email").val();
        var telef = $("#telefono").val();
        var comentario = $("#coment").val();

        var msjU = $("#msjErrorU");
        var msjE = $("#msjErrorE");
        var msjT = $("#msjErrorT");

        if( usuario.trim() == ""){
            msjU.html("* Llenar el campo.");
        }else{
            alert("gracias " + usuario);
            $("#usuario").val("");
            $("#msjErrorU").html("");
        }

        if( email.trim() == "" && email !== "@"){
            msjE.html("* Error. verifica, debe tener @.");
        }else{
            alert("su e-mail es: " + email);
            $("#email").val("");
            $("#msjErrorE").html("");
        }

        if( telef.trim() == ""){
            msjT.html("* Error, debe ser en numeros.");
        }else{
            alert("su numero es: " + telef);
            $("#telefono").val("");
            $("#msjErrorT").html("");
        }
    });*/


});