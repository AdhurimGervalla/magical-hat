import { createContext } from "react";

export const UserContext = createContext({user: null, username: null, loading: true, groupId: null});