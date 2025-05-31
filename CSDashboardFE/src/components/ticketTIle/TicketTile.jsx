import React from 'react'
import styles from './ticketTile.module.css'
import { Descriptions, Tag } from 'antd'
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';

export const TicketTile = ({ ticketType, heading, description, status }) => {
    return (
        <>
            <div className={styles.tileContainer}>
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
        </>
    )
}
