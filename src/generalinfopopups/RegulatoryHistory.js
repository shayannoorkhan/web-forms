import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RegulatoryHistory = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param?.submissionNumber,
        'Subsection_Name': "Initial TGAI registration"
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

    function handleRegisteredDate(date, dateString) {
        handleFormData('First_Registered_Date', dateString)
    }

    function handlesmc2Date(date, dateString) {
        handleFormData('Date_of_SMC2_BN_for_RDD', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber,
            'Subsection_Name': "Initial TGAI registration"
        }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/geninfosection3data`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/geninfosection3data/${formData?.row_id}`, formData)
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
                <p>First Registered Date:</p>
                <DatePicker onChange={handleRegisteredDate} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>First Registration Submission Number::</p>
                <Input placeholder='First Registration Submission Number:' className='mb-3' value={formData?.First_Registration_Submission_Number} onChange={(e) => handleFormData('First_Registration_Submission_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>First Registration Submission Type:</p>
                <Select options={[
                    { value: 'New Product Registration', label: 'New Product Registration' },
                    { value: 'Amendment', label: 'Amendment' },
                    { value: 'Re-evaluation', label: 'Re-evaluation' },
                ]} onChange={(e) => handleFormData('First_Registration_Submission_Type', e)} value={formData?.First_Registration_Submission_Type} className="mb-3 w-100" placeholder='First Registration Submission Type' />
            </div>
            <div className='mb-3'>
                <p>Registration Number:</p>
                <Input placeholder='Registration Number' className='mb-3' value={formData?.Registration_Number} onChange={(e) => handleFormData('Registration_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Registration Status:</p>
                <Select options={[
                    { value: 'Current', label: 'Current' },
                    { value: 'Held', label: 'Held' },
                ]} onChange={(e) => handleFormData('Registration_Status', e)} value={formData?.Registration_Status} className="mb-3 w-100" placeholder='Registration Status' />
            </div>
            <div className='mb-3'>
                <p>Associated Publication RDD:</p>
                <Input placeholder='Associated Publication RDD' className='mb-3' value={formData?.Associated_Publication_RDD} onChange={(e) => handleFormData('Associated_Publication_RDD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PMRA Number RDD:</p>
                <Input placeholder='PMRA Number RDD' className='mb-3' value={formData?.PMRA_Number_RDD} onChange={(e) => handleFormData('PMRA_Number_RDD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Date of SMC2 BN for RDD:</p>
                <DatePicker onChange={handlesmc2Date} className="w-100" />
            </div>
        </Modal>
    )
}

export default RegulatoryHistory