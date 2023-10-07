import {pool} from '../config/database.js'
import '../config/dotenv.js'
import eventsData from '../data/events.js'

const createEventsTable=async() =>{
    const createTableQuery=`
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      time VARCHAR(10) NOT NULL,
      date VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      
    )
    `
    try {
        await pool.query(createTableQuery)
        console.log('🎉 Events table created successfully')
      } catch (err) {
        console.error('⚠️ error creating events table', err)
      }
}

const feedEventsTable = async () => {
    await createEventsTable()
  
    eventsData.forEach((event) => {
      const insertQuery = {
        text: 'INSERT INTO events (title, time, date, image) VALUES ($1, $2, $3, $4)'
      }
  
      const values = [
        event.title,
        event.time,
        event.date,
        event.image
      ]
  
      pool.query(insertQuery, values, (err, res) => {
        if (err) {
          console.error('⚠️ error inserting event', err)
          return
        }
        console.log(`✅ ${event.title} added successfully`)
      })
    })
  }
  
  feedEventsTable()