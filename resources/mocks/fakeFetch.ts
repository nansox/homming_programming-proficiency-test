import { properties, propertyTypes, users } from "./api"

export enum API_RESOURCES {
    USERS = 'USERS',
    PROPERTY_TYPES = 'PROPERTY_TYPES',
    PROPERTIES = 'PROPERTIES'
}


export default <T>(resource: API_RESOURCES) => {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            switch (resource) {
                case API_RESOURCES.USERS:
                    resolve(users as unknown as T)
                    break
                case API_RESOURCES.PROPERTY_TYPES:
                    resolve(propertyTypes as unknown as T)
                    break
                case API_RESOURCES.PROPERTIES:
                    resolve(properties as unknown as T)
                    break
            }
        }, 2000)
    })
}