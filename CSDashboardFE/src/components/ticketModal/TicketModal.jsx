import { Modal, Input, Button, Form } from 'antd'
import useSelection from 'antd/es/table/hooks/useSelection'
import React, { useState } from 'react'

const ModalContainer = ({ heading, description, status, setResponse }) => {
    return (
        <div>
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

const TicketModal = ({ open, setOpen, heading, description, status }) => {

    const [response, setResponse] = useState('')

    const askAI = async () => {
        console.log("Calling Ask AI api to get the response...")
    }

    const handleSubmit = async () => {
        console.log("Submit form in progress...")
    }

    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={[
            <Button onClick={() => setOpen(false)} key={1}>Cancel</Button>,
            <Button type='primary' onClick={askAI} key={2}>Ask AI for Response</Button>,
            <Button type='primary' onClick={handleSubmit} key={3} disabled={response ? false : true}>Submit</Button>
        ]}>
            <ModalContainer heading={heading} description={description} status={status} setResponse={setResponse} />
        </Modal>
    )
}

export default TicketModal