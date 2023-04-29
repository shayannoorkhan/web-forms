import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../helper';

const Form3 = ({ open, setOpen, data, getFormData, sectionName, sectionNumber }) => {
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
        const obj = { ...formData, 'Submission_Number': param.submissionNumber, 'Section_Name': sectionName, 'Section_Number': sectionNumber }
        setLoading(true)
        axios.post(`${baseUrl}section3to9data`, obj)
            .then((resp) => {
                message.success('Record Added')
                setLoading(false)
                getFormData()
                setOpen(false)
                formData({})
            })
    }

    function edit() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber, 'Section_Name': formData?.['Section name'], 'Section_Number': formData?.['Section number'] }
        setLoading(true)
        axios.put(`${baseUrl}section3to9data/${formData?.row_id}`, obj)
            .then((resp) => {
                message.success('Record Updated')
                setLoading(false)
                getFormData()
                setOpen(false)
                formData({})
            })
            .catch((err) => {
                setLoading(false)
                setOpen(false)
                formData({})
                message.error('Error')
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
                <p>Description:</p>
                <Input placeholder='Description' className='mb-3' value={formData?.Description} onChange={(e) => handleFormData('Description', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA_Number' className='mb-3' value={formData['PMRA Number']} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>Potential Flag:</p>
                <Input placeholder='Potential Flag' className='mb-3' value={formData?.['Potential Flag']} onChange={(e) => handleFormData('Potential_Flag', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form3