class Model {
    #key = null;
    #id = null;

    constructor({key}) {
        this.#key = key;
        this.#id = (!this.get() || !this.get().length) ? 1 : this.get().pop().id + 1;
    }

    saveData(data) {
        const dbData = this.get();
        const dataToSave = [];

        const copiedData = {...data};
        copiedData.id = this.#id;
        (!dbData || !dbData.length) ?
            dataToSave.push(copiedData) :
            dataToSave.push(...dbData, copiedData)

        this.save(dataToSave);
        return {...dataToSave.at(-1)}
    }

    save(data) {
        const jsonData = JSON.stringify(data)
        try {
            localStorage.setItem(this.#key, jsonData)
            this.#id += 1;
        } catch (error) {
            throw new Error(error)
        }

    }

    get() {
        return JSON.parse(
            localStorage.getItem(this.#key)
        )
    }

}
