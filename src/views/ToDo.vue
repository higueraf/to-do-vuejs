<template>
  <h3>To-Do</h3>
  <div class="row">
    <div class="progress">
      <div class="indeterminate" v-show="loading"></div>
    </div>
    <button type="submit" class="btn" @click="openForm()">
      Add<i class="material-icons right">add</i>
    </button>

    <table class="table bordered striped" v-show="!loading">
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created Date</th>
          <th colspan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos">
          <td>{{ todo.id }}</td>
          <td>{{ todo.description }}</td>
          <td>{{ todo.state.toUpperCase() }}</td>
          <td>{{ todo.createdAt }}</td>
          <td>
            <button
              class="btn"
              @click="openForm(todo.id, todo.description, todo.state)"
            >
              <i class="material-icons center">edit</i>
            </button>
            <button
              class="btn"
              @click="openFormDelete(todo.id, todo.description)"
            >
              <i class="material-icons center">delete</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal" id="modal-form-to-do">
    <div class="modal-content">
      <h4>To-Do Form</h4>
      <form @submit.prevent="addTodo">
        <div class="row">
          <div class="input-field">
            <input type="text" v-model="description" />
            <label>Description</label>
            <span class="helper-text"></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <div>Selected: {{ state }}</div>
            <select v-model="state">
              <option v-for="state in states" :value="state">
                {{ state }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col m3">
            <button type="submit" class="btn" @click="save()">
              {{ idToDo == 0 ? "Add" : "Update"
              }}<i class="material-icons right">{{
                idToDo == 0 ? "add" : "edit"
              }}</i>
            </button>
          </div>
          <div class="col m3">
            <button class="btn" @click="closeForm()">
              Cancel
              <i class="material-icons right">close</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" id="modal-form-to-do-delete">
    <div class="modal-content">
      <h4>To-Do Delete Form</h4>
      <div class="row">
        <div class="col m12">
          <p>Are you sure you want to delete this to-do?</p>
          <p>Id: {{ idToDo }}</p>
          <p>Description: {{ description }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col m3">
          <button type="submit" class="btn" @click="deleteToDo(idToDo)">
            Delete<i class="material-icons right">delete</i>
          </button>
        </div>
        <div class="col m3">
          <button class="btn" @click="closeFormDelete()">
            Cancel
            <i class="material-icons right">close</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  name: "ToDo",
  data() {
    return {
      todos: [],
      newTodo: "",
      loading: false,
      current_page: 1,
      pages: 1,
      description: "",
      id: 0,
      idToDo: 0,
      state: "ACTIVE",
      states: ["ACTIVE", "COMPLETED", "DELETED"],
      modals: [],
    };
  },
  async mounted() {
    this.loading = true;
    await this.axios
      .get("to-do")
      .then((response) => {
        console.log(response);
        this.todos = response.data;
        this.pages = response.data.last_page;
        this.loading = false;
      })
      .catch((error) => {
        if (error.response.status) this.$router.push("/login");
      });

    const elemsModal = document.querySelectorAll(".modal");
    const instancesModal = M.Modal.init(elemsModal, null);
    const elemsSelect = document.querySelectorAll("select");
    const instancesSelect = M.FormSelect.init(elemsSelect);
  },
  methods: {
    openForm(id, description, state) {
      this.idToDo = id || 0;
      this.description = description || "";
      this.state = state || "ACTIVE";
      var modalFormToDo = M.Modal.getInstance(
        document.getElementById("modal-form-to-do")
      );
      modalFormToDo.open();
    },
    save() {
      var payload = {
        description: this.description,
        state: this.state,
      };
      if (this.idToDo == 0) {
        this.axios.post("to-do", payload).then((response) => {
          console.log("response", response);
          this.idToDo = response.data.id;
          this.description = response.data.description;
          this.todos.unshift(response.data);
          M.toast({ html: "To-Do created successfully" });
        });
      } else {
        this.axios.put("to-do/" + this.idToDo, payload).then((response) => {
          this.description = response.data.description;
          const index = this.todos.findIndex((el) => el.id == this.idToDo);
          this.todos[index] = response.data;
          M.toast({ html: "To-Do updated successfully" });
        });
      }
    },
    closeForm() {
      var modalFormToDo = M.Modal.getInstance(
        document.getElementById("modal-form-to-do")
      );
      modalFormToDo.close();
    },
    openFormDelete(id, description) {
      this.idToDo = id;
      this.description = description;
      var modalFormToDoDelete = M.Modal.getInstance(
        document.getElementById("modal-form-to-do-delete")
      );
      modalFormToDoDelete.open();
    },
    closeFormDelete() {
      var modalFormToDo = M.Modal.getInstance(
        document.getElementById("modal-form-to-do-delete")
      );
      modalFormToDo.close();
    },
    deleteToDo(id) {
      this.axios.delete("to-do/" + id).then((response) => {
        M.toast({ html: "To-Do deleted successfully" });
        this.todos = this.todos.filter((todo) => todo.id != id);
        this.closeFormDelete();
      });
    },
  },
};
</script>
