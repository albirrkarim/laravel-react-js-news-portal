import React, { useState, useEffect } from "react";

import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import Caption from "../../../components/Caption";

import axios from 'axios';

export default function SelectCategory({ value, setValue }) {
    const [items,setItems]=useState([]);

    useEffect(()=>{
        axios.get(`${location.origin}/api/categories`).then((resp)=>{
            setItems(resp.data);
        })

    },[]);

    return (
        <Caption text="Ruangan yang anda edit ini ada di kategori apa ya ?">
            <FormControl variant="outlined" size="small" className="w-100 mt-2">
                <InputLabel id="category">Category</InputLabel>
                <Select
                    labelId="category"
                    label="category"
                    value={value}
                    name="category"
                    onChange={(e)=>{
                        setValue(e.target.value);
                    }}
                >
                    {items.map((item, idx) => (
                        <MenuItem key={idx} value={item.category_id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Caption>
    );
}
