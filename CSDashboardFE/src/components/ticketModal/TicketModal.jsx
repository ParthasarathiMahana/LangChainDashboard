import { Modal, Input, Button, Form, Tag, notification } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

let notificationContent = {
    "success":{
        message: "Success",
        description: "Reponse added successfully"
    },
    "error":{
        message: "Error",
        description: "Error while adding response"
    }
}

const ModalContainer = ({ heading, description, status, setResponse, userDetails, reply }) => {

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
                    <Input.TextArea value={reply ? reply : ''} rows={5} onChange={(e) => setResponse(e.target.value)} />
                </Form.Item>
            </Form>
        </div>
    )
}

const TicketModal = ({ ticketType, ticketID, open, setOpen, heading, description, status, userID, reply }) => {

    const [response, setResponse] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [api, contextHolder] = notification.useNotification()
    const [askingAI, setAskingAI] = useState(false)

    const openNotificationWithIcon = (type) => {
    api[type]({
      message: notificationContent[type].message,
      description: notificationContent[type].description,
    });
  };

    useEffect(()=>{
        setResponse(reply)
    }, [reply])

    const askAI = async () => {
        // console.log("Calling Ask AI api to get the response...", "userDetails: ",userDetails, "description: ",description, "ticketType: ",ticketType)

        try {
            setAskingAI(true)
            const response = await axios.post('http://localhost:4000/askAI', {userDetails, description, ticketType}, {
                "headers":{
                    "Content-Type": "application/json"
                }
            })
            // console.log(response?.data?.answer)
            setResponse(response?.data?.answer)
            setAskingAI(false)
        } catch (error) {
            console.error(error)
            setAskingAI(false)
        }
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
                openNotificationWithIcon('success')
                await axios.get('http://localhost:4000/ticket')
                setOpen(false)
                
            } catch (error) {
                openNotificationWithIcon('error')
                console.error("error while submitting the response", error);
            }
        }
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
        <>
        {contextHolder}
        <Modal open={open} onCancel={() => setOpen(false)} footer={[
            <div style={{display:"flex", justifyContent:"flex-end", gap:"5px"}}>
                <Button onClick={() => setOpen(false)} key={1}>Cancel</Button>
                <Button type='primary' onClick={askAI} key={2} loading={askingAI}>
                <img src='/aiGen.svg' height={20}/>
                Ask AI for Response
                </Button>
                <Button type='primary' onClick={handleSubmit} key={3} disabled={response ? false : true}>Submit</Button>
            </div>
        ]}>
            <ModalContainer heading={heading} description={description} status={status} setResponse={setResponse} userDetails={userDetails} reply={response} />
        </Modal>
        </>
    )
}

export default TicketModal