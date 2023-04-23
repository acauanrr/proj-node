export class CursoController {
	constructor(CursoModel) {
		this.curso = CursoModel;
	}

	async getAll() {
		const cursos = await this.curso.findAll();
		return cursos;
	}

	async get(cursoId) {
		const cursos = await this.curso.findAll({
			where: {
				id: cursoId,
			},
		});
		return cursos;
	}

	async adicionar(cursoDTO) {
		try {
			console.log(cursoDTO);
			await this.curso.create(cursoDTO);
		} catch (error) {
			console.log(error);
		}
	}

	async update(cursoId, newCursoDTO) {
		try {
			console.log(cursoId);
			await this.curso.update(newCursoDTO, {
				where: {
					id: cursoId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	async delete(cursoId) {
		try {
			console.log(cursoId);
			await this.curso.destroy({
				where: {
					id: cursoId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}
}
