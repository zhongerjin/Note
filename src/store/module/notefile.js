
export default {
  state: {
    count: 1,
    allPage: null,
    number: null,
    notes: [],
    activeNode: {},
    sbdl: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setData (state, data) {
      state[data.which] = data.data;
    },
    add_note (state, data){
      state.notes.push(data);
    },
    change_note (state, note){
      state.activeNode = note;
    },
    edit_node (state, data){
      state.activeNode[data.which] = data.data;
    }
  },
  actions: {
    saveNote ({commit}, data){
      commit('setData', {
        which: 'allPage',
        data,
      })
    },
    saveNotes ({commit}, data){
      commit('setData', {
        which: 'sbdl',
        data
      })
    },
    addNote ({commit}){
      let new_note = {
        title : '',
        text : 'asd'
      };
      commit('add_note', new_note);
      commit('change_note', new_note);
    },
    changeNode ({commit}, note){
      commit('change_note', note);
    },
    editNodeTitle ({commit}, data){
      commit('edit_node', {
        which: 'title',
        data
      });
    },
    editNodetext ({commit}, data){
      commit('edit_node', {
        which: 'text',
        data
      })
    }
  },
  getters: {
    notes: state => state.notes,
    activeNode: state => state.activeNode
  },
}
