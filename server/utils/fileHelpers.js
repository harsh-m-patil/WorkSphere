import fs from 'fs/promises'
import path from 'path'

export const deleteFile = async (filePath) => {
  try {
    // Only attempt to delete if file exists
    const fullPath = path.join(process.cwd(), 'public', filePath)
    await fs.access(fullPath)
    await fs.unlink(fullPath)
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error)
  }
}
