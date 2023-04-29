import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form9 = ({ open, setOpen, data, getFormData }) => {
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

    function handleDate(date, dateString) {
        handleFormData('Date', dateString)
    }

    function addRecord() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`${baseUrl}toxsection9data`, obj)
            .then((resp) => {
                message.success('Record Added')
                setLoading(false)
                getFormData()
                setOpen(false)
                formData({})
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`${baseUrl}toxsection9data/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                setLoading(false)
                getFormData()
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
            <div>
                <p>Subsection Name:</p>
                <Select options={[
                    { value: 'TGAI', label: 'TGAI' },
                    { value: 'Metabolites', label: 'Metabolites' },
                    { value: 'Impurities', label: 'Impurities' },
                ]} onChange={(e) => handleFormData('Subsection_Name', e)} value={formData?.Subsection_Name} className="mb-3 w-100" placeholder='Subsection Name' />
            </div>
            <div>
                <p>Study Type:</p>
                <Input placeholder='Study Type' className='mb-3' value={formData?.Study_Type} onChange={(e) => handleFormData('Study_Type', e.target.value)} />
            </div>
            <div>
                <p>Document Type:</p>
                <Input placeholder='Document Type' className='mb-3' value={formData?.Document_Type} onChange={(e) => handleFormData('Document_Type', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>Document Reference:</p>
                <Input placeholder='Document Reference' className='mb-3' value={formData?.Document_Reference} onChange={(e) => handleFormData('Document_Reference', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form9