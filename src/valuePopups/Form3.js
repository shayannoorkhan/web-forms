import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form3 = ({ open, setOpen, data, getFormData }) => {
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
        axios.post(`https://aldprototype.ca:3000/api/valuesection3`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/valuesection3/${formData?.id}`, obj)
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
                <p>Study Type:</p>
                <Input placeholder='Study_Type' className='mb-3' value={formData?.Study_Type} onChange={(e) => handleFormData('Study_Type', e.target.value)} />
            </div>
            <div>
                <p>Document Type:</p>
                <Input placeholder='Document_Type' className='mb-3' value={formData?.Document_Type} onChange={(e) => handleFormData('Document_Type', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA_Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>PMRA System Document Location:</p>
                <Select options={[
                    { value: 'DIR', label: 'DIR' },
                    { value: 'PMRAP', label: 'PMRAP' },
                    { value: 'PMRAO', label: 'PMRAO' },
                    { value: 'PMRAI', label: 'PMRAI' },
                ]} onChange={(e) => handleFormData('PMRA_System_Document_Location', e)} value={formData?.PMRA_System_Document_Location} className="mb-3 w-100" placeholder='PMRA System Document Location' />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form3