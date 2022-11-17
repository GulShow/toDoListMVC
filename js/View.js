class View {
    #todoContainer = null;
    #form = null;
    formSelector = null;
    todoContainerSelector = null;

    constructor({formSelector, todoContainerSelector}) {
        this.formSelector = formSelector
        this.todoContainerSelector = todoContainerSelector
    }

    renderItem({title, description, id}) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-id', id);
        wrapper.innerHTML = `
                <div class="taskWrapper">
                    <div class="taskHeading">${title}</div>
                    <div class="taskDescription">${description}</div>
                </div>`;

        this.#todoContainer.prepend(wrapper);
    }


    setTodosContainer(htmlElement) {
        if (this.#todoContainer) throw new Error('You cannot redeclare todo container');
        this.#todoContainer = htmlElement;
    }

    setForm(htmlElement) {
        if (this.#todoContainer) throw new Error('You cannot redeclare form');
        this.#form = htmlElement;
    }

    resetForm() {
        const form = document.querySelector(this.formSelector);
        form.reset()
    }

    addErrorClass(errorItem) {
        errorItem.classList.add('errorMessage');
    }

    removeErrorClass(errorItem) {
        errorItem.classList.remove('errorMessage');
    }

    removeElement(item) {
        item.remove()
    }

    showDBError(errorMessage) {
        alert(errorMessage)
    }

}
