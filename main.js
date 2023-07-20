/* 
==================================
Instituto de Educación a Distancia
==================================
Un Instituto de Educación a Distancia exige el 40% de inicial para la
inscripción de los cursos online. De cada curso se conoce: código y 
monto del mismo. Para el restante 60%, se ofrece un crédito pagadero 
en 10 cuotas mensuales equitativas. 
Se requiere mostrar: 
 a) Monto inicial y monto cuotas de cada curso
 b) Monto Promedio de la Inicial, 
 c) Código del Curso con menor cuota de pago.

código monto montoInicial() restante()  montoCuotas() (R.a)
  1     $500       $200        $300        $30
  2     $300       $120        $180        $18
  3     $100        $40         $60         $6 
  4     $250       $100        $150        $15
  5     $400       $160        $240        $24 

  R.b) El monto promedio de la inicial es: $124 = ($40+$200+$120+$100+$160)/5
  R.c) Código del curso con menor cuota de pago: 3 ($6)
*/

class Cl_mCurso {
  constructor(codigo = null, monto = 0) {
    this.codigo = codigo;
    this.monto = monto;
  }
  set codigo(c) {
    this._codigo = +c;
  }
  get codigo() {
    return this._codigo;
  }
  set monto(m) {
    this._monto = +m;
  }
  get monto() {
    return this._monto;
  }
  montoInicial() {
    return (this.monto * 40) / 100;
  }
  restante() {
    return this.monto - this.montoInicial();
  }
  montoCuotas() {
    return this.restante() / 10;
  }
}

class Cl_mInstituto {
  constructor() {
    this.arrCursos = [];
  }

  agregar(curso) {
    this.arrCursos.push(curso);
  }

  eliminar(codigo) {
    for (let pos = 0; pos < this.arrCursos.length; pos++) {
      if (this.arrCursos[pos].codigo === codigo) {
        this.arrCursos.splice(pos, 1);
        pos--;
      }
    }
  }
  existe(codigo) {
    let existe = false;
    this.arrCursos.forEach((curso) => {
      if (curso.codigo === codigo) existe = true;
    });
    return existe;
  }

  montoPromedioInicial() {
    let totalInicial = 0,
      cntCursos = this.arrCursos.length;
    this.arrCursos.forEach((curso) => {
      totalInicial += curso.montoInicial();
    });
    return cntCursos > 0 ? totalInicial / cntCursos : 0;
  }
  codigoCursoMenorCuota() {
    let montoMenor = 100000000,
      codigoMenor = 0;
    this.arrCursos.forEach((curso) => {
      if (curso.montoInicial() < montoMenor) {
        montoMenor = curso.montoInicial();
        codigoMenor = curso.codigo;
      }
    });
    return codigoMenor;
  }
}

class Cl_vista {
  constructor(app) {
    this.app = app;
  }
}

class Cl_vCurso extends Cl_vista {
  agregar() {
    let curso = new Cl_mCurso();
    curso.codigo = prompt("Código del curso:");
    curso.monto = prompt("Monto del curso:");
    this.app.mInstituto.agregar(curso);
  }
  eliminar() {
    let codigo = +prompt("Código del curso a eliminar:");
    if (this.app.mInstituto.existe(codigo)) {
      if (confirm(`¿Seguro de eliminar el curso ${codigo}?`))
        this.app.mInstituto.eliminar(codigo);
    } else alert(`No existe el curso con código ${codigo}`);
  }
}

class Cl_vInstituto extends Cl_vista {
  constructor(app) {
    super(app);
    this.btAgregar = document.getElementById("vInstituto_btAgregar");
    this.btEliminar = document.getElementById("vInstituto_btEliminar");
    this.btAgregar.onclick = () => {
      this.app.vCurso.agregar();
      this.listarInfo();
    };
    this.btEliminar.onclick = () => {
      this.app.vCurso.eliminar();
      this.listarInfo();
    };
    this.rptrCursos = document.getElementById("vInstituto_rptrCursos");
    this.tmpltDivCurso = this.rptrCursos.children[0].cloneNode(true);
    this.lblMontoPromedioInicial = document.getElementById(
      "vInstituto_lblMontoPromedioInicial"
    );
    this.lblCodigoCursoMenorCuota = document.getElementById(
      "vInstituto_lblCodigoCursoMenorCuota"
    );
  }

  listarInfo() {
    while (this.rptrCursos.children[0] !== undefined) {
      this.rptrCursos.children[0].remove();
    }
    this.app.mInstituto.arrCursos.forEach((curso) => {
      let htmlCurso = this.tmpltDivCurso.cloneNode(true);
      htmlCurso.getElementsByClassName("vInstituto_codigo")[0].innerHTML =
        curso.codigo;
      htmlCurso.getElementsByClassName("vInstituto_monto")[0].innerHTML =
        curso.monto;
      htmlCurso.getElementsByClassName("vInstituto_inicial")[0].innerHTML =
        curso.montoInicial();
      htmlCurso.getElementsByClassName("vInstituto_restante")[0].innerHTML =
        curso.restante();
      htmlCurso.getElementsByClassName("vInstituto_montoCuotas")[0].innerHTML =
        curso.montoCuotas();
      this.rptrCursos.appendChild(htmlCurso);
    });
    this.lblMontoPromedioInicial.innerHTML =
      this.app.mInstituto.montoPromedioInicial();
    this.lblCodigoCursoMenorCuota.innerHTML =
      this.app.mInstituto.codigoCursoMenorCuota();
  }
}

class Cl_app {
  constructor() {
    this.mCurso = new Cl_mCurso();
    this.mInstituto = new Cl_mInstituto();
    this.vCurso = new Cl_vCurso(this);
    this.vInstituto = new Cl_vInstituto(this);
    this.cargarCursosIniciales();
  }

  cargarCursosIniciales() {
    this.mInstituto.agregar(new Cl_mCurso(1, 500));
    this.mInstituto.agregar(new Cl_mCurso(2, 300));
    this.mInstituto.agregar(new Cl_mCurso(3, 100));
    this.mInstituto.agregar(new Cl_mCurso(4, 250));
    this.mInstituto.agregar(new Cl_mCurso(5, 400));
    this.vInstituto.listarInfo();
  }
}

let app = new Cl_app();
