import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout";

const NotFound = () => (<div>not found</div>)
const Test = () => (<div>test</div>)

const children = [
    {
        path: "test",
        Component: Test,
    },
    {
        path: "*",
        Component: NotFound
    }
]


export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: children,
            ErrorBoundary: NotFound,
        },
    ])

    return <RouterProvider router={router} />
}
