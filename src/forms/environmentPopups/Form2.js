import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../helper';

const Form2 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'submissionNumber': param.submissionNumber
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
        handleFormData('Reference_PMRA_Document_Numbers_Date', dateString)
    }

    function addRecord() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`${baseUrl}keydocsdata`, obj)
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
        axios.put(`${baseUrl}keydocsdata/${formData?.id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                formData({})
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
                <p>Document Name:</p>
                <Select options={[
                    { value: 'Monograph', label: 'Monograph' },
                    { value: 'Modelling', label: 'Modelling' },
                    { value: 'Monitorying', label: 'Monitorying' },
                    { value: 'Buffer Zones', label: 'Buffer Zones' },
                    { value: 'Residue Definition', label: 'Residue Definition' },
                ]} onChange={(e) => handleFormData('Document_Name', e)} value={formData?.Document_Name} className="mb-3 w-100" placeholder='Document Name' />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form2