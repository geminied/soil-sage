import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import landRoutes from './routes/lands.js'
import rentalRoutes from './routes/rentals.js'
import notificationRoutes from './routes/notifications.js'
import communityRoutes from './routes/communities.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import likeRoutes from './routes/likes.js'
import savedPostRoutes from './routes/savedPosts.js'
import inventoryRoutes from './routes/inventory.js'
import diagnosisRoutes from './routes/diagnoses.js'
import providerRoutes from './routes/providers.js'
import followRoutes from './routes/follows.js'
import discoveryRoutes from './routes/discovery.js'
import discoveryCommentRoutes from './routes/discoveryComments.js'
import chatRoutes from './routes/chat.js'
import reviewRoutes from './routes/reviews.js'
import recommendationRoutes from './routes/recommendations.js'
import appointmentRoutes from './routes/appointments.js'



export const app = express()

app.use(
  cors({
    origin: 'https://soil-sage-one.vercel.app',  // Replace with your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
)
app.use(express.json({ limit: '2mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'soil-sage-api' })
})

const v1 = express.Router()
v1.use('/auth', authRoutes)
v1.use('/users', userRoutes)
v1.use('/admin', adminRoutes)
v1.use('/lands', landRoutes)
v1.use('/rentals', rentalRoutes)
v1.use('/notifications', notificationRoutes)
v1.use('/communities', communityRoutes)
v1.use('/posts', postRoutes)
v1.use('/comments', commentRoutes)
v1.use('/likes', likeRoutes)
v1.use('/saved-posts', savedPostRoutes)
v1.use('/inventory', inventoryRoutes)
v1.use('/diagnoses', diagnosisRoutes)
v1.use('/providers', providerRoutes)
v1.use('/follows', followRoutes)
v1.use('/discovery', discoveryRoutes)
v1.use('/discovery-comments', discoveryCommentRoutes)
v1.use('/chat', chatRoutes)
v1.use('/reviews', reviewRoutes)
v1.use('/recommendations', recommendationRoutes)
v1.use('/appointments', appointmentRoutes)

app.use('/api/v1', v1)
app.use('/api/v1/auth', authRoutes)

// Start the server
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})


const your_token = localStorage.getItem('auth_token');  // Or wherever your token is stored

fetch('https://soil-sage-api.onrender.com/api/v1/admin/approvals', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${your_token}`,  // Add your auth token here
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ /* data */ })
})