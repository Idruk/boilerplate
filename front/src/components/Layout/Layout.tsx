import React, { useState } from "react";
import { Outlet } from "react-router-dom"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useStyles from "./style";

const Layout = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0)

    const handleTabValueChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <>
            <Tabs value={tabValue} className={classes.layout} onChange={handleTabValueChange} centered>
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
            <div><Outlet /></div>
        </>
    )
}

export default Layout;