import { randomUUID } from "crypto"


export class DatabaseMemory{
    #receitas = new Map()

list(search){
    return Array.from(this.#receitas.entries()).map((receitaArray) => {
        const id = receitaArray[0]

        const data = receitaArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(receita => {
        if (search){
            return receita.nmReceita.includes(search)
        }
        return true
    })
}

    create(receita){
        const receitaId = randomUUID()
        this.#receitas.set(receitaId, receita)
    }
    
    update(id, receita){
        this.#receitas.set(id, receita)
    }

    delete(id, receita){
        this.#receitas.delete(id, receita)
    }
}