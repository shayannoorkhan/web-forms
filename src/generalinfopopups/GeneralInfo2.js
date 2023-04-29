import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const GeneralInfo2 = ({ open, setOpen, data, getFormData }) => {
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
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`${baseUrl}geninfosection2data`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                formData({})
                setLoading(false)
                setOpen(false)
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`${baseUrl}geninfosection2data/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                formData({})
                setLoading(false)
                setOpen(false)
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
            <div>
                <p>Subsection Name</p>
                <Select options={[
                    { value: 'Parent', label: 'Parent' },
                    { value: 'Derivatives', label: 'Derivatives' }
                ]} onChange={(e) => handleFormData('Subsection_Name', e)} value={formData?.Subsection_Name} className="mb-3 w-100" placeholder='Subsection Name' />
            </div>
            <div>
                <p>Active Code:</p>
                <Input placeholder='Active Code' className='mb-3' value={formData?.Active_Code} onChange={(e) => handleFormData('Active_Code', e.target.value)} />
            </div>
            <div>
                <p>Active Name:</p>
                <Input placeholder='Active Code' className='mb-3' value={formData?.Active_Name} onChange={(e) => handleFormData('Active_Name', e.target.value)} />
            </div>
            <div>
                <p>CAS Number:</p>
                <Input placeholder='Active Code' className='mb-3' value={formData?.CAS_Number} onChange={(e) => handleFormData('CAS_Number', e.target.value)} />
            </div>
        </Modal>
    )
}

export default GeneralInfo2