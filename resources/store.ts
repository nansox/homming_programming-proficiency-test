import Vue from 'vue'
import Vuex from 'vuex'
import PropertiesHandler from '@/modules/properties/store/properties-handler'


Vue.use(Vuex)

const store = new Vuex.Store({ modules: { PropertiesHandler } })

export default store