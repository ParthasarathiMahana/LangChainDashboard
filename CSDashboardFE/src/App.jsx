import { useState } from 'react'
import axios from 'axios'
import styles from './App.module.css'
import SearchBar from './components/searchbar/SearchBar'
import { TicketTile } from './components/ticketTIle/TicketTile'
import { useEffect } from 'react'

const tickets = [
  {
    ticketType: 'product',
    heading: "Inquiry regarding Laptop",
    description: "Is there any warrenty on this laptop? If yes how many years?",
    status: true
  },
  {
    ticketType: 'order',
    heading: "Inquiry regarding Order",
    description: "The delivery is taking more than expected time, what is the reason?",
    status: false
  }
]

function App() {
  const [ticketData, setTicketData] = useState([])

  const getTickets = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/ticket')
      setTicketData(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTickets()
  }, [])

  return (
    <>
      <div className={styles.mainContainer}>
        <SearchBar />
        <div className={styles.tileContainer}>
          {ticketData.map((item, index) => {
            return (
              <TicketTile
                key={index}
                ticketType={item.ticketType}
                heading={item.heading}
                description={item.description}
                status={item.status} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
