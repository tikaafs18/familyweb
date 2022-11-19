import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../helper";

const UserTable = () => {
    const [data, setData] = useState([]);

    const getUser = () => {
        axios.get(API_URL + '/user/all')
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {
                console.log('getuser error :', error)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    const printUser = () => {
        return data.map(val => {
            return <tr key={val.iduser}>
                <td>{val.name}</td>
                <td>{val.gender}</td>
                <td>{val.city}</td>
                <td>{val.phone_number}</td>
                <td>{val.dad_name}</td>
                <td>{val.mom_name}</td>
            </tr>
        })
    }

    return <table className="table-family">
        <thead>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Domicile</th>
                <th>Phone Number</th>
                <th>Father Name</th>
                <th>Mother Name</th>
            </tr>
        </thead>
        <tbody>
            {printUser()}
        </tbody>
    </table>
}

export default UserTable;