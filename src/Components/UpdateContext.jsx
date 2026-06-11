import { createContext, useState } from "react";

const UpdateContext = createContext()

export function UpdateProvider({children}) {
    const [tick, setTick] = useState(0)

    return (
        <UpdateContext.Provider value={{tick, setTick}}>
            {children}
        </UpdateContext.Provider>
    )
}