import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'
import { write } from "fs"

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
    token,
})
if (!writeClient.config().token) {
    throw new Error('SANITY WRITE TOKEN is not set or not found. Write operations will fail.')
}