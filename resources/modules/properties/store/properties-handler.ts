
import { Property } from '@/mocks/api-types'
import fakeFetch, { API_RESOURCES } from '@/mocks/fakeFetch'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export enum PROPERTIES_HANDLER_STATE { INITIAL, LOADING, FAILED, DONE }

@Module({ namespaced: true })
class PropertiesHandler extends VuexModule {
    public properties: Property[] | null = null
    public propertiesHandlerState: PROPERTIES_HANDLER_STATE = PROPERTIES_HANDLER_STATE.INITIAL

    /**
     * Get Properties saved on PropertiesHandler Store Module
     */
    get Properties() {
        return this.properties
    }
    /**
     * Get propertiesHandlerState value of PropertiesHandler Store Module
     */
    get PropertiesHandlerState() {
        return this.propertiesHandlerState
    }

    @Mutation
    public setProperties(newProperties: Property[] | null): void {
        this.properties = newProperties
    }
    @Mutation
    public setState(newState: PROPERTIES_HANDLER_STATE): void {
        this.propertiesHandlerState = newState
    }

    /**
     * Fetch properties from service and save in PropertiesHandler Store Module
     */
    @Action
    public fetchProperties(): void {
        this.context.commit('setState', PROPERTIES_HANDLER_STATE.LOADING)
        fakeFetch<Property[]>(API_RESOURCES.PROPERTIES)
            .then((properties) => {
                this.context.commit('setProperties', properties)
                this.context.commit('setState', PROPERTIES_HANDLER_STATE.DONE)
            })
            .catch(() => {
                this.context.commit('setState', PROPERTIES_HANDLER_STATE.FAILED)
            })
    }

    /** 
     * Set default values to PropertiesHandler Store Module
     */
    @Action
    public cleanPropertiesHandler() {
        this.context.commit('setProperties', null)
        this.context.commit('setState', PROPERTIES_HANDLER_STATE.INITIAL)
    }
}
export default PropertiesHandler