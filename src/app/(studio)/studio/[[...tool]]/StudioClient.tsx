"use client"

import { NextStudio } from "next-sanity/studio"

import config from "../../../../../sanity.config"

export default function StudioClient() {
  return <NextStudio key={config.projectId} config={config} />
}
