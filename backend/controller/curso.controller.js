export class CursoController {
	constructor(CursoModel) {
		this.curso = CursoModel;
	}

	async getAll() {
		const cursos = await this.curso.findAll();
		return cursos;
	}

	async get(cursoDTO) {
		const cursos = await this.curso.findAll({
			where: {
				id: cursoDTO.id,
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

	async update(cursoDTO, newCursoDTO) {
		try {
			console.log(cursoDTO);
			await this.curso.update(newCursoDTO, {
				where: {
					id: cursoDTO.id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	async delete(cursoDTO) {
		try {
			console.log(cursoDTO);
			await this.curso.destroy({
				where: {
					id: cursoDTO.id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}
}
