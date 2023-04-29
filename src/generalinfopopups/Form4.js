import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form4 = ({ open, setOpen, data, getFormData }) => {
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
            ...formData, 'Submission_Number': param?.submissionNumber,
            'PMRA_Number': parseInt(formData?.PMRA_Number),
            'Subsection_ID': "4.1"
        }
        setLoading(true)
        axios.post(`${baseUrl}geninforegulatorstable`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    function edit() {
        const obj = {
            'PMRA_Number': parseInt(formData?.PMRA_Number)
        }
        setLoading(true)
        axios.put(`${baseUrl}geninforegulatorstable/${formData?.row_id}`, obj)
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
                <p>Subsection Name:</p>
                <Select options={[
                    { value: 'Pre-Submission Consultations', label: 'Pre-Submission Consultations' },
                    { value: 'Emergency Registrations', label: 'Emergency Registrations' },
                    { value: 'Research Authorizations', label: 'Research Authorizations' }
                ]} onChange={(e) => handleFormData('Subsection_Name', e)} value={formData?.Subsection_Name} className="mb-3 w-100" placeholder='Subsection Name' />
            </div>
            <div className='mb-3'>
                <p>Conducted:</p>
                <Select options={[
                    { value: "1", label: 'Yes' },
                    { value: "0", label: 'No' }
                ]} onChange={(e) => handleFormData('Conducted', e)} value={formData?.Conducted} className="mb-3 w-100" placeholder='Conducted' />
            </div>
            <div className='mb-3'>
                <p>Submission Status Level:</p>
                <Input placeholder='Submission Status Level' className='mb-3' value={formData?.Submission_Status_Level} onChange={(e) => handleFormData('Submission_Status_Level', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Submission Status Activity:</p>
                <Input placeholder='Submission Status Activity' className='mb-3' value={formData?.Submission_Status_Activity} onChange={(e) => handleFormData('Submission_Status_Activity', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' type='number' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Purpose:</p>
                <Input placeholder='Purpose' className='mb-3' value={formData?.Purpose} onChange={(e) => handleFormData('Purpose', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form4