import React, { useState } from 'react'
import styles from './ticketTile.module.css'
import { Tag } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import TicketModal from '../ticketModal/TIcketModal';

export const TicketTile = ({ ticketType, heading, description, status }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className={styles.tileContainer} onClick={() => setOpen(true)}>
                <div className={styles.tileImageDiv}>
                    <img src={ticketType === 'order' ? "/query.svg" : "/product.svg"} alt={ticketType === 'order' ? "query" : "product"} height='40px' />
                </div>
                <div className={styles.tileDescDiv}>
                    <div className={styles.heading}>
                        <h4>{heading}</h4>
                    </div>
                    <div className={styles.description}>
                        <p title={description}>
                            {description}
                        </p>
                        <Tag icon={status ? <CheckCircleOutlined /> : <ClockCircleOutlined />} color={status ? "success" : "warning"}>
                            {status ? "Closed" : "Open"}
                        </Tag>
                    </div>
                </div>
            </div>
            <TicketModal open={open} setOpen={setOpen} heading={heading} description={description} status={status} />
        </>
    )
}
