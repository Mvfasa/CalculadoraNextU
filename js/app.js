var calculadora = {

  pantalla: document.getElementById("display"),
  valorIni: "0",
  operacion: "",
  valor1: 0,
  valor2: 0,
  ultimoValor: 0,
  resultado: 0,
  teclaIgual: false,

  //inicializar calculadora

  init: (function(){

    this.eventosTeclado(".tecla");
    this.eventosCalculadora();
  }),

  eventosTeclado: function(selector){

    var teclados = document.querySelectorAll(selector);
    for (var i = 0; i<teclados.length;i++) {
      teclados[i].onmousedown = this.eventoReducirTecla;
      teclados[i].onmouseup = this.eventoAumentarTecla;
    }
  },

  eventoReducirTecla: function(event){
    calculadora.reducirTecla(event.target);
  },

  eventoAumentarTecla: function(event){
    calculadora.aumentarTecla(event.target);
  },

  reducirTecla: function(objeto){

    var id = objeto.id;

    if (id=="1" || id=="2" || id=="3" || id=="0" || id=="igual" || id=="punto" ) {
      objeto.style.width = "28%";
      objeto.style.height = "62px";
    } else if(id=="mas") {
      objeto.style.width = "88%";
      objeto.style.height = "98%";
    } else {
      objeto.style.width = "21%";
      objeto.style.height = "62px";
    }
  },

  aumentarTecla: function(objeto){

    var id = objeto.id;

    if (id=="1" || id=="2" || id=="3" || id=="0" || id=="igual" || id=="punto" ) {
      objeto.style.width = "29%";
      objeto.style.height = "62.91px";
    } else if(id=="mas") {
      objeto.style.width = "90%";
      objeto.style.height = "100%";
    } else {
      objeto.style.width = "22%";
      objeto.style.height = "62.91px";
    }
  },

  //fin de eventos para cambiar los formatos

  //eventos para la funcion de la calculadora

  eventosCalculadora: function(){
    document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
    document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
    document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
    document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
    document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
    document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
    document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
    document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
    document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
    document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
    document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
    document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
    document.getElementById("punto").addEventListener("click", function() {calculadora.puntoDecimal();});
    document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
    document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
    document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
    document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
    document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
    document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
  },

  //(4)
  ingresoOperacion: function(oper){
    this.valor1 = parseFloat(this.valorIni);
    this.valorIni = "";
    this.operacion = oper;
    this.teclaIgual = false;
    this.actualizarPantalla();
  },

  //(5) y (9)
  ingresoNumero: function(valor){
    if (this.valorIni.length < 8) {

      if (this.valorIni=="0") {
        this.valorIni = "";
        this.valorIni = this.valorIni + valor;
      } else {
        this.valorIni = this.valorIni + valor;
      }
      this.actualizarPantalla();
    }
  },

  //(6)
  borrarPantalla: function(){

    this.valorIni = "0";
    this.operacion = "";
    this.valor1 = 0;
    this.valor2 = 0;
    this.resultado = 0;
    this.operación = "";
    this.teclaIgual = false;
    this.ultimoValor = 0;
    this.actualizarPantalla();
  },

//(7)
  puntoDecimal: function(){
		if (this.valorIni.indexOf(".")== -1) {
			if (this.valorIni == ""){
				this.valorIni = this.valorIni + "0.";
			} else {
				this.valorIni = this.valorIni + ".";
			}
			this.actualizarPantalla();
		}
	},

//(8)
  cambiarSigno: function(){
		if (this.valorIni !="0") {
			var aux;
			if (this.valorIni.charAt(0)=="-") {
				aux = this.valorIni.slice(1);
			}	else {
				aux = "-" + this.valorIni;
			}
		this.valorIni = "";
		this.valorIni = aux;
		this.actualizarPantalla();
		}
	},

//(10)
  verResultado: function(){

		if(!this.teclaIgual){
			this.valor2 = parseFloat(this.valorIni);
			this.ultimoValor = this.valor2;

			this.realizarOperacion(this.valor1, this.valor2, this.operacion);

		} else {
		this.realizarOperacion(this.valor1, this.ultimoValor, this.operacion);
		}

		this.valor1 = this.resultado;
		this.valorIni = "";

		if (this.resultado.toString().length < 9){
			this.valorIni = this.resultado.toString();
		} else {
			this.valorIni = this.resultado.toString().slice(0,8) + "...";
		}

		this.teclaIgual = true;
		this.actualizarPantalla();
	},

	realizarOperacion: function(valor1, valor2, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valor1 + valor2);
			break;
			case "-":
				this.resultado = eval(valor1 - valor2);
			break;
			case "*":
				this.resultado = eval(valor1 * valor2);
			break;
			case "/":
				this.resultado = eval(valor1 / valor2);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valor1));
		}
	},

  actualizarPantalla: function(){
    this.pantalla.innerHTML = this.valorIni;
  }

};

calculadora.init();
