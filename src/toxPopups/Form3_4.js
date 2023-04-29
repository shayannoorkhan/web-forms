import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';
import dayjs from 'dayjs'

const Form3_4 = ({ open, setOpen, data, getFormData }) => {
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
        handleFormData('Date_First_Registered', dateString)
    }

    function handlesmc2Date(date, dateString) {
        handleFormData('Date_of_SMC2_BN_for_PRVD', dateString)
    }

    function handlesmc2DateSRD(date, dateString) {
        handleFormData('Date_of_SMC2_BN_for_SRD', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber
        }
        setLoading(true)
        axios.post(`${baseUrl}geninfotgairegistrantslist`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setLoading(false)
                formData({})
                setOpen(false)
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`${baseUrl}geninfotgairegistrantslist/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setLoading(false)
                formData({})
                setOpen(false)
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
                <p>Registrant Name:</p>
                <Input placeholder='Registrant Name' className='mb-3' value={formData?.Registrant_Name} onChange={(e) => handleFormData('Registrant_Name', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Registrant Assigned Code:</p>
                <Input placeholder='Registrant Assigned Code' className='mb-3' value={formData?.Registrant_Assigned_Code} onChange={(e) => handleFormData('Registrant_Assigned_Code', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Registrant Assigned Number:</p>
                <Input placeholder='Registrant Assigned Number' className='mb-3' value={formData?.Registrant_Assigned_Number} onChange={(e) => handleFormData('Registrant_Assigned_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Registration Number:</p>
                <Input placeholder='Registration Number' className='mb-3' value={formData?.Registration_Number} onChange={(e) => handleFormData('Registration_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Date First Registered:</p>
                <DatePicker onChange={handleLastUpdateDate} className="w-100" value={dayjs(formData?.Date_First_Registered).format('YYYY-MM-DD')} />
            </div>
            <div className='mb-3'>
                <p>Initial Submission Category:</p>
                <Select options={[
                    { value: 'A', label: 'A' },
                    { value: 'B', label: 'B' },
                    { value: 'C', label: 'C' },
                ]} onChange={(e) => handleFormData('Initial_Submission_Category', e)} value={formData?.Initial_Submission_Category} className="mb-3 w-100" placeholder='Initial Submission Category' />
            </div>
            <div className='mb-3'>
                <p>Initial Submission Type:</p>
                <Input placeholder='Initial Submission Type' className='mb-3' value={formData?.Initial_Submission_Type} onChange={(e) => handleFormData('Initial_Submission_Type', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>USC List:</p>
                <Input placeholder='USC List' className='mb-3' value={formData?.USC_List} onChange={(e) => handleFormData('USC_List', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Registration Status:</p>
                <Select options={[
                    { value: 'Current', label: 'Current' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Cancelled', label: 'Cancelled' },
                ]} onChange={(e) => handleFormData('Registration_Status', e)} value={formData?.Registration_Status} className="mb-3 w-100" placeholder='Registration Status' />
            </div>
            <div className='mb-3'>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form3_4