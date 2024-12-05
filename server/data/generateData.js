import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import User from '../models/user.model.js'
import Work from '../models/work.model.js'
import bcrypt from 'bcrypt'

const DATABASE_URL = 'mongodb://localhost:27017/WorkSpherev2'
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err))

// Sample data arrays
const skillsList = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'UI/UX Design',
  'SEO',
]
const languagesList = ['Marathi', 'Hindi', 'English', 'Kannada', 'Telugu']
const certificatesList = [
  'AWS Certified Solutions Architect',
  'Google Ads Certification',
  'TOEFL',
  'Adobe Certified Professional',
]

const jobTitles = [
  'JavaScript Developer',
  'Node.js Developer',
  'React Developer',
  'Python Developer',
  'UI Designer',
  'UX Designer',
  'SEO Specialist',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Web Developer',
  'SEO Expert',
  'React Expert',
  'UI Developer',
  'Python Engineer',
]

// Helper function to generate random dates within the last 12 months
const getRandomMonthDate = () => {
  const start = new Date()
  start.setMonth(start.getMonth() - 12) // Start 12 months ago
  const end = new Date() // End is the current date
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
  return randomDate
}

const generateDummyUsers = async () => {
  const users = []
  const password = await bcrypt.hash('Password123', 10) // Default password
  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const userName = faker.internet.username(firstName, lastName).toLowerCase()
    const email = faker.internet.email(firstName, lastName)
    const role = faker.helpers.arrayElement(['freelancer', 'client'])
    const skills =
      role === 'freelancer' ? faker.helpers.arrayElements(skillsList, 3) : []
    const languages =
      role === 'freelancer' ? faker.helpers.arrayElements(languagesList, 2) : []
    const certificates =
      role === 'freelancer'
        ? faker.helpers.arrayElements(certificatesList, 2)
        : []
    const balance = faker.number.int({ min: 100, max: 1000 })
    const createdAt = getRandomMonthDate() // Generate a random creation date

    users.push({
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm: password,
      role,
      skills,
      languages,
      certificates,
      balance,
      createdAt, // Attach the random date
    })
  }

  users.push({
    firstName: 'Admin',
    lastName: 'User',
    userName: 'admin',
    email: 'admin@work.com',
    password,
    passwordConfirm: password,
    role: 'admin',
    createdAt: new Date(), // Admin user creation date is the current date
  })

  await User.insertMany(users)
  console.log('Dummy users added.')
}

const generateDummyWorks = async () => {
  const clients = await User.find({ role: 'client' })
  const freelancers = await User.find({ role: 'freelancer' })
  const works = []

  for (let i = 0; i < 10; i++) {
    const client = faker.helpers.arrayElement(clients)
    const freelancer = faker.helpers.arrayElement(freelancers)
    const title = faker.helpers.arrayElement(jobTitles)
    const description = faker.lorem.paragraph()
    const pay = faker.number.int({ min: 100, max: 1000 })
    const jobLevel = faker.helpers.arrayElement(['Easy', 'Medium', 'Hard'])
    const skillsRequired = faker.helpers.arrayElements(skillsList, 3)
    const applied_status = faker.helpers.arrayElements(freelancers, 10)
    const jobCreatedAt = getRandomMonthDate() // Generate a random job creation date

    works.push({
      title,
      description,
      pay,
      joblevel: jobLevel,
      skills_Required: skillsRequired,
      client_id: client._id,
      freelancer_id: freelancer._id,
      applied_status: applied_status, // Empty initially
      createdAt: jobCreatedAt, // Attach the random date
    })
  }

  // Pending applications
  for (let i = 0; i < 10; i++) {
    const client = faker.helpers.arrayElement(clients)
    const title = faker.helpers.arrayElement(jobTitles)
    const description = faker.lorem.paragraph()
    const pay = faker.number.int({ min: 100, max: 1000 })
    const jobLevel = faker.helpers.arrayElement(['Easy', 'Medium', 'Hard'])
    const skillsRequired = faker.helpers.arrayElements(skillsList, 3)
    const applied_status = faker.helpers.arrayElements(freelancers, 10)
    const jobCreatedAt = getRandomMonthDate() // Generate a random job creation date

    works.push({
      title,
      description,
      pay,
      joblevel: jobLevel,
      skills_Required: skillsRequired,
      client_id: client._id,
      applied_status: applied_status, // Empty initially
      jobCreatedAt, // Attach the random date
    })
  }
  await Work.insertMany(works)
  console.log('Dummy works added.')
}

// Admin user creation function
const updateUsers = async () => {
  const freelancers = await User.find({ role: 'freelancer' })

  for (let i = 0; i < freelancers.length; i++) {
    const id = freelancers[i]._id
    const works = await Work.find({ applied_status: { $in: [id] } })
    freelancers[i].noOfApplications = works.length
    await freelancers[i].save({ validateBeforeSave: false })
  }
}

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Work.deleteMany({})

    // Generate new data
    await generateDummyUsers()
    await generateDummyWorks() // Get generated works
    await updateUsers()

    console.log('Database seeded successfully.')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.connection.close()
  }
}

seedDatabase()
