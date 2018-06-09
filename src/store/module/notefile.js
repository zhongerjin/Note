
export default {
  state: {
    count: 1,
    allPage: null,
    number: null,
    notes: [],
    noteGroup: [],
    nowActiveNote: null
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setData (state, data) {
      state[data.which] = data.data;
    },
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
        which: 'nowActiveNote',
        data: data[1]
      });
      commit('setData', {
        which: 'noteGroup',
        data: data[0]
      });
      console.log(data[1]);
    }
  },
  getters: {
    // notes: state => state.notes,
    // activeNode: state => state.activeNode
  },
}
