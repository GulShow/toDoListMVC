class Controller {
    #model = null;
    #view = null;

    form = null;
    formSelector = null;
    todoContainerSelector = null;
    todoContainer = null;


    constructor(model, view, {formSelector, todoContainerSelector}) {
        this.#setModel(model);
        this.#setView(view);

        this.formSelector = formSelector
        this.todoContainerSelector = todoContainerSelector

        this.getForm();
        this.getTodoContainer();
        this.form.addEventListener('submit', this.#handleForm);
        this.#getHTMLElement()
    }

    #handleForm = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.#validateForm()) throw new Error('Please start with a capital letter')
        const data = {};

        this.form.querySelectorAll('input, textarea')
            .forEach(item => {
                data[item.name] = item.value
            })
        try {
            const savedToDoItems = this.#model.saveData(data);
            this.#view.renderItem(savedToDoItems);
        } catch (error) {
            this.#view.showDBError(error.description)
        }
        this.#removeItem();
        this.#view.resetForm()

    }


    getTodoContainer() {
        this.todoContainer = document.querySelector(this.todoContainerSelector);
        this.#view.setTodosContainer(this.todoContainer);
    }

    getForm() {
        const form = document.querySelector(this.formSelector);
        if (!(form instanceof HTMLFormElement)) throw new Error('Form should be an HTML form element');
        this.form = form;
        this.#view.setForm(form);
    }

    #setModel(modelInstance) {
        if (!modelInstance) throw new Error('Model is required')
        this.#model = modelInstance;
    }

    #setView(viewInstance) {
        if (!viewInstance) throw new Error('View is required')
        this.#view = viewInstance;
    }

    #removeItem() {
        this.todoContainer.addEventListener('click', e => {
            e.stopPropagation();
            const currentItem = e.target.closest('[data-id]');
            const currentItemId = Number(currentItem.getAttribute('data-id'));
            const filteredData = this.#model.get()
                .filter(item => item.id !== currentItemId)
            this.#model.save(filteredData)
            this.#view.removeElement(currentItem)
        })
    }

    #validateForm() {
        const inputs = document.querySelector(this.formSelector).querySelectorAll('input , textarea')
        for (let i = 0; i < inputs.length; i++) {
            const needLetter = inputs[i].value.trim().charAt(0)
            if (needLetter !== needLetter.toUpperCase()) {
                this.#view.addErrorClass(inputs[i])
                return false
            }
            this.#view.removeErrorClass(inputs[i])
        }
        return true;
    }

    #getHTMLElement() {
        document.addEventListener('DOMContentLoaded', event => {
            event.preventDefault();
            event.stopPropagation();
            const toDo = this.#model.get();
            if(!toDo) {
                console.log('LocalStorage is empty');
                return;
            }
            for (let i = 0; i < toDo.length; i++) {
                this.#view.renderItem(toDo[i])
            }
        })
    }

}

