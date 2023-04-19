import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form3_5 = ({ open, setOpen, data, getFormData }) => {
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

    function handleLastUpdateDate(date, dateString) {
        handleFormData('Status_date:', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber
        }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/geninforegulatorstable`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`https://aldprototype.ca:3000/api/geninforegulatorstable/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
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
                <p>Regulator:</p>
                <Select options={[
                    { value: 'PMRA', label: 'PMRA' },
                    { value: 'EPA', label: 'EPA' },
                    { value: 'EU', label: 'EU' },
                    { value: 'Australia', label: 'Australia' },
                    { value: 'Japan', label: 'Japan' },
                    { value: 'Other', label: 'Other' }
                ]} onChange={(e) => handleFormData('Regulator', e)} value={formData?.Regulator} className="mb-3 w-100" placeholder='Regulator' />
            </div>
            <div className='mb-3'>
                <p>Status of Active Ingredient:</p>
                <Select options={[
                    { value: 'Registered', label: 'Registered' },
                    { value: 'Approved', label: 'Approved' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'N/A', label: 'N/A' }
                ]} onChange={(e) => handleFormData('Status_of_Active_Ingredient', e)} value={formData?.Status_of_Active_Ingredient} className="mb-3 w-100" placeholder='Status of Active Ingredient' />
            </div>
            <div className='mb-3'>
                <p>Status Date:</p>
                <DatePicker onChange={handleLastUpdateDate} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form3_5