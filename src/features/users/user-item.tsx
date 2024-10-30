import React from "react"
import { IUser } from "./types"
import { useAppDispatch } from "../../app/hooks"
import { deleteUser } from "./user.slice"

interface IProps extends IUser { }

export const UserItem: React.FC<IProps> = ({ id, name, username }) => {

    const dispatch = useAppDispatch()

    const handelDelete = () => {
        dispatch(deleteUser(id))
    }

    return <div>
        <h3>{name}</h3>
        <h3>{username}</h3>
        <button onClick={() => handelDelete()}>Delete</button>
    </div>
}