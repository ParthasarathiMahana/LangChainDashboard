import { Modal, Input, Button, Form, Tag } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const ModalContainer = ({ heading, description, status, setResponse, userDetails }) => {

    return (
        <div>
            <div style={{ height: "40px", marginBottom: "20px", display: 'flex', alignItems: 'center', gap: '12px', borderBottom: "1px solid lightgray" }}>
                <h3>{userDetails.name}</h3>
                <Tag style={{ height: 25 }} icon={status ? <CheckCircleOutlined /> : <ClockCircleOutlined />} color={status ? "success" : "warning"}>
                    {status ? "Closed" : "Open"}
                </Tag>
            </div>
            <Form layout='vertical'>
                <Form.Item label={<b>Heading</b>}>
                    <Input value={heading} readOnly />
                </Form.Item>
                <Form.Item label={<b>Description</b>}>
                    <Input.TextArea value={description} rows={3} readOnly />
                </Form.Item>
                <Form.Item label={<b>Response</b>}>
                    <Input.TextArea rows={5} onChange={(e) => setResponse(e.target.value)} />
                </Form.Item>
            </Form>
        </div>
    )
}

const TicketModal = ({ ticketID, open, setOpen, heading, description, status, userID }) => {

    const [response, setResponse] = useState('')
    const [userDetails, setUserDetails] = useState({})

    const askAI = async () => {
        console.log("Calling Ask AI api to get the response...")
    }

    const handleSubmit = async () => {
        console.log(ticketID);

        if (!response) {
            console.error("Response can not be empty.", response);
        } else {
            try {
                let postResponse = await axios.post(`http://localhost:4000/ticket/${ticketID}`, { response: response }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log(postResponse);
                await axios.get('http://localhost:4000/ticket')
                setOpen(false)
            } catch (error) {
                console.error("error while submitting the response", error);
            }
        }
        // console.log("Submit form in progress...", ticketID, userID)
    }

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/user/${userID}`)
                    setUserDetails(response.data)
                } catch (error) {
                    console.error("Error while fetching user details ", error);
                }
            }
        )()
    }, [userID])

    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={[
            <Button onClick={() => setOpen(false)} key={1}>Cancel</Button>,
            <Button type='primary' onClick={askAI} key={2}>Ask AI for Response</Button>,
            <Button type='primary' onClick={handleSubmit} key={3} disabled={response ? false : true}>Submit</Button>
        ]}>
            <ModalContainer heading={heading} description={description} status={status} setResponse={setResponse} userDetails={userDetails} />
        </Modal>
    )
}

export default TicketModal