import React from "react"
import { DashboardLayout } from "../components/dashboard/DashboardLayout"
import OverviewPage from "@/components/dashboard/Overview/Overview"

const Overview = () => {
  return (
    <>
      <DashboardLayout>
        <OverviewPage/>
      </DashboardLayout>
    </>
  )
}

export default Overview
