import React from "react"
import { DashboardLayout } from "../components/dashboard/DashboardLayout"
import UsersTable from "@/components/dashboard/UsersTable/UsersTable"

const UsersPage = () => {
  return (
    <>
      <DashboardLayout>
        <UsersTable />
      </DashboardLayout>
    </>
  )
}

export default UsersPage
