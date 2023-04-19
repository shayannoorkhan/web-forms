import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form4 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param.submissionNumber
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

    function addRecord() {
        const obj = { ...formData, 'submissionNumber': param.submissionNumber }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/valuesection4`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
    }

    function edit() {
        const obj = { ...formData, 'submissionNumber': param.submissionNumber }
        setLoading(true)
        axios.put(`https://aldprototype.ca:3000/api/valuesection4/${formData?.id}`, obj)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
            .catch((err) => {
                formData({})
                setLoading(false)
                setOpen(false)
                message.error('Error')
            })
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={() => setOpen(false)} title='Add New Record' footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div>
                <p>Registration Number:</p>
                <Input placeholder='Registration_Number' className='mb-3' value={formData?.Registration_Number} onChange={(e) => handleFormData('Registration_Number', e.target.value)} />
            </div>
            <div>
                <p>Reference PMRA Document Numbers:</p>
                <Input placeholder='Reference_PMRA_Document_Numbers' className='mb-3' value={formData?.Reference_PMRA_Document_Numbers} onChange={(e) => handleFormData('Reference PMRA Document Numbers', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form4