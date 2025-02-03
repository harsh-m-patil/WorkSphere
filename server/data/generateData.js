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

// Skill Categories
const skillsByJob = {
  'JavaScript Developer': ['JavaScript', 'React', 'Node.js'],
  'Node.js Developer': ['JavaScript', 'Node.js', 'MongoDB'],
  'React Developer': ['JavaScript', 'React', 'UI/UX Design'],
  'Python Developer': ['Python', 'Django', 'Machine Learning'],
  'UI Designer': ['UI/UX Design', 'Figma', 'Adobe Photoshop'],
  'UX Designer': ['UI/UX Design', 'Figma', 'User Research'],
  'SEO Specialist': ['SEO', 'Google Analytics', 'Content Strategy'],
  'Full Stack Developer': ['JavaScript', 'Node.js', 'React', 'MongoDB'],
  'Frontend Developer': ['JavaScript', 'React', 'CSS', 'HTML'],
  'Backend Developer': ['Node.js', 'MongoDB', 'Express.js'],
  'Web Developer': ['HTML', 'CSS', 'JavaScript', 'React'],
  'SEO Expert': ['SEO', 'Google Ads', 'Keyword Research'],
  'React Expert': ['JavaScript', 'React', 'Next.js'],
  'UI Developer': ['UI/UX Design', 'HTML', 'CSS', 'JavaScript'],
  'Python Engineer': ['Python', 'Django', 'Data Science'],
}

// Languages & Certificates
const languagesList = ['Marathi', 'Hindi', 'English', 'Kannada', 'Telugu']
const certificatesList = {
  'JavaScript Developer': ['JavaScript Certification'],
  'Node.js Developer': ['Node.js Certified Developer'],
  'React Developer': ['React Advanced Certification'],
  'Python Developer': ['Python Data Science Certification'],
  'UI Designer': ['Adobe Certified Professional'],
  'UX Designer': ['UX Researcher Certification'],
  'SEO Specialist': ['Google Ads Certification'],
  'Full Stack Developer': ['MERN Stack Expert'],
}

// Generate a realistic creation date within the last 12 months
const getRandomMonthDate = () => {
  const start = new Date()
  start.setMonth(start.getMonth() - 12)
  return new Date(
    start.getTime() + Math.random() * (Date.now() - start.getTime()),
  )
}

// Generate Users (Freelancers & Clients)
const generateDummyUsers = async () => {
  const users = []
  const password = await bcrypt.hash('Password123', 10)

  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const userName = faker.internet
      .username(firstName, lastName)
      .replace(/\d/g, '')
      .toLowerCase()
    const email = faker.internet.email(firstName, lastName)
    const role = faker.helpers.arrayElement(['freelancer', 'client'])
    const jobTitle = faker.helpers.arrayElement(Object.keys(skillsByJob))

    const skills = role === 'freelancer' ? skillsByJob[jobTitle] : []
    const languages =
      role === 'freelancer' ? faker.helpers.arrayElements(languagesList, 2) : []
    const certificates =
      role === 'freelancer'
        ? faker.helpers.arrayElements(certificatesList[jobTitle] || [], 1)
        : []
    const balance = faker.number.int({ min: 100, max: 5000 })
    const createdAt = getRandomMonthDate()

    users.push({
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm: password,
      role,
      jobTitle: role === 'freelancer' ? jobTitle : null,
      skills,
      languages,
      certificates,
      balance,
      createdAt,
    })
  }

  // Admin User
  users.push({
    firstName: 'Admin',
    lastName: 'User',
    userName: 'admin',
    email: 'admin@work.com',
    password,
    passwordConfirm: password,
    role: 'admin',
    createdAt: new Date(),
  })

  await User.insertMany(users)
  console.log('Dummy users added.')
}

// Generate Work Listings
const generateDummyWorks = async () => {
  const clients = await User.find({ role: 'client' })
  const freelancers = await User.find({ role: 'freelancer' })
  const works = []

  for (let i = 0; i < 15; i++) {
    const client = faker.helpers.arrayElement(clients)
    const title = faker.helpers.arrayElement(Object.keys(skillsByJob))
    const description = `Looking for a skilled ${title} to help with ${faker.lorem.sentence()}`
    const jobLevel = faker.helpers.arrayElement(['Easy', 'Medium', 'Hard'])

    // Ensure pay is reasonable based on difficulty
    const pay =
      jobLevel === 'Easy'
        ? faker.number.int({ min: 100, max: 500 })
        : jobLevel === 'Medium'
          ? faker.number.int({ min: 500, max: 1500 })
          : faker.number.int({ min: 1500, max: 5000 })

    const skillsRequired = skillsByJob[title]
    const applied_status = faker.helpers.arrayElements(
      freelancers,
      faker.number.int({ min: 2, max: 8 }),
    )
    const createdAt = getRandomMonthDate()

    works.push({
      title,
      description,
      pay,
      jobLevel,
      skills_Required: skillsRequired,
      client_id: client._id,
      applied_status: applied_status.map((user) => user._id),
      noOfApplicants: applied_status.length,
      createdAt,
    })
  }

  await Work.insertMany(works)
  console.log('Dummy works added.')
}

// Update Freelancers with Number of Applications
const updateUsers = async () => {
  const freelancers = await User.find({ role: 'freelancer' })

  for (const freelancer of freelancers) {
    const appliedJobs = await Work.find({ applied_status: freelancer._id })
    freelancer.noOfApplications = appliedJobs.length
    await freelancer.save({ validateBeforeSave: false })
  }
}

// Seed Database
const seedDatabase = async () => {
  try {
    await User.deleteMany({})
    await Work.deleteMany({})

    await generateDummyUsers()
    await generateDummyWorks()
    await updateUsers()

    console.log('Database seeded successfully.')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.connection.close()
  }
}

seedDatabase()
