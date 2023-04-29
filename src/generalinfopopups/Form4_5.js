import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';
import dayjs from 'dayjs';

const Form4_5 = ({ open, setOpen, data, getFormData }) => {
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

    function handleDate(date, dateString) {
        handleFormData('Date_Of_Reported_Contravention', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber
        }
        setLoading(true)
        axios.post(`${baseUrl}geninforoebcomplianceaudittrail`, obj)
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
        axios.put(`${baseUrl}geninforoebcomplianceaudittrail/${formData?.row_id}`, formData)
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
                <p>Sector:</p>
                <Input placeholder='Sector' type='number' className='mb-3' value={formData?.Sector} onChange={(e) => handleFormData('Sector', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PCPA Contravention:</p>
                <Input placeholder='PCPA Contravention' type='number' className='mb-3' value={formData?.PCPA_Contravention} onChange={(e) => handleFormData('PCPA_Contravention', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Date of Reported Contravention:</p>
                <DatePicker onChange={handleDate} className="w-100" value={formData?.Date_Of_Reported_Contravention && dayjs(formData?.Date_Of_Reported_Contravention)} />
            </div>
            <div className='mb-3'>
                <p>Product Description at Time of Contravention:</p>
                <Input placeholder='Product Description at Time of Contravention' className='mb-3' value={formData?.Product_Description} onChange={(e) => handleFormData('Product_Description', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Corrective Action Taken:</p>
                <Input placeholder='Corrective Action Taken' className='mb-3' value={formData?.Corrective_Action_Taken} onChange={(e) => handleFormData('Corrective_Action_Taken', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Compliance Status of Registrant at Time of Contravention:</p>
                <Select options={[
                    { value: 'Compliant', label: 'Compliant' },
                    { value: 'Non-Compliant', label: 'Non-Compliant' }
                ]} onChange={(e) => handleFormData('Compliance_Status', e)} value={formData?.Compliance_Status} className="mb-3 w-100" placeholder='Compliance Status of Registrant at Time of Contravention' />
            </div>
            <div className='mb-3'>
                <p>Additional Information:</p>
                <Input placeholder='Additional Information' className='mb-3' value={formData?.Additional_Information} onChange={(e) => handleFormData('Additional_Information', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form4_5