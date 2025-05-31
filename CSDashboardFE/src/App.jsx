import { useState } from 'react'
import styles from './App.module.css'
import SearchBar from './components/searchbar/SearchBar'
import { TicketTile } from './components/ticketTIle/TicketTile'

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
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={styles.mainContainer}>
        <SearchBar />
        <div className={styles.tileContainer}>
          {tickets.map((item, index) => {
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
