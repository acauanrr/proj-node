const divCursos = document.querySelector("#cursos");

async function consultarTodosOsCursos() {
	const response = await fetch("http://localhost:3000/cursos");
	const cursos = await response.json();
	preencheTela(cursos);
	console.log(cursos);
}

async function consultarCurso(id) {
	const response = await fetch("http://localhost:3000/cursos/id");
	const cursos = await response.json();
	preencheTela(cursos);
	console.log(cursos);
}

async function adicionarCurso() {
	const response = await fetch("http://localhost:3000/cursos/create");
	const message = await response.json();
	console.log(message);
}

async function removerCurso(id) {
	const response = await fetch("http://localhost:3000/cursos/delete/id");
	const message = await response.json();
	console.log(message);
}

async function atualizarCurso(id) {
	const response = await fetch("http://localhost:3000/cursos/update/id");
	const message = await response.json();
	console.log(message);
}

function preencheTela(cursos) {
	cursos.forEach((curso) => {
		const novoCursoHTML = `
    <div class="cursos">
        <h3>${curso.nome}</h3>
        <p>Carga Horária: ${curso.ch} h</p>
      </div>
    `;
		divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
	});
}

consultaCursos();
