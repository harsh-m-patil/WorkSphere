/* eslint-disable no-console */
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import Work from '../models/work.model.js'

const DATABASE_URL = 'mongodb://worksphere-db:27017/WorkSpherev2'

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('Connected to DB ✅'))
  .catch((err) => console.error('Connection error ❌', err))

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

const getRandomMonthDate = () => {
  const start = new Date()
  start.setMonth(start.getMonth() - 12)
  return new Date(
    start.getTime() + Math.random() * (Date.now() - start.getTime()),
  )
}

const generateDummyUsers = async () => {
  const users = []
  const password = await bcrypt.hash('Password123', 10)

  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const userName = faker.internet.username()
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

    const balance =
      role === 'freelancer' ? 0 : faker.number.int({ min: 1000, max: 10000 })

    users.push({
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      jobTitle: role === 'freelancer' ? jobTitle : null,
      skills,
      languages,
      certificates,
      balance,
      createdAt: getRandomMonthDate(),
    })
  }

  users.push({
    firstName: 'Admin',
    lastName: 'User',
    userName: 'admin',
    email: 'admin@work.com',
    password,
    passwordConfirm: 'Password123',
    role: 'admin',
  })

  await User.insertMany(users, { validateBeforeSave: false })
  console.log('🧑‍🤝‍🧑 Dummy users added')
}

const generateDummyWorks = async () => {
  const clients = await User.find({ role: 'client' })
  const freelancers = await User.find({ role: 'freelancer' })

  const works = []

  for (let i = 0; i < 15; i++) {
    const client = faker.helpers.arrayElement(clients)
    const title = faker.helpers.arrayElement(Object.keys(skillsByJob))
    const description = `Looking for a skilled ${title} to help with ${faker.lorem.sentence()}`
    const jobLevel = faker.helpers.arrayElement(['Easy', 'Medium', 'Hard'])

    const pay =
      jobLevel === 'Easy'
        ? faker.number.int({ min: 100, max: 500 })
        : jobLevel === 'Medium'
          ? faker.number.int({ min: 500, max: 1500 })
          : faker.number.int({ min: 1500, max: 5000 })

    const appliedFreelancers = faker.helpers.arrayElements(
      freelancers,
      faker.number.int({ min: 2, max: 5 }),
    )

    const hiredFreelancer = faker.helpers.arrayElement(appliedFreelancers)

    if (hiredFreelancer) {
      hiredFreelancer.balance += pay
      await hiredFreelancer.save({ validateBeforeSave: false })
    }

    works.push({
      title,
      description,
      pay,
      joblevel: jobLevel,
      skills_Required: skillsByJob[title],
      applied_status: appliedFreelancers.map((f) => f._id),
      noOfApplicants: appliedFreelancers.length,
      freelancer_id: hiredFreelancer?._id || null,
      client_id: client._id,
      createdAt: getRandomMonthDate(),
    })
  }

  await Work.insertMany(works)
  console.log('📄 Dummy works added')
}

const updateApplicationCounts = async () => {
  const freelancers = await User.find({ role: 'freelancer' })
  for (const freelancer of freelancers) {
    const count = await Work.countDocuments({ applied_status: freelancer._id })
    freelancer.noOfApplications = count
    await freelancer.save({ validateBeforeSave: false })
  }

  console.log('📊 Updated freelancer application counts')
}

const seedDB = async () => {
  try {
    await User.deleteMany({})
    await Work.deleteMany({})
    console.log('🧹 Cleared database')

    await generateDummyUsers()
    await generateDummyWorks()
    await updateApplicationCounts()

    console.log('🌱 Database seeded successfully')
    mongoose.connection.close()
  } catch (error) {
    console.error('❌ Seeder error:', error)
    mongoose.connection.close()
  }
}

seedDB()
