import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form4_4 = ({ open, setOpen, data, getFormData }) => {
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
        axios.post(`${baseUrl}geninfoepmarketingdata`, obj)
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
        axios.put(`${baseUrl}geninfoepmarketingdata/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={() => setOpen(false)} title={formData?.row_id ? 'Edit Record' : 'Add New Record'} footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.row_id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div className='mb-3'>
                <p>Restrictions:</p>
                <Select options={[
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' }
                ]} onChange={(e) => handleFormData('Restrictions', e)} value={formData?.Restrictions} className="mb-3 w-100" placeholder='Restrictions' />
            </div>
            <div className='mb-3'>
                <p>Registration Number:</p>
                <Input placeholder='Registration Number' type='number' className='mb-3' value={formData?.Registration_Number} onChange={(e) => handleFormData('Registration_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Product Name:</p>
                <Input placeholder='Product Name' className='mb-3' value={formData?.Product_Name} onChange={(e) => handleFormData('Product_Name', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Historical:</p>
                <Select options={[
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' }
                ]} onChange={(e) => handleFormData('Historical', e)} value={formData?.Historical} className="mb-3 w-100" placeholder='Historical' />
            </div>
            <div className='mb-3'>
                <p>Current:</p>
                <Checkbox onChange={(e) => handleFormData('Current', e.target.checked)} checked={formData?.Current} />
            </div>
            <div className='mb-3'>
                <p>From Submission Number:</p>
                <Input placeholder='From Submission Number:' className='mb-3' value={formData?.From_Submission_Number} onChange={(e) => handleFormData('From_Submission_Number', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form4_4