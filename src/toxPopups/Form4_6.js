import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form4_6 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param?.submissionNumber,
        'Subsection_Name': "Completed (i-Done) or Open Special Review"
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setFormData(data)
        }
    }, [data])

    function handleFormData(name, value) {
        setFormData({ ...formData, [name]: value })
    }

    function handleDate(date, dateString) {
        handleFormData('Date_Received', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber
        }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/geninfoinfolinetable`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`https://aldprototype.ca:3000/api/geninfoinfolinetable/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={() => setOpen(false)} title='Add New Record' footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.row_id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div className='mb-3'>
                <p>Date Received:</p>
                <DatePicker onChange={handleDate} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>Comments Received:</p>
                <Input placeholder='Comments Received' className='mb-3' value={formData?.Comments_Received} onChange={(e) => handleFormData('Comments_Received', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form4_6