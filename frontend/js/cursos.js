const divCursos = document.querySelector(".cursos");
const submitForm = document.querySelector("#add-course form");

async function consultarTodosOsCursos() {
	const response = await fetch("http://localhost:3000/cursos");
	const cursos = await response.json();
	preencherTela(cursos);
}

async function consultarCurso(id) {
	const response = await fetch(`http://localhost:3000/cursos/${id}`);
	const curso = await response.json();

	return curso[0];
}

async function removerCurso(id) {
	const response = await fetch(`http://localhost:3000/cursos/delete/${id}`, {
		method: "DELETE",
	});
	window.location.reload();
}

async function atualizarCurso(id, data) {
	const response = await fetch(`http://localhost:3000/cursos/update/${id}`, {
		method: "PUT",
		body: JSON.stringify({ nome: data.nome, ch: data.ch }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	window.location.reload();
}

function preencherTela(cursos) {
	cursos.forEach((curso) => {
		const novoCursoHTML = `
		<div id="curso${curso.id}" class="curso">
			<div class="info">
				<h3>${curso.nome}</h3>
				<p>Carga Horária: ${curso.ch}h</p>
			</div>
			<div class="icons">
				<button class="delete" onclick="removerCurso(${curso.id})">
					<i class="fa-solid fa-trash"></i>
				</button>
				<button class="edit" onclick="editarCurso(${curso.id})">
					<i class="fa-solid fa-pen-to-square fa-rotate-270"></i>
				</button>
			</div>
		</div>
		`;

		divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
	});
}

async function editarCurso(id) {
	const curso = await consultarCurso(id);
	const cursoParaEditar = document.querySelector(`#curso${id}`);

	const novoCursoHTML = `
	<div id="curso${curso.id}-inner" class="edit-course">
		<form id="form${curso.id}">
			Nome:
			<input class="input-txt" name="nome" type="text" placeholder="${curso.nome}" value="${curso.nome}">
			Carga Horária:
			<input class="input-txt" name="ch" type="text" placeholder="${curso.ch}" value="${curso.ch}">
			<div class="submit">
				<input class="input-btn" type="submit" value="Salvar">
			</div>
		</form>
  	</div>
	`;

	cursoParaEditar.innerHTML = novoCursoHTML;

	const submitForm = document.querySelector(`#form${curso.id}`);

	submitForm.addEventListener("submit", (event) => {
		event.preventDefault();

		atualizarCurso(curso.id, {
			nome: event.target[0].value,
			ch: event.target[1].value,
		});
	});
}

submitForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const response = await fetch("http://localhost:3000/cursos/create", {
		method: "POST",
		body: JSON.stringify({
			nome: event.target[0].value,
			ch: event.target[1].value,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	window.location.reload();
});

consultarTodosOsCursos();
