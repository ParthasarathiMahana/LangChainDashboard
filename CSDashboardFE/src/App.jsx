import { useState } from 'react'
import styles from './App.module.css'
import SearchBar from './components/searchbar/SearchBar'
import { TicketTile } from './components/ticketTIle/TicketTile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={styles.mainContainer}>
        <SearchBar />
        <div className={styles.tileContainer}>
          <TicketTile
            ticketType='product'
            heading="Inquiry regarding Laptop"
            description="Is there any warrenty on this laptop? If yes how many years?"
            status={true} />
          <TicketTile
            ticketType='order'
            heading="Inquiry regarding Order"
            description="The delivery is taking more than expected time, what is the reason?"
            status={false}
          />
        </div>
      </div>
    </>
  )
}

export default App
